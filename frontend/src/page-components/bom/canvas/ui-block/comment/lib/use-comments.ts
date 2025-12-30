'use client';

import { useState, useCallback } from 'react';
import type { CommentThread, Comment } from '../model/types';
import { DUMMY_USER } from '../model/types';

export interface UseCommentsReturn {
  threads: CommentThread[];
  addThread: (x: number, y: number, content: string) => CommentThread;
  addReply: (threadId: string, content: string) => void;
  updateComment: (threadId: string, commentId: string, content: string) => void;
  deleteComment: (threadId: string, commentId: string) => void;
  deleteThread: (threadId: string) => void;
  moveThread: (threadId: string, x: number, y: number) => void;
  resolveThread: (threadId: string) => void;
}

export function useComments(): UseCommentsReturn {
  const [threads, setThreads] = useState<CommentThread[]>([]);

  // 新しいスレッドを作成
  const addThread = useCallback((x: number, y: number, content: string): CommentThread => {
    const now = new Date().toISOString();
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      author: DUMMY_USER,
      createdAt: now,
    };

    const newThread: CommentThread = {
      id: `thread-${Date.now()}`,
      x,
      y,
      resolved: false,
      comments: [newComment],
      createdAt: now,
    };

    setThreads((prev) => [...prev, newThread]);
    return newThread;
  }, []);

  // スレッドに返信を追加
  const addReply = useCallback((threadId: string, content: string) => {
    const now = new Date().toISOString();
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      author: DUMMY_USER,
      createdAt: now,
    };

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? { ...thread, comments: [...thread.comments, newComment] }
          : thread
      )
    );
  }, []);

  // コメントを更新
  const updateComment = useCallback(
    (threadId: string, commentId: string, content: string) => {
      const now = new Date().toISOString();

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                comments: thread.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, content, updatedAt: now }
                    : comment
                ),
              }
            : thread
        )
      );
    },
    []
  );

  // コメントを削除（スレッドの最初のコメントを削除するとスレッドごと削除）
  const deleteComment = useCallback((threadId: string, commentId: string) => {
    setThreads((prev) => {
      const thread = prev.find((t) => t.id === threadId);
      if (!thread) return prev;

      // 最初のコメントを削除する場合はスレッドごと削除
      if (thread.comments[0]?.id === commentId) {
        return prev.filter((t) => t.id !== threadId);
      }

      // それ以外は該当コメントのみ削除
      return prev.map((t) =>
        t.id === threadId
          ? { ...t, comments: t.comments.filter((c) => c.id !== commentId) }
          : t
      );
    });
  }, []);

  // スレッドを削除
  const deleteThread = useCallback((threadId: string) => {
    setThreads((prev) => prev.filter((thread) => thread.id !== threadId));
  }, []);

  // スレッドを移動
  const moveThread = useCallback((threadId: string, x: number, y: number) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId ? { ...thread, x, y } : thread
      )
    );
  }, []);

  // スレッドを解決（削除と同等）
  const resolveThread = useCallback((threadId: string) => {
    setThreads((prev) => prev.filter((thread) => thread.id !== threadId));
  }, []);

  return {
    threads,
    addThread,
    addReply,
    updateComment,
    deleteComment,
    deleteThread,
    moveThread,
    resolveThread,
  };
}
