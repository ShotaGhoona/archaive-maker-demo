import { ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { ColumnConfig } from '@/widgets/view/table-view/model/types';
import type { DrawingItem } from '../dummy-data/drawings';

export const createDrawingColumns = (
  onOpen: (row: DrawingItem) => void,
  onDelete: (row: DrawingItem) => void
): ColumnConfig<DrawingItem>[] => [
  {
    key: 'actions-left',
    header: '',
    columnType: 'actions',
    width: 100,
    sortable: false,
    sticky: 'left',
    cellRenderer: (_, row) => (
      <Button
        variant="outline"
        size="lg"
        className="bg-card text-primary hover:bg-primary/10"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(row);
        }}
      >
        <ExternalLink className="size-5" />
        開く
      </Button>
    ),
  },
  {
    key: 'drawingNumber',
    header: '図番',
    columnType: 'text',
    width: 150,
    sortable: true,
  },
  {
    key: 'name',
    header: '図面名',
    columnType: 'text',
    width: 220,
    sortable: true,
  },
  {
    key: 'revision',
    header: 'Rev',
    columnType: 'text',
    width: 60,
    sortable: true,
  },
  {
    key: 'status',
    header: 'ステータス',
    columnType: 'select',
    width: 120,
    sortable: true,
  },
  {
    key: 'category',
    header: 'カテゴリ',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'project',
    header: 'プロジェクト',
    columnType: 'text',
    width: 140,
    sortable: true,
  },
  {
    key: 'department',
    header: '部署',
    columnType: 'text',
    width: 110,
    sortable: true,
  },
  {
    key: 'createdBy',
    header: '作成者',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'createdAt',
    header: '作成日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'updatedBy',
    header: '更新者',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'updatedAt',
    header: '更新日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'approvedBy',
    header: '承認者',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'approvedAt',
    header: '承認日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'fileFormat',
    header: '形式',
    columnType: 'text',
    width: 70,
    sortable: true,
  },
  {
    key: 'fileSize',
    header: 'サイズ',
    columnType: 'text',
    width: 90,
    sortable: false,
  },
  {
    key: 'scale',
    header: '縮尺',
    columnType: 'text',
    width: 70,
    sortable: true,
  },
  {
    key: 'sheetSize',
    header: '用紙',
    columnType: 'text',
    width: 60,
    sortable: true,
  },
  {
    key: 'material',
    header: '材質',
    columnType: 'text',
    width: 90,
    sortable: true,
  },
  {
    key: 'remarks',
    header: '備考',
    columnType: 'text',
    width: 150,
    sortable: false,
  },
  {
    key: 'actions-right',
    header: '',
    columnType: 'actions',
    width: 60,
    sortable: false,
    sticky: 'right',
    cellRenderer: (_, row) => (
      <Button
        variant="outline"
        size="lg"
        className="bg-card text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    ),
  },
];
