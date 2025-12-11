'use client';

import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { TableHead, TableRow, TableHeader as ShadcnTableHeader } from '@/shared/ui/shadcn/ui/table';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { ColumnConfig, SortState, SortDirection } from '../model/types';
import type { ColumnWidths } from '../lib/use-column-resize';
import { calculateStickyPositions } from '../lib/calculate-sticky-positions';
import { CheckboxCell } from './cell-components/CheckboxCell';

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  columnWidths: ColumnWidths;
  sortState?: SortState;
  onSortChange?: (sortState: SortState) => void;
  onResizeStart?: (key: string, e: React.MouseEvent) => void;
  // checkbox用
  totalRows?: number;
  selectedRows?: Set<number>;
  onSelectAll?: (selectAll: boolean) => void;
}

export function TableHeader<T>({
  columns,
  columnWidths,
  sortState,
  onSortChange,
  onResizeStart,
  totalRows = 0,
  selectedRows,
  onSelectAll,
}: TableHeaderProps<T>) {
  const stickyPositions = calculateStickyPositions(columns, columnWidths);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable || !onSortChange) return;

    let newDirection: SortDirection = 'asc';
    if (sortState?.key === key) {
      if (sortState.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortState.direction === 'desc') {
        newDirection = null;
      }
    }

    onSortChange({ key, direction: newDirection });
  };

  const getSortIcon = (key: string, sortable?: boolean) => {
    if (!sortable) return null;

    if (sortState?.key === key) {
      if (sortState.direction === 'asc') {
        return <ChevronUp className='h-4 w-4 text-primary' />;
      }
      if (sortState.direction === 'desc') {
        return <ChevronDown className='h-4 w-4 text-primary' />;
      }
    }
    return <ChevronsUpDown className='h-4 w-4 text-muted-foreground' />;
  };

  return (
    <ShadcnTableHeader>
      <TableRow>
        {columns.map((column) => {
          const key = String(column.key);
          const width = columnWidths[key] ?? column.width;
          const stickyPosition = stickyPositions.get(key);

          return (
            <TableHead
              key={key}
              style={{
                width: width ? `${width}px` : undefined,
                minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
                ...(column.sticky === 'left' && {
                  left: `${stickyPosition}px`,
                }),
                ...(column.sticky === 'right' && {
                  right: `${stickyPosition}px`,
                }),
              }}
              className={cn(
                'relative sticky top-0 z-10 bg-background py-4',
                column.sortable && 'cursor-pointer select-none',
                column.sticky && 'z-20',
              )}
              onClick={() => handleSort(key, column.sortable)}
            >
              {column.columnType === 'checkbox' ? (
                <CheckboxCell
                  checked={totalRows > 0 && selectedRows?.size === totalRows}
                  indeterminate={
                    selectedRows !== undefined &&
                    selectedRows.size > 0 &&
                    selectedRows.size < totalRows
                  }
                  onChange={(checked) => onSelectAll?.(checked)}
                />
              ) : (
                <div className='flex items-center justify-between gap-2 pr-2'>
                  <span>{column.header}</span>
                  {getSortIcon(key, column.sortable)}
                </div>
              )}
              {onResizeStart &&
                column.columnType !== 'checkbox' &&
                column.columnType !== 'actions' && (
                  <div
                    className='group absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-primary'
                    onMouseDown={(e) => onResizeStart(key, e)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='absolute right-0 top-0 h-full w-[3px] bg-transparent transition-colors group-hover:bg-primary' />
                  </div>
                )}
            </TableHead>
          );
        })}
      </TableRow>
    </ShadcnTableHeader>
  );
}
