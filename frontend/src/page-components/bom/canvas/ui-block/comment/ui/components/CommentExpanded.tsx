'use client';

import { useState, useRef, useCallback } from 'react';
import { Check, X, MoreHorizontal, Pencil, Send } from 'lucide-react';
import type { CommentThread, Comment } from '../../model/types';
import { DUMMY_USER } from '../../model/types';
import { COMMENT_EXPANDED_WIDTH, COMMENT_AVATAR_SIZE } from '@/shared/canvas/constant/size';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/ui/dropdown-menu';

interface CommentExpandedProps {
  thread: CommentThread;
  onReply: (content: string) => void;
  onUpdateComment: (commentId: string, content: string) => void;
  onResolve: () => void;
  onClose: () => void;
}

/** 経過時間を計算 */
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return 'たった今';
  if (diffMinutes < 60) return `${diffMinutes}分前`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}時間前`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}日前`;

  return date.toLocaleDateString('ja-JP');
}

/** 個別コメント表示 */
function CommentItem({
  comment,
  onUpdate,
}: {
  comment: Comment;
  onUpdate: (content: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  const handleStartEdit = useCallback(() => {
    setEditValue(comment.content);
    setIsEditing(true);
  }, [comment.content]);

  const handleSaveEdit = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== comment.content) {
      onUpdate(trimmed);
    }
    setIsEditing(false);
  }, [editValue, comment.content, onUpdate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSaveEdit();
      }
      if (e.key === 'Escape') {
        setIsEditing(false);
        setEditValue(comment.content);
      }
    },
    [handleSaveEdit, comment.content]
  );

  return (
    <div className="group flex gap-2 px-3 py-2">
      <img
        src={comment.author.avatarUrl}
        alt=""
        className="shrink-0 rounded-full bg-gray-100"
        style={{ width: COMMENT_AVATAR_SIZE, height: COMMENT_AVATAR_SIZE }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {comment.author.name}
          </span>
          <span className="text-xs text-gray-400">
            {getRelativeTime(comment.createdAt)}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-auto rounded p-0.5 opacity-0 hover:bg-gray-100 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleStartEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                編集
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            autoFocus
            className="mt-1 w-full rounded border border-primary px-2 py-1 text-sm outline-none"
          />
        ) : (
          <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-700">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
}

/** 返信入力欄 */
function ReplyInput({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setValue('');
    }
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 p-2">
      <img
        src={DUMMY_USER.avatarUrl}
        alt=""
        className="shrink-0 rounded-full bg-gray-100"
        style={{ width: COMMENT_AVATAR_SIZE - 8, height: COMMENT_AVATAR_SIZE - 8 }}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="返信..."
        className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 text-sm outline-none focus:border-primary"
      />

      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        className="flex shrink-0 items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CommentExpanded({
  thread,
  onReply,
  onUpdateComment,
  onResolve,
  onClose,
}: CommentExpandedProps) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
      style={{ width: COMMENT_EXPANDED_WIDTH }}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">コメント</span>
          {thread.resolved && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              <Check className="h-3 w-3" />
              解決済み
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {!thread.resolved && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded p-1 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onResolve}>
                    <Check className="mr-2 h-4 w-4" />
                    解決済みにする
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={onResolve}
                className="rounded p-1 text-gray-400 hover:bg-green-50 hover:text-green-600"
                title="解決済みにする"
              >
                <Check className="h-4 w-4" />
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            title="閉じる"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* コメント一覧 */}
      <div className="max-h-64 overflow-y-auto">
        {thread.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpdate={(content) => onUpdateComment(comment.id, content)}
          />
        ))}
      </div>

      {/* 返信入力欄 */}
      <ReplyInput onSubmit={onReply} />
    </div>
  );
}
