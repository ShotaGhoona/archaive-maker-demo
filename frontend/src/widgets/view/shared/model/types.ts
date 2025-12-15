// ページネーション設定
export interface PaginationConfig {
  // 現在のページ（1始まり）
  currentPage: number;
  // 1ページあたりの件数
  pageSize: number;
  // 総件数
  totalItems: number;
  // 選択可能なページサイズ
  pageSizeOptions?: number[];
}

// グリッド列数オプション
export type GridColumns = 2 | 3 | 4 | 5 | 6 | 'responsive';

// ビューモード
export type ViewMode = "table" | "gallery";
