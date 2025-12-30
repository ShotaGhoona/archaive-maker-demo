// キャンバス共通カラー
export type CanvasColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'gray';

export interface CanvasColorConfig {
  code: string;
  label: string;
}

export const CANVAS_COLORS: Record<CanvasColor, CanvasColorConfig> = {
  yellow: { code: '#fef08a', label: '黄色' },
  pink: { code: '#fecdd3', label: 'ピンク' },
  blue: { code: '#bfdbfe', label: '青' },
  green: { code: '#bbf7d0', label: '緑' },
  purple: { code: '#ddd6fe', label: '紫' },
  gray: { code: '#94a3b8', label: 'グレー' },
};
