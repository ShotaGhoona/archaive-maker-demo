/**
 * ユーザーダミーデータ
 * 中小企業の製造業（精密機械部品メーカー）を想定
 */

import type { User } from './types';

/** ダミーユーザー一覧 */
export const users: User[] = [
  {
    id: 'user-1',
    name: '山田太郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada',
    department: '設計部',
  },
  {
    id: 'user-2',
    name: '佐藤花子',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
    department: '品質管理部',
  },
  {
    id: 'user-3',
    name: '田中一郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
    department: '購買部',
  },
  {
    id: 'user-4',
    name: '鈴木健二',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
    department: '製造部',
  },
  {
    id: 'user-5',
    name: '高橋美咲',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi',
    department: '生産技術部',
  },
  {
    id: 'user-6',
    name: '渡辺誠',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watanabe',
    department: '営業部',
  },
];

/**
 * ユーザーをIDで検索
 */
export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
