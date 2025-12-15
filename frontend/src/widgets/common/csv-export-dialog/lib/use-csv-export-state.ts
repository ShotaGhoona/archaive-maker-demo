'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  CsvExportColumnConfig,
  CsvExportState,
  CsvEncoding,
} from '../model/types';

interface UseCsvExportStateOptions {
  columns: CsvExportColumnConfig[];
  open: boolean;
}

/**
 * CSV エクスポートダイアログの状態管理フック
 */
export function useCsvExportState({
  columns,
  open,
}: UseCsvExportStateOptions): CsvExportState {
  // 設定対象の列（checkbox, actions, 空ラベルを除外）
  const targetColumns = useMemo(
    () =>
      columns
        .filter((col) => {
          const key = String(col.key);
          // _で始まるキー、actionsを含むキー、空ラベルを除外
          return !key.startsWith('_') && !key.includes('actions') && col.label;
        })
        .map((col) => ({
          key: String(col.key),
          label: col.label,
        })),
    [columns],
  );

  // カラムの順序（keyの配列）
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  // 含めるカラム（keyのSet）
  const [includedColumns, setIncludedColumns] = useState<Set<string>>(
    new Set(),
  );
  // 選択中のアイテム
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  // ヘッダーを含めるか
  const [includeHeader, setIncludeHeader] = useState(true);
  // エンコーディング
  const [encoding, setEncoding] = useState<CsvEncoding>('utf-8');

  // ダイアログを開いたときに初期化
  useEffect(() => {
    if (open) {
      setColumnOrder(targetColumns.map((c) => c.key));
      setIncludedColumns(new Set(targetColumns.map((c) => c.key)));
      setSelectedKey(null);
      setIncludeHeader(true);
      setEncoding('utf-8');
    }
  }, [open, targetColumns]);

  // keyからcolumnを取得
  const getColumn = useCallback(
    (key: string) => targetColumns.find((c) => c.key === key),
    [targetColumns],
  );

  // カラムの含める/含めないを切り替え
  const toggleInclude = useCallback((key: string) => {
    setIncludedColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // 上に移動
  const moveUp = useCallback((key: string) => {
    setColumnOrder((prev) => {
      const index = prev.indexOf(key);
      if (index <= 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  // 下に移動
  const moveDown = useCallback((key: string) => {
    setColumnOrder((prev) => {
      const index = prev.indexOf(key);
      if (index < 0 || index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  // 選択
  const selectKey = useCallback((key: string | null) => {
    setSelectedKey(key);
  }, []);

  // リセット
  const reset = useCallback(() => {
    setColumnOrder(targetColumns.map((c) => c.key));
    setIncludedColumns(new Set(targetColumns.map((c) => c.key)));
    setSelectedKey(null);
    setIncludeHeader(true);
    setEncoding('utf-8');
  }, [targetColumns]);

  // 全て選択
  const selectAll = useCallback(() => {
    setIncludedColumns(new Set(targetColumns.map((c) => c.key)));
  }, [targetColumns]);

  // 全て解除
  const deselectAll = useCallback(() => {
    setIncludedColumns(new Set());
  }, []);

  return {
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
  };
}
