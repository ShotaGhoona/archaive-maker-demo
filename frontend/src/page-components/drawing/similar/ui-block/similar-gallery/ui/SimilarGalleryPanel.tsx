'use client';

import { useState } from 'react';
import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import type { GridColumns, PaginationConfig } from '@/widgets/view/gallery-view/model/types';
import {
  dummySimilarDrawings,
  type SimilarDrawing,
} from '../../../dummy-data/similar-drawings';
import { similarDrawingCardConfig } from '../config/card-config';

export function SimilarGalleryPanel() {
  const [columns, setColumns] = useState<GridColumns>(3);

  const handleCardClick = (item: SimilarDrawing) => {
    alert(`類似図面を選択: ${item.name}`);
  };

  const pagination: PaginationConfig = {
    currentPage: 1,
    pageSize: 24,
    totalItems: dummySimilarDrawings.length,
  };
  return (
    <div className="flex h-full flex-col bg-card pt-4 px-4">
      <h2 className="mb-4 text-lg font-semibold">類似図面</h2>
      <GalleryViewWidget<SimilarDrawing>
        data={dummySimilarDrawings}
        columns={columns}
        onColumnsChange={setColumns}
        cardConfig={similarDrawingCardConfig}
        onCardClick={handleCardClick}
        pagination={pagination}
      />
    </div>
  );
}
