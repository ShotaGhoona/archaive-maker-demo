'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/shared/ui/shadcn/ui/card';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { GalleryCardConfig } from '../model/types';

interface GalleryCardProps<T> {
  item: T;
  index: number;
  cardConfig: GalleryCardConfig<T>;
  onClick?: (item: T, index: number) => void;
}

export function GalleryCard<T extends object>({
  item,
  index,
  cardConfig,
  onClick,
}: GalleryCardProps<T>) {
  const { thumbnailKey, contentRenderer, overlayRenderer, cardRenderer } =
    cardConfig;

  // カスタムカードレンダラーがある場合はそれを使用
  if (cardRenderer) {
    return <>{cardRenderer(item, index)}</>;
  }

  const thumbnail = item[thumbnailKey] as string;
  const hasOverlay = !!overlayRenderer;

  return (
    <Card
      className={cn(
        'group relative gap-3 overflow-hidden p-3',
        onClick && 'cursor-pointer space-y-0',
      )}
      onClick={() => onClick?.(item, index)}
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100/50'>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=''
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          />
        ) : (
          <div className='flex h-full items-center justify-center text-slate-400'>
            No Image
          </div>
        )}
      </div>
      <CardContent className='p-0 pt-2 text-slate-600'>{contentRenderer(item, index)}</CardContent>
      {/* ホバーオーバーレイ（カード全体） */}
      {hasOverlay && (
        <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100'>
          {overlayRenderer(item, index)}
        </div>
      )}
    </Card>
  );
}
