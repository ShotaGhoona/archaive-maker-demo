# Legacy Manufacturing デザインシステム

## デザイン哲学

**「製造現場で信頼される、堅牢で視認性の高い業務システム」**

このデザインシステムは、製造業の現場環境を想定し、以下の価値を追求する：

1. **信頼性 (Reliability)**: 堅実で安定感のあるデザインで、業務システムとしての信頼を体現
2. **視認性 (Visibility)**: 明るい工場照明下でも、暗い倉庫でも見やすい高コントラスト
3. **操作性 (Operability)**: 手袋着用でも操作しやすい大きなタップターゲット
4. **明確性 (Clarity)**: 情報の階層と境界が明確で迷わないUI

---

## デザイン原則

### 1. ソリッド・ファウンデーション
- 半透明やぼかし効果を使わず、**ソリッドな背景色**で安定感を演出
- 曖昧さのない、はっきりとした色使い

### 2. ストロング・ボーダー
- **太いボーダー (2px)** で要素の境界を明確に
- 情報のグルーピングを視覚的に強調

### 3. インダストリアル・カラー
- **ネイビーブルー**: 信頼性と専門性
- **スチールグレー**: 工業的で落ち着いた印象
- **ホワイト**: クリーンで清潔感

### 4. ラージ・タッチターゲット
- 最小タッチターゲット: **44px x 44px**
- ボタン・入力フィールドは通常より大きめ

### 5. シャープ・コーナー
- 角丸を控えめに（`rounded-sm` = 2px または `rounded-md` = 4px）
- 製造業のイメージに合う硬質な印象

---

## カラーパレット

### プライマリカラー
```css
--primary: 217 71% 25%;           /* #1e3a5f - ダークネイビー */
--primary-foreground: 0 0% 100%;  /* #ffffff */
```

### セカンダリカラー
```css
--secondary: 214 15% 45%;         /* #5f6d7e - スチールグレー */
--secondary-foreground: 0 0% 100%;
```

### 背景・カード
```css
--background: 210 20% 95%;        /* #eff2f5 - ライトグレー */
--card: 0 0% 100%;                /* #ffffff - ホワイト */
--card-foreground: 215 25% 15%;   /* #1f2937 - ダークグレー */
```

### ボーダー・入力
```css
--border: 214 20% 75%;            /* #b3bcc9 - ミディアムグレー */
--input: 214 20% 75%;
```

### アクセント
```css
--accent: 210 20% 92%;            /* #e5eaf0 - アクセントグレー */
--accent-foreground: 215 25% 15%;
```

### ステータスカラー
```css
--destructive: 0 72% 45%;         /* #c41e1e - 危険赤 */
--warning: 38 92% 50%;            /* #f59e0b - 警告橙 */
--success: 142 72% 29%;           /* #15803d - 成功緑 */
```

---

## コンポーネントスタイル

### Button

```tsx
const buttonVariants = cva(
  // ベース: シャープなコーナー、太めのフォント
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-semibold uppercase tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // プライマリ: ダークネイビー、ソリッド
        default:
          'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 shadow-sm',
        // アウトライン: 太いボーダー
        outline:
          'bg-white text-primary border-2 border-primary hover:bg-primary/5',
        // セカンダリ: スチールグレー
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/90',
        // ゴースト: 控えめだが明確
        ghost:
          'text-primary hover:bg-accent border-2 border-transparent hover:border-border',
        // 危険: 赤ベース
        destructive:
          'bg-destructive text-white border-2 border-destructive hover:bg-destructive/90',
      },
      size: {
        default: 'h-11 px-5',     // 標準より大きめ
        sm: 'h-9 px-4',
        lg: 'h-12 px-6',
        xl: 'h-14 px-8 text-base',
        icon: 'size-11',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
        'icon-xl': 'size-14',
      },
    },
  }
);
```

### Card

```tsx
// ソリッド背景、太いボーダー、控えめな角丸
<div className={cn(
  'flex flex-col gap-6 py-6 text-card-foreground',
  'bg-white rounded border-2 border-border',
  'shadow-[0_1px_3px_rgba(0,0,0,0.12)]',
  className
)} />
```

### Input

```tsx
// 大きめの高さ、太いボーダー、明確なフォーカス状態
<input className={cn(
  'h-11 w-full min-w-0 px-4 py-2 text-base',
  'bg-white rounded border-2 border-input',
  'text-foreground placeholder:text-muted-foreground',
  'outline-none transition-colors',
  'focus:border-primary focus:ring-2 focus:ring-primary/20',
  'disabled:bg-muted disabled:cursor-not-allowed',
  className
)} />
```

### Table

```tsx
// ヘッダー: ダークネイビー背景
// 行: 太いボーダー、ストライプ風のホバー
<thead className="bg-primary text-primary-foreground">
  <th className="h-12 px-4 text-left font-semibold uppercase tracking-wide text-sm" />
</thead>

<tbody>
  <tr className="border-b-2 border-border bg-white hover:bg-accent transition-colors">
    <td className="p-4 text-sm" />
  </tr>
</tbody>
```

---

## レイアウト

### ヘッダー（維持）
現在のヘッダーレイアウトを維持し、スタイルのみ調整：
- 高さ: `h-14`（48px → 56px）
- 背景: `bg-primary`（ダークネイビー）
- ボーダー: 下部に `border-b-2 border-primary-foreground/20`

### コンテンツエリア
- 余白: `p-6`（24px）
- カード間のギャップ: `gap-6`

---

## 実装変更点

### globals.css
- カラーパレットを工業的なネイビー/グレー系に変更

### button.tsx
- 角丸を `rounded` (4px) に変更
- ボーダーを `border-2` に変更
- サイズを全体的に大きく

### card.tsx
- 透明度をなくしソリッドな白背景
- ボーダーを `border-2` に変更
- シャドウを控えめに

### input.tsx
- 高さを `h-11` に変更
- ボーダーを `border-2` に変更
- フォーカス時にリング表示

### table.tsx
- ヘッダーをダークネイビー背景に
- 行ボーダーを太く
- フォントを大きめに

### AppHeader.tsx
- 高さを `h-14` に変更
- フォントウェイトを強調

### SearchBar.tsx
- 入力フィールドを大きく
- ボーダーを強調

---

## 比較: Glassmorphism vs Legacy Manufacturing

| 要素 | Glassmorphism | Legacy Manufacturing |
|------|---------------|----------------------|
| 背景 | 半透明 `bg-white/40` | ソリッド `bg-white` |
| 角丸 | 大きい `rounded-xl` | 小さい `rounded` |
| ボーダー | 薄い `border-white/60` | 太い `border-2` |
| シャドウ | 深い複合シャドウ | 控えめなシャドウ |
| エフェクト | `backdrop-blur-xl` | なし |
| カラー | Slate（柔らかい） | Navy/Steel（堅実） |
| 印象 | モダン・軽やか | 堅牢・信頼性 |
| ターゲット | 一般ユーザー | 製造現場 |

---

## 作成日
2026-01-03

## 作成者
Claude Code
