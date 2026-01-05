'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  X,
  Send,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/ui/avatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import { Card, CardContent, CardHeader } from '@/shared/ui/shadcn/ui/card';
import type { CommentThread } from '../../../dummy-data/comments';
import { CreateTaskFromCommentModal } from '../../create-task-modal/ui/CreateTaskFromCommentModal';

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

export function CommentDetailPanel({ thread, onClose }: CommentDetailPanelProps) {
  const router = useRouter();
  const params = useParams();
  const bomId = params.id as string;

  const handleGoToCanvas = () => {
    // TODO: API呼び出し - キャンバスの該当位置にジャンプ
    alert(`キャンバスの位置 (${thread.canvasPosition?.x}, ${thread.canvasPosition?.y}) に移動（未実装）`);
    router.push(`/bom/${bomId}/canvas`);
  };

  const handleResolve = () => {
    // TODO: API呼び出し
    alert(`スレッド ${thread.id} を${thread.resolved ? '未解決に戻す' : '解決済みにする'}（未実装）`);
  };

  const handleReply = () => {
    // TODO: API呼び出し
    alert('返信を送信（未実装）');
  };

  return (
    <div className='flex h-full flex-col p-4'>
      <Card className='flex h-full flex-col'>
        {/* Header */}
        <CardHeader className='shrink-0 flex items-center justify-between space-y-0 pb-4'>
          <div className='flex items-center gap-2'>
            <Badge variant={thread.resolved ? 'outline' : 'default'}>
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
            <span className='text-sm text-muted-foreground'>
              {thread.comments.length}件のコメント
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={handleGoToCanvas}>
              <ExternalLink className='mr-1 size-3' />
              キャンバスで確認
            </Button>
            <Button
              variant={thread.resolved ? 'outline' : 'secondary'}
              size='sm'
              onClick={handleResolve}
            >
              {thread.resolved ? (
                <>
                  <Circle className='mr-1 size-3' />
                  未解決に戻す
                </>
              ) : (
                <>
                  <CheckCircle2 className='mr-1 size-3' />
                  解決済みにする
                </>
              )}
            </Button>
            <Button variant='ghost' size='icon' className='size-8' onClick={onClose}>
              <X className='size-4' />
            </Button>
          </div>
        </CardHeader>

        {/* Comments */}
        <CardContent className='min-h-0 flex-1 overflow-auto'>
          <div className='space-y-4'>
            {thread.comments.map((comment) => (
              <div
                key={comment.id}
                className='rounded-lg border bg-muted/30 p-4'
              >
                <div className='flex items-start gap-3'>
                  <Avatar className='size-9 shrink-0'>
                    <AvatarImage src={comment.author.avatarUrl} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-baseline gap-2'>
                        <span className='font-medium'>{comment.author.name}</span>
                        {comment.author.role && (
                          <Badge variant='secondary' className='text-xs'>
                            {comment.author.role}
                          </Badge>
                        )}
                      </div>
                      {/* タスク登録ボタン */}
                      <CreateTaskFromCommentModal
                        comment={comment}
                        threadId={thread.id}
                      />
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {formatDateTime(comment.createdAt)}
                    </span>
                    <p className='mt-2 text-sm leading-relaxed'>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Reply Input */}
        <div className='shrink-0 border-t p-4'>
          <div className='flex gap-2'>
            <Textarea
              placeholder='返信を入力...'
              className='min-h-[60px] resize-none'
            />
            <Button size='icon' className='shrink-0' onClick={handleReply}>
              <Send className='size-4' />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
