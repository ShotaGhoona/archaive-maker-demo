# BOM Canvas v2データ構造 実装レポート

## 概要

BOM Canvasページをv1データ構造からv2（BizPM設計）データ構造に移行完了。
旧来の`BomTreeNode`ベースから新しい`Item + ItemRev`ベースに変更し、
FacetInstanceによるスキーマ駆動の属性管理に対応。

## 変更サマリ

| カテゴリ | 追加 | 変更 | 行数変更 |
|---------|------|------|---------|
| ページコンポーネント | 1 | 6 | +175 |
| Widgets | 0 | 11 | +700 |
| ダミーデータ | 2 | 1 | +1,349 |
| 共通ユーティリティ | 2 | 0 | +154 |
| ドキュメント | 0 | 1 | -128 |
| **合計** | **5** | **19** | **+2,250** |

## 変更ファイル一覧

### 新規作成ファイル

#### 1. `frontend/src/page-components/bom/canvas/lib/build-canvas-bom-tree.ts`
v2データ（Item, ItemRev, BOMHeader, BOMLine）からCanvas用ツリー構造を構築。

```typescript
// 主要関数
buildCanvasBomTree(parentItemRevId: string): CanvasBomNode

// 処理フロー
explodeBom(parentItemRevId)  // フラット展開
  ↓
buildCanvasBomTree()         // 再帰的にツリー構築
  ↓
CanvasBomNode[]              // Canvas描画用ノード
```

#### 2. `frontend/src/shared/dummy-data/bom-v2/task/tasks.ts`
タスクダミーデータ（ItemRevIdベースで紐付け）。

- `dummyTasks`: 全タスクデータ
- `dummyUsers`: ユーザーマスタ
- `dummyDepartments`: 部署マスタ
- `getTasksByItemRevId()`: ItemRevに紐づくタスク取得

#### 3. `frontend/src/shared/dummy-data/bom-v2/task/types.ts`
タスク関連の型定義。

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  itemRevId: string;           // 紐付け先
  targetObject?: TaskTargetObject;  // 任意
  status: TaskStatus;          // 'todo' | 'in_progress' | 'done'
  priority: TaskPriority;      // 'high' | 'medium' | 'low'
  assignee?: User;
  dueDate?: string;
  sourceComment?: SourceComment;
  createdAt: string;
  updatedAt: string;
}
```

#### 4. `frontend/src/shared/lib/bom-v2/item-type.ts`
ItemType→日本語ラベル変換ユーティリティ。

```typescript
getItemTypeLabel(itemType: ItemType): string
// 'Product' → '製品'
// 'Assembly' → 'Assy'
// 'Part' → '部品'
// 'Purchased' → '購入品'
// 'RawMaterial' → '素材'
```

#### 5. `frontend/src/shared/ui/form-fields/lib/render-dynamic-field.tsx`（拡張）
FacetSchemaProperty対応のフィールドレンダリング関数を追加。

```typescript
// 新規追加
renderFacetField({ fieldKey, property, value, onChange })
renderFacetFields({ schema, values, onChange, idPrefix? })

// 特徴
- FacetSchemaPropertyのtype/enumに基づくフィールド自動選択
- enum → SelectField
- number → NumberField
- boolean → BooleanField
- string → TextField
- 単位(unit)のラベル付与対応
```

### 変更ファイル

#### ページコンポーネント

| ファイル | 変更内容 |
|----------|----------|
| `ui/BomCanvasContainer.tsx` | `buildCanvasBomTree()`使用、v2 API呼び出し |
| `ui-block/bom-tree/model/types.ts` | `CanvasBomNode`型定義（Item + ItemRev） |
| `ui-block/bom-tree/lib/tree-layout.ts` | v2型対応 |
| `ui-block/bom-tree/ui/BomTreeLayer.tsx` | v2型対応 |
| `ui-block/bom-tree/ui/NodeBlock.tsx` | v2 Widget呼び出し、props変更 |
| `ui-block/bom-tree/ui/components/DetailLinkButton.tsx` | nodeId→itemId |

#### Widgets（タスク関連）

| ファイル | 変更内容 |
|----------|----------|
| `task-sheet/ui/TaskSheet.tsx` | ItemRevId/ItemType対応、FacetSection追加 |
| `task-sheet/ui/TaskListItem.tsx` | v2型対応 |
| `task-sheet/ui/TaskDetailModal.tsx` | targetObject任意化、ItemType表示 |
| `task-sheet/ui/CreateTaskModal.tsx` | ItemType対応、targetObject構造変更 |
| `task-sheet/ui/TaskFilterModal.tsx` | v2ダミーデータ使用 |

#### Widgets（メタデータ関連）

| ファイル | 変更内容 |
|----------|----------|
| `metadata-sheet/ui/MetadataSheet.tsx` | FacetInstance/FacetType対応、FacetSection追加 |
| `metadata-sheet/ui/RelatedProductsModal.tsx` | Where-Used（findWhereUsed）対応 |

#### Widgets（帳票・図面関連）

| ファイル | 変更内容 |
|----------|----------|
| `document-sheet/ui/DocumentListSheet.tsx` | Document型対応、DocumentType表示 |
| `document-sheet/ui/DocumentDetailModal.tsx` | FacetSection追加、renderFacetFields使用 |
| `drawing-sheet/ui/DrawingListSheet.tsx` | Drawing型対応 |
| `drawing-sheet/ui/DrawingDetailModal.tsx` | FacetSection追加、renderFacetFields使用 |

## アーキテクチャ変更

### データフロー（Before → After）

**Before（v1）:**
```
bomTreeData（静的ネスト構造）
  ↓
BomTreeNode[]
  ↓
Canvas描画
```

**After（v2）:**
```
Item, ItemRev, BOMHeader, BOMLine（正規化データ）
  ↓
explodeBom() → フラット展開
  ↓
buildCanvasBomTree() → ツリー構築
  ↓
CanvasBomNode[]
  ↓
calculateBomTreeLayout() → 座標計算
  ↓
Canvas描画
```

### 型変更

**Before:**
```typescript
interface BomTreeNode {
  id: string;
  partNumber: string;
  name: string;
  nodeType: 'product' | 'assy' | 'parts';
  customItems: Record<string, unknown>;
  documents?: DocumentItem[];
  children: BomTreeNode[];
}
```

**After:**
```typescript
interface CanvasBomNode {
  item: Item;           // 品番情報
  itemRev: ItemRev;     // リビジョン情報
  quantity: number;     // 員数
  children: CanvasBomNode[];
}
```

### 属性管理の変更

**Before:**
- `customItems: Record<string, unknown>` - 自由形式

**After:**
- `FacetInstance` - スキーマ駆動
- `FacetType.schema.properties` - JSONSchema形式の型定義
- `renderFacetFields()` - スキーマに基づく自動フィールド生成

## Widget構成（最終形）

```
widgets/bom/canvas/
├── task-sheet/ui/
│   ├── TaskSheet.tsx          # メイン（FloatingModalRoot）
│   ├── TaskListItem.tsx       # リスト項目
│   ├── TaskDetailModal.tsx    # 詳細（stack）
│   ├── CreateTaskModal.tsx    # 作成（replace）
│   └── TaskFilterModal.tsx    # フィルター（stack）
│
├── metadata-sheet/ui/
│   ├── MetadataSheet.tsx      # FacetInstances表示・編集
│   └── RelatedProductsModal.tsx  # Where-Used一覧
│
├── document-sheet/ui/
│   ├── DocumentListSheet.tsx  # 帳票一覧
│   └── DocumentDetailModal.tsx   # 帳票詳細（Dialog）
│
└── drawing-sheet/ui/
    ├── DrawingListSheet.tsx   # 図面一覧
    └── DrawingDetailModal.tsx    # 図面詳細（Dialog）
```

## 共通パターン

### FacetSectionパターン
各Widgetで`FacetInstance`を表示するための共通パターン。

```typescript
interface FacetSectionProps {
  facetInstance: FacetInstance;
  facetType: FacetType;
  onValueChange: (instanceId: string, key: string, value: unknown) => void;
}

function FacetSection({ facetInstance, facetType, onValueChange }: FacetSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline">{facetType.category}</Badge>
        <span className="text-sm font-medium">{facetType.name}</span>
      </div>
      <div className="grid gap-3">
        {renderFacetFields({
          schema: facetType.schema.properties,
          values: facetInstance.values,
          onChange: (key, value) => onValueChange(facetInstance.id, key, value),
          idPrefix: facetInstance.id,
        })}
      </div>
    </div>
  );
}
```

### ローカル状態管理パターン
FacetInstance編集時のローカル状態管理。

```typescript
const [localInstances, setLocalInstances] = useState<Record<string, Record<string, unknown>>>({});

const getInstanceValues = useCallback(
  (instance: FacetInstance): Record<string, unknown> => {
    return { ...instance.values, ...(localInstances[instance.id] ?? {}) };
  },
  [localInstances]
);

const handleValueChange = useCallback((instanceId: string, key: string, value: unknown) => {
  setLocalInstances((prev) => ({
    ...prev,
    [instanceId]: {
      ...(prev[instanceId] ?? {}),
      [key]: value,
    },
  }));
}, []);
```

## 今後の拡張ポイント

1. **プレビュー機能**: DocumentDetailModal/DrawingDetailModalのファイルプレビュー
2. **API連携**: ダミーデータからバックエンドAPIへの差し替え
3. **タスク操作**: 開始/完了ボタンのAPI連携
4. **メタデータ保存**: FacetInstance更新のAPI連携
5. **キャンバス操作**: ノード追加・削除・並び替え
6. **バリデーション**: FacetSchemaに基づく入力検証

## 参照ドキュメント

- [01-新しいデータ構造の要件.md](./01-新しいデータ構造の要件.md)
- [02-ダミーデータレポート.md](./02-ダミーデータレポート.md)
- [03-v1-v2移行ガイド.md](./03-v1-v2移行ガイド.md)
- [bom-canvas-structure.md](../001-bom-canvas/report/bom-canvas-structure.md)
