'use client';

import { TableBody } from '@/shared/ui/shadcn/ui/table';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { TableHeader } from './TableHeader';
import { TableCellRow } from './TableCell';
import { TablePagination } from './TablePageNation';
import { TableSkeleton } from './skeleton/TableSkeleton';
import { useColumnResize } from '../lib/use-column-resize';
import type { TableViewProps } from '../model/types';
import { Card } from '@/shared/ui/shadcn/ui/card';

export function TableViewWidget<T extends object>({
  data,
  columns,
  pagination,
  onPageChange,
  onPageSizeChange,
  sortState,
  onSortChange,
  onRowClick,
  isLoading,
  selectedRows,
  onSelectionChange,
}: TableViewProps<T>) {
  const { columnWidths, handleResizeStart } = useColumnResize(columns);

  // ローディング時はスケルトンを表示
  if (isLoading) {
    return <TableSkeleton />;
  }

  // 全選択/全解除
  const handleSelectAll = (selectAll: boolean) => {
    if (!onSelectionChange) return;
    if (selectAll) {
      const allRows = new Set(data.map((_, index) => index));
      onSelectionChange(allRows);
    } else {
      onSelectionChange(new Set());
    }
  };

  // 行選択
  const handleRowSelect = (rowIndex: number, selected: boolean) => {
    if (!onSelectionChange) return;
    const newSelectedRows = new Set(selectedRows);
    if (selected) {
      newSelectedRows.add(rowIndex);
    } else {
      newSelectedRows.delete(rowIndex);
    }
    onSelectionChange(newSelectedRows);
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      {data.length === 0 ? (
        <div className='flex min-h-0 flex-1 items-center justify-center'>
          <NoData
            title='データがありません'
            description='フィルター条件を変更してください'
          />
        </div>
      ) : (
        <Card className='relative min-h-0 flex-1 overflow-auto py-0'>
          <table className='w-full min-w-max caption-bottom'>
            <TableHeader
              columns={columns}
              columnWidths={columnWidths}
              sortState={sortState}
              onSortChange={onSortChange}
              onResizeStart={handleResizeStart}
              totalRows={data.length}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
            />
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableCellRow
                  key={rowIndex}
                  row={row}
                  rowIndex={rowIndex}
                  columns={columns}
                  columnWidths={columnWidths}
                  onRowClick={onRowClick}
                  selectedRows={selectedRows}
                  onRowSelect={handleRowSelect}
                />
              ))}
            </TableBody>
          </table>
        </Card>
      )}

      {pagination && (
        <TablePagination
          pagination={pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
