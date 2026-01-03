'use client';

import { useState, useMemo } from 'react';
import { MessageSquare, CheckCircle2, Circle, Filter } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { CommentListPanel } from '../ui-block/comment-list/ui/CommentListPanel';
import { CommentDetailPanel } from '../ui-block/comment-detail/ui/CommentDetailPanel';
import { dummyCommentThreads } from '../dummy-data/comments';

type FilterStatus = 'all' | 'open' | 'resolved';

const filterOptions: {
  value: FilterStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: 'all', label: 'すべて', icon: <Filter className='size-3' /> },
  { value: 'open', label: '未解決', icon: <Circle className='size-3' /> },
  {
    value: 'resolved',
    label: '解決済み',
    icon: <CheckCircle2 className='size-3' />,
  },
];

export function BomCommentsContainer() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // TODO: API呼び出し
  const threads = dummyCommentThreads;

  // 今後消す==========================================
  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'open') return !thread.resolved;
      if (filterStatus === 'resolved') return thread.resolved;
      return true;
    });
  }, [threads, filterStatus]);
  // =================================================

  const selectedThread = useMemo(() => {
    return threads.find((t) => t.id === selectedThreadId) || null;
  }, [threads, selectedThreadId]);

  const openCount = threads.filter((t) => !t.resolved).length;
  const resolvedCount = threads.filter((t) => t.resolved).length;

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
  };

  const handleCloseDetail = () => {
    setSelectedThreadId(null);
  };

  return (
    <div className='flex h-full flex-col gap-3'>
      {/* ツールバー - シンプルなガラスバー */}
      <div
        className={cn(
          'flex shrink-0 items-center justify-between rounded-xl px-4 py-2',
          'border border-white/60 bg-white/40 backdrop-blur-xl',
        )}
      >
        <div className='flex items-center gap-2'>
          <Badge variant='secondary' className='gap-1 text-xs'>
            <Circle className='size-3 text-orange-500' />
            {openCount}
          </Badge>
          <Badge variant='outline' className='gap-1 text-xs'>
            <CheckCircle2 className='size-3 text-green-500' />
            {resolvedCount}
          </Badge>
        </div>

        {/* フィルタータブ */}
        <div className='flex items-center gap-0.5'>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant='ghost'
              size='sm'
              onClick={() => setFilterStatus(option.value)}
              className={cn(
                'h-7 gap-1.5 rounded-lg px-3 text-xs',
                filterStatus === option.value
                  ? 'bg-white/70 text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              )}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className='min-h-0 flex-1'>
        {filteredThreads.length > 0 ? (
          <ResizablePanelGroup direction='horizontal' className='h-full gap-3'>
            {/* スレッドリスト - 背景として透ける */}
            <ResizablePanel
              defaultSize={selectedThread ? 40 : 100}
              minSize={30}
            >
              <div
                className={cn(
                  'h-full overflow-hidden rounded-2xl',
                  'border border-white/60 bg-white/30 backdrop-blur-xl',
                )}
              >
                <CommentListPanel
                  threads={filteredThreads}
                  selectedThreadId={selectedThreadId}
                  onSelectThread={handleSelectThread}
                />
              </div>
            </ResizablePanel>

            {/* 詳細パネル - 重要コンテンツとしてカード化 */}
            {selectedThread && (
              <>
                <ResizableHandle className='w-px bg-slate-200/40' />
                <ResizablePanel defaultSize={60} minSize={40}>
                  <CommentDetailPanel
                    thread={selectedThread}
                    onClose={handleCloseDetail}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        ) : (
          /* 空状態 - シンプルに */
          <div className='flex h-full flex-col items-center justify-center'>
            <div
              className={cn(
                'mb-4 flex size-16 items-center justify-center rounded-2xl',
                'bg-gradient-to-br from-slate-100 to-slate-200',
              )}
            >
              <MessageSquare className='size-8 text-slate-400' />
            </div>
            <p className='text-lg font-medium text-slate-700'>
              {filterStatus === 'all'
                ? 'コメントはありません'
                : filterStatus === 'open'
                  ? '未解決のコメントはありません'
                  : '解決済みのコメントはありません'}
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              キャンバスモードでコメントを追加できます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
