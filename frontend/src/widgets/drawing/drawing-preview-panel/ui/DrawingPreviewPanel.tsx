'use client';

import { useState } from 'react';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { DrawingItem } from '@/shared/dummy-data/drawing/types';
import { DrawingCard } from './components/DrawingCard';

interface DrawingPreviewPanelProps {
  drawings: DrawingItem[];
}

export function DrawingPreviewPanel({ drawings }: DrawingPreviewPanelProps) {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(
    () => {
      if (drawings.length > 0 && drawings[0].thumbnails.length > 0) {
        const thumbnail =
          drawings[0].thumbnails.find((t) => t.isOriginal) ??
          drawings[0].thumbnails[0];
        return thumbnail.id;
      }
      return null;
    },
  );

  const selectedThumbnail = drawings
    .flatMap((d) => d.thumbnails)
    .find((t) => t.id === selectedThumbnailId);

  // 全てのサムネイルをフラットに展開
  const allThumbnails = drawings.flatMap((drawing) =>
    drawing.thumbnails.map((thumbnail) => ({
      ...thumbnail,
      drawingName: drawing.name,
      drawingNumber: drawing.drawingNumber,
    })),
  );

  return (
    <div className='flex h-full gap-2'>
      {/* 左：サムネイルカード */}
      <Card
        className={cn(
          'shrink-0 gap-0 overflow-hidden py-0',
          'hover:bg-white/40',
        )}
      >
        <ScrollArea className='h-full'>
          <div className='flex flex-col gap-3 p-2'>
            {allThumbnails.map((thumbnail) => (
              <DrawingCard
                key={thumbnail.id}
                thumbnail={thumbnail}
                drawingName={thumbnail.drawingName}
                drawingNumber={thumbnail.drawingNumber}
                isSelected={selectedThumbnailId === thumbnail.id}
                onClick={() => setSelectedThumbnailId(thumbnail.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* 右：プレビューカード */}
      <Card
        className={cn(
          'flex flex-1 items-center justify-center gap-0 p-4 py-0',
          'bg-white/40 hover:bg-white/40',
        )}
      >
        {selectedThumbnail ? (
          <img
            src={selectedThumbnail.thumbnailUrl}
            alt={selectedThumbnail.name}
            className='max-h-full max-w-full rounded-lg object-contain shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          />
        ) : (
          <p className='text-slate-500'>図面を選択してください</p>
        )}
      </Card>
    </div>
  );
}
