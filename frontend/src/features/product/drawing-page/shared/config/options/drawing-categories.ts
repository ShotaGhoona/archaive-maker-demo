// ============================================
// 図面カテゴリ マスターデータ
// ============================================

import type { SelectOption } from './types';

/**
 * 図面カテゴリ一覧
 *
 * TODO: 将来的にはAPIから取得する
 */
export const DRAWING_CATEGORIES = [
  { id: 1, name: '組立図' },
  { id: 2, name: '加工図' },
  { id: 3, name: '部品図' },
  { id: 4, name: 'レイアウト図' },
  { id: 5, name: '外観図' },
  { id: 6, name: '配線図' },
  { id: 7, name: '回路図' },
  { id: 8, name: '構造図' },
] as const;

/**
 * フィルター/セレクト用オプション
 */
export const drawingCategoryOptions: SelectOption[] = DRAWING_CATEGORIES.map(
  (c) => ({
    label: c.name,
    value: c.name,
  })
);
