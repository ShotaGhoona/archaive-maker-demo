# 009: feat: comment feature

**日時**: 2025-12-30
**作者**: Claude Code

## 概要

BOMキャンバスにFigmaライクなコメント機能を実装。キャンバス上の任意の位置にコメントスレッドを配置し、ドラッグで移動、返信・編集が可能。

## 変更規模

- 8ファイル新規作成
- BomCanvasContainer.tsx 更新

## アーキテクチャ

### ディレクトリ構造

```
page-components/bom/canvas/
└── ui-block/
    └── comment/
        ├── model/
        │   └── types.ts              # 型定義 + DUMMY_USER
        ├── lib/
        │   ├── use-comments.ts       # スレッド状態管理（CRUD）
        │   └── use-drag.ts           # ドラッグ処理（hasDragged対応）
        └── ui/
            ├── CommentLayer.tsx      # レイヤー（Containerから呼ばれる）
            ├── CommentThread.tsx     # スレッド単位のコンポーネント
            └── components/
                ├── CommentBubble.tsx     # 縮小表示（アバター + ホバープレビュー）
                ├── CommentExpanded.tsx   # 展開表示（コメント一覧 + 返信）
                └── CommentCreator.tsx    # 新規作成UI
```

### 設計方針

| 方針 | 内容 |
|------|------|
| Containerの責務 | CommentLayerのみ呼び出し、内部コンポーネントは直接importしない |
| hooksの配置 | ui-blockローカルに配置（shared化しない）|
| コンポーネント分割 | 過度に分割せず、関連UIは1ファイルにまとめる |

## 型定義

### CommentAuthor
```typescript
interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;  // DiceBear API URL
}
```

### Comment
```typescript
interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt?: string;
}
```

### CommentThread
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

### DUMMY_USER
```typescript
const DUMMY_USER: CommentAuthor = {
  id: 'user-1',
  name: 'デモユーザー',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
};
```

## 機能一覧

| 機能 | 説明 |
|------|------|
| スレッド作成 | ツールバーでコメントツール選択 → キャンバスクリック → 入力 |
| 表示切替 | 縮小時はアバター、ホバーでプレビュー、クリックで展開 |
| ドラッグ移動 | 縮小時にドラッグで位置変更 |
| 返信 | 展開表示で返信を追加 |
| 編集 | 各コメントのメニューから編集可能 |
| 解決 | スレッドを解決済みにして削除 |

## 操作フロー

```
ツールバーで「コメント」選択
  ↓
キャンバスクリック
  ↓
CommentCreator表示（入力フォーム）
  ↓
Enter or 送信ボタン → スレッド作成
  ↓
アバター表示（縮小状態）
  ├── ホバー → プレビューカード表示（ふんわりトランジション）
  ├── クリック → 展開表示
  │     ├── 返信入力
  │     ├── コメント編集（メニューから）
  │     └── 解決ボタン → スレッド削除
  └── ドラッグ → 位置移動
```

## hooks設計

### use-comments.ts
スレッドのCRUD操作を提供。

```typescript
interface UseCommentsReturn {
  threads: CommentThread[];
  addThread: (x: number, y: number, content: string) => CommentThread;
  addReply: (threadId: string, content: string) => void;
  updateComment: (threadId: string, commentId: string, content: string) => void;
  deleteComment: (threadId: string, commentId: string) => void;
  deleteThread: (threadId: string) => void;
  moveThread: (threadId: string, x: number, y: number) => void;
  resolveThread: (threadId: string) => void;
}
```

### use-drag.ts
ドラッグ処理を提供。sticky-noteとは別実装（コメント専用）。

```typescript
interface UseDragReturn {
  isDragging: boolean;
  hasDragged: boolean;  // ドラッグ後のクリック誤判定防止
  handleDragMouseDown: (e: React.MouseEvent) => void;
}
```

**hasDraggedの動作:**
1. ドラッグ開始時: `hasDragged = false`
2. 2px以上移動: `hasDragged = true`
3. マウスを離す: `isDragging = false`（`hasDragged`は維持）
4. クリックイベント発火: `hasDragged`が`true`なので展開されない
5. `setTimeout`で`hasDragged`をリセット

## UIコンポーネント

### CommentBubble
3つの表示状態を1コンポーネントで管理:

| 状態 | 表示 |
|------|------|
| 通常 | アバターのみ |
| ホバー | プレビューカード（opacity/scaleトランジション） |
| ドラッグ中 | ホバー無効化（チラつき防止） |

```typescript
const showPreview = isHovering && !isDragging && firstComment;

// アバター
<img className={showPreview ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} />

// プレビュー
<div className={showPreview ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} />
```

### CommentExpanded
展開表示。内部にCommentItemとReplyInputを含む（別ファイル分離なし）。

## 修正したバグ

| バグ | 原因 | 対応 |
|------|------|------|
| ドラッグ中のチラつき | マウスが要素より速く動くとホバー状態が切り替わる | `isDragging`をCommentBubbleに渡し、ドラッグ中はホバー無効化 |
| ドラッグ後にクリック判定 | mouseupでisDragging=falseになった後にclickイベント発火 | `hasDragged`フラグを追加し、setTimeoutでクリック後にリセット |

## アバター

DiceBear APIを使用:
```
https://api.dicebear.com/7.x/avataaars/svg?seed=user1
```

`types.ts`の`DUMMY_USER.avatarUrl`にハードコードで設定。コンポーネントは`author.avatarUrl`を直接参照。

## 定数（shared/canvas/constant/size.ts）

```typescript
// コメント関連
export const COMMENT_AVATAR_SIZE = 32;
export const COMMENT_PREVIEW_WIDTH = 280;
export const COMMENT_EXPANDED_WIDTH = 320;
```

## 今後の拡張ポイント

- [ ] バックエンドAPI連携
- [ ] リアルタイム同期（WebSocket）
- [ ] ユーザー認証との連携
- [ ] コメントの削除機能
- [ ] メンション機能
- [ ] 解決済みスレッドの表示/非表示切り替え
