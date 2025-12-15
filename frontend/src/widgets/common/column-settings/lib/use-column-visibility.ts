'use client';

import { useState, useCallback } from 'react';

interface UseColumnVisibilityProps {
  initialVisibleKeys: string[];
}

/**
 * テーブル表示設定のロジック
 * - 列の表示/非表示
 * - 列の順序変更
 * - リセット/全て非表示/全て表示
 */
export function useColumnVisibility({ initialVisibleKeys }: UseColumnVisibilityProps) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // 初期化
  const initialize = useCallback(() => {
    setVisibleKeys(initialVisibleKeys);
    setHiddenKeys([]);
    setSelectedKey(null);
  }, [initialVisibleKeys]);

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
  const moveUp = useCallback((keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setVisibleKeys : setHiddenKeys;
    const index = keys.indexOf(key);
    if (index <= 0) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  // 下に移動
  const moveDown = useCallback((keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setVisibleKeys : setHiddenKeys;
    const index = keys.indexOf(key);
    if (index < 0 || index >= keys.length - 1) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  // リセット
  const reset = useCallback(() => {
    setVisibleKeys(initialVisibleKeys);
    setHiddenKeys([]);
    setSelectedKey(null);
  }, [initialVisibleKeys]);

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

  // 表示キーに追加（カラム追加時に使用）
  const addToVisible = useCallback((key: string) => {
    setVisibleKeys((prev) => [...prev, key]);
  }, []);

  // キーを削除（カラム削除時に使用）
  const removeKey = useCallback((key: string) => {
    setVisibleKeys((prev) => prev.filter((k) => k !== key));
    setHiddenKeys((prev) => prev.filter((k) => k !== key));
  }, []);

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
    addToVisible,
    removeKey,
  };
}
