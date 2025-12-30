# コメント機能 実装戦略書

## 概要

BOMキャンバスにFigmaライクなコメント機能を実装する。キャンバス上の特定位置にコメントスレッドを配置し、チームでのコラボレーションを可能にする。

## 3つの表示状態

### 1. 最小表示（通常）
```
  ┌───┐
  │ 👤 │  ← アバターアイコンのみ（丸型）
  └───┘
```

### 2. ホバー時
```
  ┌───┬─────────────────────────┐
  │ 👤 │ shota.starup  2分前    │
  │   │ あああああ              │
  │   │ 1件の返信               │
  └───┴─────────────────────────┘
```
- アバター + ユーザー名 + 経過時間
- コメント内容のプレビュー
- 返信件数

### 3. クリック時（展開）
```
┌─────────────────────────────────┐
│  コメント            ••• ✓ ×  │  ← ヘッダー
├─────────────────────────────────┤
│ 👤 shota.starup  2分前    ••• │  ← コメント1
│    あああああ                   │
│                                 │
│ 👤 shota.starup  1分前    ••• │  ← 返信1
│    いいいいい                   │
├─────────────────────────────────┤
│ 👤 │ 返信...             (↑) │  ← 返信入力欄
└─────────────────────────────────┘
```
- ヘッダー：タイトル + メニュー + 解決ボタン + 閉じるボタン
- スレッド：複数コメント（アバター、ユーザー名、時間、内容、メニュー）
- 返信入力欄

## 実装スコープ

### v1（今回実装）
- [x] 3つの表示状態（最小/ホバー/展開）
- [x] コメントスレッド（親コメント + 返信）
- [x] コメントの追加・編集
- [x] 返信機能
- [x] コメントの移動（ドラッグ）
- [x] 解決ボタン → スレッド非表示（削除）
- [x] ユーザー情報はプレースホルダー表示

### v2（将来）
- [ ] 実際のユーザー情報連携（認証）
- [ ] メンション機能
- [ ] 通知機能

## アーキテクチャ

### ディレクトリ構造
```
page-components/bom/canvas/
└── ui-block/
    └── comment/
        ├── lib/
        │   └── use-comments.ts           # コメントスレッドの状態管理
        ├── model/
        │   └── types.ts                  # CommentThread, Comment型
        └── ui/
            ├── CommentLayer.tsx          # コメントレイヤー（親）
            ├── CommentThread.tsx         # スレッド（メイン）
            └── components/
                ├── CommentMinimal.tsx    # 最小表示（アバターのみ）
                ├── CommentPreview.tsx    # ホバー時プレビュー
                ├── CommentExpanded.tsx   # 展開時フル表示
                ├── CommentItem.tsx       # 個別コメント
                └── CommentInput.tsx      # 返信入力欄
```

### 再利用するhooks
| hook | 用途 |
|------|------|
| `useDrag` | スレッドの移動 |
| `useEditableText` | コメント編集 |

### hooksの共通化
`useDrag` と `useEditableText` を `shared/canvas/lib` に移動：
```
shared/canvas/lib/
├── coordinate.ts      # 既存
├── use-drag.ts        # sticky-noteから移動
└── use-editable-text.ts # sticky-noteから移動
```

## 型定義

### CommentThread（スレッド）
```typescript
interface CommentThread {
  id: string;
  x: number;
  y: number;
  resolved: boolean;
  comments: Comment[];
  createdAt: string;
}
```

### Comment（個別コメント）
```typescript
interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt?: string;
}

interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}
```

### 定数
```typescript
// shared/canvas/constant/size.ts に追加
export const COMMENT_AVATAR_SIZE = 32;
export const COMMENT_PREVIEW_WIDTH = 240;
export const COMMENT_EXPANDED_WIDTH = 320;
```

## 状態管理

### useComments hook
```typescript
interface UseCommentsReturn {
  threads: CommentThread[];
  addThread: (x: number, y: number, content: string) => void;
  addReply: (threadId: string, content: string) => void;
  updateComment: (threadId: string, commentId: string, content: string) => void;
  deleteComment: (threadId: string, commentId: string) => void;
  deleteThread: (threadId: string) => void;
  moveThread: (threadId: string, x: number, y: number) => void;
  resolveThread: (threadId: string) => void;
}
```

## 操作フロー

```
ツールバーで「コメント」選択
  ↓
クリックでスレッド配置 + 自動展開 + 入力フォーカス
  ↓
コメント入力 → Enter or ボタンで保存
  ↓
通常時: アバターのみ表示
  ↓
ホバー: プレビュー表示
  ↓
クリック: 展開表示（返信可能）
  ↓
アバタードラッグ: 位置移動
```

## 実装ステップ

### Step 1: hooks共通化
- [ ] `useDrag` を `shared/canvas/lib` に移動
- [ ] `useEditableText` を `shared/canvas/lib` に移動
- [ ] sticky-note の import パスを更新
- [ ] `use-resize.ts` は sticky-note 専用のため移動しない

### Step 2: 型・定数追加
- [ ] `CommentThread`, `Comment`, `CommentAuthor` 型を定義
- [ ] `COMMENT_AVATAR_SIZE`, `COMMENT_PREVIEW_WIDTH`, `COMMENT_EXPANDED_WIDTH` を追加

### Step 3: 状態管理hook
- [ ] `useComments` を作成

### Step 4: UIコンポーネント（ボトムアップ）
- [ ] `CommentInput` - 入力欄
- [ ] `CommentItem` - 個別コメント表示
- [ ] `CommentMinimal` - 最小表示
- [ ] `CommentPreview` - ホバープレビュー
- [ ] `CommentExpanded` - 展開表示
- [ ] `CommentThread` - 3状態の切り替え
- [ ] `CommentLayer` - レイヤー

### Step 5: BomCanvasContainerに統合
- [ ] ツールバーの comment ツールに対応
- [ ] CommentLayer を追加

## 付箋との違いまとめ

| 項目 | 付箋 | コメント |
|------|------|----------|
| 表示状態 | 1つ（常に展開） | 3つ（最小/ホバー/展開） |
| 配置プレビュー | あり | なし |
| サイズ | 可変（リサイズ可） | 固定 |
| 色 | 5色選択可 | 固定 |
| スレッド | なし | あり（返信機能） |
| 作者情報 | なし | あり |
| 解決状態 | なし | あり |

## ダミーユーザー（v1）

認証連携前のダミーデータ：
```typescript
const DUMMY_USER: CommentAuthor = {
  id: 'user-1',
  name: 'デモユーザー',
  avatarUrl: undefined, // デフォルトアバター使用
};
```

## 質問事項

1. **ダミーユーザー**: 上記のダミーユーザーでOK？アバターはイニシャル表示？
2. **解決ボタン**: v1で解決状態を切り替えられるようにする？（UIのみ）
3. **削除確認**: スレッド削除時に確認ダイアログは必要？
