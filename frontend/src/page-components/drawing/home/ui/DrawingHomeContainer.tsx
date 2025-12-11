'use client';

import { useMemo, useState } from 'react';
import { TableViewWidget } from '@/widgets/view/table-view/ui/TableViewWidgets';
import type {
  SortState,
  PaginationConfig,
} from '@/widgets/view/table-view/model/types';
import { dummyDrawings, type DrawingItem } from '../dummy-data/drawings';
import { createDrawingColumns } from '../config/column-config';

export function DrawingHomeContainer() {
  // UI状態のみ管理
  const [sortState, setSortState] = useState<SortState>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    totalItems: dummyDrawings.length,
    pageSizeOptions: [10, 20, 50],
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleOpen = (row: DrawingItem) => {
    alert(`図面を開く（未実装）: ${row.drawingNumber} - ${row.name}`);
    // TODO: router.push(`/drawing/${row.id}`)
  };

  const handleDelete = (row: DrawingItem) => {
    alert(`図面を削除（未実装）: ${row.drawingNumber} - ${row.name}`);
    // TODO: API呼び出し
  };

  const columns = useMemo(
    () => createDrawingColumns(handleOpen, handleDelete),
    []
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // TODO: API呼び出し
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
      currentPage: 1,
    }));
    // TODO: API呼び出し
  };

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
    // TODO: API呼び出し
  };

  const handleRowClick = (row: DrawingItem) => {
    alert(`図面詳細へ遷移（未実装）: ${row.drawingNumber} - ${row.name}`);
    // TODO: router.push(`/drawing/${row.id}`)
  };

  const handleSelectionChange = (newSelectedRows: Set<number>) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pt-4">
      <h1 className="mb-4 text-2xl font-bold">図面一覧</h1>
      <div className="flex min-h-0 flex-1 flex-col">
        <TableViewWidget
          data={dummyDrawings}
          columns={columns}
          pagination={pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          sortState={sortState}
          onSortChange={handleSortChange}
          onRowClick={handleRowClick}
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}
