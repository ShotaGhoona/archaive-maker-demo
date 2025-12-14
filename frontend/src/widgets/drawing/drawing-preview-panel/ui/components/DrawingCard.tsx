'use client';

import type { MouseEvent } from 'react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { DrawingThumbnail } from '@/page-components/drawing/basic-information/dummy-data/drawing-detail';

interface DrawingCardProps {
  thumbnail: DrawingThumbnail;
  drawingName: string;
  drawingNumber: string;
  isSelected: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export function DrawingCard({
  thumbnail,
  drawingName,
  drawingNumber,
  isSelected,
  onClick,
}: DrawingCardProps) {
  return (
    <div
      className={cn(
        'w-36 cursor-pointer overflow-hidden rounded-lg border bg-card shadow-sm transition-colors hover:border-primary/50',
        isSelected && 'border-primary ring-1 ring-primary/30'
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={thumbnail.thumbnailUrl}
          alt={thumbnail.name}
          className="size-full object-cover"
        />
      </div>
      <div className="p-2">
        <p className="truncate text-base font-medium">{thumbnail.name}</p>
        <p className="truncate text-sm text-muted-foreground">
          {drawingNumber}
        </p>
      </div>
    </div>
  );
}
