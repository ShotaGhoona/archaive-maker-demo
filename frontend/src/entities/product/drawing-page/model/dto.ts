// ============================================
// DrawingPage DTO型（APIレスポンスそのまま、snake_case）
// ============================================

/**
 * 図面ページ単体DTO
 * API: GET /v1/leaf-products/drawing-pages/{page_id}
 * API: GET /v1/leaf-products/drawing-pages/pages (items)
 */
export interface DrawingPageDTO {
  // 必須フィールド
  id: number;
  ulid: string;
  drawing_file_id: number;
  drawing_number: string | null;
  page_number: number;
  is_shown_similar_search: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;

  // オプションフィールド
  external_drawing_number?: string | null;
  s3_url?: string | null;
  remarks?: string | null;
  drawing_category_id?: number | null;
  seq_number?: number | null;
  rotation_angle?: number;
  drawing_file_name?: string | null;
  drawing_file_extension?: string | null;
  leaf_product_id?: number | null;
  leaf_product_name?: string | null;
  leaf_product_revision_number?: number | null;
  leaf_product_custom_item?: Record<string, unknown> | null;
  customer_id?: number | null;
  drawing_category_name?: string | null;
  created_by_name?: string | null;
  updated_by_name?: string | null;
  customer_name?: string | null;
}

/**
 * 図面ページ一覧レスポンスDTO
 * API: GET /v1/leaf-products/drawing-pages/pages
 * API: POST /v1/leaf-products/drawing-pages/search
 */
export interface DrawingPageListDTO {
  items: DrawingPageDTO[];
  total_count: number;
  page: number;
  per_page: number;
  has_more: boolean;
}
