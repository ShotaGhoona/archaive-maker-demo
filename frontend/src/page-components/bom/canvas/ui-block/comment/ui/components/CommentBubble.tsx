'use client';

import { useState } from 'react';
import type { CommentThread } from '../../model/types';
import { COMMENT_AVATAR_SIZE, COMMENT_PREVIEW_WIDTH } from '@/shared/canvas/constant/size';

interface CommentBubbleProps {
  thread: CommentThread;
  isDragging?: boolean;
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

export function CommentBubble({ thread, isDragging = false }: CommentBubbleProps) {
  const [isHovering, setIsHovering] = useState(false);

  const firstComment = thread.comments[0];
  const replyCount = thread.comments.length - 1;
  const avatarUrl = firstComment?.author.avatarUrl ?? '';

  const showPreview = isHovering && !isDragging && firstComment;

  return (
    <div
      className="relative"
      onMouseEnter={() => !isDragging && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* アバター（常に表示） */}
      <img
        src={avatarUrl}
        alt=""
        className={`cursor-pointer rounded-full bg-gray-100 shadow-md transition-all duration-200 ${
          showPreview ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ width: COMMENT_AVATAR_SIZE, height: COMMENT_AVATAR_SIZE }}
      />

      {/* プレビュー（ホバー時にフェードイン） */}
      {firstComment && (
        <div
          className={`absolute left-0 top-0 flex cursor-pointer gap-2 rounded-xl border border-white/60 bg-white/80 backdrop-blur-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-200 ${
            showPreview ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
          }`}
          style={{ width: COMMENT_PREVIEW_WIDTH }}
        >
          <img
            src={avatarUrl}
            alt=""
            className="shrink-0 rounded-full bg-gray-100"
            style={{ width: COMMENT_AVATAR_SIZE, height: COMMENT_AVATAR_SIZE }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium text-gray-900">
                {firstComment.author.name}
              </span>
              <span className="shrink-0 text-xs text-gray-400">
                {getRelativeTime(firstComment.createdAt)}
              </span>
            </div>
            <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">
              {firstComment.content}
            </p>
            {replyCount > 0 && (
              <p className="mt-1 text-xs text-primary">{replyCount}件の返信</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
