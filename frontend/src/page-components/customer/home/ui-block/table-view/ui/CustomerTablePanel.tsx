'use client';

import { useMemo, useState } from 'react';

import { TableViewWidget } from '@/widgets/view/table-view/ui/TableViewWidget';
import type {
  SortState,
  PaginationConfig,
} from '@/widgets/view/table-view/model/types';

import { createCustomerColumns } from '../config/column-config';
import { dummyCustomers, type CustomerItem } from '../../../dummy-data/customers';

export function CustomerTablePanel() {
  const [sortState, setSortState] = useState<SortState>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    totalItems: dummyCustomers.length,
    pageSizeOptions: [10, 20, 50],
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleOpen = (row: CustomerItem) => {
    alert(`顧客詳細を開く（未実装）: ${row.customerCode} - ${row.companyName}`);
    // TODO: router.push(`/customer/${row.id}`)
  };

  const handleDelete = (row: CustomerItem) => {
    alert(`顧客を削除（未実装）: ${row.customerCode} - ${row.companyName}`);
    // TODO: API呼び出し
  };

  const columns = useMemo(
    () => createCustomerColumns(handleOpen, handleDelete),
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
      data={dummyCustomers}
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
