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
  const { thumbnailKey, contentRenderer, cardRenderer } = cardConfig;

  // カスタムカードレンダラーがある場合はそれを使用
  if (cardRenderer) {
    return <>{cardRenderer(item, index)}</>;
  }

  const thumbnail = item[thumbnailKey] as string;

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-[0_0_16px_rgba(0,0,0,0.15)] p-3 gap-3',
        onClick && 'cursor-pointer space-y-0'
      )}
      onClick={() => onClick?.(item, index)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-card">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <CardContent className="p-0">
        {contentRenderer(item, index)}
      </CardContent>
    </Card>
  );
}
