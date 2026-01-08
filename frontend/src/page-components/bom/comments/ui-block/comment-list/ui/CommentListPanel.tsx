'use client';

import {
  MessageSquare,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { CommentThreadWithAuthors } from '@/shared/dummy-data/bom-v2';

interface CommentListPanelProps {
  threads: CommentThreadWithAuthors[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  });
}

function CommentThreadCard({
  thread,
  isSelected,
  onSelect,
}: {
  thread: CommentThreadWithAuthors;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const firstComment = thread.comments[0];
  const replyCount = thread.comments.length - 1;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full rounded-lg border bg-card p-4 text-left transition-all',
        'hover:shadow-md',
        isSelected
          ? 'ring-2 ring-primary border-primary shadow-md'
          : 'border-border',
        thread.resolved && 'opacity-70'
      )}
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='size-7'>
            <AvatarImage src={firstComment.author.avatarUrl} />
            <AvatarFallback className='text-xs'>
              {firstComment.author.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className='text-sm font-medium'>{firstComment.author.name}</span>
          <span className='text-xs text-muted-foreground'>
            {formatDate(firstComment.createdAt)}
          </span>
        </div>
        <Badge
          variant={thread.resolved ? 'outline' : 'default'}
          className='shrink-0'
        >
          {thread.resolved ? (
            <>
              <CheckCircle2 className='mr-1 size-3' />
              解決済み
            </>
          ) : (
            <>
              <Circle className='mr-1 size-3' />
              未解決
            </>
          )}
        </Badge>
      </div>

      {/* Content */}
      <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>
        {firstComment.content}
      </p>

      {/* Footer */}
      {replyCount > 0 && (
        <div className='mt-3 flex items-center gap-1 text-xs text-muted-foreground'>
          <MessageSquare className='size-3' />
          <span>{replyCount}件の返信</span>
        </div>
      )}
    </button>
  );
}

export function CommentListPanel({
  threads,
  selectedThreadId,
  onSelectThread,
}: CommentListPanelProps) {
  return (
    <div className='h-full overflow-auto p-4'>
      <div className='space-y-3'>
        {threads.map((thread) => (
          <CommentThreadCard
            key={thread.id}
            thread={thread}
            isSelected={selectedThreadId === thread.id}
            onSelect={() => onSelectThread(thread.id)}
          />
        ))}
      </div>
    </div>
  );
}
