// ============================================
// リビジョン番号 オプション
// ============================================

import type { SelectOption } from './types';

/**
 * リビジョン番号の選択肢
 */
export const REVISION_NUMBERS = [1, 2, 3, 4, 5] as const;

/**
 * フィルター/セレクト用オプション
 */
export const revisionOptions: SelectOption[] = REVISION_NUMBERS.map((n) => ({
  label: String(n),
  value: String(n),
}));
