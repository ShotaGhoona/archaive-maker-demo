# 003: feat: node card

**コミットID**: `0c452d52be30bb805139b0e10ab833e8f823ab96`
**日時**: 2025-12-29 17:51:35 +0900
**作者**: ShotaGhoona

## 概要

Canvas上に表示するノードカードと、メタデータ表示用のダイアログ・シートを実装。

## 変更内容

### 追加ファイル

#### ノードブロック
- `page-components/bom/canvas/ui-block/node/dummy-data/node-data.ts` - ノードのダミーデータ
- `page-components/bom/canvas/ui-block/node/ui/NodeBlock.tsx` - ノードカードコンポーネント

#### プレビューダイアログ
- `widgets/bom/canvas/document-preview/ui/DocumentPreviewDialog.tsx` - ドキュメントプレビュー
- `widgets/bom/canvas/drawing-preview/ui/DrawingPreviewDialog.tsx` - 図面プレビュー

#### メタデータシート
- `widgets/bom/canvas/metadata-sheet/ui/MetadataSheet.tsx` - メタデータ表示シート

### 変更ファイル
- `frontend/next.config.js` - 画像ドメイン設定追加
- `page-components/bom/canvas/ui/BomCanvasContainer.tsx` - ノード表示統合
- `page-components/bom/canvas/viewport/ui/DottedGridBackground.tsx`

### 変更規模
- 8ファイル変更
- +536行 / -3行

## 実装詳細

### NodeBlock.tsx
- BOM構成部品を表すカードUI
- 部品番号、名称、サムネイル表示
- クリックでメタデータシートを開く
- 子ノードへの接続ポイント

### ダミーデータ構造
```typescript
interface NodeData {
  id: string;
  partNumber: string;
  name: string;
  quantity: number;
  thumbnail?: string;
  documents?: Document[];
  drawings?: Drawing[];
  children?: NodeData[];
}
```

### DocumentPreviewDialog / DrawingPreviewDialog
- 関連ドキュメント・図面のプレビュー表示
- 画像のズーム機能
- ファイル情報の表示

### MetadataSheet
- ノード選択時に右側からスライドイン
- 部品の詳細情報表示
- 関連ドキュメント・図面へのリンク
