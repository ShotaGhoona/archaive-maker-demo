'use client';

import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, Circle, ExternalLink, X, Send } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/shadcn/ui/avatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { CommentThread } from '@/shared/dummy-data/bom/comments';

interface CommentDetailPanelProps {
  thread: CommentThread;
  onClose: () => void;
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CommentDetailPanel({
  thread,
  onClose,
}: CommentDetailPanelProps) {
  const router = useRouter();
  const params = useParams();
  const bomId = params.id as string;

  const handleGoToCanvas = () => {
    router.push(`/bom/${bomId}/canvas`);
  };

  const handleResolve = () => {
    alert(
      `スレッド ${thread.id} を${thread.resolved ? '未解決に戻す' : '解決済みにする'}（未実装）`,
    );
  };

  const handleReply = () => {
    alert('返信を送信（未実装）');
  };

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl',
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      )}
    >
      {/* ヘッダー */}
      <div className='flex shrink-0 items-center justify-between border-b border-slate-200/40 px-4 py-3'>
        <div className='flex items-center gap-3'>
          <Badge
            variant={thread.resolved ? 'outline' : 'default'}
            className='text-xs'
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
          <span className='text-sm text-slate-500'>
            {thread.comments.length}件
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleGoToCanvas}
            className='h-7 text-xs'
          >
            <ExternalLink className='mr-1 size-3' />
            キャンバス
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleResolve}
            className='h-7 text-xs'
          >
            {thread.resolved ? '未解決に戻す' : '解決済みにする'}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='size-7'
            onClick={onClose}
          >
            <X className='size-4' />
          </Button>
        </div>
      </div>

      {/* コメント一覧 */}
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-3 p-4'>
          {thread.comments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                'rounded-xl p-3',
                'border border-white/60 bg-white/50',
              )}
            >
              <div className='flex items-start gap-3'>
                <Avatar className='size-8 shrink-0'>
                  <AvatarImage src={comment.author.avatarUrl} />
                  <AvatarFallback className='text-xs'>
                    {comment.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-sm font-medium text-slate-900'>
                      {comment.author.name}
                    </span>
                    {comment.author.role && (
                      <Badge
                        variant='secondary'
                        className='px-1.5 py-0 text-[10px]'
                      >
                        {comment.author.role}
                      </Badge>
                    )}
                  </div>
                  <span className='text-xs text-slate-400'>
                    {formatDateTime(comment.createdAt)}
                  </span>
                  <p className='mt-2 text-sm leading-relaxed text-slate-700'>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 返信入力 */}
      <div className='shrink-0 border-t border-slate-200/40 p-3'>
        <div className='flex gap-2'>
          <Textarea
            placeholder='返信を入力...'
            className='min-h-[48px] resize-none text-sm'
          />
          <Button
            size='icon'
            className='size-10 shrink-0'
            onClick={handleReply}
          >
            <Send className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
