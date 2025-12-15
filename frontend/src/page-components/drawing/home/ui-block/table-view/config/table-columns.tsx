import { ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { ColumnConfig } from '@/widgets/view/table-view/model/types';
import type { DrawingPage } from '@/entities/product/drawing-page/model/entity';

/**
 * テーブルカラム設定
 */
export const TABLE_COLUMNS: ColumnConfig<DrawingPage>[] = [
  { key: 'drawingNumber', label: '図番', columnType: 'text', width: 180, sortable: true },
  { key: 'leafProductName', label: '製品名', columnType: 'text', width: 180, sortable: true },
  { key: 'drawingFileName', label: 'ファイル名', columnType: 'text', width: 200, sortable: true },
  { key: 'leafProductRevisionNumber', label: 'Rev', columnType: 'text', width: 60, sortable: true },
  { key: 'drawingCategoryName', label: 'カテゴリ', columnType: 'text', width: 100, sortable: true },
  { key: 'customerName', label: '顧客', columnType: 'text', width: 160, sortable: true },
  { key: 'pageNumber', label: 'ページ', columnType: 'text', width: 80, sortable: true },
  { key: 'createdByName', label: '作成者', columnType: 'text', width: 100, sortable: true },
  { key: 'createdAt', label: '作成日', columnType: 'date', width: 110, sortable: true },
  { key: 'updatedByName', label: '更新者', columnType: 'text', width: 100, sortable: true },
  { key: 'updatedAt', label: '更新日', columnType: 'date', width: 110, sortable: true },
  { key: 'drawingFileExtension', label: '形式', columnType: 'text', width: 70, sortable: true },
  { key: 'externalDrawingNumber', label: '外部図番', columnType: 'text', width: 120, sortable: true },
  { key: 'remarks', label: '備考', columnType: 'text', width: 150, sortable: false },
];

/**
 * アクション付きカラム設定を生成
 */
export function createTableColumns(
  onOpen: (row: DrawingPage) => void,
  onDelete: (row: DrawingPage) => void
): ColumnConfig<DrawingPage>[] {
  return [
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
    ...TABLE_COLUMNS,
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
}
