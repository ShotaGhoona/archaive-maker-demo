'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

import {
  STICKY_NOTE_MIN_WIDTH,
  STICKY_NOTE_MIN_HEIGHT,
} from '@/shared/canvas/constant/size';

interface UseResizeOptions {
  initialWidth: number;
  initialHeight: number;
  minWidth?: number;
  minHeight?: number;
  onResize?: (width: number, height: number) => void;
}

interface UseResizeReturn {
  isResizing: boolean;
  handleResizeMouseDown: (e: React.MouseEvent) => void;
}

export function useResize({
  initialWidth,
  initialHeight,
  minWidth = STICKY_NOTE_MIN_WIDTH,
  minHeight = STICKY_NOTE_MIN_HEIGHT,
  onResize,
}: UseResizeOptions): UseResizeReturn {
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // リサイズ開始
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.button !== 0) return;

      setIsResizing(true);
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { width: initialWidth, height: initialHeight };
    },
    [initialWidth, initialHeight]
  );

  // リサイズ中
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      const newWidth = Math.max(minWidth, startSize.current.width + deltaX);
      const newHeight = Math.max(minHeight, startSize.current.height + deltaY);

      onResize?.(newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, minHeight, onResize]);

  return {
    isResizing,
    handleResizeMouseDown,
  };
}
