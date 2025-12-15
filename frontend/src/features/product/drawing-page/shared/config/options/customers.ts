// ============================================
// 顧客 マスターデータ
// ============================================

import type { SelectOption } from './types';

/**
 * 顧客一覧
 *
 * TODO: 将来的にはAPIから取得する
 */
export const CUSTOMERS = [
  { id: 1, name: '株式会社ABC製作所' },
  { id: 2, name: '山田工業株式会社' },
  { id: 3, name: 'テック・ソリューションズ' },
  { id: 4, name: '東京精密機器' },
  { id: 5, name: '大阪メカニクス' },
] as const;

/**
 * フィルター/セレクト用オプション
 */
export const customerOptions: SelectOption[] = CUSTOMERS.map((c) => ({
  label: c.name,
  value: c.name,
}));
