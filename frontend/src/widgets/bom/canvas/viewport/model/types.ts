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

export interface ViewportHandlers {
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ViewportActions {
  zoomIn: () => void;
  zoomOut: () => void;
  resetViewport: () => void;
  fitToContent: (bounds: ContentBounds, padding?: number) => void;
  panTo: (canvasX: number, canvasY: number) => void;
}

export interface MinimapNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MinimapConnector {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}
