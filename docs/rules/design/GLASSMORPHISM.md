# Glassmorphism Light Mode デザインガイド

このプロジェクトでは **Glassmorphism Light Mode** デザインを採用しています。
2025年のUIトレンドを取り入れた、透明感と奥行きのある洗練されたデザインシステムです。

---

## デザインコンセプト

### Glassmorphism とは

Glassmorphism（グラスモーフィズム）は、すりガラスのような透明感と奥行きを表現するUIデザイン手法です。

**特徴:**
- 半透明の背景（`bg-white/40` ～ `bg-white/80`）
- ぼかし効果（`backdrop-blur-xl`）
- 微細な境界線（`border-white/60`）
- 柔らかなシャドウ
- レイヤー構造による奥行き感

### デザイン原則

1. **透明感**: 背景が透けて見えることで、軽やかさと現代的な印象を与える
2. **一貫性**: 全コンポーネントで統一されたグラススタイル
3. **シンプルさ**: 装飾を抑え、コンテンツを際立たせる
4. **アクセシビリティ**: コントラスト比を維持し、読みやすさを確保

---

## カラーパレット

### メインカラー（Slate系）

テキストとUI要素には `slate` カラーパレットを統一使用します。

| 用途 | クラス | 使用例 |
|------|--------|--------|
| メインテキスト | `text-slate-900` | 見出し、強調テキスト |
| 本文テキスト | `text-slate-700` | 通常のテキスト |
| サブテキスト | `text-slate-600` | ボタンテキスト、セカンダリ |
| 補助テキスト | `text-slate-500` | 説明文、ラベル |
| プレースホルダー | `text-slate-400` | 入力プレースホルダー |

### アクセントカラー

| 用途 | クラス | 使用例 |
|------|--------|--------|
| プライマリボタン | `bg-slate-900` | メインアクション |
| 破壊的アクション | `bg-rose-500` | 削除ボタン |
| 選択状態 | `bg-white/70` | アクティブタブ |

### 背景カラー

| 透明度 | クラス | 使用例 |
|--------|--------|--------|
| 40% | `bg-white/40` | ボタン（outline）、入力、タブリスト |
| 50% | `bg-white/50` | ホバー状態（ghost） |
| 60% | `bg-white/60` | ホバー状態、フォーカス状態 |
| 70% | `bg-white/70` | アクティブ状態（タブ） |
| 80% | `bg-white/80` | ダイアログ、ドロップダウン |

---

## スタイリングパターン

### ガラス効果の基本構成

```css
/* 基本のガラス効果 */
border border-white/60
bg-white/40
backdrop-blur-xl
shadow-[0_4px_16px_rgba(0,0,0,0.06)]
```

### 角丸（Border Radius）

| サイズ | クラス | 使用例 |
|--------|--------|--------|
| 小 | `rounded-md` | チェックボックス |
| 中 | `rounded-lg` | タブトリガー、アイテム |
| 大 | `rounded-xl` | ボタン、入力、セレクト |
| 特大 | `rounded-2xl` | カード、ダイアログ |

### シャドウ

| 強度 | クラス | 使用例 |
|------|--------|--------|
| 軽め | `shadow-[0_4px_16px_rgba(0,0,0,0.06)]` | ボタン、入力 |
| 中 | `shadow-[0_8px_32px_rgba(0,0,0,0.08)]` | カード |
| 強め | `shadow-[0_8px_32px_rgba(0,0,0,0.12)]` | ダイアログ、ドロップダウン |

### ホバー時のシャドウ強化

```css
/* 通常 */
shadow-[0_4px_16px_rgba(0,0,0,0.06)]

/* ホバー */
hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
```

### トランジション

```css
transition-all duration-200
```

すべてのインタラクティブ要素に適用し、滑らかなアニメーションを実現します。

---

## コンポーネント別スタイリング

### Button

```tsx
// default（プライマリ）
'bg-slate-900 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-slate-800'

// outline（ガラス効果）
'border border-white/60 bg-white/40 backdrop-blur-xl text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-white/60'

// destructive（削除）
'bg-rose-500 text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:bg-rose-600'

// ghost（透明）
'text-slate-600 hover:bg-white/50 hover:text-slate-900'
```

### Input

```tsx
'border border-white/60 bg-white/40 backdrop-blur-xl'
'text-slate-900 placeholder:text-slate-400'
'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
'focus:bg-white/60 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:ring-2 focus:ring-slate-300'
```

### Card

```tsx
'border border-white/60 bg-white/40 backdrop-blur-xl'
'shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
'hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
'rounded-2xl'
```

### Dialog

```tsx
'border border-white/60 bg-white/80 backdrop-blur-xl'
'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
'rounded-2xl'
```

### Select

```tsx
// Trigger
'border border-white/60 bg-white/40 backdrop-blur-xl'
'text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
'hover:bg-white/60'

// Content
'border border-white/60 bg-white/80 backdrop-blur-xl'
'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
```

### Tabs

```tsx
// TabsList
'border border-white/60 bg-white/40 backdrop-blur-xl'

// TabsTrigger
'text-slate-500 hover:text-slate-700'
'data-[state=active]:bg-white/70 data-[state=active]:text-slate-900'
```

### Table

```tsx
// TableHead
'border-b border-slate-200/60 bg-white/60 backdrop-blur-sm'
'text-slate-700'

// TableRow
'border-b border-slate-100'
'hover:bg-slate-50/50'

// TableCell
'text-slate-600'
```

### Checkbox

```tsx
'border border-slate-300/60 bg-white/40 backdrop-blur-sm'
'data-[state=checked]:border-slate-900 data-[state=checked]:bg-slate-900'
```

---

## フォーカス状態

すべてのインタラクティブ要素には統一されたフォーカススタイルを適用します。

```tsx
'focus-visible:ring-2 focus-visible:ring-slate-300'
```

---

## 実装ガイドライン

### 1. コンポーネントレベルでスタイリング

スタイルはshadcn/uiコンポーネントの内部で定義し、呼び出し側でclassNameを渡す必要をなくします。

```tsx
// Good: コンポーネント内でスタイル定義
function Button({ variant = 'default', ...props }) {
  return (
    <button
      className={cn(
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        // ... 他のスタイル
      )}
      {...props}
    />
  );
}

// Bad: 呼び出し側でclassNameを追加
<Button className="bg-white/40 backdrop-blur-xl" />
```

### 2. バリアントは最小限に

バリアントは実際に異なる用途がある場合のみ使用します。

- `default`: メインアクション（slate-900背景）
- `outline`: セカンダリアクション（ガラス効果）
- `destructive`: 削除・破壊的アクション（rose-500背景）
- `ghost`: 控えめなアクション（透明）
- `link`: リンクスタイル

### 3. 一貫したカラー使用

- テキスト: `slate-*` 系統のみ使用
- 背景: `white/*` と `slate-*` 系統のみ使用
- ボーダー: `white/60` または `slate-*/60` を使用

### 4. レスポンシブ対応

ガラス効果は背景画像や色が見える環境で最も効果的です。
背景にグラデーションやパターンを配置することを推奨します。

---

## 参考: Tailwind CSS クラス早見表

### 透明度

| 値 | 透明度 |
|----|--------|
| `/40` | 40% |
| `/50` | 50% |
| `/60` | 60% |
| `/70` | 70% |
| `/80` | 80% |

### Backdrop Blur

| クラス | ぼかし量 |
|--------|----------|
| `backdrop-blur-sm` | 4px |
| `backdrop-blur` | 8px |
| `backdrop-blur-md` | 12px |
| `backdrop-blur-lg` | 16px |
| `backdrop-blur-xl` | 24px |
| `backdrop-blur-2xl` | 40px |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2025-01-01 | 初版作成 |

---

**作成者**: Claude Code
**最終更新**: 2025-01-01
