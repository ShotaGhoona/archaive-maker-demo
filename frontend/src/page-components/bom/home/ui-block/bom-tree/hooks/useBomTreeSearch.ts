'use client';

import { useState, useMemo, useCallback } from 'react';
import type { BomTreeNode } from '../ui/BomTreeBlock';

// ツリーを再帰的に検索してマッチしたノードIDと親のパスを返す
function findMatchingNodes(
  node: BomTreeNode,
  query: string,
  parentPath: string[] = []
): { matchedIds: string[]; expandIds: Set<string> } {
  const matchedIds: string[] = [];
  const expandIds = new Set<string>();
  const lowerQuery = query.toLowerCase();

  const currentPath = [...parentPath, node.itemRev.id];

  // 品番または品名がマッチするか
  const nameMatch = node.item.name.toLowerCase().includes(lowerQuery);
  const partNumberMatch = node.item.partNumber.toLowerCase().includes(lowerQuery);

  if (nameMatch || partNumberMatch) {
    matchedIds.push(node.itemRev.id);
    // 親を全て展開対象に追加
    parentPath.forEach((id) => expandIds.add(id));
  }

  // 子を再帰的に検索
  for (const child of node.children) {
    const childResults = findMatchingNodes(child, query, currentPath);
    matchedIds.push(...childResults.matchedIds);
    childResults.expandIds.forEach((id) => expandIds.add(id));
  }

  return { matchedIds, expandIds };
}

export interface BomTreeSearchState {
  searchQuery: string;
  currentMatchIndex: number;
  matchedIds: string[];
  expandIds: Set<string>;
  currentMatchId: string | null;
  matchCount: number;
}

export interface BomTreeSearchActions {
  setSearchQuery: (query: string) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleClear: () => void;
}

export function useBomTreeSearch(
  treeData: BomTreeNode | null
): BomTreeSearchState & BomTreeSearchActions {
  const [searchQuery, setSearchQueryState] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // 検索結果を計算
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !treeData) {
      return { matchedIds: [], expandIds: new Set<string>() };
    }
    return findMatchingNodes(treeData, searchQuery);
  }, [treeData, searchQuery]);

  const { matchedIds, expandIds } = searchResults;
  const matchCount = matchedIds.length;
  const currentMatchId = matchedIds[currentMatchIndex] ?? null;

  // 検索クエリ変更時にインデックスをリセット
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    setCurrentMatchIndex(0);
  }, []);

  // 前のマッチへ
  const handlePrev = useCallback(() => {
    setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : matchCount - 1));
  }, [matchCount]);

  // 次のマッチへ
  const handleNext = useCallback(() => {
    setCurrentMatchIndex((prev) => (prev < matchCount - 1 ? prev + 1 : 0));
  }, [matchCount]);

  // 検索クリア
  const handleClear = useCallback(() => {
    setSearchQueryState('');
    setCurrentMatchIndex(0);
  }, []);

  return {
    searchQuery,
    currentMatchIndex,
    matchedIds,
    expandIds,
    currentMatchId,
    matchCount,
    setSearchQuery,
    handlePrev,
    handleNext,
    handleClear,
  };
}
