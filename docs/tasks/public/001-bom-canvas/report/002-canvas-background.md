# 002: feat: canvas background

**コミットID**: `2508520ac9e2877108137c4793e93479a0d128c6`
**日時**: 2025-12-29 16:09:01 +0900
**作者**: ShotaGhoona

## 概要

BOM Canvasの基盤となる無限キャンバスとドット背景を実装。

## 変更内容

### 追加ファイル

#### コンテナ
- `page-components/bom/canvas/ui/BomCanvasContainer.tsx` - Canvasページのメインコンテナ

#### Viewport機能
- `page-components/bom/canvas/viewport/lib/use-canvas-viewport.ts` - キャンバスのパン・ズーム制御フック
- `page-components/bom/canvas/viewport/ui/DottedGridBackground.tsx` - ドットグリッド背景コンポーネント
- `page-components/bom/canvas/viewport/ui/InfiniteCanvas.tsx` - 無限キャンバスコンポーネント

### 変更規模
- 4ファイル追加
- +236行

## 実装詳細

### use-canvas-viewport.ts
```typescript
// 主な機能
- パン操作（ドラッグでキャンバス移動）
- ズーム操作（ホイールで拡大縮小）
- ズームレベルの制限（min/max）
- キャンバス位置のstate管理
```

### DottedGridBackground.tsx
- SVGベースのドットパターン背景
- ズームレベルに応じたドット間隔の調整
- パン位置に追従する背景位置

### InfiniteCanvas.tsx
- 無限スクロール可能なキャンバス領域
- 子要素のレンダリング
- ビューポート座標の変換

## 技術ポイント
- CSS transformを使用したスムーズなパン・ズーム
- requestAnimationFrameによるパフォーマンス最適化
- タッチデバイス対応（ピンチズーム）
