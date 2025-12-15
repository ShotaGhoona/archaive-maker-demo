// ============================================
// ファイル拡張子 マスターデータ
// ============================================

import type { SelectOption } from './types';

/**
 * 対応ファイル拡張子一覧
 */
export const FILE_EXTENSIONS = ['dwg', 'dxf', 'pdf', 'step', 'iges'] as const;

/**
 * フィルター/セレクト用オプション
 */
export const fileExtensionOptions: SelectOption[] = FILE_EXTENSIONS.map(
  (ext) => ({
    label: ext,
    value: ext,
  }),
);
