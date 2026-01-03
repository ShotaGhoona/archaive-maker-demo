'use client';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import type { PaginationConfig } from '@/widgets/view/gallery-view/model/types';
import {
  dummySimilarDrawings,
  type SimilarDrawing,
} from '@/shared/dummy-data/drawing/similar-drawings';
import { similarDrawingCardConfig } from '../config/card-config';

export function SimilarGalleryPanel() {
  const handleCardClick = (item: SimilarDrawing) => {
    alert(`類似図面を選択: ${item.name}`);
  };

  const pagination: PaginationConfig = {
    currentPage: 1,
    pageSize: 24,
    totalItems: dummySimilarDrawings.length,
  };

  return (
    <Card
      className={cn(
        'flex h-full flex-col gap-0 px-4 py-0 pt-4',
        'hover:bg-white/40',
      )}
    >
      <h2 className='mb-4 text-base font-semibold text-slate-900'>類似図面</h2>
      <GalleryViewWidget<SimilarDrawing>
        data={dummySimilarDrawings}
        columns='responsive'
        cardConfig={similarDrawingCardConfig}
        onCardClick={handleCardClick}
        pagination={pagination}
      />
    </Card>
  );
}
