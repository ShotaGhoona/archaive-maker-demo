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

interface UseCanvasViewportOptions {
  minScale?: number;
  maxScale?: number;
  zoomSensitivity?: number;
}

const DEFAULT_OPTIONS: Required<UseCanvasViewportOptions> = {
  minScale: 0.1,
  maxScale: 5,
  zoomSensitivity: 0.002,
};

export function useCanvasViewport(options: UseCanvasViewportOptions = {}) {
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

      // Cmd/Ctrl + スクロール → 拡大縮小
      if (e.ctrlKey || e.metaKey) {
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
        return;
      }

      // Shift + スクロール → 横スクロール
      // ブラウザによってはShift時にdeltaXとdeltaYが入れ替わるため両方を考慮
      if (e.shiftKey) {
        const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        setViewport((prev) => ({
          ...prev,
          offsetX: prev.offsetX - delta,
        }));
        return;
      }

      // 通常スクロール → 縦スクロール
      setViewport((prev) => ({
        ...prev,
        offsetY: prev.offsetY - e.deltaY,
      }));
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

  // 指定したキャンバス座標を画面中央に移動
  const panTo = useCallback((canvasX: number, canvasY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setViewport((prev) => ({
      ...prev,
      offsetX: centerX - canvasX * prev.scale,
      offsetY: centerY - canvasY * prev.scale,
    }));
  }, []);

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
      panTo,
    },
  };
}
