# 008: feat: sticky note feature

**日時**: 2025-12-30
**作者**: Claude Code

## 概要

BOMキャンバスに付箋（Sticky Note）機能を実装。FigJamライクなUXで、付箋の配置・編集・リサイズ・色変更・フォントサイズ変更が可能。

## 変更規模

- 21ファイル変更
- +1,085行 / -153行

## アーキテクチャ

### ディレクトリ構造

```
page-components/bom/canvas/
└── ui-block/
    └── sticky-note/
        ├── lib/                        # ロジック層（再利用可能なhooks）
        │   ├── use-sticky-notes.ts     # 付箋の状態管理（CRUD）
        │   ├── use-drag.ts             # ドラッグ（位置移動）
        │   ├── use-resize.ts           # リサイズ
        │   └── use-editable-text.ts    # ダブルクリック編集
        ├── model/
        │   └── types.ts                # StickyNote型定義
        └── ui/
            ├── StickyNoteLayer.tsx     # 付箋レイヤー（親コンポーネント）
            ├── StickyNoteItem.tsx      # 個別付箋（メインコンポーネント）
            └── components/
                ├── StickyNoteToolbar.tsx   # 編集バー（色・フォントサイズ）
                └── StickyNotePlaceholder.tsx # 配置プレビュー

widgets/bom/canvas/
├── viewport/                           # Viewport層（Context化）
│   ├── lib/
│   │   ├── canvas-viewport-context.ts  # Context定義
│   │   └── use-canvas-interaction.ts   # パン/ズーム操作
│   ├── model/
│   │   └── types.ts                    # ViewportState, CursorMode
│   └── ui/
│       ├── CanvasViewportProvider.tsx  # Provider
│       ├── CanvasViewport.tsx          # Viewport本体
│       └── components/
│           ├── CanvasControls.tsx      # 操作ヘルプ
│           └── DottedGridBackground.tsx
└── toolbar/
    └── ui/
        └── CanvasToolbar.tsx           # ツール選択バー

shared/canvas/
├── constant/
│   ├── size.ts                         # サイズ定数（MIN_WIDTH等）
│   └── color.ts                        # CANVAS_COLORS
└── lib/
    └── coordinate.ts                   # 座標変換ユーティリティ
```

### hooks設計（コメント機能でも再利用可能）

| hook | 責務 | 再利用先 |
|------|------|----------|
| `useDrag` | 要素のドラッグ移動 | コメント、ノード |
| `useResize` | 要素のリサイズ | コメント |
| `useEditableText` | ダブルクリック編集 | コメント |

### useDrag の使い方
```typescript
const { isDragging, handleDragMouseDown } = useDrag({
  initialX: element.x,
  initialY: element.y,
  disabled: isEditing,
  onDrag: (x, y) => onUpdate({ x, y }),
});
```

### useResize の使い方
```typescript
const { isResizing, handleResizeMouseDown } = useResize({
  initialWidth: element.width,
  initialHeight: element.height,
  minWidth: 100,   // オプション
  minHeight: 80,   // オプション
  onResize: (width, height) => onUpdate({ width, height }),
});
```

### useEditableText の使い方
```typescript
const {
  isEditing,
  textareaRef,
  handleDoubleClick,
  handleTextChange,
  handleBlur,
  handleKeyDown,
} = useEditableText({
  value: element.content,
  onChange: (content) => onUpdate({ content }),
});
```

## 型定義

### StickyNote
```typescript
interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: CanvasColor;      // 'yellow' | 'pink' | 'blue' | 'green' | 'purple'
  fontSize: StickyNoteFontSize;  // 'small' | 'medium' | 'large'
}
```

### 定数（shared/canvas/constant/size.ts）
```typescript
// デフォルトサイズ
export const STICKY_NOTE_WIDTH = 200;
export const STICKY_NOTE_HEIGHT = 150;

// 最小サイズ
export const STICKY_NOTE_MIN_WIDTH = 100;
export const STICKY_NOTE_MIN_HEIGHT = 80;

// フォントサイズ
export const STICKY_NOTE_FONT_SIZES = {
  small: { size: 12, label: '小' },
  medium: { size: 14, label: '中' },
  large: { size: 18, label: '大' },
};
```

## 操作フロー

```
ツールバーで「付箋」選択
  ↓
キャンバス上にプレビュー表示（マウス追従）
  ↓
クリックで付箋配置
  ↓
付箋クリック → 選択状態（primary色の枠 + ツールバー表示）
  ├── 色ボタン → 色変更
  ├── サイズボタン → フォントサイズ変更
  ├── ダブルクリック → テキスト編集モード
  ├── ドラッグ → 位置移動
  └── 右下ドラッグ → リサイズ
```

## Viewport Context化

### 変更理由
- `InfiniteCanvas`が多くの責務を持ちすぎていた
- ToolbarはBOM固有の機能のため分離が必要
- Contextにより複数コンポーネントからviewport状態にアクセス可能に

### 使用方法
```typescript
// Provider（page-components層で適用）
<CanvasViewportProvider>
  <CanvasViewport cursor={toolCursor} onCanvasClick={...}>
    {children}
  </CanvasViewport>
  <CanvasToolbar ... />
</CanvasViewportProvider>

// Context消費
const { viewport, actions } = useCanvasViewportContext();
```

## コメント機能実装時の指針

1. **ディレクトリ構造**: `ui-block/comment/` を作成し、sticky-noteと同じ構造で実装
2. **hooks再利用**: `useDrag`, `useResize`, `useEditableText` をそのまま使用
3. **型定義**: `Comment` 型を `model/types.ts` に定義
4. **ツールバー**: `CanvasToolbar` に既に `comment` ツールが定義済み
5. **選択状態**: `StickyNoteItem` と同様のパターンで実装

### Comment型の想定
```typescript
interface Comment {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  author?: string;
  createdAt: Date;
  // 付箋と違い、色は固定（または少ない選択肢）
}
```
