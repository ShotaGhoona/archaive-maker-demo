'use client';

import { useState, useCallback } from 'react';
import type { CommentThread as CommentThreadType } from '../model/types';
import { CommentThread } from './CommentThread';
import { CommentCreator } from './components/CommentCreator';

interface CommentLayerProps {
  threads: CommentThreadType[];
  pendingPosition: { x: number; y: number } | null;
  onCreateThread: (x: number, y: number, content: string) => void;
  onCancelCreate: () => void;
  onMoveThread: (threadId: string, x: number, y: number) => void;
  onAddReply: (threadId: string, content: string) => void;
  onUpdateComment: (
    threadId: string,
    commentId: string,
    content: string,
  ) => void;
  onResolveThread: (threadId: string) => void;
}

export function CommentLayer({
  threads,
  pendingPosition,
  onCreateThread,
  onCancelCreate,
  onMoveThread,
  onAddReply,
  onUpdateComment,
  onResolveThread,
}: CommentLayerProps) {
  const [newThreadId, setNewThreadId] = useState<string | null>(null);

  const handleNewThread = useCallback((threadId: string) => {
    setNewThreadId(threadId);
    setTimeout(() => setNewThreadId(null), 100);
  }, []);

  const handleCreateSubmit = useCallback(
    (content: string) => {
      if (pendingPosition) {
        onCreateThread(pendingPosition.x, pendingPosition.y, content);
      }
    },
    [pendingPosition, onCreateThread],
  );

  return (
    <>
      {threads.map((thread) => (
        <CommentThread
          key={thread.id}
          thread={thread}
          isNewThread={thread.id === newThreadId}
          onMove={(x, y) => onMoveThread(thread.id, x, y)}
          onReply={(content) => onAddReply(thread.id, content)}
          onUpdateComment={(commentId, content) =>
            onUpdateComment(thread.id, commentId, content)
          }
          onResolve={() => onResolveThread(thread.id)}
        />
      ))}

      {pendingPosition && (
        <CommentCreator
          x={pendingPosition.x}
          y={pendingPosition.y}
          onSubmit={handleCreateSubmit}
          onCancel={onCancelCreate}
        />
      )}
    </>
  );
}
