'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { TableViewWidget } from '@/widgets/view/table-view/ui/TableViewWidget';
import type {
  SortState,
  PaginationConfig,
} from '@/widgets/view/table-view/model/types';

import { useDrawingPages } from '@/features/product/drawing-page/get-list/lib/use-drawing-pages';
import type { DrawingPage } from '@/entities/product/drawing-page/model/entity';

import { createTableColumns } from '../config/table-columns';

export function DrawingTablePanel() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortState, setSortState] = useState<SortState>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const { data, isLoading } = useDrawingPages({ page, perPage: pageSize });

  const handleOpen = (row: DrawingPage) => {
    router.push(`/drawing/${row.id}/basic-information`);
  };

  const handleDelete = (row: DrawingPage) => {
    alert(
      `図面を削除（未実装）: ${row.drawingNumber} - ${row.leafProductName || row.drawingFileName}`,
    );
  };

  const columns = useMemo(
    () => createTableColumns(handleOpen, handleDelete),
    [],
  );

  const pagination: PaginationConfig = {
    currentPage: page,
    pageSize: pageSize,
    totalItems: data?.totalCount ?? 0,
    pageSizeOptions: [10, 20, 50],
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
  };

  const handleSelectionChange = (newSelectedRows: Set<number>) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <TableViewWidget
      data={data?.items ?? []}
      columns={columns}
      pagination={pagination}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      sortState={sortState}
      onSortChange={handleSortChange}
      selectedRows={selectedRows}
      onSelectionChange={handleSelectionChange}
      isLoading={isLoading}
    />
  );
}
