'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { DrawingItem } from '@/page-components/drawing/basic-information/dummy-data/drawing-detail';
import { DrawingCard } from './components/DrawingCard';
import { CARD_HEIGHT } from '../lib/constants';
import {
  getCardLeft,
  getCardTop,
  getCloseButtonLeft,
  getDrawingTop,
  getStackHeight,
  isCardVisible,
} from '../lib/calculations';

interface DrawingPreviewPanelProps {
  drawings: DrawingItem[];
}

export function DrawingPreviewPanel({ drawings }: DrawingPreviewPanelProps) {
  const [expandedDrawingId, setExpandedDrawingId] = useState<string | null>(
    null,
  );
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

  return (
    <div className='relative flex h-full'>
      {/* 左：サイドバー */}
      <aside className='relative w-48 shrink-0 border-r bg-card'>
        {/* カード群（展開時にプレビューエリアへはみ出すためabsolute） */}
        {drawings.map((drawing, drawingIndex) => {
          const isExpanded = expandedDrawingId === drawing.id;
          const count = drawing.thumbnails.length;
          const hasMultiple = count > 1;
          const stackHeight = getStackHeight(count);
          const top = getDrawingTop(drawings, drawingIndex);

          return (
            <div
              key={drawing.id}
              className='absolute left-3 z-10'
              style={{ top, height: CARD_HEIGHT + stackHeight }}
            >
              {drawing.thumbnails.map((thumbnail, index) => (
                <div
                  key={thumbnail.id}
                  className='absolute transition-all duration-300'
                  style={{
                    left: getCardLeft(index, isExpanded),
                    top: getCardTop(index, isExpanded),
                    zIndex: count - index,
                    opacity: isCardVisible(index, isExpanded) ? 1 : 0,
                  }}
                >
                  <DrawingCard
                    thumbnail={thumbnail}
                    drawingName={drawing.name}
                    drawingNumber={drawing.drawingNumber}
                    isSelected={selectedThumbnailId === thumbnail.id}
                    onClick={() => {
                      if (!isExpanded && index > 0 && hasMultiple) {
                        setExpandedDrawingId(drawing.id);
                      } else {
                        setSelectedThumbnailId(thumbnail.id);
                      }
                    }}
                  />
                </div>
              ))}

              {/* 閉じるボタン */}
              {isExpanded && hasMultiple && (
                <Button
                  size='icon'
                  className='absolute top-0 h-full w-8'
                  style={{ left: getCloseButtonLeft(count) }}
                  onClick={() => setExpandedDrawingId(null)}
                >
                  <ChevronLeft className='size-4' />
                </Button>
              )}
            </div>
          );
        })}
      </aside>

      {/* 右：プレビューエリア */}
      <div className='flex flex-1 items-center justify-center bg-muted/20 p-4'>
        {selectedThumbnail ? (
          <img
            src={selectedThumbnail.thumbnailUrl}
            alt={selectedThumbnail.name}
            className='max-h-full max-w-full object-contain'
          />
        ) : (
          <p className='text-muted-foreground'>図面を選択してください</p>
        )}
      </div>
    </div>
  );
}
