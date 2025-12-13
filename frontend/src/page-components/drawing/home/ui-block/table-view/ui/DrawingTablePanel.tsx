'use client';

import { useMemo, useState } from 'react';

import { TableViewWidget } from '@/widgets/view/table-view/ui/TableViewWidgets';
import type {
  SortState,
  PaginationConfig,
} from '@/widgets/view/table-view/model/types';

import { createDrawingColumns } from '../config/column-config';
import { dummyDrawings, type DrawingItem } from '../../../dummy-data/drawings';

export function DrawingTablePanel() {
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

  const handleSelectionChange = (newSelectedRows: Set<number>) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <TableViewWidget
      data={dummyDrawings}
      columns={columns}
      pagination={pagination}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      sortState={sortState}
      onSortChange={handleSortChange}
      selectedRows={selectedRows}
      onSelectionChange={handleSelectionChange}
    />
  );
}
