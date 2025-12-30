import type { BomTreeNode } from '@/shared/dummy-data/bom/types';

// フラット化されたノード（座標付き）
export interface FlattenedNode {
  node: BomTreeNode;
  x: number;
  y: number;
  parentId: string | null;
}
