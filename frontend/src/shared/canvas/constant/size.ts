// BOM Node サイズ
export const NODE_WIDTH = 250;
export const NODE_HEIGHT = 150;

// レイアウト間隔
export const HORIZONTAL_GAP = 100;
export const VERTICAL_GAP = 40;

// 付箋サイズ
export const STICKY_NOTE_WIDTH = 200;
export const STICKY_NOTE_HEIGHT = 150;

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
