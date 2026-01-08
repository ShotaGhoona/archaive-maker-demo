import type { Item, ItemRev } from '@/shared/dummy-data/bom-v2';

/**
 * Canvas用BOMツリーノード
 * Item + ItemRev + 員数を持つ
 */
export interface CanvasBomNode {
  item: Item;
  itemRev: ItemRev;
  quantity: number;
  children: CanvasBomNode[];
}

// フラット化されたノード（座標付き）
export interface FlattenedNode {
  id: string; // ツリー内で一意のID（同じItemRevが複数箇所で使われる場合があるため）
  node: CanvasBomNode;
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

// ミニマップ用ノード
export interface MinimapNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// ツリーレイアウト結果
export interface BomTreeLayout {
  nodes: FlattenedNode[];
  connectors: Connector[];
  minimapNodes: MinimapNode[];
}
