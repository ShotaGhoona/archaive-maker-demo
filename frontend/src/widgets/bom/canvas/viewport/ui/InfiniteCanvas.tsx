'use client';

import { type ReactNode } from 'react';

import { cn } from '@/shared/ui/shadcn/lib/utils';

import { DottedGridBackground } from './DottedGridBackground';
import { CanvasControls } from './CanvasControls';
import { useCanvasViewport, type CursorMode } from '../lib/use-canvas-viewport';

interface InfiniteCanvasProps {
  children?: ReactNode;
  className?: string;
}

const CURSOR_MAP: Record<CursorMode, string> = {
  default: 'default',
  grab: 'grab',
  grabbing: 'grabbing',
};

export function InfiniteCanvas({ children, className }: InfiniteCanvasProps) {
  const { viewport, cursorMode, containerRef, handlers, actions } = useCanvasViewport();

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full overflow-hidden select-none', className)}
      {...handlers}
      style={{ cursor: CURSOR_MAP[cursorMode] }}
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

      {/* コントロールUI */}
      <CanvasControls />
    </div>
  );
}
