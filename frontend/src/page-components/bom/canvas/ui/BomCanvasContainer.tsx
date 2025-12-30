'use client';

import { useMemo, useState, useCallback } from 'react';

import { CanvasViewportProvider } from '@/widgets/bom/canvas/viewport/ui/CanvasViewportProvider';
import { CanvasViewport } from '@/widgets/bom/canvas/viewport/ui/CanvasViewport';
import { CanvasToolbar, type CanvasToolType } from '@/widgets/bom/canvas/toolbar/ui/CanvasToolbar';
import { NodeBlock } from '../ui-block/node/ui/NodeBlock';
import { NodeConnector } from '../ui-block/connector/ui/NodeConnector';
import { StickyNoteLayer } from '../ui-block/sticky-note/ui/StickyNoteLayer';
import { useStickyNotes } from '../ui-block/sticky-note/lib/use-sticky-notes';
import { calculateBomTreeLayout } from '../lib/tree-layout';

import bomData from '@/shared/dummy-data/bom/mock6LayerRobotArm.json';
import type { BomData } from '@/shared/dummy-data/bom/types';

const TOOL_CURSOR_MAP: Record<Exclude<CanvasToolType, null>, string> = {
  sticky: 'crosshair',
  comment: 'crosshair',
  node: 'crosshair',
};

export function BomCanvasContainer() {
  const [selectedTool, setSelectedTool] = useState<CanvasToolType>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const { notes: stickyNotes, addNote, updateNote } = useStickyNotes();

  const { nodes, connectors } = useMemo(() => {
    const data = bomData as BomData;
    return calculateBomTreeLayout(data.root);
  }, []);

  // キャンバスクリック処理
  const handleCanvasClick = useCallback(
    (event: { canvasX: number; canvasY: number }) => {
      if (selectedTool === 'sticky') {
        addNote(event.canvasX, event.canvasY);
        setSelectedTool(null);
        setMousePosition(null);
      }
      // TODO: comment, node ツールの処理
    },
    [selectedTool, addNote]
  );

  // マウス移動処理
  const handleCanvasMouseMove = useCallback(
    (event: { canvasX: number; canvasY: number }) => {
      if (selectedTool === 'sticky') {
        setMousePosition({ x: event.canvasX, y: event.canvasY });
      }
    },
    [selectedTool]
  );

  // マウス離脱処理
  const handleCanvasMouseLeave = useCallback(() => {
    setMousePosition(null);
  }, []);

  // ツールに応じたカーソル
  const toolCursor = selectedTool ? TOOL_CURSOR_MAP[selectedTool] : undefined;

  return (
    <CanvasViewportProvider>
      <div className="relative h-full w-full">
        {/* Viewport層 */}
        <CanvasViewport
          cursor={toolCursor}
          onCanvasClick={handleCanvasClick}
          onCanvasMouseMove={handleCanvasMouseMove}
          onCanvasMouseLeave={handleCanvasMouseLeave}
        >
          {/* コネクタ（SVGレイヤー） */}
          <svg
            className="pointer-events-none absolute inset-0"
            style={{ overflow: 'visible' }}
          >
            {connectors.map((connector) => (
              <NodeConnector
                key={`${connector.fromId}-${connector.toId}`}
                fromX={connector.fromX}
                fromY={connector.fromY}
                toX={connector.toX}
                toY={connector.toY}
              />
            ))}
          </svg>

          {/* ノード */}
          {nodes.map((flatNode) => (
            <div
              key={flatNode.node.id}
              data-node
              style={{
                position: 'absolute',
                left: flatNode.x,
                top: flatNode.y,
              }}
            >
              <NodeBlock node={flatNode.node} />
            </div>
          ))}

          {/* 付箋レイヤー */}
          <StickyNoteLayer
            notes={stickyNotes}
            onUpdate={updateNote}
            previewPosition={selectedTool === 'sticky' ? mousePosition : null}
          />
        </CanvasViewport>

        {/* オーバーレイUI層 */}
        <CanvasToolbar
          className="bottom-4 left-1/2 -translate-x-1/2"
          selectedTool={selectedTool}
          onToolChange={setSelectedTool}
        />
      </div>
    </CanvasViewportProvider>
  );
}
