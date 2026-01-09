# UIデザインガイド

BOMページ群から抽出した共通デザインルール。

---

## レイアウト

### 基本構造

```
Container: flex gap-4 p-4
├── Left Panel (固定幅)
├── Center Panel (flex-1)
└── Right Panel (固定幅、条件付き表示)
```

### パネル幅

| パネル | 幅 |
|--------|-----|
| リスト/サイドバー | `w-60` ~ `w-64` |
| 情報パネル | `w-[480px]` |
| メインコンテンツ | `flex-1` |

---

## パネル構造

全パネルは `Card` をベースとし、以下の構造を持つ。

```tsx
<Card className="flex flex-col gap-0 py-0">
  {/* ヘッダー: h-12, border-b */}
  <div className="flex h-12 items-center justify-between border-b px-4">
    <h3 className="font-medium">タイトル</h3>
    <Button variant="ghost" size="icon"><X className="size-4" /></Button>
  </div>

  {/* コンテンツ: ScrollArea */}
  <ScrollArea className="flex-1">
    <div className="space-y-6 p-4">...</div>
  </ScrollArea>

  {/* フッター: border-t（アクションがある場合） */}
  <div className="border-t p-4">
    <Button className="w-full">保存する</Button>
  </div>
</Card>
```

---

## フォーム

グリッドレイアウトを使用。

```tsx
// 2カラム
<div className="grid grid-cols-2 gap-4">
  <TextField ... />
  <SelectField ... />
</div>

// セクション分け
<section>
  <h4 className="mb-3 text-sm font-medium text-muted-foreground">セクション名</h4>
  <div className="grid grid-cols-2 gap-4">...</div>
</section>
```

**セクション間スペース**: `space-y-6`

---

## スタイル

### 選択状態

```tsx
className={cn(
  "cursor-pointer rounded-lg border transition-colors",
  isSelected ? "bg-primary/5 ring-1 ring-primary" : "hover:bg-muted/50"
)}
```

### 空状態

```tsx
<NoData title="データがありません" description="..." size="sm" />
```

### スクロール可能なFlexコンテナ

```tsx
<div className="flex min-h-0 flex-1 flex-col">
  <ScrollArea className="flex-1">...</ScrollArea>
</div>
```

`min-h-0` がないとスクロールしない。

---

## 共通コンポーネント

```tsx
// UI
import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/shadcn/ui/tooltip';

// フォーム
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { SelectField } from '@/shared/ui/form-fields/ui/SelectField';

// ユーティリティ
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
```

---

## 命名規則

| 種類 | 命名 | 例 |
|------|------|-----|
| ページ | `{Feature}Container` | `FacetTypesContainer` |
| パネル | `{Name}Panel` | `InfoPanel` |
| モーダル | `{Name}Modal` | `FacetTypeEditorModal` |
