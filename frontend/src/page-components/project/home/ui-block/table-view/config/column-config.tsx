import { ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { ColumnConfig } from '@/widgets/view/table-view/model/types';
import type { ProjectItem } from '../../../dummy-data/projects';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
};

export const createProjectColumns = (
  onOpen: (row: ProjectItem) => void,
  onDelete: (row: ProjectItem) => void,
): ColumnConfig<ProjectItem>[] => [
  {
    key: 'actions-left',
    label: '',
    columnType: 'actions',
    width: 100,
    sortable: false,
    sticky: 'left',
    cellRenderer: (_, row) => (
      <Button
        variant='outline'
        size='lg'
        className='bg-card text-primary hover:bg-primary/10'
        onClick={(e) => {
          e.stopPropagation();
          onOpen(row);
        }}
      >
        <ExternalLink className='size-5' />
        開く
      </Button>
    ),
  },
  {
    key: 'projectCode',
    label: '案件コード',
    columnType: 'text',
    width: 120,
    sortable: true,
  },
  {
    key: 'projectName',
    label: '案件名',
    columnType: 'text',
    width: 220,
    sortable: true,
  },
  {
    key: 'customerName',
    label: '顧客名',
    columnType: 'text',
    width: 180,
    sortable: true,
  },
  {
    key: 'status',
    label: 'ステータス',
    columnType: 'multiselect',
    width: 100,
    sortable: true,
  },
  {
    key: 'priority',
    label: '優先度',
    columnType: 'text',
    width: 80,
    sortable: true,
  },
  {
    key: 'category',
    label: '分類',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'startDate',
    label: '開始日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'endDate',
    label: '終了日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'budget',
    label: '予算',
    columnType: 'text',
    width: 130,
    sortable: true,
    cellRenderer: (value) => formatCurrency(value as number),
  },
  {
    key: 'salesRep',
    label: '営業担当',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'projectManager',
    label: 'PM',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'createdAt',
    label: '登録日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: '更新日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'remarks',
    label: '備考',
    columnType: 'text',
    width: 150,
    sortable: false,
  },
  {
    key: 'actions-right',
    label: '',
    columnType: 'actions',
    width: 60,
    sortable: false,
    sticky: 'right',
    cellRenderer: (_, row) => (
      <Button
        variant='outline'
        size='lg'
        className='bg-card text-destructive hover:bg-destructive/10 hover:text-destructive'
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row);
        }}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    ),
  },
];
