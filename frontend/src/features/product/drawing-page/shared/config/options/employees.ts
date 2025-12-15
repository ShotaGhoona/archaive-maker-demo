// ============================================
// 従業員 マスターデータ
// ============================================

import type { UserOption } from './types';

/**
 * 従業員一覧
 *
 * TODO: 将来的にはAPIから取得する
 */
export const EMPLOYEES = [
  { id: 1, name: '山田太郎' },
  { id: 2, name: '佐藤花子' },
  { id: 3, name: '田中一郎' },
  { id: 4, name: '鈴木次郎' },
  { id: 5, name: '高橋美咲' },
  { id: 6, name: '伊藤健太' },
  { id: 7, name: '渡辺真理' },
  { id: 8, name: '小林誠' },
] as const;

/**
 * ユーザー選択用オプション
 */
export const employeeUserOptions: UserOption[] = EMPLOYEES.map((e) => ({
  id: String(e.id),
  name: e.name,
}));
