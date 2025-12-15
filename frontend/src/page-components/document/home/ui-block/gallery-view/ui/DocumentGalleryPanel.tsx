'use client';

import { useState } from 'react';

import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import type { PaginationConfig } from '@/widgets/view/table-view/model/types';
import type { GalleryCardConfig } from '@/widgets/view/gallery-view/model/types';

import {
  getDocumentTypeById,
  getDocumentDataByTypeId,
} from '../../../dummy-data/documents';

interface DocumentGalleryPanelProps {
  selectedTypeId: string;
}

export function DocumentGalleryPanel({
  selectedTypeId,
}: DocumentGalleryPanelProps) {
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 12,
    totalItems: 0,
    pageSizeOptions: [12, 24, 48],
  });

  const selectedType = getDocumentTypeById(selectedTypeId);
  const data = getDocumentDataByTypeId(selectedTypeId);

  const handleOpen = (row: unknown) => {
    const typeName = selectedType?.name || '帳票';
    alert(`${typeName}を開く（未実装）: ${JSON.stringify(row)}`);
    // TODO: router.push(`/document/${selectedTypeId}/${row.id}`)
  };

  // ギャラリービュー用のカード設定
  const galleryCardConfig: GalleryCardConfig<Record<string, unknown>> = {
    thumbnailKey: 'thumbnailUrl',
    contentRenderer: () => null,
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // TODO: API呼び出し
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
      currentPage: 1,
    }));
    // TODO: API呼び出し
  };

  const handleCardClick = (item: Record<string, unknown>) => {
    handleOpen(item);
  };

  return (
    <GalleryViewWidget
      data={data as unknown as Record<string, unknown>[]}
      cardConfig={galleryCardConfig}
      pagination={{
        ...pagination,
        totalItems: data.length,
      }}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onCardClick={handleCardClick}
    />
  );
}
