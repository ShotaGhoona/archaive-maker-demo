import type { FilterFieldConfig } from '@/widgets/common/filter/filter-sidebar/model/types';

export const customerFilterFields: FilterFieldConfig[] = [
  {
    key: 'customerCode',
    label: '顧客コード',
    type: 'text',
    placeholder: '顧客コードを入力',
  },
  {
    key: 'companyName',
    label: '会社名',
    type: 'text',
    placeholder: '会社名を入力',
  },
  {
    key: 'contactName',
    label: '担当者名',
    type: 'text',
    placeholder: '担当者名を入力',
  },
  {
    key: 'industry',
    label: '業種',
    type: 'multiselect',
    options: [
      { label: '製造業', value: '製造業' },
      { label: '商社', value: '商社' },
      { label: '電機', value: '電機' },
      { label: '建設', value: '建設' },
      { label: '物流', value: '物流' },
      { label: '食品', value: '食品' },
      { label: '機械', value: '機械' },
      { label: '化学', value: '化学' },
      { label: '精密機器', value: '精密機器' },
    ],
  },
  {
    key: 'status',
    label: 'ステータス',
    type: 'multiselect',
    options: [
      { label: '取引中', value: '取引中', color: '#22c55e' },
      { label: '見込み', value: '見込み', color: '#3b82f6' },
      { label: '休眠', value: '休眠', color: '#6b7280' },
    ],
  },
  {
    key: 'rank',
    label: 'ランク',
    type: 'multiselect',
    options: [
      { label: 'A', value: 'A', color: '#ef4444' },
      { label: 'B', value: 'B', color: '#f59e0b' },
      { label: 'C', value: 'C', color: '#6b7280' },
    ],
  },
  {
    key: 'salesRep',
    label: '営業担当',
    type: 'user',
    userOptions: [
      { id: '佐藤花子', name: '佐藤花子' },
      { id: '鈴木次郎', name: '鈴木次郎' },
      { id: '高橋美咲', name: '高橋美咲' },
      { id: '伊藤健太', name: '伊藤健太' },
      { id: '渡辺真理', name: '渡辺真理' },
      { id: '小林誠', name: '小林誠' },
    ],
  },
  {
    key: 'createdAt',
    label: '登録日',
    type: 'date',
  },
  {
    key: 'updatedAt',
    label: '更新日',
    type: 'date',
  },
];
