'use client';

import { X, FileImage } from 'lucide-react';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';

interface SimilarDrawingsPanelProps {
  onClose: () => void;
  onSelectDrawing: (drawingId: string) => void;
}

// TODO: APIから取得
const PLACEHOLDER_SIMILAR_DRAWINGS = [
  { id: 'similar-1', title: '類似図面 A', similarity: 95 },
  { id: 'similar-2', title: '類似図面 B', similarity: 87 },
  { id: 'similar-3', title: '類似図面 C', similarity: 82 },
  { id: 'similar-4', title: '類似図面 D', similarity: 76 },
  { id: 'similar-5', title: '類似図面 E', similarity: 71 },
  { id: 'similar-6', title: '類似図面 F', similarity: 65 },
];

export function SimilarDrawingsPanel({
  onClose,
  onSelectDrawing,
}: SimilarDrawingsPanelProps) {
  return (
    <Card className='flex w-[480px] shrink-0 flex-col gap-0 py-0'>
      {/* ヘッダー */}
      <div className='flex h-12 items-center justify-between border-b px-4'>
        <h3 className='text-sm font-semibold'>類似図面</h3>
        <Button variant='ghost' size='icon' className='size-8' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className='min-h-0 flex-1'>
        <div className='grid grid-cols-2 gap-2 p-3'>
          {PLACEHOLDER_SIMILAR_DRAWINGS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectDrawing(item.id)}
              className='group overflow-hidden rounded-lg border bg-muted/30 text-left transition-colors hover:bg-accent'
            >
              {/* サムネイル（プレースホルダー） */}
              <div className='relative aspect-[4/3] bg-muted'>
                <div className='flex h-full w-full items-center justify-center'>
                  <FileImage className='size-8 text-muted-foreground/50' />
                </div>
                {/* 類似度バッジ */}
                <div className='absolute right-1 top-1 rounded bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground'>
                  {item.similarity}%
                </div>
              </div>
              {/* タイトル */}
              <div className='p-2'>
                <p className='truncate text-xs font-medium'>{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
