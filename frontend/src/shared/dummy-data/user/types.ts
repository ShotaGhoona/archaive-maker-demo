/**
 * ユーザー関連の型定義
 */

/** ユーザー情報 */
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
  email?: string;
}
