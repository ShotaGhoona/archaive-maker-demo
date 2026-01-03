'use client';

import {
  CANVAS_COLORS,
  type CanvasColor,
} from '@/shared/canvas/constant/color';
import {
  STICKY_NOTE_WIDTH,
  STICKY_NOTE_HEIGHT,
} from '@/shared/canvas/constant/size';

const DEFAULT_COLOR: CanvasColor = 'yellow';

interface StickyNotePlaceholderProps {
  x: number;
  y: number;
}

export function StickyNotePlaceholder({ x, y }: StickyNotePlaceholderProps) {
  const backgroundColor = CANVAS_COLORS[DEFAULT_COLOR].code;

  return (
    <div
      className='pointer-events-none absolute rounded border-2 border-dashed border-yellow-400'
      style={{
        left: x - STICKY_NOTE_WIDTH / 2,
        top: y - STICKY_NOTE_HEIGHT / 2,
        width: STICKY_NOTE_WIDTH,
        height: STICKY_NOTE_HEIGHT,
        backgroundColor,
        opacity: 0.5,
      }}
    />
  );
}
