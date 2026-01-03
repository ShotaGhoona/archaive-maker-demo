// filter-sidebarの型を再利用
export type {
  FilterFieldType,
  FilterFieldConfig,
  FilterOption,
  UserOption,
  FilterValues,
  AdvancedFilterOperator,
  AdvancedFilterCondition,
  AdvancedFilterValues,
} from '../../filter-sidebar/model/types';

// フィルターチップの表示値
export interface FilterChipValue {
  fieldKey: string;
  fieldLabel: string;
  displayValue: string;
  rawValue: unknown;
}

// フィルターチップスバーのProps
export interface FilterChipsBarProps {
  fields: import('../../filter-sidebar/model/types').FilterFieldConfig[];
  values: import('../../filter-sidebar/model/types').FilterValues;
  onValuesChange: (
    values: import('../../filter-sidebar/model/types').FilterValues,
  ) => void;
  onClearAll?: () => void;
}
