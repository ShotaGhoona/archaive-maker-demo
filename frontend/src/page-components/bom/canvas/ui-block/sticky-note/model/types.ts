import type { CanvasColor } from '@/shared/canvas/constant/color';
import type { StickyNoteFontSize } from '@/shared/canvas/constant/size';

// 付箋
export interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: CanvasColor;
  fontSize: StickyNoteFontSize;
}
