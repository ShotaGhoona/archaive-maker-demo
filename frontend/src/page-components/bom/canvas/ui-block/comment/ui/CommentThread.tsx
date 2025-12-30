'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CommentThread as CommentThreadType } from '../model/types';
import { useDrag } from '../lib/use-drag';
import { CommentBubble } from './components/CommentBubble';
import { CommentExpanded } from './components/CommentExpanded';

interface CommentThreadProps {
  thread: CommentThreadType;
  isNewThread?: boolean;
  onMove: (x: number, y: number) => void;
  onReply: (content: string) => void;
  onUpdateComment: (commentId: string, content: string) => void;
  onResolve: () => void;
}

export function CommentThread({
  thread,
  isNewThread = false,
  onMove,
  onReply,
  onUpdateComment,
  onResolve,
}: CommentThreadProps) {
  const [isExpanded, setIsExpanded] = useState(isNewThread);

  // 新規スレッドの場合は最初から展開
  useEffect(() => {
    if (isNewThread) {
      setIsExpanded(true);
    }
  }, [isNewThread]);

  // ドラッグ（展開時は無効）
  const { isDragging, hasDragged, handleDragMouseDown } = useDrag({
    initialX: thread.x,
    initialY: thread.y,
    disabled: isExpanded,
    onDrag: onMove,
  });

  // クリックで展開（ドラッグ後はクリック扱いにしない）
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isExpanded && !isDragging && !hasDragged) {
        setIsExpanded(true);
      }
    },
    [isExpanded, isDragging, hasDragged]
  );

  // 閉じる
  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // 外部クリックで閉じる
  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-thread-id="${thread.id}"]`)) {
        setIsExpanded(false);
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded, thread.id]);

  return (
    <div
      data-thread-id={thread.id}
      className="absolute"
      style={{
        left: thread.x,
        top: thread.y,
        cursor: isExpanded ? 'default' : isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={isExpanded ? undefined : handleDragMouseDown}
      onClick={handleClick}
    >
      {isExpanded ? (
        <CommentExpanded
          thread={thread}
          onReply={onReply}
          onUpdateComment={onUpdateComment}
          onResolve={onResolve}
          onClose={handleClose}
        />
      ) : (
        <CommentBubble thread={thread} isDragging={isDragging} />
      )}
    </div>
  );
}
