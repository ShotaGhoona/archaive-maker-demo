// ダミーデータ用の型定義（後で削除）

import mock6LayerRobotArm from './mock6LayerRobotArm.json';

export interface Product {
  id: string;
  productNumber: string;
  productName: string;
  category: string;
}

export type NodeType =
  | '製品'
  | 'Assy'
  | 'SubAssy'
  | 'SubSubAssy'
  | 'Module'
  | 'Part';

export interface BomNode {
  id: string;
  name: string;
  nodeType: NodeType;
  quantity: number;
  children?: BomNode[];
}

// 詳細情報の型
export interface BomNodeDetail {
  id: string;
  name: string;
  nodeType: NodeType;
  quantity: number;
  customItems: Record<string, string | number | boolean>;
  documents: { id: string; typeName: string; name: string }[];
  drawings: { id: string; name: string; previewImageUrl: string }[];
  createdAt: string;
  updatedAt: string;
}

// ギャラリーアイテムの型
export type GalleryItemType = 'directory' | 'document' | 'drawing';

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  name: string;
  previewImageUrl: string;
  nodeType?: NodeType; // directoryの場合のみ
}

// ツリー用の階層構造を持ったアイテム
export interface TreeNode {
  id: string;
  type: GalleryItemType;
  name: string;
  nodeType?: NodeType;
  children?: TreeNode[];
}

// JSON内の型定義
interface JsonDocument {
  id: string;
  typeName: string;
  versions: { name: string; previewImageUrl?: string }[];
}

interface JsonDrawing {
  id: string;
  name: string;
  previewImageUrl: string;
}

interface JsonDirectory {
  id: string;
  type?: string;
  name: string;
  directoryTypeName?: string;
  quantity?: number;
  customItems?: Record<string, string | number | boolean>;
  documents?: JsonDocument[];
  createdAt?: string;
  updatedAt?: string;
  children?: (JsonDirectory | JsonLeafProduct)[];
}

interface JsonLeafProduct {
  id: string;
  type: 'leaf-product';
  name: string;
  quantity: number;
  customItems?: Record<string, string | number | boolean>;
  documents?: JsonDocument[];
  drawings?: JsonDrawing[];
  createdAt?: string;
  updatedAt?: string;
}

interface JsonRoot {
  id: string;
  root: JsonDirectory;
}

// directoryTypeNameをNodeTypeに変換
function toNodeType(directoryTypeName?: string, type?: string): NodeType {
  if (type === 'leaf-product') return 'Part';
  switch (directoryTypeName) {
    case '製品':
      return '製品';
    case 'Assy':
      return 'Assy';
    case 'SubAssy':
      return 'SubAssy';
    case 'SubSubAssy':
      return 'SubSubAssy';
    case 'Module':
      return 'Module';
    default:
      return 'Part';
  }
}

// JSONからBomNodeツリーに変換
function convertToBomNode(node: JsonDirectory | JsonLeafProduct): BomNode {
  const isLeaf = node.type === 'leaf-product';
  const dir = node as JsonDirectory;

  const bomNode: BomNode = {
    id: node.id,
    name: node.name,
    nodeType: toNodeType(dir.directoryTypeName, node.type),
    quantity: node.quantity ?? 1,
  };

  if (!isLeaf && dir.children && dir.children.length > 0) {
    bomNode.children = dir.children.map(convertToBomNode);
  }

  return bomNode;
}

// 詳細情報のマップを構築
const detailMap = new Map<string, BomNodeDetail>();

function buildDetailMap(node: JsonDirectory | JsonLeafProduct): void {
  const isLeaf = node.type === 'leaf-product';
  const dir = node as JsonDirectory;
  const leaf = node as JsonLeafProduct;

  const detail: BomNodeDetail = {
    id: node.id,
    name: node.name,
    nodeType: toNodeType(dir.directoryTypeName, node.type),
    quantity: node.quantity ?? 1,
    customItems: node.customItems ?? {},
    documents: (node.documents ?? []).map((doc) => ({
      id: doc.id,
      typeName: doc.typeName,
      name: doc.versions?.[0]?.name ?? '',
    })),
    drawings: isLeaf
      ? (leaf.drawings ?? []).map((drw) => ({
          id: drw.id,
          name: drw.name,
          previewImageUrl: drw.previewImageUrl,
        }))
      : [],
    createdAt: node.createdAt ?? '',
    updatedAt: node.updatedAt ?? '',
  };

  detailMap.set(node.id, detail);

  if (!isLeaf && dir.children) {
    dir.children.forEach(buildDetailMap);
  }
}

// 製品一覧ダミーデータ
const robotArmData = mock6LayerRobotArm as unknown as JsonRoot;

// rootのchildrenを処理
if (robotArmData.root.children) {
  robotArmData.root.children.forEach(buildDetailMap);
}

export const dummyProducts: Product[] = [
  {
    id: robotArmData.id,
    productNumber: 'ARM-1000',
    productName: robotArmData.root.name,
    category: '産業機械',
  },
];

// BOMツリーを生成（rootのchildrenをBomNodeに変換）
const robotArmBomTree: BomNode[] = robotArmData.root.children
  ? robotArmData.root.children.map(convertToBomNode)
  : [];

// 製品IDからBOMツリーを取得
export function getBomByProductId(productId: string): BomNode[] {
  if (productId === robotArmData.id) {
    return robotArmBomTree;
  }
  return [];
}

// 製品情報を取得
export function getProductById(productId: string): Product | undefined {
  return dummyProducts.find((p) => p.id === productId);
}

// ノードIDから詳細情報を取得
export function getNodeDetailById(nodeId: string): BomNodeDetail | undefined {
  return detailMap.get(nodeId);
}

// 生のJSONノードのマップを構築
const rawNodeMap = new Map<string, JsonDirectory | JsonLeafProduct>();

function buildRawNodeMap(node: JsonDirectory | JsonLeafProduct): void {
  rawNodeMap.set(node.id, node);
  const isLeaf = node.type === 'leaf-product';
  if (!isLeaf) {
    const dir = node as JsonDirectory;
    if (dir.children) {
      dir.children.forEach(buildRawNodeMap);
    }
  }
}

// rootのchildrenを処理してrawNodeMapを構築
if (robotArmData.root.children) {
  robotArmData.root.children.forEach(buildRawNodeMap);
}

// デフォルトのプレビュー画像
const DEFAULT_PREVIEW_URL =
  'https://placehold.co/400x300/e2e8f0/64748b?text=No+Preview';

// ノードIDから子要素のギャラリーアイテムを取得
export function getChildGalleryItems(nodeId: string): GalleryItem[] {
  const node = rawNodeMap.get(nodeId);
  if (!node) return [];

  const items: GalleryItem[] = [];
  const isLeaf = node.type === 'leaf-product';

  // 子ディレクトリ/リーフプロダクト
  if (!isLeaf) {
    const dir = node as JsonDirectory;
    if (dir.children) {
      dir.children.forEach((child) => {
        const childIsLeaf = child.type === 'leaf-product';
        const childDir = child as JsonDirectory;
        items.push({
          id: child.id,
          type: 'directory',
          name: child.name,
          previewImageUrl: DEFAULT_PREVIEW_URL,
          nodeType: toNodeType(childDir.directoryTypeName, child.type),
        });
      });
    }
  }

  // ドキュメント
  if (node.documents) {
    node.documents.forEach((doc) => {
      const latestVersion = doc.versions?.[0];
      items.push({
        id: doc.id,
        type: 'document',
        name: latestVersion?.name ?? doc.typeName,
        previewImageUrl: latestVersion?.previewImageUrl ?? DEFAULT_PREVIEW_URL,
      });
    });
  }

  // 図面（leaf-productのみ）
  if (isLeaf) {
    const leaf = node as JsonLeafProduct;
    if (leaf.drawings) {
      leaf.drawings.forEach((drw) => {
        items.push({
          id: drw.id,
          type: 'drawing',
          name: drw.name,
          previewImageUrl: drw.previewImageUrl ?? DEFAULT_PREVIEW_URL,
        });
      });
    }
  }

  return items;
}

// ノードIDから子のBomNode[]を取得
export function getChildBomNodes(nodeId: string): BomNode[] {
  const node = rawNodeMap.get(nodeId);
  if (!node) return [];

  const isLeaf = node.type === 'leaf-product';
  if (isLeaf) return [];

  const dir = node as JsonDirectory;
  if (!dir.children) return [];

  return dir.children.map(convertToBomNode);
}

// JSONノードからTreeNodeに変換（再帰的に全階層を含む）
function convertToTreeNode(node: JsonDirectory | JsonLeafProduct): TreeNode {
  const isLeaf = node.type === 'leaf-product';
  const dir = node as JsonDirectory;
  const leaf = node as JsonLeafProduct;

  const treeNode: TreeNode = {
    id: node.id,
    type: 'directory',
    name: node.name,
    nodeType: toNodeType(dir.directoryTypeName, node.type),
  };

  const children: TreeNode[] = [];

  // 子ディレクトリ/リーフプロダクト
  if (!isLeaf && dir.children) {
    dir.children.forEach((child) => {
      children.push(convertToTreeNode(child));
    });
  }

  // ドキュメント
  if (node.documents) {
    node.documents.forEach((doc) => {
      const latestVersion = doc.versions?.[0];
      children.push({
        id: doc.id,
        type: 'document',
        name: latestVersion?.name ?? doc.typeName,
      });
    });
  }

  // 図面（leaf-productのみ）
  if (isLeaf && leaf.drawings) {
    leaf.drawings.forEach((drw) => {
      children.push({
        id: drw.id,
        type: 'drawing',
        name: drw.name,
      });
    });
  }

  if (children.length > 0) {
    treeNode.children = children;
  }

  return treeNode;
}

// ノードIDから子要素のTreeNode[]を取得（階層構造を含む）
export function getTreeNodesFromNodeId(nodeId: string): TreeNode[] {
  const node = rawNodeMap.get(nodeId);
  if (!node) return [];

  const isLeaf = node.type === 'leaf-product';
  const dir = node as JsonDirectory;
  const leaf = node as JsonLeafProduct;

  const items: TreeNode[] = [];

  // 子ディレクトリ/リーフプロダクト
  if (!isLeaf && dir.children) {
    dir.children.forEach((child) => {
      items.push(convertToTreeNode(child));
    });
  }

  // ドキュメント
  if (node.documents) {
    node.documents.forEach((doc) => {
      const latestVersion = doc.versions?.[0];
      items.push({
        id: doc.id,
        type: 'document',
        name: latestVersion?.name ?? doc.typeName,
      });
    });
  }

  // 図面（leaf-productのみ）
  if (isLeaf && leaf.drawings) {
    leaf.drawings.forEach((drw) => {
      items.push({
        id: drw.id,
        type: 'drawing',
        name: drw.name,
      });
    });
  }

  return items;
}

// BomNodeをTreeNodeに変換
export function bomNodeToTreeNode(node: BomNode): TreeNode {
  const treeNode: TreeNode = {
    id: node.id,
    type: 'directory',
    name: node.name,
    nodeType: node.nodeType,
  };

  if (node.children && node.children.length > 0) {
    treeNode.children = node.children.map(bomNodeToTreeNode);
  }

  return treeNode;
}

// BomNode[]をTreeNode[]に変換
export function bomNodesToTreeNodes(nodes: BomNode[]): TreeNode[] {
  return nodes.map(bomNodeToTreeNode);
}
