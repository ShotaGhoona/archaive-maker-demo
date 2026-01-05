# デザインA/Bテスト ガイド

このドキュメントは、異なるデザインシステムを作成してA/Bテストを行うための手順とノウハウをまとめたものです。

---

## 目的

既存のデザインとは**全く異なるデザインシステム**を作成し、ユーザビリティや好みを比較検証する。

- 表面的な色変更ではなく、**根本からUIコンセプトを変える**
- UXパターンの変更も積極的に試す
- ブランチごとに独立したデザインシステムを構築

---

## ブランチ戦略

```
main
├── stg-glass-morphism     # 例: Glassmorphism Light Mode（実装済み）
├── stg-legacy-manufacture # 例: 伝統的な製造業向けUI
├── stg-dark-mode-minimal  # 例: ダークモード＋ミニマル
└── stg-xxx                # その他のデザイン案
```

各ブランチはmainから切り、独立してデザインを構築する。

---

## 変更すべきレイヤー

### 1. Tailwind / CSS変数（根本変更）

**ファイル:** `app/globals.css`

```css
/* 例: 背景色の変更 */
:root {
  --background: 220 14% 96%;  /* Glassmorphism: 明るいグレー */
}
```

### 2. shadcn/ui コンポーネント（コア変更）

| ファイル | 役割 |
|----------|------|
| `shared/ui/shadcn/ui/button.tsx` | ボタン全般 |
| `shared/ui/shadcn/ui/card.tsx` | カード全般 |
| `shared/ui/shadcn/ui/input.tsx` | 入力フィールド |
| `shared/ui/shadcn/ui/select.tsx` | セレクト |
| `shared/ui/shadcn/ui/table.tsx` | テーブル |
| `shared/ui/shadcn/ui/dialog.tsx` | モーダル |
| `shared/ui/shadcn/ui/tabs.tsx` | タブ |
| `shared/ui/shadcn/ui/checkbox.tsx` | チェックボックス |
| `shared/ui/shadcn/ui/sheet.tsx` | サイドパネル |

### 3. アプリレイアウト（構造変更）

| ファイル | 役割 |
|----------|------|
| `app/(authenticated)/layout.tsx` | 認証済みレイアウト |
| `app/globals.css` | グローバルスタイル |

### 4. 共通Widgets（UXパターン変更）

| コンポーネント | 役割 |
|----------------|------|
| `widgets/common/layout/sidebar/` | アプリサイドバー |
| `widgets/common/filter/filter-chips/` | フィルターUI（チップス型） |
| `widgets/common/filter/search-bar/` | 検索バー |
| `widgets/view/table-view/` | テーブルビュー |
| `widgets/view/gallery-view/` | ギャラリービュー |

### 5. page-components（個別ページ）

各ページのContainerコンポーネントを新デザインに適合させる。

---

## 実装例: Glassmorphism Light Mode

以下は`feat/ui-modern`ブランチで実装したGlassmorphism Light Modeの詳細な変更内容。

### コミット履歴

| コミット | 内容 | 変更ファイル数 |
|----------|------|----------------|
| `6d1d8c7` | デザインプロトタイプ作成 | 9 |
| `ab6b469` | shadcn/ui変更、レイアウト変更 | 42 |
| `7842f84` | FilterChipsBar実装 | 12 |
| `ba8e46a` | ホームページ redesign | 11 |
| `ca8459c` | 詳細ページ redesign | 16 |
| `e27b0b9` | キャンバスページ redesign | 7 |

---

## UI変更詳細

### Button の変更

**Before (main):**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ...",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border bg-background shadow-xs hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
    },
  }
);
```

**After (Glassmorphism):**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ... focus-visible:ring-2 focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-slate-800',
        outline:
          'border border-white/60 bg-white/40 backdrop-blur-xl text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-white/60',
        ghost:
          'text-slate-600 hover:bg-white/50 hover:text-slate-900',
      },
    },
  }
);
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| 角丸 | `rounded-md` | `rounded-xl` |
| カラー | `primary/secondary` | `slate-*` |
| 背景 | ソリッド | 半透明 `bg-white/40` |
| エフェクト | なし | `backdrop-blur-xl` |
| シャドウ | `shadow-xs` | カスタム `shadow-[...]` |
| フォーカス | `ring-ring/50` | `ring-slate-300` |
| トランジション | なし | `transition-all duration-200` |

---

### Card の変更

**Before (main):**
```tsx
<div className={cn(
  'flex flex-col gap-6 rounded-lg border bg-card py-6 text-card-foreground shadow-sm',
  className
)} />
```

**After (Glassmorphism):**
```tsx
<div className={cn(
  'flex flex-col gap-6 rounded-2xl py-6 text-card-foreground',
  'border border-white/60 bg-white/40 backdrop-blur-xl',
  'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
  'transition-all duration-300',
  'hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
  className
)} />
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| 角丸 | `rounded-lg` | `rounded-2xl` |
| 背景 | `bg-card`（ソリッド） | `bg-white/40`（半透明） |
| ボーダー | `border` | `border-white/60` |
| エフェクト | なし | `backdrop-blur-xl` |
| シャドウ | `shadow-sm` | カスタム深めシャドウ |
| ホバー | なし | 背景・シャドウ強化 |

---

### Input の変更

**Before (main):**
```tsx
<input className={cn(
  'shadow-xs h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base outline-none',
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  className
)} />
```

**After (Glassmorphism):**
```tsx
<input className={cn(
  'h-10 w-full min-w-0 rounded-xl px-4 py-2 text-sm outline-none transition-all duration-200',
  'border border-white/60 bg-white/40 backdrop-blur-xl',
  'text-slate-900 placeholder:text-slate-400',
  'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
  'focus:bg-white/60 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:ring-2 focus:ring-slate-300',
  className
)} />
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| 高さ | `h-9` | `h-10` |
| 角丸 | `rounded-md` | `rounded-xl` |
| パディング | `px-3 py-1` | `px-4 py-2` |
| 背景 | `bg-transparent` | `bg-white/40 backdrop-blur-xl` |
| テキスト色 | CSS変数 | `text-slate-900` |
| プレースホルダー | `text-muted-foreground` | `text-slate-400` |
| フォーカス | ring-3px | ring-2 + 背景変化 |

---

### Table の変更

**Before (main):**
```tsx
// TableHead
'h-10 whitespace-nowrap border-r border-border px-2 text-left align-middle font-semibold text-foreground'

// TableRow
'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'

// TableCell
'whitespace-nowrap border-r border-border p-2 align-middle'
```

**After (Glassmorphism):**
```tsx
// TableHead
'h-12 whitespace-nowrap px-3 text-left align-middle font-medium text-slate-700',
'border-b border-slate-200/60 bg-white/60 backdrop-blur-sm'

// TableRow
'border-b border-slate-100 transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-100/50'

// TableCell
'whitespace-nowrap p-3 align-middle text-slate-600'
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| ヘッダー高さ | `h-10` | `h-12` |
| ヘッダー背景 | なし | `bg-white/60 backdrop-blur-sm` |
| セル右ボーダー | `border-r border-border` | なし |
| 行ボーダー | `border-b` | `border-b border-slate-100` |
| ホバー | `hover:bg-muted/50` | `hover:bg-slate-50/50` |
| テキスト色 | `text-foreground` | `text-slate-700/600` |

---

## UX変更詳細

### レイアウト: ヘッダー → サイドバー

**Before (main):**
```tsx
// app/(authenticated)/layout.tsx
<div className='flex h-screen flex-col bg-background'>
  <AppHeader />
  <main className='flex min-h-0 flex-1 flex-col'>{children}</main>
</div>
```

**After (Glassmorphism):**
```tsx
// app/(authenticated)/layout.tsx
<div className="relative h-screen overflow-hidden bg-background p-4">
  {/* 背景グラデーション（オプション） */}
  {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" /> */}

  <div className="relative flex h-full gap-4">
    {/* サイドバーカード */}
    <AppSidebar />

    {/* メインコンテンツ */}
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">
      {children}
    </main>
  </div>
</div>
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| ナビ位置 | 上部ヘッダー | 左サイドバー |
| 全体余白 | なし | `p-4` |
| レイアウト | 縦並び `flex-col` | 横並び `flex` |
| 背景 | ソリッド | グラデーション可能 |

---

### フィルター: サイドバー → チップス

**Before (main):**
```tsx
// CustomerHomeContainer.tsx
<div className='flex min-h-0 flex-1'>
  {/* サイドバーフィルター（左側常時表示） */}
  <CustomerFilterSidebar
    open={filterOpen}
    simpleValues={simpleFilterValues}
    advancedValues={advancedFilterValues}
    ...
  />

  <div className='flex min-h-0 min-w-0 flex-1 flex-col px-6 pt-4'>
    <div className='mb-4 flex items-center gap-4'>
      <CustomerFilterButton open={filterOpen} onToggle={toggleFilter} />
      <CustomerSearchBar value={searchQuery} onChange={setSearchQuery} />
      ...
    </div>
    <CustomerTablePanel />
  </div>
</div>
```

**After (Glassmorphism):**
```tsx
// CustomerHomeContainer.tsx
<div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pt-4">
  {/* ツールバー（タイトル + 検索 + アクション） */}
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      <Users className="h-5 w-5 text-slate-700" />
      <h1 className="text-lg font-semibold text-slate-900">顧客管理</h1>
    </div>
    <SearchBar value={searchQuery} onChange={setSearchQuery} ... />
    <div className="ml-auto flex items-center gap-3">
      <CustomerColumnSettings />
      <CustomerCsvExport />
      <CreateCustomerSheet />
    </div>
  </div>

  {/* フィルターチップス */}
  <FilterChipsBar
    fields={customerFilterFields}
    values={simpleFilterValues}
    onValuesChange={setSimpleFilterValues}
  />

  {/* テーブル */}
  <CustomerTablePanel />
</div>
```

**変更ポイント:**
| 要素 | Before | After |
|------|--------|-------|
| フィルター位置 | 左サイドバー | コンテンツ上部チップス |
| フィルタートグル | ボタンで開閉 | 常時表示 + ポップオーバー追加 |
| 画面幅 | フィルター分狭い | フル幅使用可能 |
| ページタイトル | なし | アイコン + タイトル表示 |
| レイアウト | 2カラム | 1カラム縦積み |

---

### 検索バー: 拡張スタイル

**Before (main):**
```tsx
<input
  className='h-12 w-full rounded-lg border bg-card pl-9 pr-9 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
/>
{/* 閉じる時はButtonコンポーネント使用 */}
<Button variant='outline' size='icon-xl' className='bg-card'>
  <Search className='size-5' />
</Button>
```

**After (Glassmorphism):**
```tsx
<input
  className={cn(
    'h-12 w-full rounded-xl pl-10 pr-10 text-sm',
    'border border-white/60 bg-white/40 backdrop-blur-xl',
    'text-slate-900 placeholder:text-slate-400',
    'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
    'outline-none transition-all duration-200',
    'focus:bg-white/60 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
  )}
/>
{/* 閉じる時もカスタムボタン */}
<button
  className={cn(
    'flex h-12 w-12 items-center justify-center rounded-xl',
    'border border-white/60 bg-white/40 backdrop-blur-xl',
    'text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
    'transition-all duration-200',
    'hover:bg-white/60 hover:text-slate-900 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
  )}
>
  <Search className="size-5" />
</button>
```

---

## FilterChipsBar の実装

新規作成したフィルターチップスコンポーネント。

**ファイル構成:**
```
widgets/common/filter/filter-chips/
├── index.ts                    # エクスポート
├── model/types.ts              # 型定義
├── ui/
│   ├── FilterChipsBar.tsx      # メインコンポーネント
│   ├── FilterChip.tsx          # 個別チップ
│   ├── AddFilterPopover.tsx    # フィルター追加ポップオーバー
│   └── FilterInputPopover.tsx  # 値入力ポップオーバー
```

**型定義:**
```tsx
// model/types.ts
export type FilterFieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'multiselect'
  | 'user'
  | 'boolean';

export interface FilterFieldConfig {
  key: string;
  label: string;
  type: FilterFieldType;
  options?: { value: string; label: string }[];
  userOptions?: { id: string; name: string; avatarUrl?: string }[];
}

export type FilterValues = Record<string, unknown>;
```

**使用例:**
```tsx
import { FilterChipsBar } from '@/widgets/common/filter/filter-chips';

const filterFields: FilterFieldConfig[] = [
  { key: 'status', label: 'ステータス', type: 'multiselect', options: [...] },
  { key: 'assignee', label: '担当者', type: 'user', userOptions: [...] },
  { key: 'createdAt', label: '作成日', type: 'date' },
];

<FilterChipsBar
  fields={filterFields}
  values={filterValues}
  onValuesChange={setFilterValues}
/>
```

---

## AppSidebar の実装

新規作成したサイドバーコンポーネント。

**ファイル:** `widgets/common/layout/sidebar/ui/AppSidebar.tsx`

**特徴:**
- マウスホバーで展開/折りたたみ
- アイコン + ラベル表示
- アクティブ状態のハイライト
- ユーザー情報とログアウト

```tsx
export function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        'flex h-full flex-col py-4 transition-all duration-300',
        isExpanded ? 'w-56' : 'w-16'
      )}
    >
      {/* ロゴ */}
      {/* ナビゲーション */}
      {/* 設定・ヘルプ */}
      {/* ユーザー情報 */}
    </Card>
  );
}
```

---

## 手順まとめ

### Step 1: ブランチ作成とデザインドキュメント作成

```bash
git checkout main
git checkout -b stg-xxx-design
```

`docs/rules/design/XXX.md` にデザインコンセプトとルールを明文化。

**記載すべき内容:**
- デザインコンセプト・原則
- カラーパレット（テキスト、背景、アクセント）
- スタイリングパターン（シャドウ、角丸、ボーダー）
- コンポーネント別スタイル
- フォーカス・ホバー状態の定義

### Step 2: shadcn/uiコンポーネント変更

`shared/ui/shadcn/ui/` 配下を一括変更。

**優先順位:**
1. `button.tsx` - 最も使用頻度が高い
2. `card.tsx` - レイアウトの基礎
3. `input.tsx` / `select.tsx` - フォーム要素
4. `table.tsx` - 一覧表示
5. その他

### Step 3: レイアウト変更

`app/(authenticated)/layout.tsx` でアプリ全体の構造を変更。

### Step 4: UXパターン変更（必要に応じて）

- フィルターUI（サイドバー → チップス）
- ナビゲーション（ヘッダー → サイドバー）
- 詳細ページ構成

### Step 5: 各ページコンテナ修正

page-components配下の各Containerを新デザインに適合。

### Step 6: 詳細ページ・特殊ページ

一覧ページ完了後、詳細ページを調整。

---

## 実装Tips

### 1. cn()ユーティリティを活用

```tsx
import { cn } from '@/shared/ui/shadcn/lib/utils';

className={cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'outline' && 'outline-styles',
)}
```

### 2. コンポーネント内でスタイル完結

呼び出し側でclassNameを渡さなくて済むよう、コンポーネント内でバリアントを定義。

### 3. デザインドキュメントを先に作る

コードを書く前に、デザインルールを明文化する。

### 4. 段階的に変更

1. コアコンポーネント
2. 一覧ページ
3. 詳細ページ
4. 特殊ページ

### 5. ビルドチェックを頻繁に

```bash
npm run build
```

---

## デザインシステムのアイデア例

### Glassmorphism Light Mode（実装済み）
- 半透明背景 `bg-white/40`
- ぼかし効果 `backdrop-blur-xl`
- 柔らかなシャドウ
- Slateカラーパレット

### Legacy Manufacturing（未実装）
- ソリッドな背景
- 高コントラスト
- 太いボーダー
- 製造業の現場で見やすい大きなUI
- 角ばったデザイン

### Dark Mode Minimal（未実装）
- ダーク背景
- ミニマルなデザイン
- アクセントカラーを抑制
- 目に優しい

### Colorful Modern（未実装）
- カラフルなアクセント
- グラデーション
- アニメーション多用
- 若々しい印象

### Classic Enterprise（未実装）
- クラシックなグレー基調
- 角ばったデザイン
- 情報密度が高い
- 業務システム向け

---

## ファイル変更チェックリスト

### 必須変更
- [ ] `docs/rules/design/XXX.md` - デザインドキュメント
- [ ] `shared/ui/shadcn/ui/button.tsx`
- [ ] `shared/ui/shadcn/ui/card.tsx`
- [ ] `shared/ui/shadcn/ui/input.tsx`
- [ ] `shared/ui/shadcn/ui/select.tsx`
- [ ] `shared/ui/shadcn/ui/table.tsx`
- [ ] `shared/ui/shadcn/ui/dialog.tsx`
- [ ] `shared/ui/shadcn/ui/tabs.tsx`
- [ ] `shared/ui/shadcn/ui/checkbox.tsx`
- [ ] `app/(authenticated)/layout.tsx`
- [ ] `app/globals.css`

### UXパターン変更時
- [ ] フィルターUI（filter-chips or filter-sidebar）
- [ ] ナビゲーション（AppSidebar or AppHeader）
- [ ] 検索バー
- [ ] ページネーション

### 各ページ
- [ ] BomHomeContainer
- [ ] CustomerHomeContainer
- [ ] DocumentHomeContainer
- [ ] DrawingHomeContainer
- [ ] ProjectHomeContainer
- [ ] 詳細ページ各種

---

## コミットメッセージ例

```
feat: test design          # デザインプロトタイプ作成
redesign: home page        # ホームページ redesign
redesign: detail-pages     # 詳細ページ redesign
redesign: canvas page      # キャンバスページ redesign
filter-chips               # フィルターUIをチップスに変更
refact: dummy-data to shared # リファクタ（デザイン無関係）
format                     # フォーマット修正
```

---

**作成日**: 2026-01-03
**作成者**: Claude Code
