'use client';

import { useState, useCallback, useRef } from 'react';
import type { ColumnConfig } from '../model/types';

export interface ColumnWidths {
  [key: string]: number;
}

export function useColumnResize<T>(columns: ColumnConfig<T>[]) {
  // 初期の列幅を設定
  const getInitialWidths = useCallback(() => {
    const widths: ColumnWidths = {};
    columns.forEach((col) => {
      const key = String(col.key);
      widths[key] = col.width ?? 150;
    });
    return widths;
  }, [columns]);

  const [columnWidths, setColumnWidths] =
    useState<ColumnWidths>(getInitialWidths);
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
    minWidth: number;
  } | null>(null);

  // リサイズ中
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingRef.current) return;

    const { key, startX, startWidth, minWidth } = resizingRef.current;
    const diff = e.clientX - startX;
    const newWidth = Math.max(minWidth, startWidth + diff);

    setColumnWidths((prev) => ({
      ...prev,
      [key]: newWidth,
    }));
  }, []);

  // リサイズ終了
  const handleResizeEnd = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [handleResizeMove]);

  // リサイズ開始
  const handleResizeStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const column = columns.find((col) => String(col.key) === key);

      // checkbox, actions列はリサイズ不可
      if (
        column?.columnType === 'checkbox' ||
        column?.columnType === 'actions'
      ) {
        return;
      }
      const minWidth = column?.minWidth ?? 50;
      const currentWidth = columnWidths[key] ?? column?.width ?? 150;

      resizingRef.current = {
        key,
        startX: e.clientX,
        startWidth: currentWidth,
        minWidth,
      };

      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [columns, columnWidths, handleResizeMove, handleResizeEnd],
  );

  // 列幅をリセット
  const resetColumnWidths = useCallback(() => {
    setColumnWidths(getInitialWidths());
  }, [getInitialWidths]);

  return {
    columnWidths,
    handleResizeStart,
    resetColumnWidths,
  };
}
