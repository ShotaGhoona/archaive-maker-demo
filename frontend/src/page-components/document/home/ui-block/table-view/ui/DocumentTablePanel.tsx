"use client";

import { useMemo, useState } from "react";

import { TableViewWidget } from "@/widgets/view/table-view/ui/TableViewWidgets";
import type {
  SortState,
  PaginationConfig,
  ColumnConfig,
} from "@/widgets/view/table-view/model/types";

import { getColumnsByTypeId } from "../config/column-configs";
import {
  getDocumentTypeById,
  getDocumentDataByTypeId,
} from "../../../dummy-data/documents";

interface DocumentTablePanelProps {
  selectedTypeId: string;
}

export function DocumentTablePanel({ selectedTypeId }: DocumentTablePanelProps) {
  const [sortState, setSortState] = useState<SortState>({
    key: "updatedAt",
    direction: "desc",
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    pageSizeOptions: [10, 20, 50],
  });

  const selectedType = getDocumentTypeById(selectedTypeId);
  const data = getDocumentDataByTypeId(selectedTypeId);

  const handleOpen = (row: unknown) => {
    const typeName = selectedType?.name || "帳票";
    alert(`${typeName}を開く（未実装）: ${JSON.stringify(row)}`);
    // TODO: router.push(`/document/${selectedTypeId}/${row.id}`)
  };

  const handleDelete = (row: unknown) => {
    const typeName = selectedType?.name || "帳票";
    alert(`${typeName}を削除（未実装）: ${JSON.stringify(row)}`);
    // TODO: API呼び出し
  };

  const columns = useMemo(
    () =>
      getColumnsByTypeId(
        selectedTypeId,
        handleOpen,
        handleDelete
      ) as ColumnConfig<Record<string, unknown>>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTypeId]
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

  return columns.length > 0 ? (
    <TableViewWidget
      data={data as unknown as Record<string, unknown>[]}
      columns={columns}
      pagination={{
        ...pagination,
        totalItems: data.length,
      }}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      sortState={sortState}
      onSortChange={handleSortChange}
    />
  ) : (
    <div className="flex flex-1 items-center justify-center text-gray-500">
      この帳票種別はまだ実装されていません
    </div>
  );
}
