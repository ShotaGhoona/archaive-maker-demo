'use client';

import { useState, useCallback, useMemo } from 'react';

export interface ColumnItem {
  key: string;
  visible: boolean;
}

interface UseColumnVisibilityProps {
  initialVisibleKeys: string[];
}

/**
 * テーブル表示設定のロジック
 * - 列の表示/非表示
 * - 列の順序変更（ドラッグ&ドロップ対応）
 * - リセット/全て非表示/全て表示
 */
export function useColumnVisibility({
  initialVisibleKeys,
}: UseColumnVisibilityProps) {
  const [items, setItems] = useState<ColumnItem[]>([]);

  // 初期化
  const initialize = useCallback(() => {
    setItems(initialVisibleKeys.map((key) => ({ key, visible: true })));
  }, [initialVisibleKeys]);

  // 表示/非表示の切り替え
  const toggleVisibility = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, visible: !item.visible } : item,
      ),
    );
  }, []);

  // 順序変更（ドラッグ&ドロップ後のコールバック）
  const reorder = useCallback((newItems: ColumnItem[]) => {
    setItems(newItems);
  }, []);

  // リセット
  const reset = useCallback(() => {
    setItems(initialVisibleKeys.map((key) => ({ key, visible: true })));
  }, [initialVisibleKeys]);

  // 全て非表示
  const hideAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: false })));
  }, []);

  // 全て表示
  const showAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, visible: true })));
  }, []);

  // 表示キーに追加（カラム追加時に使用）
  const addToVisible = useCallback((key: string) => {
    setItems((prev) => [...prev, { key, visible: true }]);
  }, []);

  // キーを削除（カラム削除時に使用）
  const removeKey = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

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
    addToVisible,
    removeKey,
  };
}
