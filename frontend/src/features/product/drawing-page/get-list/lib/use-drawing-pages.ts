// ============================================
// 図面ページ一覧取得 Hook
// ============================================

import { useQuery } from '@tanstack/react-query';
import { drawingPageApi } from '@/entities/product/drawing-page/api/drawing-page-api';
import { toDrawingPageList } from '@/entities/product/drawing-page/model/transform';
import type { DrawingPageList } from '@/entities/product/drawing-page/model/entity';

// ============================================
// 型定義
// ============================================

interface UseDrawingPagesParams {
  page: number;
  perPage: number;
  enabled?: boolean;
}

// ============================================
// Query Keys
// ============================================

export const drawingPageKeys = {
  all: ['drawing-pages'] as const,
  lists: () => [...drawingPageKeys.all, 'list'] as const,
  list: (params: { page: number; perPage: number }) =>
    [...drawingPageKeys.lists(), params] as const,
};

// ============================================
// Hook（Entity型を返す）
// ============================================

/**
 * 図面ページ一覧を取得
 *
 * 内部処理:
 * 1. API からDTO取得
 * 2. DTO → Entity 変換
 */
export function useDrawingPages(params: UseDrawingPagesParams) {
  const { page, perPage, enabled = true } = params;

  return useQuery({
    queryKey: drawingPageKeys.list({ page, perPage }),
    queryFn: async (): Promise<DrawingPageList> => {
      const dto = await drawingPageApi.getList({ page, perPage });
      return toDrawingPageList(dto);
    },
    enabled,
  });
}
