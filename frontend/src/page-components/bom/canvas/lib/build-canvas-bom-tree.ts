/**
 * v2データからCanvas用BOMツリーを構築するユーティリティ
 */

import type { CanvasBomNode } from '../ui-block/bom-tree/model/types';
import {
  explodeBom,
  getItemById,
  type Item,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';

/**
 * v2のexplodeBom結果からCanvasBomNodeツリーを構築
 */
export function buildCanvasBomTree(
  rootItem: Item,
  rootItemRev: ItemRev
): CanvasBomNode | null {
  // ルートノードを作成
  const root: CanvasBomNode = {
    item: rootItem,
    itemRev: rootItemRev,
    quantity: 1,
    children: [],
  };

  // BOM展開
  const explosion = explodeBom(rootItemRev.id);

  // フラットな展開結果をツリー構造に変換
  const nodeMap = new Map<string, CanvasBomNode>();
  nodeMap.set(rootItemRev.id, root);

  // レベル順にソートして処理
  const sorted = [...explosion].sort((a, b) => a.level - b.level);

  for (const row of sorted) {
    const node: CanvasBomNode = {
      item: row.childItem,
      itemRev: row.childItemRev,
      quantity: row.quantity,
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
}
