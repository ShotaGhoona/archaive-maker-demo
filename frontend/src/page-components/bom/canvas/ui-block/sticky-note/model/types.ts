import type { CanvasColor } from '@/shared/canvas/constant/color';

// 付箋
export interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: CanvasColor;
}
