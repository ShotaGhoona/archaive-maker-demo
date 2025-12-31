# FloatingModal

画面端に表示されるフローティングカード型モーダルコンポーネント。複数モーダルのstack/replace表示に対応。

## 基本的な使い方

```tsx
import {
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalFooter,
  FloatingModalTitle,
  FloatingModalDescription,
} from '@/shared/ui/shadcn/ui/floating-modal';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <FloatingModal open={open} onOpenChange={setOpen}>
      <FloatingModalTrigger asChild>
        <Button>Open</Button>
      </FloatingModalTrigger>
      <FloatingModalContent>
        <FloatingModalHeader>
          <FloatingModalTitle>タイトル</FloatingModalTitle>
          <FloatingModalDescription>説明文</FloatingModalDescription>
        </FloatingModalHeader>
        <FloatingModalBody>
          コンテンツ
        </FloatingModalBody>
        <FloatingModalFooter>
          <Button>アクション</Button>
        </FloatingModalFooter>
      </FloatingModalContent>
    </FloatingModal>
  );
}
```

## 複数モーダル（FloatingModalRoot）

複数のモーダルを連携させる場合は `FloatingModalRoot` で囲む：

```tsx
import {
  FloatingModalRoot,
  FloatingModal,
  // ...
} from '@/shared/ui/shadcn/ui/floating-modal';

function MultipleModals() {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <FloatingModalRoot side="right" align="center">
      {/* 1枚目 */}
      <FloatingModal open={modal1Open} onOpenChange={setModal1Open}>
        <FloatingModalContent>...</FloatingModalContent>
      </FloatingModal>

      {/* 2枚目（stack） */}
      <FloatingModal
        open={modal2Open}
        onOpenChange={setModal2Open}
        mode="stack"
      >
        <FloatingModalContent>...</FloatingModalContent>
      </FloatingModal>
    </FloatingModalRoot>
  );
}
```

## モード

### `stack`（デフォルト以外）

新しいモーダルが既存モーダルの隣に並ぶ。両方のモーダルが完全に表示される。

```
|--- Modal1 ---|--- Modal2 ---|  ← 両方見える
```

**使用例:** 請求書 + 支払いフォーム（両方参照したい）

```tsx
<FloatingModal mode="stack" open={open} onOpenChange={setOpen}>
```

### `replace`

新しいモーダルが既存モーダルを押し出す。押し出されたモーダルは80pxだけ見える。

```
|80px|--- Modal2 ---|  ← Modal1は80pxだけ
```

**使用例:** 請求書 → 請求書詳細（詳細を見ている間は元の画面は不要）

```tsx
<FloatingModal mode="replace" open={open} onOpenChange={setOpen}>
```

### `push`

既存モーダルを完全に隠す。

```tsx
<FloatingModal mode="push" open={open} onOpenChange={setOpen}>
```

## FloatingModalRoot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'left' \| 'right'` | `'right'` | モーダルが表示される画面の端 |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | 垂直方向の配置 |

```tsx
// 右端・中央（デフォルト）
<FloatingModalRoot>

// 左端・下寄せ
<FloatingModalRoot side="left" align="end">

// 右端・上寄せ
<FloatingModalRoot side="right" align="start">
```

## FloatingModal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | モーダルの開閉状態 |
| `onOpenChange` | `(open: boolean) => void` | - | 開閉時のコールバック |
| `mode` | `'replace' \| 'stack' \| 'push'` | `'replace'` | 複数モーダル時の表示モード |
| `width` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | モーダルの幅 |
| `onBack` | `() => void` | - | 戻るボタンのコールバック（指定時に戻るボタン表示） |

### Width Presets

| Preset | Width |
|--------|-------|
| `sm` | 320px |
| `md` | 400px |
| `lg` | 480px |
| `xl` | 560px |

```tsx
<FloatingModal width="lg">  // 480px
<FloatingModal width={500}> // 500px
```

## FloatingModalContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `'auto' \| 'full' \| number` | `'auto'` | モーダルの高さ |
| `showCloseButton` | `boolean` | `true` | 閉じるボタンの表示 |
| `showBackButton` | `boolean` | - | 戻るボタンの表示（`onBack`指定時は自動でtrue） |

```tsx
// コンテンツに合わせた高さ
<FloatingModalContent height="auto">

// 画面いっぱい
<FloatingModalContent height="full">

// 固定高さ
<FloatingModalContent height={600}>
```

## 複雑なパターン例

### Stack → Replace チェーン

```tsx
<FloatingModalRoot side="right" align="end">
  {/* 1枚目: ベース */}
  <FloatingModal open={billOpen} onOpenChange={setBillOpen}>
    <FloatingModalContent height="full">
      <FloatingModalBody>
        <Button onClick={() => setDetailsOpen(true)}>View Details</Button>
      </FloatingModalBody>
    </FloatingModalContent>
  </FloatingModal>

  {/* 2枚目: stack */}
  <FloatingModal open={detailsOpen} onOpenChange={setDetailsOpen} mode="stack">
    <FloatingModalContent height="full">
      <FloatingModalBody>
        <Button onClick={() => setItemOpen(true)}>View Item</Button>
      </FloatingModalBody>
    </FloatingModalContent>
  </FloatingModal>

  {/* 3枚目: replace（2枚目を押し出す） */}
  <FloatingModal open={itemOpen} onOpenChange={setItemOpen} mode="replace">
    <FloatingModalContent height="full">
      ...
    </FloatingModalContent>
  </FloatingModal>
</FloatingModalRoot>
```

**結果:**
```
|--- Modal1 ---|80px|--- Modal3 ---|
                 ↑ Modal2（押し出された）
```

## 定数のカスタマイズ

```tsx
import {
  EDGE_GAP,           // 24px - 画面端からの距離
  CARD_GAP,           // 16px - モーダル間の距離
  REPLACE_VISIBLE_WIDTH, // 80px - replace時に見える幅
  WIDTH_PRESETS,      // { sm: 320, md: 400, lg: 480, xl: 560 }
} from '@/shared/ui/shadcn/ui/floating-modal';
```

## Hooks

```tsx
import {
  useFloatingModal,
  useFloatingModalProvider,
} from '@/shared/ui/shadcn/ui/floating-modal';

// モーダル内で使用
function ModalContent() {
  const { id, mode, position, width, onBack } = useFloatingModal();
  // ...
}

// Provider情報へのアクセス
function SomeComponent() {
  const provider = useFloatingModalProvider();
  const modals = provider?.modals; // 現在開いているモーダル一覧
  // ...
}
```

## アニメーション

- **登場:** 右からスライドイン + フェードイン
- **退出:** 右へスライドアウト + フェードアウト
- **位置変更:** 300ms ease-out トランジション

## 注意事項

1. **mode の影響範囲:** `mode` は「このモーダルが前のモーダルにどう影響するか」を定義する
2. **順序の重要性:** モーダルの JSX 記述順 = 開く順序として位置計算される
3. **複数 FloatingModalRoot:** 異なる `side`/`align` が必要な場合は別々の `FloatingModalRoot` を使用
