import type { ReactNode } from 'react';
import type { PaginationConfig, GridColumns } from '@/widgets/view/shared/model/types';

// re-export for convenience
export type { PaginationConfig, GridColumns };

// ギャラリーカード設定
export interface GalleryCardConfig<T> {
  // サムネイル画像のキー
  thumbnailKey: keyof T;
  // サムネイル下のコンテンツレンダラー
  contentRenderer: (item: T, index: number) => ReactNode;
  // ホバー時のオーバーレイレンダラー（サムネイル上に表示）
  overlayRenderer?: (item: T, index: number) => ReactNode;
  // カスタムカードレンダラー（カード全体をカスタマイズする場合）
  cardRenderer?: (item: T, index: number) => ReactNode;
}

// ギャラリービューのProps
export interface GalleryViewProps<T> {
  // 表示するデータ
  data: T[];
  // カード設定
  cardConfig: GalleryCardConfig<T>;
  // ページネーション設定
  pagination?: PaginationConfig;
  // ページ変更時のコールバック
  onPageChange?: (page: number) => void;
  // ページサイズ変更時のコールバック
  onPageSizeChange?: (pageSize: number) => void;
  // カードクリック時のコールバック
  onCardClick?: (item: T, index: number) => void;
  // ローディング状態
  isLoading?: boolean;
  // グリッドカラム数（デフォルト: 4）
  columns?: GridColumns;
  // グリッドカラム数変更時のコールバック
  onColumnsChange?: (columns: GridColumns) => void;
}
