'use client';

import { useState, useMemo } from 'react';
import { MessageSquare, CheckCircle2, Circle } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { CommentListPanel } from '../ui-block/comment-list/ui/CommentListPanel';
import { CommentDetailPanel } from '../ui-block/comment-detail/ui/CommentDetailPanel';
import { getCommentThreadsWithAuthors } from '@/shared/dummy-data/bom-v2';

type FilterStatus = 'all' | 'open' | 'resolved';

export function BomCommentsContainer() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // TODO: API呼び出し
  const threads = getCommentThreadsWithAuthors();

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

  const counts = useMemo(() => ({
    all: threads.length,
    open: threads.filter((t) => !t.resolved).length,
    resolved: threads.filter((t) => t.resolved).length,
  }), [threads]);

  const filterOptions: { value: FilterStatus; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'すべて', icon: <MessageSquare className='size-3' /> },
    { value: 'open', label: '未解決', icon: <Circle className='size-3' /> },
    { value: 'resolved', label: '解決済み', icon: <CheckCircle2 className='size-3' /> },
  ];

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
  };

  const handleCloseDetail = () => {
    setSelectedThreadId(null);
  };

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='flex shrink-0 items-center justify-end border-b px-6 py-3'>
        {/* Filter Tabs */}
        <div className='flex items-center gap-1 rounded-lg bg-muted p-1'>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant='ghost'
              size='sm'
              onClick={() => setFilterStatus(option.value)}
              className={cn(
                'gap-1.5 px-3',
                filterStatus === option.value && 'bg-background shadow-sm'
              )}
            >
              {option.icon}
              {option.label}
              <span className='text-muted-foreground'>
                {counts[option.value]}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='min-h-0 flex-1'>
        {filteredThreads.length > 0 ? (
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            {/* Thread List */}
            <ResizablePanel defaultSize={selectedThread ? 40 : 100} minSize={30}>
              <CommentListPanel
                threads={filteredThreads}
                selectedThreadId={selectedThreadId}
                onSelectThread={handleSelectThread}
              />
            </ResizablePanel>

            {/* Detail Panel */}
            {selectedThread && (
              <>
                <ResizableHandle withHandle />
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
          <div className='flex h-full flex-col items-center justify-center text-muted-foreground'>
            <MessageSquare className='mb-4 size-12 opacity-50' />
            <p className='text-lg font-medium'>
              {filterStatus === 'all'
                ? 'コメントはありません'
                : filterStatus === 'open'
                  ? '未解決のコメントはありません'
                  : '解決済みのコメントはありません'}
            </p>
            <p className='mt-1 text-sm'>
              キャンバスモードでコメントを追加できます
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
