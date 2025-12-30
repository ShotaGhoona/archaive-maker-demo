import type { BomTreeNode } from '@/shared/dummy-data/bom/types';

// フラット化されたノード（座標付き）
export interface FlattenedNode {
  node: BomTreeNode;
  x: number;
  y: number;
  parentId: string | null;
}

// コネクタ情報
export interface Connector {
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}
