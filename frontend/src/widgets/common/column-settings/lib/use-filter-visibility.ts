'use client';

import { useState, useCallback } from 'react';

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
 * - フィルターの順序変更
 * - リセット/全て非表示/全て表示
 */
export function useFilterVisibility({
  filterFields,
}: UseFilterVisibilityProps) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // 初期化
  const initialize = useCallback(() => {
    setVisibleKeys(filterFields.map((f) => f.key));
    setHiddenKeys([]);
    setSelectedKey(null);
  }, [filterFields]);

  // 非表示に移動
  const moveToHidden = useCallback((key: string) => {
    setVisibleKeys((prev) => prev.filter((k) => k !== key));
    setHiddenKeys((prev) => [...prev, key]);
    setSelectedKey(key);
  }, []);

  // 表示に移動
  const moveToVisible = useCallback((key: string) => {
    setHiddenKeys((prev) => prev.filter((k) => k !== key));
    setVisibleKeys((prev) => [...prev, key]);
    setSelectedKey(key);
  }, []);

  // 上に移動
  const moveUp = useCallback(
    (keys: string[], isVisible: boolean, key: string) => {
      const setKeys = isVisible ? setVisibleKeys : setHiddenKeys;
      const index = keys.indexOf(key);
      if (index <= 0) return;
      setKeys((prev) => {
        const next = [...prev];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        return next;
      });
    },
    [],
  );

  // 下に移動
  const moveDown = useCallback(
    (keys: string[], isVisible: boolean, key: string) => {
      const setKeys = isVisible ? setVisibleKeys : setHiddenKeys;
      const index = keys.indexOf(key);
      if (index < 0 || index >= keys.length - 1) return;
      setKeys((prev) => {
        const next = [...prev];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        return next;
      });
    },
    [],
  );

  // リセット
  const reset = useCallback(() => {
    setVisibleKeys(filterFields.map((f) => f.key));
    setHiddenKeys([]);
    setSelectedKey(null);
  }, [filterFields]);

  // 全て非表示
  const hideAll = useCallback(() => {
    setHiddenKeys((prev) => [...visibleKeys, ...prev]);
    setVisibleKeys([]);
  }, [visibleKeys]);

  // 全て表示
  const showAll = useCallback(() => {
    setVisibleKeys((prev) => [...hiddenKeys, ...prev]);
    setHiddenKeys([]);
  }, [hiddenKeys]);

  // ラベル取得
  const getLabel = useCallback(
    (key: string) => filterFields.find((f) => f.key === key)?.label || key,
    [filterFields],
  );

  return {
    visibleKeys,
    hiddenKeys,
    selectedKey,
    setSelectedKey,
    initialize,
    moveToHidden,
    moveToVisible,
    moveUp,
    moveDown,
    reset,
    hideAll,
    showAll,
    getLabel,
  };
}
