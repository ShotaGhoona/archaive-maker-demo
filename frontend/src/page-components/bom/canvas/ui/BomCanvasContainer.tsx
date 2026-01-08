'use client';

import { useMemo, useState, useCallback } from 'react';

import { useCanvasViewport } from '@/widgets/bom/canvas/viewport/lib/use-canvas-viewport';
import { CanvasViewport } from '@/widgets/bom/canvas/viewport/ui/CanvasViewport';
import { CanvasToolbar, type CanvasToolType } from '@/widgets/bom/canvas/toolbar/ui/CanvasToolbar';
import { CanvasSearch } from '@/widgets/bom/canvas/search/ui/CanvasSearch';
import { BomTreeLayer } from '../ui-block/bom-tree/ui/BomTreeLayer';
import { calculateBomTreeLayout } from '../ui-block/bom-tree/lib/tree-layout';
import { StickyNoteLayer } from '../ui-block/sticky-note/ui/StickyNoteLayer';
import { useStickyNotes } from '../ui-block/sticky-note/lib/use-sticky-notes';
import { CommentLayer } from '../ui-block/comment/ui/CommentLayer';
import { useComments } from '../ui-block/comment/lib/use-comments';
import { buildCanvasBomTree } from '../lib/build-canvas-bom-tree';

import {
  getItemsByType,
  getLatestReleasedRev,
} from '@/shared/dummy-data/bom-v2';

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

  // BOMツリーレイアウト計算
  const bomTreeLayout = useMemo(() => {
    // 最初の製品を取得
    const products = getItemsByType('Product');
    if (products.length === 0) return null;

    const product = products[0];
    const productRev = getLatestReleasedRev(product.id);
    if (!productRev) return null;

    // CanvasBomNode ツリーを構築
    const bomTree = buildCanvasBomTree(product, productRev);
    if (!bomTree) return null;

    return calculateBomTreeLayout(bomTree);
  }, []);

  // ミニマップ用コネクタ（座標のみ抽出）
  const minimapConnectors = useMemo(() => {
    if (!bomTreeLayout) return [];
    return bomTreeLayout.connectors.map(({ fromX, fromY, toX, toY }) => ({
      fromX,
      fromY,
      toX,
      toY,
    }));
  }, [bomTreeLayout]);

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

  // データがない場合
  if (!bomTreeLayout) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">BOMデータが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Viewport層 */}
      <CanvasViewport
        {...canvasViewport}
        cursor={toolCursor}
        minimapNodes={bomTreeLayout.minimapNodes}
        minimapConnectors={minimapConnectors}
        onCanvasClick={handleCanvasClick}
        onCanvasMouseMove={handleCanvasMouseMove}
        onCanvasMouseLeave={handleCanvasMouseLeave}
      >
        {/* BOMツリー（ノード+コネクタ） */}
        <BomTreeLayer
          nodes={bomTreeLayout.nodes}
          connectors={bomTreeLayout.connectors}
        />

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
      <CanvasSearch className="top-4 right-4" />

      <CanvasToolbar
        className="bottom-4 left-1/2 -translate-x-1/2"
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
      />
    </div>
  );
}
