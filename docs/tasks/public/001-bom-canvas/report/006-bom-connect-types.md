# 006: refact: bom connect types

**コミットID**: `9120157d64855e199510aa078b0aaa39f1f49ea5`
**日時**: 2025-12-29 18:07:28 +0900
**作者**: ShotaGhoona

## 概要

BOM Canvas関連の型定義を整理し、共通の型ファイルに集約。

## 変更内容

### 追加ファイル
- `page-components/bom/canvas/model/canvas-types.ts` - Canvas専用の型定義
- `frontend/src/shared/dummy-data/bom/types.ts` - BOM共通の型定義

### 変更ファイル
- `page-components/bom/canvas/lib/tree-layout.ts` - 型インポートパスの変更
- `page-components/bom/canvas/ui-block/node/ui/NodeBlock.tsx` - 型インポートパスの変更
- `page-components/bom/canvas/ui/BomCanvasContainer.tsx` - 型インポートパスの変更
- `widgets/bom/canvas/document-preview/ui/DocumentPreviewDialog.tsx` - 型インポートパスの変更
- `widgets/bom/canvas/drawing-preview/ui/DrawingPreviewDialog.tsx` - 型インポートパスの変更

### 削除
- `node-data.ts` 内の型定義（`types.ts` に移動）

### 変更規模
- 7ファイル変更
- +25行 / -23行

## 実装詳細

### canvas-types.ts
```typescript
// Canvas固有の型
export interface CanvasNode {
  id: string;
  position: { x: number; y: number };
  data: BomNode;
}

export interface CanvasViewport {
  x: number;
  y: number;
  zoom: number;
}
```

### shared/dummy-data/bom/types.ts
```typescript
// BOM共通の型
export interface BomNode {
  id: string;
  partNumber: string;
  name: string;
  quantity: number;
  thumbnail?: string;
  documents?: Document[];
  drawings?: Drawing[];
  children?: BomNode[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface Drawing {
  id: string;
  number: string;
  name: string;
  thumbnailUrl: string;
}
```

## 設計意図
- 型定義の一元管理
- Canvas機能とBOMデータ構造の責務分離
- インポートパスの簡素化
- 再利用性の向上
