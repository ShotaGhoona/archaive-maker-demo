import type { ReactNode } from 'react';
import type { PaginationConfig } from '@/widgets/view/shared/model/types';

// re-export for convenience
export type { PaginationConfig };

// ソート方向
export type SortDirection = 'asc' | 'desc' | null;

// カラムタイプ
export type ColumnType =
  | 'text'
  | 'email'
  | 'date'
  | 'multiselect'
  | 'checkbox'
  | 'boolean'
  | 'actions';

// マルチセレクト型のセル値
export interface MultiSelectCellValue {
  label: string;
  color: string;
}

// カラム設定
export interface ColumnConfig<T> {
  // カラムの識別子（データのキー）
  key: keyof T | string;
  // ヘッダーに表示するラベル
  label?: string;
  // カラムのタイプ
  columnType?: ColumnType;
  // 列幅の初期値（px）
  width?: number;
  // 列幅の最小値（px）
  minWidth?: number;
  // ロック（固定列）されているかどうか
  locked?: boolean;
  // ソート可能かどうか
  sortable?: boolean;
  // 横スクロール時に固定する位置
  sticky?: 'left' | 'right';
  // カスタムセルレンダラー
  cellRenderer?: (value: T[keyof T], row: T, rowIndex: number) => ReactNode;
}

// テーブルのソート状態
export interface SortState {
  key: string;
  direction: SortDirection;
}

// テーブルビューのProps
export interface TableViewProps<T> {
  // 表示するデータ
  data: T[];
  // カラム設定
  columns: ColumnConfig<T>[];
  // ページネーション設定
  pagination?: PaginationConfig;
  // ページ変更時のコールバック
  onPageChange?: (page: number) => void;
  // ページサイズ変更時のコールバック
  onPageSizeChange?: (pageSize: number) => void;
  // ソート状態
  sortState?: SortState;
  // ソート変更時のコールバック（UIのみの場合は省略可能）
  onSortChange?: (sortState: SortState) => void;
  // 行クリック時のコールバック
  onRowClick?: (row: T, rowIndex: number) => void;
  // ローディング状態
  isLoading?: boolean;
  // 選択された行のインデックス（checkbox用）
  selectedRows?: Set<number>;
  // 行選択変更時のコールバック（checkbox用）
  onSelectionChange?: (selectedRows: Set<number>) => void;
}
