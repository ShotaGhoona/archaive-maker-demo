'use client';

import { CANVAS_COLORS, type CanvasColor } from '@/shared/canvas/constant/color';
import {
  STICKY_NOTE_FONT_SIZES,
  type StickyNoteFontSize,
} from '@/shared/canvas/constant/size';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface StickyNoteToolbarProps {
  color: CanvasColor;
  fontSize: StickyNoteFontSize;
  onColorChange: (color: CanvasColor) => void;
  onFontSizeChange: (fontSize: StickyNoteFontSize) => void;
}

const colorOptions = Object.entries(CANVAS_COLORS).filter(
  ([key]) => key !== 'gray'
) as [CanvasColor, (typeof CANVAS_COLORS)[CanvasColor]][];

const fontSizeOptions = Object.entries(STICKY_NOTE_FONT_SIZES) as [
  StickyNoteFontSize,
  (typeof STICKY_NOTE_FONT_SIZES)[StickyNoteFontSize],
][];

export function StickyNoteToolbar({
  color,
  fontSize,
  onColorChange,
  onFontSizeChange,
}: StickyNoteToolbarProps) {
  return (
    <div
      className="absolute -top-10 left-0 flex items-center gap-1 rounded-md border bg-white p-1 shadow-lg"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* 色選択 */}
      <div className="flex items-center gap-0.5">
        {colorOptions.map(([colorKey, colorConfig]) => (
          <button
            key={colorKey}
            className="h-6 w-6 rounded border border-gray-200 transition-transform hover:scale-110"
            style={{ backgroundColor: colorConfig.code }}
            onClick={() => onColorChange(colorKey)}
            title={colorConfig.label}
          >
            {colorKey === color && (
              <span className="flex h-full w-full items-center justify-center text-xs">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 区切り線 */}
      <div className="mx-1 h-6 w-px bg-gray-200" />

      {/* フォントサイズ */}
      <div className="flex items-center gap-0.5">
        {fontSizeOptions.map(([sizeKey, sizeConfig]) => (
          <button
            key={sizeKey}
            className={cn(
              'h-6 w-6 rounded border text-xs font-medium transition-colors',
              fontSize === sizeKey
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            )}
            onClick={() => onFontSizeChange(sizeKey)}
            title={`文字サイズ: ${sizeConfig.label}`}
          >
            {sizeConfig.label}
          </button>
        ))}
      </div>
    </div>
  );
}
