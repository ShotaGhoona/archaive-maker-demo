# 005: feat: canvas entry point

**コミットID**: `6d856e11ce0d6e8ad5051cd0cbef2ac5b903114e`
**日時**: 2025-12-29 18:02:34 +0900
**作者**: ShotaGhoona

## 概要

BOMホームページからCanvasページへの導線を追加。

## 変更内容

### 変更ファイル
- `page-components/bom/home/ui/BomHomeContainer.tsx`

### 変更規模
- 1ファイル変更
- +12行 / -1行

## 実装詳細

### BomHomeContainer.tsx への追加
```typescript
// Canvas表示ボタンの追加
<Button onClick={() => router.push(`/bom/${selectedBomId}/canvas`)}>
  Canvas表示
</Button>
```

### ナビゲーションフロー
```
BOMホーム
  ↓ [BOM選択]
BOM詳細（基本情報）
  ↓ または
Canvas表示
  ↓
BOM Canvas（ツリー可視化）
```

## 設計意図
- 既存のBOMリストからシームレスにCanvasへ遷移
- 選択中のBOM IDをパラメータとして渡す
- ユーザーが直感的にCanvas機能にアクセス可能
