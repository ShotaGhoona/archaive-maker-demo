// 型定義（mock6LayerRobotArm.jsonに合わせた構造）

export interface DrawingPage {
  id: string;
  ulid: string;
  seqNumber: number;
  drawingNumber: string;
  externalDrawingNumber: string;
  drawingCategoryId: string;
  pageNumber: number;
  s3Url: string;
  remarks: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Drawing {
  id: string;
  ulid: string;
  name: string;
  fileExtension: string;
  s3Url: string;
  previewImageUrl: string;
  remarks: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  pages: DrawingPage[];
}

export interface DocumentVersion {
  id: string;
  ulid: string;
  version: number;
  name: string;
  s3Url: string;
  previewImageUrl: string;
  customItems: Record<string, unknown>;
  remarks: string;
  isPasswordProtected: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  ulid: string;
  seqNumber: number;
  typeId: string;
  typeName: string;
  directoryId: string;
  createdAt: string;
  updatedAt: string;
  versions: DocumentVersion[];
}

// ディレクトリノード
export interface DirectoryNode {
  id: string;
  ulid: string;
  type: 'directory';
  seqNumber: number;
  directoryTypeId: string;
  directoryTypeName: string;
  name: string;
  customItems: Record<string, unknown>;
  remarks: string;
  customerId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
  children: BomTreeNode[];
}

// リーフプロダクトノード
export interface LeafProductNode {
  id: string;
  ulid: string;
  type: 'leaf-product';
  name: string;
  revisionSetId: string;
  revisionNumber: number;
  isLatest: boolean;
  quantity: number;
  customItems: Record<string, unknown>;
  remarks: string;
  directoryId: string;
  customerId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  drawings: Drawing[];
}

export type BomTreeNode = DirectoryNode | LeafProductNode;

// BOMデータ全体
export interface BomData {
  id: string;
  customerId: string;
  customerName: string;
  root: DirectoryNode;
}

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
