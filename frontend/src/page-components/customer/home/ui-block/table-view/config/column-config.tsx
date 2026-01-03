import { ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { ColumnConfig } from '@/widgets/view/table-view/model/types';
import type { CustomerItem } from '@/shared/dummy-data/customer/customers';

export const createCustomerColumns = (
  onOpen: (row: CustomerItem) => void,
  onDelete: (row: CustomerItem) => void,
): ColumnConfig<CustomerItem>[] => [
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
    key: 'customerCode',
    label: '顧客コード',
    columnType: 'text',
    width: 120,
    sortable: true,
  },
  {
    key: 'companyName',
    label: '会社名',
    columnType: 'text',
    width: 200,
    sortable: true,
  },
  {
    key: 'department',
    label: '部署',
    columnType: 'text',
    width: 120,
    sortable: true,
  },
  {
    key: 'contactName',
    label: '担当者名',
    columnType: 'text',
    width: 120,
    sortable: true,
  },
  {
    key: 'email',
    label: 'メール',
    columnType: 'text',
    width: 200,
    sortable: true,
  },
  {
    key: 'phone',
    label: '電話番号',
    columnType: 'text',
    width: 140,
    sortable: false,
  },
  {
    key: 'address',
    label: '住所',
    columnType: 'text',
    width: 250,
    sortable: false,
  },
  {
    key: 'industry',
    label: '業種',
    columnType: 'text',
    width: 100,
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
    key: 'rank',
    label: 'ランク',
    columnType: 'text',
    width: 80,
    sortable: true,
  },
  {
    key: 'salesRep',
    label: '営業担当',
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
        variant='destructive'
        size='lg'
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
