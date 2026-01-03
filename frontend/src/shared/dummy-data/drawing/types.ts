// マルチセレクト用の型
export interface TagItem {
  label: string;
  color: string;
}

// サムネイル（書き込み済みバージョン）の型定義
export interface DrawingThumbnail {
  id: string;
  drawingId: string;
  name: string;
  thumbnailUrl: string;
  createdBy: string;
  createdAt: string;
  isOriginal: boolean; // オリジナル図面かどうか
}

// 図面の型定義
export interface DrawingItem {
  id: string;
  productId: string;
  drawingNumber: string;
  name: string;
  revision: string;
  status: TagItem[];
  fileFormat: string;
  fileSize: string;
  scale: string;
  sheetSize: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  thumbnails: DrawingThumbnail[];
}

// 製品の型定義
export interface ProductDetail {
  id: string;
  productNumber: string;
  name: string;
  revision: string;
  status: TagItem[];
  category: string;
  project: string;
  department: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  approvedBy: string;
  approvedAt: string | null;
  material: string;
  tags: TagItem[];
  remarks: string;
  drawings: DrawingItem[];
}
