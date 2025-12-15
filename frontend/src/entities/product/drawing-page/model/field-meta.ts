// ============================================
// DrawingPage フィールドメタデータ
// ============================================

/**
 * フィールドタイプ
 */
export type FieldType =
  | 'text'
  | 'date'
  | 'number'
  | 'boolean'
  | 'multiselect'
  | 'user';

/**
 * フィールドメタデータ
 */
export interface FieldMeta {
  key: string;
  label: string;
  type: FieldType;
}

/**
 * DrawingPage フィールドメタデータ
 *
 * Entity のフィールドに対応するラベルと型を定義。
 * page-components で Widget 用の config を組み立てる際に使用。
 */
export const DRAWING_PAGE_FIELD_META: FieldMeta[] = [
  // 識別子
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'ulid', label: 'ULID', type: 'text' },

  // 基本情報
  { key: 'drawingNumber', label: '図番', type: 'text' },
  { key: 'leafProductName', label: '製品名', type: 'text' },
  { key: 'drawingFileName', label: 'ファイル名', type: 'text' },
  { key: 'leafProductRevisionNumber', label: 'Rev', type: 'multiselect' },
  { key: 'drawingCategoryName', label: 'カテゴリ', type: 'multiselect' },
  { key: 'customerName', label: '顧客', type: 'multiselect' },
  { key: 'pageNumber', label: 'ページ', type: 'number' },

  // 作成・更新情報
  { key: 'createdByName', label: '作成者', type: 'user' },
  { key: 'createdAt', label: '作成日', type: 'date' },
  { key: 'updatedByName', label: '更新者', type: 'user' },
  { key: 'updatedAt', label: '更新日', type: 'date' },

  // その他
  { key: 'drawingFileExtension', label: 'ファイル形式', type: 'multiselect' },
  { key: 'externalDrawingNumber', label: '外部図番', type: 'text' },
  { key: 'remarks', label: '備考', type: 'text' },
  { key: 's3Url', label: 'サムネイル', type: 'text' },
  { key: 'isShownSimilarSearch', label: '類似検索表示', type: 'boolean' },
] as const;

/**
 * キーからフィールドメタを取得
 */
export function getFieldMeta(key: string): FieldMeta | undefined {
  return DRAWING_PAGE_FIELD_META.find((f) => f.key === key);
}

/**
 * 複数キーからフィールドメタを取得
 */
export function getFieldMetas(keys: string[]): FieldMeta[] {
  return keys
    .map((key) => getFieldMeta(key))
    .filter((f): f is FieldMeta => f !== undefined);
}
