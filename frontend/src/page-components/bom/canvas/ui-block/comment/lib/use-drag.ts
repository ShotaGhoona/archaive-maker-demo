'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseDragOptions {
  initialX: number;
  initialY: number;
  disabled?: boolean;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: () => void;
}

interface UseDragReturn {
  isDragging: boolean;
  hasDragged: boolean;
  handleDragMouseDown: (e: React.MouseEvent) => void;
}

export function useDrag({
  initialX,
  initialY,
  disabled = false,
  onDragStart,
  onDrag,
  onDragEnd,
}: UseDragOptions): UseDragReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const handleDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      if (e.button !== 0) return;

      e.stopPropagation();
      setIsDragging(true);
      setHasDragged(false);
      startPos.current = { x: e.clientX, y: e.clientY };
      elementStartPos.current = { x: initialX, y: initialY };
      onDragStart?.();
    },
    [disabled, initialX, initialY, onDragStart],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      // 少しでも動いたらドラッグ扱い
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        setHasDragged(true);
      }

      const newX = elementStartPos.current.x + deltaX;
      const newY = elementStartPos.current.y + deltaY;

      onDrag?.(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd?.();
      // クリックイベント後にリセット
      setTimeout(() => setHasDragged(false), 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return {
    isDragging,
    hasDragged,
    handleDragMouseDown,
  };
}
