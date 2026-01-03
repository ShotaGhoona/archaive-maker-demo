import type { BomTreeNode } from '@/shared/dummy-data/bom/types';
import type {
  FlattenedNode,
  Connector,
  MinimapNode,
  BomTreeLayout,
} from '../model/types';
import {
  NODE_WIDTH,
  NODE_HEIGHT,
  HORIZONTAL_GAP,
  VERTICAL_GAP,
} from '@/shared/canvas/constant/size';

// 初期位置（このファイル固有）
const INITIAL_X = 100;
const INITIAL_Y = 100;

// サブツリーの高さを計算（子孫全体を含む高さ）
function calculateSubtreeHeight(node: BomTreeNode): number {
  // partsは末端ノード（childrenを持たない）
  if (node.type === 'parts') {
    return NODE_HEIGHT;
  }

  if (!node.children?.length) {
    return NODE_HEIGHT;
  }

  let totalHeight = 0;
  for (const child of node.children) {
    totalHeight += calculateSubtreeHeight(child);
  }
  // 子ノード間のギャップを追加
  totalHeight += (node.children.length - 1) * VERTICAL_GAP;

  return totalHeight;
}

// ツリーをレイアウト（親と長男が同じ高さに揃う）
function layoutTree(
  node: BomTreeNode,
  depth: number,
  startY: number,
  parentId: string | null,
): { nodes: FlattenedNode[]; connectors: Connector[] } {
  const nodes: FlattenedNode[] = [];
  const connectors: Connector[] = [];

  const x = INITIAL_X + depth * (NODE_WIDTH + HORIZONTAL_GAP);
  // 親は開始位置に配置（長男と同じ高さ）
  const y = startY;

  nodes.push({
    node,
    x,
    y,
    parentId,
  });

  // 子要素を処理（product, assyはchildrenを持つ）
  if (node.type !== 'parts' && node.children && node.children.length > 0) {
    let childStartY = startY;

    for (const child of node.children) {
      const childSubtreeHeight = calculateSubtreeHeight(child);
      const childResult = layoutTree(child, depth + 1, childStartY, node.id);

      nodes.push(...childResult.nodes);
      connectors.push(...childResult.connectors);

      // 親から子へのコネクタを追加
      const childNode = childResult.nodes[0];
      connectors.push({
        fromId: node.id,
        toId: child.id,
        fromX: x + NODE_WIDTH,
        fromY: y + NODE_HEIGHT / 2,
        toX: childNode.x,
        toY: childNode.y + NODE_HEIGHT / 2,
      });

      childStartY += childSubtreeHeight + VERTICAL_GAP;
    }
  }

  return { nodes, connectors };
}

// BOMツリーのレイアウトを計算
export function calculateBomTreeLayout(root: BomTreeNode): BomTreeLayout {
  const { nodes, connectors } = layoutTree(root, 0, INITIAL_Y, null);

  const minimapNodes: MinimapNode[] = nodes.map((flatNode) => ({
    id: flatNode.node.id,
    x: flatNode.x,
    y: flatNode.y,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  }));

  return { nodes, connectors, minimapNodes };
}
