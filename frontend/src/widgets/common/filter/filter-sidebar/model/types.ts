import type { ReactNode } from 'react';

// フィルターフィールドの種類
export type FilterFieldType =
  | 'text'
  | 'multiselect'
  | 'date'
  | 'number'
  | 'boolean'
  | 'user';

// セレクト/マルチセレクト用のオプション
export interface FilterOption {
  label: string;
  value: string;
  color?: string;
}

// ユーザー選択用のオプション
export interface UserOption {
  id: string;
  name: string;
  avatarUrl?: string;
}

// フィルターフィールドの設定
export interface FilterFieldConfig {
  // フィールドの識別子
  key: string;
  // ラベル
  label: string;
  // フィールドタイプ
  type: FilterFieldType;
  // プレースホルダー
  placeholder?: string;
  // マルチセレクト用のオプション
  options?: FilterOption[];
  // ユーザー選択用のオプション
  userOptions?: UserOption[];
  // デフォルト値
  defaultValue?: unknown;
}

// フィルター値の型
export type FilterValues = Record<string, unknown>;

// 高度なフィルター条件の演算子
export type AdvancedFilterOperator =
  | 'equals' // 等しい
  | 'not_equals' // 等しくない
  | 'contains' // 含む
  | 'not_contains' // 含まない
  | 'starts_with' // で始まる
  | 'ends_with' // で終わる
  | 'greater_than' // より大きい
  | 'less_than' // より小さい
  | 'is_empty' // 空
  | 'is_not_empty'; // 空でない

// 高度なフィルター条件
export interface AdvancedFilterCondition {
  id: string;
  field: string;
  operator: AdvancedFilterOperator;
  value: unknown;
}

// 高度なフィルター値
export interface AdvancedFilterValues {
  conditions: AdvancedFilterCondition[];
}

// サイドバーフィルターのProps
export interface FilterSidebarProps {
  // フィルター設定
  fields: FilterFieldConfig[];
  // シンプルフィルター値
  simpleValues: FilterValues;
  // シンプルフィルター値変更時のコールバック
  onSimpleValuesChange: (values: FilterValues) => void;
  // 高度なフィルター値
  advancedValues: AdvancedFilterValues;
  // 高度なフィルター値変更時のコールバック
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
  // リセットボタン押下時のコールバック
  onReset?: () => void;
  // フッターのカスタムレンダー
  footerRenderer?: () => ReactNode;
}
