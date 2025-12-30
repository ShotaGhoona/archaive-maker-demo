# 001: feat: app layer refact

**コミットID**: `0dd5e38dfe2feef4edfa72a262d94ee4956c46f8`
**日時**: 2025-12-29 14:15:33 +0900
**作者**: ShotaGhoona

## 概要

BOM詳細ページのルーティング構造をリファクタリングし、Canvas用のエントリーポイントを追加。

## 変更内容

### ファイル移動
- `bom/[id]/basic-information/page.tsx` → `bom/[id]/(with-navigation)/basic-information/page.tsx`
- `bom/[id]/layout.tsx` → `bom/[id]/(with-navigation)/layout.tsx`

### 追加ファイル
- `frontend/src/app/(authenticated)/bom/[id]/canvas/page.tsx` - Canvas ページのエントリーポイント

### 変更規模
- 3ファイル変更
- +5行

## 実装詳細

### ルーティング構造変更
```
bom/[id]/
├── (with-navigation)/    # ナビゲーション付きレイアウト
│   ├── layout.tsx
│   └── basic-information/
│       └── page.tsx
└── canvas/               # ナビゲーションなしのCanvas専用
    └── page.tsx
```

### 設計意図
- Canvasページはフルスクリーン表示のため、ナビゲーションを含まない独自レイアウトが必要
- Route Groups `(with-navigation)` を使用してレイアウトを分離
- 既存のBOM詳細ページへの影響を最小限に抑えた構造変更
