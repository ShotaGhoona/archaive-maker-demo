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
    label: '',
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
    label: '図番',
    columnType: 'text',
    width: 150,
    sortable: true,
  },
  {
    key: 'name',
    label: '図面名',
    columnType: 'text',
    width: 220,
    sortable: true,
  },
  {
    key: 'revision',
    label: 'Rev',
    columnType: 'text',
    width: 60,
    sortable: true,
  },
  {
    key: 'status',
    label: 'ステータス',
    columnType: 'multiselect',
    width: 120,
    sortable: true,
  },
  {
    key: 'category',
    label: 'カテゴリ',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'project',
    label: 'プロジェクト',
    columnType: 'text',
    width: 140,
    sortable: true,
  },
  {
    key: 'department',
    label: '部署',
    columnType: 'text',
    width: 110,
    sortable: true,
  },
  {
    key: 'createdBy',
    label: '作成者',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'createdAt',
    label: '作成日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'updatedBy',
    label: '更新者',
    columnType: 'text',
    width: 100,
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
    key: 'approvedBy',
    label: '承認者',
    columnType: 'text',
    width: 100,
    sortable: true,
  },
  {
    key: 'approvedAt',
    label: '承認日',
    columnType: 'date',
    width: 110,
    sortable: true,
  },
  {
    key: 'fileFormat',
    label: '形式',
    columnType: 'text',
    width: 70,
    sortable: true,
  },
  {
    key: 'fileSize',
    label: 'サイズ',
    columnType: 'text',
    width: 90,
    sortable: false,
  },
  {
    key: 'scale',
    label: '縮尺',
    columnType: 'text',
    width: 70,
    sortable: true,
  },
  {
    key: 'sheetSize',
    label: '用紙',
    columnType: 'text',
    width: 60,
    sortable: true,
  },
  {
    key: 'material',
    label: '材質',
    columnType: 'text',
    width: 90,
    sortable: true,
  },
  {
    key: 'tags',
    label: 'タグ',
    columnType: 'multiselect',
    width: 180,
    sortable: false,
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
