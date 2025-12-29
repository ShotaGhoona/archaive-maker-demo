import type { BomTreeNode, FlattenedNode, Connector } from '../ui-block/node/dummy-data/node-data';

// レイアウト定数
const NODE_WIDTH = 250;
const NODE_HEIGHT = 150;
const HORIZONTAL_GAP = 100;
const VERTICAL_GAP = 40;
const INITIAL_X = 100;
const INITIAL_Y = 100;

// サブツリーの高さを計算（子孫全体を含む高さ）
function calculateSubtreeHeight(node: BomTreeNode): number {
  if (node.type !== 'directory' || !node.children?.length) {
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

// ツリーをレイアウト（親ノードを子のサブツリー中央に配置）
function layoutTree(
  node: BomTreeNode,
  depth: number,
  startY: number,
  subtreeHeight: number,
  parentId: string | null
): { nodes: FlattenedNode[]; connectors: Connector[] } {
  const nodes: FlattenedNode[] = [];
  const connectors: Connector[] = [];

  const x = INITIAL_X + depth * (NODE_WIDTH + HORIZONTAL_GAP);
  // 親ノードをサブツリーの中央に配置
  const y = startY + (subtreeHeight - NODE_HEIGHT) / 2;

  nodes.push({
    node,
    x,
    y,
    parentId,
  });

  // 子要素を処理
  if (node.type === 'directory' && node.children && node.children.length > 0) {
    let childStartY = startY;

    for (const child of node.children) {
      const childSubtreeHeight = calculateSubtreeHeight(child);
      const childResult = layoutTree(child, depth + 1, childStartY, childSubtreeHeight, node.id);

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
export function calculateBomTreeLayout(root: BomTreeNode): {
  nodes: FlattenedNode[];
  connectors: Connector[];
} {
  const rootSubtreeHeight = calculateSubtreeHeight(root);
  return layoutTree(root, 0, INITIAL_Y, rootSubtreeHeight, null);
}
