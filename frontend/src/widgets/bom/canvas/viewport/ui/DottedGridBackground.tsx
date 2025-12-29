'use client';

import { useMemo } from 'react';

const GRID_SIZE = 20;
const DOT_SIZE = 1;
const DOT_COLOR = '#d1d5db';
const BACKGROUND_COLOR = '#fafafa';

interface DottedGridBackgroundProps {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export function DottedGridBackground({
  offsetX,
  offsetY,
  scale,
}: DottedGridBackgroundProps) {
  const patternId = useMemo(() => `dotted-grid-${Math.random().toString(36).substr(2, 9)}`, []);

  // スケールに応じてグリッドサイズを調整
  const scaledGridSize = GRID_SIZE * scale;
  const scaledDotSize = Math.max(0.5, DOT_SIZE * Math.min(scale, 1));

  // オフセットをグリッドサイズで正規化（パターンのシームレスな繰り返しのため）
  const patternOffsetX = ((offsetX % scaledGridSize) + scaledGridSize) % scaledGridSize;
  const patternOffsetY = ((offsetY % scaledGridSize) + scaledGridSize) % scaledGridSize;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <defs>
        <pattern
          id={patternId}
          x={patternOffsetX}
          y={patternOffsetY}
          width={scaledGridSize}
          height={scaledGridSize}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={scaledGridSize / 2}
            cy={scaledGridSize / 2}
            r={scaledDotSize}
            fill={DOT_COLOR}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
