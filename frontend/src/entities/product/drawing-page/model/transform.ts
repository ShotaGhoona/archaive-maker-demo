// ============================================
// DrawingPage 変換関数（DTO → Entity）
// ============================================

import type { DrawingPageDTO, DrawingPageListDTO } from './dto';
import type { DrawingPage, DrawingPageList } from './entity';

/**
 * DrawingPageDTO → DrawingPage
 * 1対1の基本変換のみ（snake_case → camelCase、string → Date）
 */
export function toDrawingPage(dto: DrawingPageDTO): DrawingPage {
  return {
    // 必須フィールド
    id: dto.id,
    ulid: dto.ulid,
    drawingFileId: dto.drawing_file_id,
    drawingNumber: dto.drawing_number,
    pageNumber: dto.page_number,
    isShownSimilarSearch: dto.is_shown_similar_search,
    createdBy: dto.created_by,
    updatedBy: dto.updated_by,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),

    // オプションフィールド
    externalDrawingNumber: dto.external_drawing_number ?? null,
    s3Url: dto.s3_url ?? null,
    remarks: dto.remarks ?? null,
    drawingCategoryId: dto.drawing_category_id ?? null,
    seqNumber: dto.seq_number ?? null,
    rotationAngle: dto.rotation_angle ?? 0,
    drawingFileName: dto.drawing_file_name ?? null,
    drawingFileExtension: dto.drawing_file_extension ?? null,
    leafProductId: dto.leaf_product_id ?? null,
    leafProductName: dto.leaf_product_name ?? null,
    leafProductRevisionNumber: dto.leaf_product_revision_number ?? null,
    leafProductCustomItem: dto.leaf_product_custom_item ?? null,
    customerId: dto.customer_id ?? null,
    drawingCategoryName: dto.drawing_category_name ?? null,
    createdByName: dto.created_by_name ?? null,
    updatedByName: dto.updated_by_name ?? null,
    customerName: dto.customer_name ?? null,
  };
}

/**
 * DrawingPageListDTO → DrawingPageList
 */
export function toDrawingPageList(dto: DrawingPageListDTO): DrawingPageList {
  return {
    items: dto.items.map(toDrawingPage),
    totalCount: dto.total_count,
    page: dto.page,
    perPage: dto.per_page,
    hasMore: dto.has_more,
  };
}
