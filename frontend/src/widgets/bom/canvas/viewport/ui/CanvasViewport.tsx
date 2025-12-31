'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import {
  getCanvasCoordinatesFromEvent,
  type CanvasCoordinates,
} from '@/shared/canvas/lib/coordinate';

import type {
  ViewportState,
  CursorMode,
  ViewportHandlers,
  ViewportActions,
  MinimapNode,
  MinimapConnector,
} from '../model/types';
export type { MinimapNode, MinimapConnector } from '../model/types';
import { DottedGridBackground } from './components/DottedGridBackground';
import { CanvasControls } from './components/CanvasControls';
import { CanvasMinimap } from './components/CanvasMinimap';

interface CanvasViewportProps {
  children?: ReactNode;
  className?: string;
  cursor?: string;
  // ビューポート状態
  viewport: ViewportState;
  cursorMode: CursorMode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlers: ViewportHandlers;
  actions: ViewportActions;
  // ミニマップ用ノード（渡された場合のみミニマップ表示）
  minimapNodes?: MinimapNode[];
  minimapConnectors?: MinimapConnector[];
  // イベント
  onCanvasClick?: (event: CanvasCoordinates) => void;
  onCanvasMouseMove?: (event: CanvasCoordinates) => void;
  onCanvasMouseLeave?: () => void;
}

const CURSOR_MAP: Record<CursorMode, string> = {
  default: 'default',
  grab: 'grab',
  grabbing: 'grabbing',
};

export function CanvasViewport({
  children,
  className,
  cursor,
  viewport,
  cursorMode,
  containerRef,
  handlers,
  actions,
  minimapNodes,
  minimapConnectors,
  onCanvasClick,
  onCanvasMouseMove,
  onCanvasMouseLeave,
}: CanvasViewportProps) {
  // キャンバスクリック処理
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // ノードやUI要素上でのクリックは無視
    if ((e.target as HTMLElement).closest('[data-node], [data-sticky], button')) {
      return;
    }

    if (!onCanvasClick || !containerRef.current) return;

    const coords = getCanvasCoordinatesFromEvent(e, containerRef.current, viewport);
    onCanvasClick(coords);
  };

  // キャンバスマウス移動処理
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 既存のhandlersのonMouseMoveも呼ぶ
    handlers.onMouseMove(e);

    if (!onCanvasMouseMove || !containerRef.current) return;

    const coords = getCanvasCoordinatesFromEvent(e, containerRef.current, viewport);
    onCanvasMouseMove(coords);
  };

  // キャンバスマウス離脱処理
  const handleMouseLeave = () => {
    // 既存のhandlersのonMouseLeaveも呼ぶ
    handlers.onMouseLeave();

    onCanvasMouseLeave?.();
  };

  // カーソルの決定
  const getCursor = () => {
    if (cursorMode !== 'default') {
      return CURSOR_MAP[cursorMode];
    }
    return cursor ?? 'default';
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full overflow-hidden select-none', className)}
      {...handlers}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: getCursor() }}
    >
      {/* 背景グリッド */}
      <DottedGridBackground
        offsetX={viewport.offsetX}
        offsetY={viewport.offsetY}
        scale={viewport.scale}
      />

      {/* コンテンツレイヤー */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px) scale(${viewport.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>

      {/* 操作ヘルプ */}
      <CanvasControls className="bottom-4 left-4" />

      {/* ミニマップ */}
      {minimapNodes && minimapNodes.length > 0 && (
        <CanvasMinimap
          viewport={viewport}
          containerRef={containerRef}
          nodes={minimapNodes}
          connectors={minimapConnectors}
          onPanTo={actions.panTo}
        />
      )}
    </div>
  );
}
