import type { FilterFieldConfig } from '@/widgets/common/filter/filter-sidebar/model/types';

export const productFilterFields: FilterFieldConfig[] = [
  {
    key: 'productNumber',
    label: '製品番号',
    type: 'text',
    placeholder: '製品番号を入力',
  },
  {
    key: 'productName',
    label: '製品名',
    type: 'text',
    placeholder: '製品名を入力',
  },
  {
    key: 'category',
    label: 'カテゴリ',
    type: 'multiselect',
    options: [
      { label: '産業機械', value: '産業機械' },
      { label: '電子部品', value: '電子部品' },
      { label: '自動車部品', value: '自動車部品' },
      { label: '精密機器', value: '精密機器' },
      { label: '医療機器', value: '医療機器' },
    ],
  },
];
