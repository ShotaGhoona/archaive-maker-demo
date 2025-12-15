'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import { FileDown, X, RotateCcw, Columns3, Table2 } from 'lucide-react';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { CsvExportColumnItem } from './CsvExportColumnItem';
import { useCsvExportState } from '../lib/use-csv-export-state';
import { formatCellValue } from '../lib/format-cell-value';
import { exportCsv } from '../lib/export-csv';
import type {
  CsvExportColumnConfig,
  CsvExportConfig,
  CsvExportModalWidgetProps,
  CsvEncoding,
} from '../model/types';

/**
 * CSV エクスポートダイアログ（ダミーUI）
 *
 * 現在はUIのみで、実際のエクスポート処理は未実装です。
 */
export function CsvExportModalWidget<T extends object>({
  columns,
  data,
  onExport,
}: CsvExportModalWidgetProps<T>) {
  const [open, setOpen] = useState(false);

  const {
    columnOrder,
    includedColumns,
    selectedKey,
    targetColumns,
    includeHeader,
    encoding,
    getColumn,
    toggleInclude,
    moveUp,
    moveDown,
    selectKey,
    setIncludeHeader,
    setEncoding,
    reset,
    selectAll,
    deselectAll,
  } = useCsvExportState({ columns, open });

  // エクスポート実行
  const handleExport = () => {
    const exportColumns = columnOrder
      .filter((key) => includedColumns.has(key))
      .map((key) => {
        const col = getColumn(key);
        return { key, label: col?.label ?? key };
      });

    if (onExport) {
      onExport({ columns: exportColumns, includeHeader, encoding });
    } else {
      exportCsv({ data, columns: exportColumns, includeHeader, encoding });
    }

    setOpen(false);
  };

  // プレビュー用のデータ（最大20行）
  const previewData = useMemo(() => {
    return data.slice(0, 20);
  }, [data]);

  // プレビュー用のカラム
  const previewColumns = useMemo(() => {
    return columnOrder
      .filter((key) => includedColumns.has(key))
      .map((key) => getColumn(key))
      .filter((col): col is CsvExportColumnConfig => col !== undefined);
  }, [columnOrder, includedColumns, getColumn]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='xl' className='bg-card'>
          <FileDown className='h-4 w-4' />
          CSV出力
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-[80vh] flex-col p-0 sm:max-w-7xl'>
        <DialogHeader className='shrink-0 p-6'>
          <DialogTitle>CSV エクスポート</DialogTitle>
        </DialogHeader>

        <div className='grid min-h-0 flex-1 grid-cols-[1fr_320px] gap-6 px-6'>
          {/* 左側: プレビュー */}
          <div className='flex min-h-0 min-w-0 flex-col rounded-lg border bg-gray-50'>
            <h3 className='flex shrink-0 items-center gap-2 p-4 pb-2 text-sm font-medium'>
              <Table2 className='h-4 w-4 text-muted-foreground' />
              プレビュー
              <span className='text-xs text-muted-foreground'>
                （{previewData.length} / {data.length} 件のみ表示）
              </span>
            </h3>
            <div className='flex min-h-0 flex-1 flex-col overflow-auto pt-4'>
              {previewColumns.length === 0 ? (
                <div className='flex flex-1 items-center justify-center'>
                  <NoData title='出力するカラムを選択してください' size='sm' />
                </div>
              ) : (
                <table className='border-collapse text-sm'>
                  {includeHeader && (
                    <thead>
                      <tr>
                        {previewColumns.map((col) => (
                          <th
                            key={col.key}
                            className='whitespace-nowrap border px-3 py-2 text-left font-medium'
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {previewData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {previewColumns.map((col) => (
                          <td
                            key={col.key}
                            className='max-w-[200px] truncate whitespace-nowrap border px-3 py-2'
                          >
                            {formatCellValue(
                              (row as Record<string, unknown>)[col.key],
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* 右側: 設定 */}
          <div className='flex min-h-0 flex-col rounded-lg border bg-gray-50'>
            <h3 className='flex shrink-0 items-center gap-2 rounded-t-lg p-4 pb-2 text-sm font-medium'>
              <Columns3 className='h-4 w-4 text-muted-foreground' />
              出力カラム
              <span className='text-muted-foreground'>
                ({includedColumns.size} / {targetColumns.length})
              </span>
            </h3>
            <div className='flex-1 space-y-1 overflow-y-auto p-4'>
              {columnOrder.map((key, index) => {
                const column = getColumn(key);
                if (!column) return null;
                return (
                  <CsvExportColumnItem
                    key={key}
                    label={column.label ?? column.key}
                    isSelected={selectedKey === key}
                    isIncluded={includedColumns.has(key)}
                    isFirst={index === 0}
                    isLast={index === columnOrder.length - 1}
                    onSelect={() => selectKey(key)}
                    onToggleInclude={() => toggleInclude(key)}
                    onMoveUp={() => moveUp(key)}
                    onMoveDown={() => moveDown(key)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className='shrink-0 flex-row justify-between px-6 pb-6 pt-4 sm:justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex gap-2'>
              <Button type='button' variant='ghost' onClick={reset}>
                <RotateCcw className='mr-1 h-4 w-4' />
                リセット
              </Button>
              <Button type='button' variant='ghost' onClick={selectAll}>
                全て選択
              </Button>
              <Button type='button' variant='ghost' onClick={deselectAll}>
                全て解除
              </Button>
            </div>
            <div className='flex items-center gap-4 border-l pl-4'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>ヘッダー:</span>
                <Select
                  value={includeHeader ? 'include' : 'exclude'}
                  onValueChange={(value) =>
                    setIncludeHeader(value === 'include')
                  }
                >
                  <SelectTrigger className='h-8 w-[100px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='include'>含める</SelectItem>
                    <SelectItem value='exclude'>含めない</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>
                  文字コード:
                </span>
                <Select
                  value={encoding}
                  onValueChange={(value) => setEncoding(value as CsvEncoding)}
                >
                  <SelectTrigger className='h-8 w-[120px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='utf-8'>UTF-8</SelectItem>
                    <SelectItem value='shift-jis'>Shift-JIS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              <X className='mr-1 h-4 w-4' />
              キャンセル
            </Button>
            <Button
              type='button'
              onClick={handleExport}
              disabled={includedColumns.size === 0}
            >
              <FileDown className='mr-1 h-4 w-4' />
              {includedColumns.size}件をエクスポート
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
