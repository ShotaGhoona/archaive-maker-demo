# BOM Canvas ページ構造（v2データ対応版）

## 概要

BOM Canvasページはv2データ構造（BizPM設計）に対応した実装となっている。
v1の `BomTreeNode` ベースから v2の `Item + ItemRev` ベースに移行済み。

## アーキテクチャ

```
page-components/bom/canvas/
├── ui/
│   └── BomCanvasContainer.tsx    # メインコンテナ
├── lib/
│   └── build-canvas-bom-tree.ts  # v2データ→CanvasBomNode変換
└── ui-block/
    ├── bom-tree/                 # BOMツリー描画
    │   ├── model/types.ts        # CanvasBomNode型定義
    │   ├── lib/tree-layout.ts    # レイアウト計算
    │   └── ui/
    │       ├── BomTreeLayer.tsx  # ノード+コネクタ描画
    │       └── NodeBlock.tsx     # 各ノードのUI
    ├── comment/                  # コメント機能
    └── sticky-note/              # 付箋機能
```

## データフロー

```
v2 Dummy Data (Item, ItemRev, BOMHeader, BOMLine)
    ↓
explodeBom(parentItemRevId)  # フラット展開
    ↓
buildCanvasBomTree()         # ツリー構造に変換
    ↓
CanvasBomNode                # Canvas用の型
    ↓
calculateBomTreeLayout()     # 座標計算
    ↓
BomTreeLayout { nodes, connectors, minimapNodes }
```

## 型定義

### CanvasBomNode（Canvas専用）

```typescript
// page-components/bom/canvas/ui-block/bom-tree/model/types.ts
export interface CanvasBomNode {
  item: Item;           // 品番情報
  itemRev: ItemRev;     // リビジョン情報
  quantity: number;     // 員数
  children: CanvasBomNode[];
}
```

### v2基本型（参照）

```typescript
// shared/dummy-data/bom-v2/types.ts
interface Item {
  id: string;
  partNumber: string;   // 品番 "PRD-ARM-1000"
  name: string;         // 品名
  itemType: ItemType;   // 'Product' | 'Assembly' | 'Part' | 'Purchased' | 'RawMaterial'
  lifecycleState: LifecycleState;
}

interface ItemRev {
  id: string;
  itemId: string;
  revision: string;     // "A", "B", "C"
  status: RevisionStatus;
  facetInstanceIds: string[];  // 属性データへの参照
}
```

## Widgetコンポーネント

NodeBlockから呼び出されるWidget群:

### TaskSheet

```
widgets/bom/canvas/task-sheet/ui/
├── TaskSheet.tsx          # メイン（FloatingModalRoot）
├── TaskListItem.tsx       # リスト項目
├── TaskDetailModal.tsx    # 詳細モーダル（stack）
├── CreateTaskModal.tsx    # 作成モーダル（replace）
└── TaskFilterModal.tsx    # フィルターモーダル（stack）
```

**Props:**
```typescript
interface TaskSheetProps {
  itemRevId: string;   // タスク取得のキー
  itemId: string;
  itemName: string;
  partNumber: string;
  itemType: ItemType;
}
```

### MetadataSheet

```
widgets/bom/canvas/metadata-sheet/ui/
├── MetadataSheet.tsx         # FacetInstances表示・編集
└── RelatedProductsModal.tsx  # Where-Used（使用先一覧）
```

**Props:**
```typescript
interface MetadataSheetProps {
  item: Item;
  itemRev: ItemRev;
}
```

**特徴:**
- `getFacetInstancesByItemRev()` でFacetInstancesを取得
- `renderFacetFields()` でスキーマベースのフィールド生成
- `findWhereUsed()` で使用先を取得

### DocumentListSheet

```
widgets/bom/canvas/document-sheet/ui/
├── DocumentListSheet.tsx     # 帳票一覧
└── DocumentDetailModal.tsx   # 帳票詳細（Dialog）
```

**Props:**
```typescript
interface DocumentListSheetProps {
  documents: Document[];  // getDocumentsByItemRev()で取得
}
```

### DrawingListSheet

```
widgets/bom/canvas/drawing-sheet/ui/
├── DrawingListSheet.tsx      # 図面一覧
└── DrawingDetailModal.tsx    # 図面詳細（Dialog）
```

**Props:**
```typescript
interface DrawingListSheetProps {
  drawings: Drawing[];  // getDrawingsByItemRev()で取得
}
```

## 共通ユーティリティ

### render-dynamic-field.tsx

```typescript
// shared/ui/form-fields/lib/render-dynamic-field.tsx

// 従来の動的フィールド（値の型から推論）
renderDynamicField({ fieldKey, value, onChange })
renderDynamicFields(items, onChange)

// v2対応: FacetSchemaPropertyベースのフィールド生成
renderFacetField({ fieldKey, property, value, onChange })
renderFacetFields({ schema, values, onChange, idPrefix? })
```

### item-type.ts

```typescript
// shared/lib/bom-v2/item-type.ts
getItemTypeLabel(itemType: ItemType): string
// 'Product' → '製品', 'Assembly' → 'Assy', etc.
```

## v1→v2 主要変更点

| 項目 | v1 | v2 |
|------|----|----|
| ノードID | `nodeId` (BomTreeNode.id) | `itemRevId` (ItemRev.id) |
| ノード型 | `BomTreeNode` | `CanvasBomNode` (Item + ItemRev) |
| タイプ | `'product' \| 'assy' \| 'parts'` | `ItemType` (5種類) |
| 属性 | `customItems: Record<string, unknown>` | `FacetInstance[]` |
| 帳票 | バージョン配列付き | 単一Document |
| BOM構築 | ネストした静的データ | `explodeBom()` で動的構築 |

## ファイル一覧

### Widgetコンポーネント

```
src/widgets/bom/canvas/task-sheet/ui/
├── TaskSheet.tsx
├── TaskListItem.tsx
├── TaskDetailModal.tsx
├── CreateTaskModal.tsx
└── TaskFilterModal.tsx

src/widgets/bom/canvas/metadata-sheet/ui/
├── MetadataSheet.tsx
└── RelatedProductsModal.tsx

src/widgets/bom/canvas/document-sheet/ui/
├── DocumentListSheet.tsx
└── DocumentDetailModal.tsx

src/widgets/bom/canvas/drawing-sheet/ui/
├── DrawingListSheet.tsx
└── DrawingDetailModal.tsx
```

### ページコンポーネント

```
src/page-components/bom/canvas/
├── ui/
│   └── BomCanvasContainer.tsx      # メインコンテナ
├── lib/
│   └── build-canvas-bom-tree.ts    # v2データ→CanvasBomNode変換
└── ui-block/bom-tree/
    ├── model/types.ts              # CanvasBomNode型
    ├── lib/tree-layout.ts          # レイアウト計算
    └── ui/
        ├── BomTreeLayer.tsx        # ノード+コネクタ描画
        └── NodeBlock.tsx           # Widget呼び出し
```

### 共通ユーティリティ

```
src/shared/lib/bom-v2/
└── item-type.ts                    # ItemType→ラベル変換

src/shared/ui/form-fields/lib/
└── render-dynamic-field.tsx        # renderFacetFields追加
```

## 今後の拡張ポイント

1. **プレビュー機能**: DocumentDetailModal/DrawingDetailModalのプレビュー実装
2. **API連携**: ダミーデータからバックエンドAPIへの差し替え
3. **タスク操作**: 開始/完了ボタンのAPI連携
4. **メタデータ保存**: FacetInstance更新のAPI連携
5. **キャンバス操作**: ノード追加・削除・並び替え
