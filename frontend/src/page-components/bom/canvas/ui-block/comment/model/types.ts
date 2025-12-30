/**
 * コメント機能の型定義
 */

/** コメントの作者情報 */
export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

/** 個別コメント */
export interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt?: string;
}

/** コメントスレッド（キャンバス上に配置される） */
export interface CommentThread {
  id: string;
  x: number;
  y: number;
  resolved: boolean;
  comments: Comment[];
  createdAt: string;
}

/** ダミーユーザー（v1用） */
export const DUMMY_USER: CommentAuthor = {
  id: 'user-1',
  name: 'デモユーザー',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
};
