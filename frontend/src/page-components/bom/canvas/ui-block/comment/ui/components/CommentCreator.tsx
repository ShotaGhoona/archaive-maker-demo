'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send } from 'lucide-react';
import { COMMENT_EXPANDED_WIDTH, COMMENT_AVATAR_SIZE } from '@/shared/canvas/constant/size';

interface CommentCreatorProps {
  x: number;
  y: number;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export function CommentCreator({ x, y, onSubmit, onCancel }: CommentCreatorProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 自動フォーカス
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === 'Escape') {
        onCancel();
      }
    },
    [handleSubmit, onCancel]
  );

  // 外部クリックでキャンセル
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-comment-creator]')) {
        onCancel();
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onCancel]);

  return (
    <div
      data-comment-creator
      className="absolute overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
      style={{
        left: x,
        top: y,
        width: COMMENT_EXPANDED_WIDTH,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 入力エリア */}
      <div className="flex items-center gap-2 p-3">
        {/* 入力欄 */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="コメントを入力..."
          className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-primary"
        />

        {/* 送信ボタン */}
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex shrink-0 items-center justify-center rounded bg-primary p-1.5 text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
