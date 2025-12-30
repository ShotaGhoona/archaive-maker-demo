'use client';

import { createContext, useContext } from 'react';

import type { ViewportState, CursorMode, ViewportActions } from '../model/types';

export interface CanvasViewportContextValue {
  // 状態
  viewport: ViewportState;
  cursorMode: CursorMode;
  containerRef: React.RefObject<HTMLDivElement | null>;

  // アクション
  actions: ViewportActions;

  // イベントハンドラ（内部用）
  handlers: {
    onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
    onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
}

export const CanvasViewportContext = createContext<CanvasViewportContextValue | null>(null);

export function useCanvasViewportContext(): CanvasViewportContextValue {
  const context = useContext(CanvasViewportContext);
  if (!context) {
    throw new Error('useCanvasViewportContext must be used within CanvasViewportProvider');
  }
  return context;
}
