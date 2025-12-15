// ============================================
// DrawingPage Entity型（フロントで使いやすい形、camelCase）
// ============================================

/**
 * 図面ページEntity
 * DTOから基本変換後の型（camelCase、Date型）
 */
export interface DrawingPage {
  // 必須フィールド
  id: number;
  ulid: string;
  drawingFileId: number;
  drawingNumber: string | null;
  pageNumber: number;
  isShownSimilarSearch: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;

  // オプションフィールド
  externalDrawingNumber: string | null;
  s3Url: string | null;
  remarks: string | null;
  drawingCategoryId: number | null;
  seqNumber: number | null;
  rotationAngle: number;
  drawingFileName: string | null;
  drawingFileExtension: string | null;
  leafProductId: number | null;
  leafProductName: string | null;
  leafProductRevisionNumber: number | null;
  leafProductCustomItem: Record<string, unknown> | null;
  customerId: number | null;
  drawingCategoryName: string | null;
  createdByName: string | null;
  updatedByName: string | null;
  customerName: string | null;
}

/**
 * 図面ページ一覧Entity
 */
export interface DrawingPageList {
  items: DrawingPage[];
  totalCount: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}
