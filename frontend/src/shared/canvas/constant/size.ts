// BOM Node サイズ
export const NODE_WIDTH = 250;
export const NODE_HEIGHT = 150;

// レイアウト間隔
export const HORIZONTAL_GAP = 100;
export const VERTICAL_GAP = 40;

// 付箋サイズ
export const STICKY_NOTE_WIDTH = 200;
export const STICKY_NOTE_HEIGHT = 150;
export const STICKY_NOTE_MIN_WIDTH = 100;
export const STICKY_NOTE_MIN_HEIGHT = 80;

// 付箋フォントサイズ
export type StickyNoteFontSize = 'small' | 'medium' | 'large';

export interface StickyNoteFontConfig {
  size: number;
  label: string;
}

export const STICKY_NOTE_FONT_SIZES: Record<StickyNoteFontSize, StickyNoteFontConfig> = {
  small: { size: 12, label: '小' },
  medium: { size: 14, label: '中' },
  large: { size: 18, label: '大' },
};

// コネクタ太さ
export type ConnectorStrokeWidth = 'thin' | 'medium' | 'thick';

export interface ConnectorStrokeConfig {
  width: number;
  label: string;
}

export const CONNECTOR_STROKE_WIDTHS: Record<ConnectorStrokeWidth, ConnectorStrokeConfig> = {
  thin: { width: 1, label: '細い' },
  medium: { width: 2, label: '普通' },
  thick: { width: 3, label: '太い' },
};
