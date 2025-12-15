import type { FilterFieldConfig } from '@/widgets/common/filter/filter-sidebar/model/types';
import { drawingCategoryOptions } from '@/features/product/drawing-page/shared/config/options/drawing-categories';
import { customerOptions } from '@/features/product/drawing-page/shared/config/options/customers';
import { employeeUserOptions } from '@/features/product/drawing-page/shared/config/options/employees';
import { fileExtensionOptions } from '@/features/product/drawing-page/shared/config/options/file-extensions';
import { revisionOptions } from '@/features/product/drawing-page/shared/config/options/revisions';

/**
 * フィルターフィールド設定
 */
export const FILTER_FIELDS: FilterFieldConfig[] = [
  { key: 'drawingNumber', label: '図番', type: 'text', placeholder: '図番を入力' },
  { key: 'leafProductName', label: '製品名', type: 'text', placeholder: '製品名を入力' },
  { key: 'drawingFileName', label: 'ファイル名', type: 'text', placeholder: 'ファイル名を入力' },
  { key: 'externalDrawingNumber', label: '外部図番', type: 'text', placeholder: '外部図番を入力' },
  { key: 'leafProductRevisionNumber', label: 'Rev', type: 'multiselect', options: revisionOptions },
  { key: 'drawingCategoryName', label: 'カテゴリ', type: 'multiselect', options: drawingCategoryOptions },
  { key: 'customerName', label: '顧客', type: 'multiselect', options: customerOptions },
  { key: 'createdByName', label: '作成者', type: 'user', userOptions: employeeUserOptions },
  { key: 'createdAt', label: '作成日', type: 'date' },
  { key: 'updatedByName', label: '更新者', type: 'user', userOptions: employeeUserOptions },
  { key: 'updatedAt', label: '更新日', type: 'date' },
  { key: 'drawingFileExtension', label: 'ファイル形式', type: 'multiselect', options: fileExtensionOptions },
];
