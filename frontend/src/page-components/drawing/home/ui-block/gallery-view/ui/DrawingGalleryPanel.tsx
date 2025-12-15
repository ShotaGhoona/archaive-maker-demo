'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import type { PaginationConfig } from '@/widgets/view/table-view/model/types';
import type { GridColumns } from '@/widgets/view/gallery-view/model/types';

import { useDrawingPages } from '@/features/product/drawing-page/get-list/lib/use-drawing-pages';
import type { DrawingPage } from '@/entities/product/drawing-page/model/entity';

import { GALLERY_CARD_CONFIG } from '../config/gallery-card';

export function DrawingGalleryPanel() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [galleryColumns, setGalleryColumns] = useState<GridColumns>(4);

  const { data, isLoading } = useDrawingPages({ page, perPage: pageSize });

  const pagination: PaginationConfig = {
    currentPage: page,
    pageSize: pageSize,
    totalItems: data?.totalCount ?? 0,
    pageSizeOptions: [12, 24, 48],
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleCardClick = (item: DrawingPage) => {
    router.push(`/drawing/${item.id}/basic-information`);
  };

  return (
    <GalleryViewWidget
      data={data?.items ?? []}
      cardConfig={GALLERY_CARD_CONFIG}
      pagination={pagination}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onCardClick={handleCardClick}
      columns={galleryColumns}
      onColumnsChange={setGalleryColumns}
      isLoading={isLoading}
    />
  );
}
