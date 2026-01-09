'use client';

import { Plus, FileImage } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import type { Drawing } from '@/shared/dummy-data/bom-v2';

interface DrawingListPanelProps {
  drawings: Drawing[];
  selectedDrawingId: string | null;
  onSelectDrawing: (drawingId: string) => void;
  onAddDrawing: () => void;
}

export function DrawingListPanel({
  drawings,
  selectedDrawingId,
  onSelectDrawing,
  onAddDrawing,
}: DrawingListPanelProps) {
  return (
    <Card className='flex w-64 shrink-0 flex-col gap-0 py-0'>
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-2 p-3'>
          {/* アップロードボタン */}
          <button
            onClick={onAddDrawing}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-3',
              'text-muted-foreground hover:border-primary hover:text-primary',
              'transition-colors'
            )}
          >
            <Plus className='size-5' />
            <span className='text-sm'>図面を追加</span>
          </button>

          {drawings.length === 0 ? (
            <NoData
              title='図面がありません'
              description='図面をアップロードしてください'
              size='sm'
            />
          ) : (
            drawings.map((drawing) => (
              <button
                key={drawing.id}
                onClick={() => onSelectDrawing(drawing.id)}
                className={cn(
                  'w-full overflow-hidden rounded-lg border text-left transition-all',
                  selectedDrawingId === drawing.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'bg-muted/30 hover:bg-accent'
                )}
              >
                {/* サムネイル */}
                <div className='relative aspect-[4/3] bg-muted'>
                  {drawing.s3Path ? (
                    <Image
                      src={drawing.s3Path}
                      alt={drawing.title}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center'>
                      <FileImage className='size-8 text-muted-foreground' />
                    </div>
                  )}
                </div>
                {/* 情報 */}
                <div className='p-2'>
                  <p className='truncate text-sm font-medium'>{drawing.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {drawing.drawingNumber}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
