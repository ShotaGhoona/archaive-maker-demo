'use client';

import { useState, useCallback, useMemo } from 'react';

export interface FilterItem {
  key: string;
  visible: boolean;
}

interface FilterField {
  key: string;
  label: string;
  type?: string;
}

interface UseFilterVisibilityProps {
  filterFields: FilterField[];
}

/**
 * フィルター表示設定のロジック
 * - フィルターの表示/非表示
 * - フィルターの順序変更（ドラッグ&ドロップ対応）
 * - リセット/全て非表示/全て表示
 */
export function useFilterVisibility({
  filterFields,
}: UseFilterVisibilityProps) {
  const [items, setItems] = useState<FilterItem[]>([]);

  // 初期化
  const initialize = useCallback(() => {
    setItems(filterFields.map((f) => ({ key: f.key, visible: true })));
  }, [filterFields]);

  // 表示/非表示の切り替え
  const toggleVisibility = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, visible: !item.visible } : item,
      ),
    );
  }, []);

  // 順序変更（ドラッグ&ドロップ後のコールバック）
  const reorder = useCallback((newItems: FilterItem[]) => {
    setItems(newItems);
  }, []);

  // リセット
  const reset = useCallback(() => {
    setItems(filterFields.map((f) => ({ key: f.key, visible: true })));
  }, [filterFields]);

  // 全て非表示
  const hideAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: false })));
  }, []);

  // 全て表示
  const showAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: true })));
  }, []);

  // ラベル取得
  const getLabel = useCallback(
    (key: string) => filterFields.find((f) => f.key === key)?.label || key,
    [filterFields],
  );

  // 互換性のため、visibleKeysとhiddenKeysを計算
  const visibleKeys = useMemo(
    () => items.filter((item) => item.visible).map((item) => item.key),
    [items],
  );

  const hiddenKeys = useMemo(
    () => items.filter((item) => !item.visible).map((item) => item.key),
    [items],
  );

  return {
    items,
    visibleKeys,
    hiddenKeys,
    initialize,
    toggleVisibility,
    reorder,
    reset,
    hideAll,
    showAll,
    getLabel,
  };
}
