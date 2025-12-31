'use client';

import { useCallback, useRef, useMemo, useState, useEffect } from 'react';

import type { ViewportState, MinimapNode } from '../../model/types';

interface CanvasMinimapProps {
  viewport: ViewportState;
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodes: MinimapNode[];
  onPanTo: (canvasX: number, canvasY: number) => void;
}

// コンテナサイズを取得するフック
function useContainerSize(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  return size;
}

// ノードから境界を計算
function useContentBounds(nodes: MinimapNode[]) {
  return useMemo(() => {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const node of nodes) {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    }
    return { minX, minY, maxX, maxY };
  }, [nodes]);
}

// ミニマップの制約
const MAX_WIDTH = 300;
const PADDING = 32; // 上下のパディング（bottom-4 × 2）

export function CanvasMinimap({
  viewport,
  containerRef,
  nodes,
  onPanTo,
}: CanvasMinimapProps) {
  const minimapRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const { width: containerWidth, height: containerHeight } = useContainerSize(containerRef);

  // コンテンツ領域の範囲
  const worldBounds = useContentBounds(nodes);

  // コンテンツのアスペクト比に基づいてミニマップサイズを計算
  // 高さをコンテナにフィットさせ、横幅はアスペクト比に依存（最大300px）
  const minimapSize = useMemo(() => {
    const worldWidth = worldBounds.maxX - worldBounds.minX;
    const worldHeight = worldBounds.maxY - worldBounds.minY;

    if (worldWidth <= 0 || worldHeight <= 0 || containerHeight <= 0) {
      return { width: 100, height: 100 };
    }

    const aspectRatio = worldWidth / worldHeight;
    const availableHeight = containerHeight - PADDING;

    // 高さをコンテナにフィットさせる
    let height = availableHeight;
    let width = height * aspectRatio;

    // 横幅が300pxを超える場合は制限
    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
      height = width / aspectRatio;
    }

    return { width, height };
  }, [worldBounds, containerHeight]);

  // ミニマップ上のスケール
  const minimapScale = useMemo(() => {
    const worldWidth = worldBounds.maxX - worldBounds.minX;
    const worldHeight = worldBounds.maxY - worldBounds.minY;
    const scaleX = minimapSize.width / worldWidth;
    const scaleY = minimapSize.height / worldHeight;
    return Math.min(scaleX, scaleY);
  }, [worldBounds, minimapSize]);

  // 現在のビューポート表示範囲（キャンバス座標）
  const viewportRect = useMemo(() => {
    if (containerWidth === 0 || containerHeight === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    return {
      x: -viewport.offsetX / viewport.scale,
      y: -viewport.offsetY / viewport.scale,
      width: containerWidth / viewport.scale,
      height: containerHeight / viewport.scale,
    };
  }, [viewport, containerWidth, containerHeight]);

  // ミニマップ座標からキャンバス座標への変換
  const minimapToCanvas = useCallback(
    (minimapX: number, minimapY: number) => {
      const canvasX = minimapX / minimapScale + worldBounds.minX;
      const canvasY = minimapY / minimapScale + worldBounds.minY;
      return { canvasX, canvasY };
    },
    [minimapScale, worldBounds]
  );

  // クリック/ドラッグ処理
  const handleInteraction = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!minimapRef.current) return;

      const rect = minimapRef.current.getBoundingClientRect();
      const minimapX = e.clientX - rect.left;
      const minimapY = e.clientY - rect.top;

      const { canvasX, canvasY } = minimapToCanvas(minimapX, minimapY);
      onPanTo(canvasX, canvasY);
    },
    [minimapToCanvas, onPanTo]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDragging.current = true;
      handleInteraction(e);
    },
    [handleInteraction]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      handleInteraction(e);
    },
    [handleInteraction]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ノードをミニマップ上に描画するための座標変換
  const contentToMinimap = useCallback(
    (x: number, y: number) => ({
      x: (x - worldBounds.minX) * minimapScale,
      y: (y - worldBounds.minY) * minimapScale,
    }),
    [worldBounds, minimapScale]
  );

  // ビューポート矩形のミニマップ座標
  const viewportInMinimap = useMemo(() => {
    const pos = contentToMinimap(viewportRect.x, viewportRect.y);
    return {
      x: pos.x,
      y: pos.y,
      width: viewportRect.width * minimapScale,
      height: viewportRect.height * minimapScale,
    };
  }, [viewportRect, contentToMinimap, minimapScale]);

  return (
    <div
      ref={minimapRef}
      className="absolute top-4 left-4 rounded-lg border bg-white/95 shadow-lg backdrop-blur-sm cursor-crosshair overflow-hidden"
      style={{ width: minimapSize.width, height: minimapSize.height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-gray-100" />

      {/* ノードのプレビュー */}
      {nodes.map((node) => {
        const pos = contentToMinimap(node.x, node.y);
        return (
          <div
            key={node.id}
            className="absolute bg-slate-400 rounded-[1px]"
            style={{
              left: pos.x,
              top: pos.y,
              width: Math.max(node.width * minimapScale, 2),
              height: Math.max(node.height * minimapScale, 2),
            }}
          />
        );
      })}

      {/* 現在のビューポート位置 */}
      <div
        className="absolute border-2 border-blue-500 bg-blue-500/10"
        style={{
          left: viewportInMinimap.x,
          top: viewportInMinimap.y,
          width: Math.max(viewportInMinimap.width, 4),
          height: Math.max(viewportInMinimap.height, 4),
        }}
      />
    </div>
  );
}
