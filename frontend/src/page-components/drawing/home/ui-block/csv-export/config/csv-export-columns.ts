import type { CsvExportColumnConfig } from '@/widgets/common/csv-export-dialog/model/types';

/**
 * CSVエクスポートカラム設定
 */
export const CSV_EXPORT_COLUMNS: CsvExportColumnConfig[] = [
  { key: 'drawingNumber', label: '図番' },
  { key: 'leafProductName', label: '製品名' },
  { key: 'drawingFileName', label: 'ファイル名' },
  { key: 'leafProductRevisionNumber', label: 'Rev' },
  { key: 'drawingCategoryName', label: 'カテゴリ' },
  { key: 'customerName', label: '顧客' },
  { key: 'pageNumber', label: 'ページ' },
  { key: 'createdByName', label: '作成者' },
  { key: 'createdAt', label: '作成日' },
  { key: 'updatedByName', label: '更新者' },
  { key: 'updatedAt', label: '更新日' },
  { key: 'drawingFileExtension', label: '形式' },
  { key: 'externalDrawingNumber', label: '外部図番' },
  { key: 'remarks', label: '備考' },
];
