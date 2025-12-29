'use client';

import { type ReactNode } from 'react';

import { cn } from '@/shared/ui/shadcn/lib/utils';

import { DottedGridBackground } from './DottedGridBackground';
import { useCanvasViewport } from '../lib/use-canvas-viewport';

interface InfiniteCanvasProps {
  children?: ReactNode;
  className?: string;
}

export function InfiniteCanvas({
  children,
  className,
}: InfiniteCanvasProps) {
  const { viewport, handlers } = useCanvasViewport();

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      {...handlers}
      style={{ cursor: 'default' }}
    >
      {/* 背景グリッド */}
      <DottedGridBackground
        offsetX={viewport.offsetX}
        offsetY={viewport.offsetY}
        scale={viewport.scale}
      />

      {/* コンテンツレイヤー */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px) scale(${viewport.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>

      {/* ズームレベル表示 */}
      <div className="absolute bottom-4 right-4 rounded-md bg-white/80 px-2 py-1 text-xs text-gray-500 shadow-sm backdrop-blur-sm">
        {Math.round(viewport.scale * 100)}%
      </div>
    </div>
  );
}
