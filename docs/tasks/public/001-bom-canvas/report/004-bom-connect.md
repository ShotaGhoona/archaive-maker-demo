# 004: feat: bom connect

**コミットID**: `d7bfccc95e39f474b3beee8d276ba0fb75411c96`
**日時**: 2025-12-29 18:02:25 +0900
**作者**: ShotaGhoona

## 概要

BOMノード間の接続線（コネクター）とツリーレイアウト計算ロジックを実装。

## 変更内容

### 追加ファイル
- `page-components/bom/canvas/lib/tree-layout.ts` - ツリーレイアウト計算ロジック
- `page-components/bom/canvas/ui-block/connector/ui/NodeConnector.tsx` - ノード間接続線コンポーネント

### 変更ファイル
- `page-components/bom/canvas/ui-block/node/dummy-data/node-data.ts` - データ構造の更新
- `page-components/bom/canvas/ui-block/node/ui/NodeBlock.tsx` - 接続ポイントの追加
- `page-components/bom/canvas/ui/BomCanvasContainer.tsx` - コネクター統合
- `widgets/bom/canvas/metadata-sheet/ui/MetadataSheet.tsx` - リファクタリング

### 変更規模
- 6ファイル変更
- +298行 / -228行

## 実装詳細

### tree-layout.ts
```typescript
// ツリーレイアウトの計算
- 各ノードの位置（x, y）を計算
- 階層構造に基づいた配置
- サブツリーの幅計算
- ノード間の適切な間隔確保
```

### NodeConnector.tsx
```typescript
// 接続線の描画
- SVGベースのパス描画
- 親ノードから子ノードへのベジェ曲線
- 階層に応じた線のスタイル
```

### レイアウトアルゴリズム
```
        [Root]
       /      \
    [A]        [B]
   / | \        |
 [C][D][E]    [F]
```
- トップダウン型の階層レイアウト
- 兄弟ノードの水平配置
- 親子間の垂直接続

## 技術ポイント
- 再帰的なツリー走査
- ノード幅に基づく動的な水平間隔
- SVG pathのベジェ曲線による滑らかな接続線
