'use client';

import { useMemo } from 'react';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { BomTreeNodeItem } from './components/BomTreeNodeItem';
import {
  explodeBom,
  getItemById,
  type Item,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';

interface BomTreeBlockProps {
  productRev: ItemRev | null;
  selectedItemRevId: string | null;
  onSelectNode: (itemRev: ItemRev) => void;
  /** 検索関連props */
  searchQuery?: string;
  highlightedNodeId?: string | null;
  matchedNodeIds?: string[];
  forceExpandIds?: Set<string>;
}

/** ツリーノード型 */
export interface BomTreeNode {
  itemRev: ItemRev;
  item: Item;
  quantity: number;
  level: number;
  children: BomTreeNode[];
}

export function BomTreeBlock({
  productRev,
  selectedItemRevId,
  onSelectNode,
  searchQuery,
  highlightedNodeId,
  matchedNodeIds,
  forceExpandIds,
}: BomTreeBlockProps) {
  // BOMツリーデータを構築
  const treeData = useMemo(() => {
    if (!productRev) return null;

    const productItem = getItemById(productRev.itemId);
    if (!productItem) return null;

    const explosion = explodeBom(productRev.id);

    // ルートノード
    const root: BomTreeNode = {
      itemRev: productRev,
      item: productItem,
      quantity: 1,
      level: 0,
      children: [],
    };

    // フラットな展開結果をツリー構造に変換
    const nodeMap = new Map<string, BomTreeNode>();
    nodeMap.set(productRev.id, root);

    // レベル順にソート
    const sorted = [...explosion].sort((a, b) => a.level - b.level);

    for (const row of sorted) {
      const node: BomTreeNode = {
        itemRev: row.childItemRev,
        item: row.childItem,
        quantity: row.quantity,
        level: row.level,
        children: [],
      };

      nodeMap.set(row.childItemRevId, node);

      // 親ノードを探して追加
      const parent = nodeMap.get(row.parentItemRevId);
      if (parent) {
        parent.children.push(node);
      }
    }

    return root;
  }, [productRev]);

  // 製品未選択時
  if (!treeData) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <NoData
          title="製品を選択してください"
          description="上部のパンくずリストから製品を選択すると、BOM構成が表示されます"
          size="default"
        />
      </div>
    );
  }

  return (
    <Card className="min-h-0 flex-1 overflow-auto p-4">
      <div className="space-y-1">
        <BomTreeNodeItem
          node={treeData}
          level={0}
          selectedItemRevId={selectedItemRevId}
          onSelectNode={onSelectNode}
          defaultOpenLevel={2}
          searchQuery={searchQuery}
          highlightedNodeId={highlightedNodeId}
          matchedNodeIds={matchedNodeIds}
          forceExpandIds={forceExpandIds}
        />
      </div>
    </Card>
  );
}

// treeDataを外部で使えるようにエクスポート
export function buildBomTree(productRev: ItemRev | null): BomTreeNode | null {
  if (!productRev) return null;

  const productItem = getItemById(productRev.itemId);
  if (!productItem) return null;

  const explosion = explodeBom(productRev.id);

  const root: BomTreeNode = {
    itemRev: productRev,
    item: productItem,
    quantity: 1,
    level: 0,
    children: [],
  };

  const nodeMap = new Map<string, BomTreeNode>();
  nodeMap.set(productRev.id, root);

  const sorted = [...explosion].sort((a, b) => a.level - b.level);

  for (const row of sorted) {
    const node: BomTreeNode = {
      itemRev: row.childItemRev,
      item: row.childItem,
      quantity: row.quantity,
      level: row.level,
      children: [],
    };

    nodeMap.set(row.childItemRevId, node);

    const parent = nodeMap.get(row.parentItemRevId);
    if (parent) {
      parent.children.push(node);
    }
  }

  return root;
}
