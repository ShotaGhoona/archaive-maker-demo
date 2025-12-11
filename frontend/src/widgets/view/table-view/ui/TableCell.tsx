'use client';

import { Lock } from 'lucide-react';
import { TableCell as ShadcnTableCell, TableRow } from '@/shared/ui/shadcn/ui/table';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { ColumnConfig } from '../model/types';
import type { ColumnWidths } from '../lib/use-column-resize';
import { calculateStickyPositions } from '../lib/calculate-sticky-positions';
import { TextCell } from './cell-components/TextCell';
import { EmailCell } from './cell-components/EmailCell';
import { DateCell } from './cell-components/DateCell';
import { SelectCell, isSelectCellValue } from './cell-components/SelectCell';
import { CheckboxCell } from './cell-components/CheckboxCell';
import { BooleanCell } from './cell-components/BooleanCell';
import type { ColumnType } from '../model/types';

interface RenderCellOptions {
  columnType: ColumnType | undefined;
  value: unknown;
  rowIndex?: number;
  selectedRows?: Set<number>;
  onRowSelect?: (rowIndex: number, selected: boolean) => void;
}

// カラムタイプに応じたセルコンポーネントを返す
function renderCellByType({
  columnType,
  value,
  rowIndex,
  selectedRows,
  onRowSelect,
}: RenderCellOptions) {
  switch (columnType) {
    case 'text':
      return <TextCell value={String(value ?? '')} />;
    case 'email':
      return <EmailCell value={String(value ?? '')} />;
    case 'date':
      return <DateCell value={String(value ?? '')} />;
    case 'select':
      if (isSelectCellValue(value)) {
        return <SelectCell value={value} />;
      }
      return String(value ?? '');
    case 'checkbox':
      return (
        <CheckboxCell
          checked={
            rowIndex !== undefined && (selectedRows?.has(rowIndex) ?? false)
          }
          onChange={(checked) =>
            rowIndex !== undefined && onRowSelect?.(rowIndex, checked)
          }
        />
      );
    case 'boolean':
      return <BooleanCell value={Boolean(value)} />;
    default:
      return String(value ?? '');
  }
}

interface TableCellProps<T> {
  row: T;
  rowIndex: number;
  columns: ColumnConfig<T>[];
  columnWidths: ColumnWidths;
  onRowClick?: (row: T, rowIndex: number) => void;
  // checkbox用
  selectedRows?: Set<number>;
  onRowSelect?: (rowIndex: number, selected: boolean) => void;
}

export function TableCellRow<T extends object>({
  row,
  rowIndex,
  columns,
  columnWidths,
  onRowClick,
  selectedRows,
  onRowSelect,
}: TableCellProps<T>) {
  const stickyPositions = calculateStickyPositions(columns, columnWidths);

  const getCellValue = (row: T, key: keyof T | string): unknown => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce<unknown>((obj, k) => {
        if (obj && typeof obj === 'object' && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        return undefined;
      }, row);
    }
    return row[key as keyof T];
  };

  const isSelected = selectedRows?.has(rowIndex) ?? false;

  // セルのホバー色を決定（stickyは除外）
  const getCellHoverClass = (column: ColumnConfig<T>) => {
    if (column.locked || column.columnType === 'actions' || column.sticky)
      return '';
    return isSelected ? 'hover:bg-primary/20' : 'hover:bg-gray-100';
  };

  return (
    <TableRow
      className={cn('hover:bg-transparent', onRowClick && 'cursor-pointer')}
      onClick={() => onRowClick?.(row, rowIndex)}
    >
      {columns.map((column) => {
        const key = String(column.key);
        const value = getCellValue(row, column.key);
        const width = columnWidths[key] ?? column.width;
        const stickyPosition = stickyPositions.get(key);

        return (
          <ShadcnTableCell
            key={key}
            style={{
              width: width ? `${width}px` : undefined,
              minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
              ...(column.sticky === 'left' && { left: `${stickyPosition}px` }),
              ...(column.sticky === 'right' && {
                right: `${stickyPosition}px`,
              }),
            }}
            className={cn(
              'group relative py-1 transition-colors',
              column.locked && 'cursor-not-allowed',
              column.sticky
                ? cn(
                    'sticky z-10 bg-card',
                    isSelected &&
                      'after:pointer-events-none after:absolute after:inset-0 after:bg-primary/10',
                  )
                : isSelected
                  ? 'bg-primary/10'
                  : 'bg-card',
              getCellHoverClass(column),
            )}
          >
            {column.cellRenderer
              ? column.cellRenderer(value as T[keyof T], row, rowIndex)
              : renderCellByType({
                  columnType: column.columnType,
                  value,
                  rowIndex,
                  selectedRows,
                  onRowSelect,
                })}
            {column.locked && (
              <Lock className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            )}
          </ShadcnTableCell>
        );
      })}
    </TableRow>
  );
}
