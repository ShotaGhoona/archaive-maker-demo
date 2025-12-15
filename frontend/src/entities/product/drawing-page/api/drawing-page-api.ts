// ============================================
// DrawingPage API クライアント
// ============================================

import httpClient from '@/shared/api/client/http-client';
import type { DrawingPageListDTO } from '../model/dto';
import { getDummyDrawingPageListDTO } from '../mock/dummy-data';

// 環境変数が 'false' の場合のみ実APIを使用、それ以外はMock
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

/**
 * 図面ページAPI
 */
export const drawingPageApi = {
  /**
   * 図面ページ一覧を取得
   * GET /v1/leaf-products/drawing-pages/pages
   */
  getList: async (params: {
    page?: number;
    perPage?: number;
  }): Promise<DrawingPageListDTO> => {
    if (USE_MOCK) {
      // 開発時: ダミーデータを返す（遅延をシミュレート）
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getDummyDrawingPageListDTO(params.page, params.perPage);
    }

    const response = await httpClient.get<DrawingPageListDTO>(
      '/v1/leaf-products/drawing-pages/pages',
      {
        params: {
          page: params.page,
          per_page: params.perPage,
        },
      },
    );
    return response.data;
  },

  /**
   * 図面ページを検索
   * POST /v1/leaf-products/drawing-pages/search
   */
  search: async (params: {
    page?: number;
    perPage?: number;
    filters?: Record<string, unknown>;
  }): Promise<DrawingPageListDTO> => {
    if (USE_MOCK) {
      // 開発時: ダミーデータを返す（フィルターは無視）
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getDummyDrawingPageListDTO(params.page, params.perPage);
    }

    const response = await httpClient.post<DrawingPageListDTO>(
      '/v1/leaf-products/drawing-pages/search',
      {
        page: params.page,
        per_page: params.perPage,
        ...params.filters,
      },
    );
    return response.data;
  },
};
