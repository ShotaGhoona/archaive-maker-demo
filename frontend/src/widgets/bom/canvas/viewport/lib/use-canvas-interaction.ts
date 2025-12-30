'use client';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type WheelEvent,
  type MouseEvent,
} from 'react';

import type { ViewportState, CursorMode, ContentBounds } from '../model/types';

interface UseCanvasInteractionOptions {
  minScale?: number;
  maxScale?: number;
  zoomSensitivity?: number;
}

const DEFAULT_OPTIONS: Required<UseCanvasInteractionOptions> = {
  minScale: 0.1,
  maxScale: 5,
  zoomSensitivity: 0.002,
};

export function useCanvasInteraction(options: UseCanvasInteractionOptions = {}) {
  const { minScale, maxScale, zoomSensitivity } = { ...DEFAULT_OPTIONS, ...options };

  const [viewport, setViewport] = useState<ViewportState>({
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  });

  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const isPanning = useRef(false);
  const isSpacePressed = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Spaceキーの監視
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        isSpacePressed.current = true;
        setCursorMode('grab');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressed.current = false;
        if (!isPanning.current) {
          setCursorMode('default');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // ホイール操作
  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      e.preventDefault();

      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // トラックパッドの2本指スクロール検出
      const isTrackpadScroll = !e.ctrlKey && !e.metaKey && Math.abs(e.deltaX) > 0;

      if (isTrackpadScroll) {
        // トラックパッド2本指スクロール → パン
        setViewport((prev) => ({
          ...prev,
          offsetX: prev.offsetX - e.deltaX,
          offsetY: prev.offsetY - e.deltaY,
        }));
        return;
      }

      // マウスホイール or ピンチズーム → ズーム
      const delta = -e.deltaY * zoomSensitivity;
      setViewport((prev) => {
        const newScale = Math.min(maxScale, Math.max(minScale, prev.scale * (1 + delta)));
        const scaleRatio = newScale / prev.scale;

        return {
          offsetX: mouseX - (mouseX - prev.offsetX) * scaleRatio,
          offsetY: mouseY - (mouseY - prev.offsetY) * scaleRatio,
          scale: newScale,
        };
      });
    },
    [minScale, maxScale, zoomSensitivity]
  );

  // マウスダウン
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const shouldPan =
      e.button === 1 || e.button === 2 || (e.button === 0 && isSpacePressed.current);

    if (shouldPan) {
      e.preventDefault();
      isPanning.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      setCursorMode('grabbing');
    }
  }, []);

  // マウス移動
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning.current) return;

    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;

    setViewport((prev) => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY,
    }));

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  // マウスアップ
  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
    setCursorMode(isSpacePressed.current ? 'grab' : 'default');
  }, []);

  // マウスがキャンバス外に出た時
  const handleMouseLeave = useCallback(() => {
    isPanning.current = false;
    setCursorMode(isSpacePressed.current ? 'grab' : 'default');
  }, []);

  // 右クリックメニュー無効化
  const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // ダブルクリックで全体表示
  const handleDoubleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // ノードや付箋上でのダブルクリックは無視
    if ((e.target as HTMLElement).closest('[data-node], [data-sticky]')) {
      return;
    }
    setViewport({ offsetX: 0, offsetY: 0, scale: 1 });
  }, []);

  // ビューポートリセット
  const resetViewport = useCallback(() => {
    setViewport({ offsetX: 0, offsetY: 0, scale: 1 });
  }, []);

  // コンテンツに合わせてフィット
  const fitToContent = useCallback(
    (bounds: ContentBounds, padding: number = 50) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const contentWidth = bounds.maxX - bounds.minX;
      const contentHeight = bounds.maxY - bounds.minY;

      if (contentWidth === 0 || contentHeight === 0) {
        resetViewport();
        return;
      }

      const scaleX = (containerRect.width - padding * 2) / contentWidth;
      const scaleY = (containerRect.height - padding * 2) / contentHeight;
      const newScale = Math.min(Math.max(Math.min(scaleX, scaleY), minScale), maxScale);

      const contentCenterX = bounds.minX + contentWidth / 2;
      const contentCenterY = bounds.minY + contentHeight / 2;
      const newOffsetX = containerRect.width / 2 - contentCenterX * newScale;
      const newOffsetY = containerRect.height / 2 - contentCenterY * newScale;

      setViewport({
        offsetX: newOffsetX,
        offsetY: newOffsetY,
        scale: newScale,
      });
    },
    [minScale, maxScale, resetViewport]
  );

  // ズームイン
  const zoomIn = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setViewport((prev) => {
      const newScale = Math.min(maxScale, prev.scale * 1.2);
      const scaleRatio = newScale / prev.scale;
      return {
        offsetX: centerX - (centerX - prev.offsetX) * scaleRatio,
        offsetY: centerY - (centerY - prev.offsetY) * scaleRatio,
        scale: newScale,
      };
    });
  }, [maxScale]);

  // ズームアウト
  const zoomOut = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setViewport((prev) => {
      const newScale = Math.max(minScale, prev.scale / 1.2);
      const scaleRatio = newScale / prev.scale;
      return {
        offsetX: centerX - (centerX - prev.offsetX) * scaleRatio,
        offsetY: centerY - (centerY - prev.offsetY) * scaleRatio,
        scale: newScale,
      };
    });
  }, [minScale]);

  return {
    viewport,
    cursorMode,
    containerRef,
    handlers: {
      onWheel: handleWheel,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onContextMenu: handleContextMenu,
      onDoubleClick: handleDoubleClick,
    },
    actions: {
      resetViewport,
      fitToContent,
      zoomIn,
      zoomOut,
    },
  };
}
