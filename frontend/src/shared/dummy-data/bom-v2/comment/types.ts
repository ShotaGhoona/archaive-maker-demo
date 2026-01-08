/**
 * コメント関連の型定義
 */

import type { User } from '../../user/types';

/** 個別コメント */
export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt?: string;
}

/** コメントスレッド */
export interface CommentThread {
  id: string;
  resolved: boolean;
  comments: Comment[];
  createdAt: string;
  /** キャンバス上の座標（キャンバスへのジャンプ用） */
  canvasPosition?: {
    x: number;
    y: number;
  };
}

/** コメントと作者情報を結合した表示用型 */
export interface CommentWithAuthor extends Comment {
  author: User;
}

/** スレッドとコメント作者情報を結合した表示用型 */
export interface CommentThreadWithAuthors extends Omit<CommentThread, 'comments'> {
  comments: CommentWithAuthor[];
}
