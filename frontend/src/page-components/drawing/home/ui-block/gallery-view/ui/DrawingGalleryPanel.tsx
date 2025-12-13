'use client';

import { useState } from 'react';

import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import type { PaginationConfig } from '@/widgets/view/table-view/model/types';
import type { GridColumns } from '@/widgets/view/gallery-view/model/types';

import { drawingGalleryCardConfig } from '../config/gallery-config';
import { dummyDrawings, type DrawingItem } from '../../../dummy-data/drawings';

export function DrawingGalleryPanel() {
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    totalItems: dummyDrawings.length,
    pageSizeOptions: [10, 20, 50],
  });
  const [galleryColumns, setGalleryColumns] = useState<GridColumns>(4);

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

  const handleCardClick = (item: DrawingItem) => {
    alert(`図面詳細へ遷移（未実装）: ${item.drawingNumber} - ${item.name}`);
    // TODO: router.push(`/drawing/${item.id}`)
  };

  return (
    <GalleryViewWidget
      data={dummyDrawings}
      cardConfig={drawingGalleryCardConfig}
      pagination={pagination}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onCardClick={handleCardClick}
      columns={galleryColumns}
      onColumnsChange={setGalleryColumns}
    />
  );
}
