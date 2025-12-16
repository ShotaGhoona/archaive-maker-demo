import type { FilterFieldConfig } from '@/widgets/common/filter/filter-sidebar/model/types';

export const projectFilterFields: FilterFieldConfig[] = [
  {
    key: 'projectCode',
    label: '案件コード',
    type: 'text',
    placeholder: '案件コードを入力',
  },
  {
    key: 'projectName',
    label: '案件名',
    type: 'text',
    placeholder: '案件名を入力',
  },
  {
    key: 'customerName',
    label: '顧客名',
    type: 'text',
    placeholder: '顧客名を入力',
  },
  {
    key: 'status',
    label: 'ステータス',
    type: 'multiselect',
    options: [
      { label: '見積中', value: '見積中', color: '#3b82f6' },
      { label: '進行中', value: '進行中', color: '#22c55e' },
      { label: '完了', value: '完了', color: '#6b7280' },
      { label: '失注', value: '失注', color: '#ef4444' },
    ],
  },
  {
    key: 'priority',
    label: '優先度',
    type: 'multiselect',
    options: [
      { label: '高', value: '高', color: '#ef4444' },
      { label: '中', value: '中', color: '#f59e0b' },
      { label: '低', value: '低', color: '#6b7280' },
    ],
  },
  {
    key: 'category',
    label: '分類',
    type: 'multiselect',
    options: [
      { label: '新規開発', value: '新規開発' },
      { label: '改善', value: '改善' },
      { label: '保守', value: '保守' },
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
    key: 'projectManager',
    label: 'プロジェクト担当',
    type: 'user',
    userOptions: [
      { id: '田中一郎', name: '田中一郎' },
      { id: '高橋誠', name: '高橋誠' },
      { id: '渡辺洋子', name: '渡辺洋子' },
      { id: '小林浩二', name: '小林浩二' },
      { id: '加藤隆', name: '加藤隆' },
    ],
  },
  {
    key: 'startDate',
    label: '開始日',
    type: 'date',
  },
  {
    key: 'endDate',
    label: '終了日',
    type: 'date',
  },
];
