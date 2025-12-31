# BomCanvas 構造ドキュメント

## 目次

1. [ディレクトリ構造](#ディレクトリ構造)
2. [各ファイルの役割](#各ファイルの役割)
3. [コンポーネント依存関係](#コンポーネント依存関係)
4. [使用している Widgets](#使用している-widgets)
5. [使用している Shared](#使用している-shared)
6. [状態管理フロー](#状態管理フロー)
7. [イベント処理フロー](#イベント処理フロー)
8. [座標系とレンダリング層](#座標系とレンダリング層)

---

## ディレクトリ構造

### page-components/bom/canvas/

```
frontend/src/page-components/bom/canvas/
├── ui/
│   └── BomCanvasContainer.tsx              # メインコンテナ
└── ui-block/
    ├── bom-tree/                           # BOMツリー（ノード+コネクタ）
    │   ├── model/
    │   │   └── types.ts                    # FlattenedNode, Connector, MinimapNode型
    │   ├── lib/
    │   │   └── tree-layout.ts              # BOMツリーレイアウト計算
    │   └── ui/
    │       ├── BomTreeLayer.tsx            # ノード+コネクタを一括レンダリング
    │       ├── NodeBlock.tsx               # 個別ノード表示
    │       └── components/
    │           └── NodeConnector.tsx       # 親子接続線（SVG path）
    │
    ├── sticky-note/                        # 付箋機能
    │   ├── model/
    │   │   └── types.ts                    # StickyNote型
    │   ├── lib/
    │   │   ├── use-sticky-notes.ts         # 付箋の状態管理
    │   │   ├── use-drag.ts                 # ドラッグ処理
    │   │   ├── use-resize.ts               # リサイズ処理
    │   │   └── use-editable-text.ts        # テキスト編集
    │   └── ui/
    │       ├── StickyNoteLayer.tsx         # 付箋レイヤー親
    │       ├── StickyNoteItem.tsx          # 個別付箋
    │       └── components/
    │           ├── StickyNoteToolbar.tsx   # 色・フォントサイズ選択
    │           └── StickyNotePlaceholder.tsx # 配置プレビュー
    │
    └── comment/                            # コメント機能
        ├── model/
        │   └── types.ts                    # Comment, CommentThread型
        ├── lib/
        │   ├── use-comments.ts             # コメント状態管理
        │   └── use-drag.ts                 # ドラッグ処理
        └── ui/
            ├── CommentLayer.tsx            # コメントレイヤー親
            ├── CommentThread.tsx           # スレッド（展開/折りたたみ）
            └── components/
                ├── CommentBubble.tsx       # 折りたたみ状態表示
                ├── CommentExpanded.tsx     # 展開状態表示
                └── CommentCreator.tsx      # 新規コメント作成
```

### 関連する Widgets

```
frontend/src/widgets/bom/canvas/
├── viewport/
│   ├── ui/
│   │   └── CanvasViewport.tsx              # 無限キャンバス
│   └── lib/
│       └── use-canvas-viewport.ts          # パン/ズーム管理
│
├── toolbar/
│   └── ui/
│       └── CanvasToolbar.tsx               # ツール選択バー
│
├── metadata-sheet/
│   └── ui/
│       └── MetadataSheet.tsx               # ノード詳細シート
│
├── drawing-preview/
│   └── ui/
│       └── DrawingPreviewDialog.tsx        # 図面プレビュー
│
└── document-preview/
    └── ui/
        └── DocumentPreviewDialog.tsx       # ドキュメントプレビュー
```

### 関連する Shared

```
frontend/src/shared/canvas/
├── constant/
│   ├── size.ts                             # サイズ定数
│   └── color.ts                            # 色定義
└── lib/
    └── coordinate.ts                       # 座標変換ユーティリティ
```

---

## 各ファイルの役割

### メインコンテナ

#### BomCanvasContainer.tsx

BOMキャンバス全体を統括するメインコンポーネント。

**責務:**
- ツール選択状態の管理（sticky, comment, node）
- マウス位置の追跡
- 各レイヤー（BomTreeLayer, StickyNoteLayer, CommentLayer）の統合
- ツールバーとビューポートの連携

**ポイント:** レンダリングロジックは各レイヤーに委譲し、Container は薄く保つ。

---

### ui-block/bom-tree

BOMツリーの表示を担当。ノードとコネクタを一体で管理。

#### types.ts

```typescript
// フラット化されたノード（座標付き）
interface FlattenedNode {
  node: BomTreeNode;
  x: number;
  y: number;
  parentId: string | null;
}

// コネクタ情報
interface Connector {
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// ミニマップ用ノード
interface MinimapNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// ツリーレイアウト結果
interface BomTreeLayout {
  nodes: FlattenedNode[];
  connectors: Connector[];
  minimapNodes: MinimapNode[];
}
```

#### tree-layout.ts

BOMツリーを平面座標系に変換するロジック。

**主要関数:**
- `calculateBomTreeLayout()`: ツリー構造からレイアウト結果を生成

**レイアウトルール:**
- 親と長男が同じY座標に揃う
- 水平方向: `depth × (NODE_WIDTH + HORIZONTAL_GAP)`
- 垂直方向: subtree_height で積み重ね、VERTICAL_GAP で分離

#### BomTreeLayer.tsx

ノードとコネクタを一括レンダリング。

**Props:**
| プロパティ | 型 | 説明 |
|-----------|-----|------|
| nodes | FlattenedNode[] | 座標付きノード配列 |
| connectors | Connector[] | 接続線配列 |

#### NodeBlock.tsx

BOMツリーの個別ノード表示コンポーネント。

**責務:**
- ノード名と品番の表示
- ノードタイプ（Product/Assy/Parts）のバッジ表示
- ドキュメント・図面プレビューアイコン表示
- メタデータシートへのアクセス

**サイズ:** `NODE_WIDTH × NODE_HEIGHT`（250 × 150px）

#### NodeConnector.tsx

親子関係を表すSVGコネクタ。

**責務:**
- 直角コネクタの描画（横→縦→横パターン）
- パス: `M fromX fromY H midX V toY H toX`

---

### ui-block/sticky-note

#### StickyNoteLayer.tsx

付箋レイヤーの親コンテナ。

**責務:**
- 配置済み付箋の一括管理
- プレビュー表示（ツール選択時）

#### StickyNoteItem.tsx

個別付箋コンポーネント。

**責務:**
- ドラッグ移動、リサイズ、テキスト編集
- 選択状態の管理
- ツールバー表示（色・フォントサイズ変更）

#### use-sticky-notes.ts

付箋の状態管理フック。

```typescript
const { notes, addNote, updateNote, deleteNote } = useStickyNotes();
```

**初期サイズ:** `STICKY_NOTE_WIDTH × STICKY_NOTE_HEIGHT`（200 × 150px）

---

### ui-block/comment

#### CommentLayer.tsx

コメントレイヤー親コンテナ。

**責務:**
- スレッド一覧の管理
- 新規コメント作成画面の制御（pendingPosition）

#### CommentThread.tsx

個別コメントスレッド。

**責務:**
- 展開/閉じる状態管理
- ドラッグ移動（展開時は無効）
- クリック検出（ドラッグ後は展開しない）

#### use-comments.ts

コメント全体の状態管理フック。

```typescript
const {
  threads,
  addThread,
  addReply,
  updateComment,
  deleteComment,
  moveThread,
  resolveThread
} = useComments();
```

**削除ロジック:**
- 最初のコメント削除 → スレッド全体削除
- その他のコメント削除 → そのコメントのみ削除

---

## コンポーネント依存関係

```
BomCanvasContainer
├─ CanvasViewport (widget)
│   ├─ DottedGridBackground (widget)
│   ├─ CanvasControls (widget)
│   └─ CanvasMinimap (widget)
│
├─ CanvasToolbar (widget)
│   └─ Button, ButtonGroup (shadcn/ui)
│
├─ BomTreeLayer (ui-block)
│   ├─ NodeBlock × n
│   │   ├─ Badge (shadcn/ui)
│   │   ├─ MetadataSheet (widget)
│   │   ├─ DrawingPreviewDialog (widget)
│   │   └─ DocumentPreviewDialog (widget)
│   └─ NodeConnector × n (SVG path)
│
├─ StickyNoteLayer (ui-block)
│   ├─ StickyNoteItem × n
│   │   ├─ useDrag, useResize, useEditableText
│   │   └─ StickyNoteToolbar
│   └─ StickyNotePlaceholder
│
└─ CommentLayer (ui-block)
    ├─ CommentThread × n
    │   ├─ useDrag
    │   ├─ CommentBubble
    │   └─ CommentExpanded
    └─ CommentCreator
```

---

## 使用している Widgets

### CanvasViewport

無限キャンバス（パン/ズーム可能）の実装。

**Props:**
| プロパティ | 型 | 説明 |
|-----------|-----|------|
| viewport | ViewportState | スケール、オフセット |
| cursor | string | カーソルスタイル |
| handlers | object | イベントハンドラ |
| actions | object | zoomIn, zoomOut, resetViewport, fitToContent, panTo |
| minimapNodes | array | ミニマップ表示用ノード |

### use-canvas-viewport.ts

キャンバスの状態と操作を一元管理。

**操作:**
- Space キー: パンモード ON/OFF
- Wheel + Ctrl/Cmd: ズーム
- トラックパッド 2 本指: パン
- MiddleClick/RightClick: パン
- DoubleClick: 全体表示

### CanvasToolbar

キャンバス下部の固定ツールバー。

**ツール:**
- 付箋（sticky）
- コメント（comment）
- 新規ノード（node）※TODO

### MetadataSheet / DrawingPreviewDialog / DocumentPreviewDialog

ノードの詳細情報・図面・ドキュメント表示。

---

## 使用している Shared

### @/shared/canvas/constant/size.ts

```typescript
// BOMノード
NODE_WIDTH = 250
NODE_HEIGHT = 150
HORIZONTAL_GAP = 100
VERTICAL_GAP = 40

// 付箋
STICKY_NOTE_WIDTH = 200
STICKY_NOTE_HEIGHT = 150
STICKY_NOTE_MIN_WIDTH = 100
STICKY_NOTE_MIN_HEIGHT = 80

// コメント
COMMENT_AVATAR_SIZE = 32
COMMENT_PREVIEW_WIDTH = 240
COMMENT_EXPANDED_WIDTH = 320

// フォントサイズ
STICKY_NOTE_FONT_SIZES = { small: 12, medium: 14, large: 16 }

// コネクタ線幅
CONNECTOR_STROKE_WIDTHS = { thin: 1, medium: 2, thick: 3 }
```

### @/shared/canvas/constant/color.ts

```typescript
type CanvasColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'gray'

CANVAS_COLORS: Record<CanvasColor, { code: string, label: string }>
```

### @/shared/canvas/lib/coordinate.ts

```typescript
screenToCanvas(screenX, screenY, viewport)    // スクリーン→キャンバス
canvasToScreen(canvasX, canvasY, viewport)    // キャンバス→スクリーン
getCanvasCoordinatesFromEvent(event, container, viewport)  // イベント→キャンバス座標
```

---

## 状態管理フロー

```
BomCanvasContainer
│
├─ selectedTool (useState)
│   └─ CanvasToolbar と連動
│       └─ 'sticky' | 'comment' | 'node' | null
│
├─ mousePosition (useState)
│   └─ ツール選択時のマウス追跡
│       └─ StickyNotePlaceholder プレビュー用
│
├─ pendingCommentPosition (useState)
│   └─ コメント作成待ち状態
│       └─ CommentCreator 表示トリガー
│
├─ useCanvasViewport() hook
│   ├─ viewport (scale, offsetX, offsetY)
│   ├─ cursorMode ('default' | 'grab' | 'grabbing')
│   └─ handlers, actions
│
├─ bomTreeLayout (useMemo)
│   └─ calculateBomTreeLayout() の結果
│       └─ nodes, connectors, minimapNodes
│
├─ useStickyNotes() hook
│   └─ notes[], addNote(), updateNote(), deleteNote()
│
└─ useComments() hook
    └─ threads[], addThread(), addReply(), updateComment(),
       deleteComment(), moveThread(), resolveThread()
```

---

## イベント処理フロー

### 付箋作成

1. `CanvasToolbar` で "付箋" ツール選択 → `selectedTool='sticky'`
2. `StickyNotePlaceholder` でマウス位置プレビュー表示
3. キャンバスクリック → `handleCanvasClick()`
4. `addNote(canvasX, canvasY)` で新規付箋作成
5. `StickyNoteItem` で表示、ドラッグ/リサイズ/編集可能

### コメント作成

1. `CanvasToolbar` で "コメント" ツール選択 → `selectedTool='comment'`
2. キャンバスクリック → `setPendingCommentPosition()`
3. `CommentCreator` が位置に表示
4. テキスト入力して Enter → `addThread(x, y, content)`
5. `CommentThread` で bubble 状態で表示、クリックで展開

### ビューポート操作

| 操作 | 結果 |
|------|------|
| Space キー | パンモード ON/OFF |
| Wheel + Ctrl/Cmd | ズーム |
| トラックパッド 2 本指 | パン |
| MiddleClick / RightClick | パン |
| DoubleClick | 全体表示（fitToContent） |

---

## 座標系とレンダリング層

### 座標系

| 座標系 | 説明 |
|--------|------|
| キャンバス座標 | 仮想空間上の絶対位置 |
| スクリーン座標 | ブラウザ上の相対ピクセル位置 |

**変換:** `screenToCanvas()`, `canvasToScreen()`

### レンダリング層（下から順）

1. **背景層**: DottedGridBackground
2. **BOMツリー層**: BomTreeLayer
   - SVG層: NodeConnector（`<svg><path/>`）
   - ノード層: NodeBlock（`position: absolute`）
3. **付箋層**: StickyNoteItem（`position: absolute`）
4. **コメント層**: CommentThread（`position: absolute`）
5. **UI層**: CanvasToolbar（`position: absolute`）

---

## 今後の拡張ポイント

1. **Node ツール**: 新規BOMノード作成機能（TODO）
2. **コメント解決状態**: 現在は削除と同等、表示分離の可能性
3. **永続化**: localStorage / API による保存
4. **コラボレーション**: リアルタイム同期機能
5. **パフォーマンス**: 大規模BOMツリーの仮想スクロール化

---

**最終更新日**: 2025-12-31
