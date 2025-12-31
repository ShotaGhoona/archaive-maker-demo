'use client';

import { useMemo, useState, useCallback } from 'react';

import { useCanvasViewport } from '@/widgets/bom/canvas/viewport/lib/use-canvas-viewport';
import { CanvasViewport } from '@/widgets/bom/canvas/viewport/ui/CanvasViewport';
import { CanvasToolbar, type CanvasToolType } from '@/widgets/bom/canvas/toolbar/ui/CanvasToolbar';
import { NodeBlock } from '../ui-block/node/ui/NodeBlock';
import { NodeConnector } from '../ui-block/connector/ui/NodeConnector';
import { StickyNoteLayer } from '../ui-block/sticky-note/ui/StickyNoteLayer';
import { useStickyNotes } from '../ui-block/sticky-note/lib/use-sticky-notes';
import { CommentLayer } from '../ui-block/comment/ui/CommentLayer';
import { useComments } from '../ui-block/comment/lib/use-comments';
import { calculateBomTreeLayout } from '../lib/tree-layout';
import { NODE_WIDTH, NODE_HEIGHT } from '@/shared/canvas/constant/size';

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
  const [pendingCommentPosition, setPendingCommentPosition] = useState<{ x: number; y: number } | null>(null);

  // ビューポート状態管理
  const canvasViewport = useCanvasViewport();

  const { notes: stickyNotes, addNote, updateNote } = useStickyNotes();
  const {
    threads: commentThreads,
    addThread,
    addReply,
    updateComment,
    moveThread,
    resolveThread,
  } = useComments();

  const { nodes, connectors, minimapNodes } = useMemo(() => {
    const data = bomData as BomData;
    const layout = calculateBomTreeLayout(data.root);
    const minimap = layout.nodes.map((flatNode) => ({
      id: flatNode.node.id,
      x: flatNode.x,
      y: flatNode.y,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    }));
    return { ...layout, minimapNodes: minimap };
  }, []);

  // キャンバスクリック処理
  const handleCanvasClick = useCallback(
    (event: { canvasX: number; canvasY: number }) => {
      if (selectedTool === 'sticky') {
        addNote(event.canvasX, event.canvasY);
        setSelectedTool(null);
        setMousePosition(null);
      } else if (selectedTool === 'comment') {
        setPendingCommentPosition({ x: event.canvasX, y: event.canvasY });
        setSelectedTool(null);
      }
      // TODO: node ツールの処理
    },
    [selectedTool, addNote]
  );

  // コメント作成完了
  const handleCreateThread = useCallback(
    (x: number, y: number, content: string) => {
      addThread(x, y, content);
      setPendingCommentPosition(null);
    },
    [addThread]
  );

  // コメント作成キャンセル
  const handleCancelCreate = useCallback(() => {
    setPendingCommentPosition(null);
  }, []);

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
    <div className="relative h-full w-full">
      {/* Viewport層 */}
      <CanvasViewport
        {...canvasViewport}
        cursor={toolCursor}
        minimapNodes={minimapNodes}
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

        {/* コメントレイヤー */}
        <CommentLayer
          threads={commentThreads}
          pendingPosition={pendingCommentPosition}
          onCreateThread={handleCreateThread}
          onCancelCreate={handleCancelCreate}
          onMoveThread={moveThread}
          onAddReply={addReply}
          onUpdateComment={updateComment}
          onResolveThread={resolveThread}
        />
      </CanvasViewport>

      {/* オーバーレイUI層 */}
      <CanvasToolbar
        className="bottom-4 left-1/2 -translate-x-1/2"
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
      />
    </div>
  );
}
