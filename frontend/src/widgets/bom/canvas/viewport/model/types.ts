export interface ViewportState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export type CursorMode = 'default' | 'grab' | 'grabbing';

export interface ContentBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface ViewportActions {
  zoomIn: () => void;
  zoomOut: () => void;
  resetViewport: () => void;
  fitToContent: (bounds: ContentBounds, padding?: number) => void;
}
