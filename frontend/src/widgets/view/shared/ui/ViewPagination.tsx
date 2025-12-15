'use client';

import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import type { PaginationConfig, GridColumns } from '../model/types';

interface ViewPaginationProps {
  pagination: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  // グリッド列数関連（ギャラリービュー用）
  showGridColumns?: boolean;
  gridColumns?: GridColumns;
  onGridColumnsChange?: (columns: GridColumns) => void;
  gridColumnsOptions?: GridColumns[];
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);
  }

  return pages;
}

export function ViewPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  showGridColumns = false,
  gridColumns = 4,
  onGridColumnsChange,
  gridColumnsOptions = [2, 3, 4, 5, 6],
}: ViewPaginationProps) {
  const {
    currentPage,
    pageSize,
    totalItems,
    pageSizeOptions = [10, 25, 50, 100],
  } = pagination;

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className='flex shrink-0 items-center justify-between border-t px-4 py-3'>
      <span className='min-w-[100px] text-sm text-muted-foreground'>
        {startItem}-{endItem}/{totalItems}
      </span>

      <div className='flex items-center gap-1'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={!canGoPrevious}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className='px-2 text-muted-foreground'
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'ghost'}
              size='icon'
              className='h-8 w-8'
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={!canGoNext}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <div className='flex min-w-[100px] items-center justify-end gap-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <span>ページサイズ</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange?.(Number(value))}
          >
            <SelectTrigger className='h-8 w-[70px] bg-card'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showGridColumns && onGridColumnsChange && (
          <div className='flex items-center gap-2'>
            <Grid3x3 className='h-4 w-4' />
            <Select
              value={String(gridColumns)}
              onValueChange={(value) =>
                onGridColumnsChange(Number(value) as GridColumns)
              }
            >
              <SelectTrigger className='h-8 w-[70px] bg-card'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gridColumnsOptions.map((col) => (
                  <SelectItem key={col} value={String(col)}>
                    {col}列
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
