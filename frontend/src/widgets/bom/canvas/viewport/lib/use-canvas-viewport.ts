'use client';

import { useState, useCallback, useRef, type WheelEvent, type MouseEvent } from 'react';

export interface ViewportState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

interface UseCanvasViewportOptions {
  minScale?: number;
  maxScale?: number;
  zoomSensitivity?: number;
}

const DEFAULT_OPTIONS: Required<UseCanvasViewportOptions> = {
  minScale: 0.1,
  maxScale: 5,
  zoomSensitivity: 0.001,
};

export function useCanvasViewport(options: UseCanvasViewportOptions = {}) {
  const { minScale, maxScale, zoomSensitivity } = { ...DEFAULT_OPTIONS, ...options };

  const [viewport, setViewport] = useState<ViewportState>({
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  });

  const isPanning = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      e.preventDefault();

      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // ズーム計算
      const delta = -e.deltaY * zoomSensitivity;
      const newScale = Math.min(maxScale, Math.max(minScale, viewport.scale * (1 + delta)));
      const scaleRatio = newScale / viewport.scale;

      // マウス位置を中心にズーム
      const newOffsetX = mouseX - (mouseX - viewport.offsetX) * scaleRatio;
      const newOffsetY = mouseY - (mouseY - viewport.offsetY) * scaleRatio;

      setViewport({
        offsetX: newOffsetX,
        offsetY: newOffsetY,
        scale: newScale,
      });
    },
    [viewport, minScale, maxScale, zoomSensitivity]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // 中クリック（ホイールクリック）またはスペース+左クリックでパン開始
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        e.preventDefault();
        isPanning.current = true;
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isPanning.current) return;

      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;

      setViewport((prev) => ({
        ...prev,
        offsetX: prev.offsetX + deltaX,
        offsetY: prev.offsetY + deltaY,
      }));

      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPanning.current = false;
  }, []);

  const resetViewport = useCallback(() => {
    setViewport({ offsetX: 0, offsetY: 0, scale: 1 });
  }, []);

  return {
    viewport,
    setViewport,
    handlers: {
      onWheel: handleWheel,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
    resetViewport,
    isPanning: isPanning.current,
  };
}
