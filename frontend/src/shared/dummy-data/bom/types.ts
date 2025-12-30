// BOM 型定義

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

// ノード共通フィールド
interface BaseNode {
  id: string;
  ulid: string;
  name: string;
  customItems: Record<string, unknown>;
  remarks: string;
  customerId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

// 製品ノード（最上位）
export interface ProductNode extends BaseNode {
  type: 'product';
  seqNumber: number;
  directoryTypeId: string;
  directoryTypeName: string;
  documents: Document[];
  children: BomTreeNode[];
}

// アセンブリノード（中間）
export interface AssyNode extends BaseNode {
  type: 'assy';
  seqNumber: number;
  directoryTypeId: string;
  directoryTypeName: string;
  documents: Document[];
  children: BomTreeNode[];
}

// パーツノード（末端）
export interface PartsNode extends BaseNode {
  type: 'parts';
  revisionSetId: string;
  revisionNumber: number;
  isLatest: boolean;
  quantity: number;
  directoryId: string;
  drawings: Drawing[];
}

export type BomTreeNode = ProductNode | AssyNode | PartsNode;

// BOMデータ全体
export interface BomData {
  id: string;
  customerId: string;
  customerName: string;
  root: ProductNode;
}
