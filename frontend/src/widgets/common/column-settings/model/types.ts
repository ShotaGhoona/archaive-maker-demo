// カラムタイプ
export type ColumnType =
  | 'text'
  | 'date'
  | 'number'
  | 'boolean'
  | 'multiselect'
  | 'user';

// カラム設定の入力型
export interface ColumnInput {
  key: string;
  label?: string;
  columnType?: string;
}

// フィルターフィールドの入力型
export interface FilterInput {
  key: string;
  label: string;
  type?: string;
}

// カラム定義（追加・編集用）
export interface ColumnDefinition {
  key: string;
  label: string;
  description?: string;
  columnType: ColumnType;
  isCustom?: boolean; // ユーザーが追加したカラムかどうか
}

// タブの種類
export type SettingsTab = 'visibility' | 'management' | 'filter';
