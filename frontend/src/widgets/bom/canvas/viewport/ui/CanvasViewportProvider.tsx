'use client';

import type { ReactNode } from 'react';

import { CanvasViewportContext } from '../lib/canvas-viewport-context';
import { useCanvasInteraction } from '../lib/use-canvas-interaction';

interface CanvasViewportProviderProps {
  children: ReactNode;
}

export function CanvasViewportProvider({ children }: CanvasViewportProviderProps) {
  const { viewport, cursorMode, containerRef, handlers, actions } = useCanvasInteraction();

  return (
    <CanvasViewportContext.Provider
      value={{
        viewport,
        cursorMode,
        containerRef,
        handlers,
        actions,
      }}
    >
      {children}
    </CanvasViewportContext.Provider>
  );
}
