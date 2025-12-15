'use client';

import { useState, useCallback } from 'react';
import type { ColumnDefinition } from '../model/types';

interface UseColumnManagementProps {
  initialDefinitions: ColumnDefinition[];
}

/**
 * テーブル設定（カラム管理）のロジック
 * - カラムの追加
 * - カラムの編集
 * - カラムの削除
 */
export function useColumnManagement({ initialDefinitions }: UseColumnManagementProps) {
  const [definitions, setDefinitions] = useState<ColumnDefinition[]>([]);

  // 初期化
  const initialize = useCallback(() => {
    setDefinitions(initialDefinitions);
  }, [initialDefinitions]);

  // カラム追加
  const addColumn = useCallback((column: ColumnDefinition) => {
    setDefinitions((prev) => [...prev, column]);
    return column.key;
  }, []);

  // カラム編集
  const editColumn = useCallback((key: string, column: ColumnDefinition) => {
    setDefinitions((prev) => prev.map((c) => (c.key === key ? column : c)));
  }, []);

  // カラム削除
  const deleteColumn = useCallback((key: string) => {
    setDefinitions((prev) => prev.filter((c) => c.key !== key));
  }, []);

  // ラベル取得
  const getLabel = useCallback(
    (key: string) => definitions.find((c) => c.key === key)?.label || key,
    [definitions]
  );

  return {
    definitions,
    initialize,
    addColumn,
    editColumn,
    deleteColumn,
    getLabel,
  };
}
