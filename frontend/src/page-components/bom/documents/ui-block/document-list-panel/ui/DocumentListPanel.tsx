'use client';

import { Plus, FileText } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { getDocumentTypeById, type Document } from '@/shared/dummy-data/bom-v2';

interface DocumentListPanelProps {
  documents: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (documentId: string) => void;
  onAddDocument: () => void;
}

export function DocumentListPanel({
  documents,
  selectedDocumentId,
  onSelectDocument,
  onAddDocument,
}: DocumentListPanelProps) {
  return (
    <Card className='flex w-64 shrink-0 flex-col gap-0 py-0'>
      <ScrollArea className='min-h-0 flex-1'>
        <div className='space-y-2 p-3'>
          {/* アップロードボタン */}
          <button
            onClick={onAddDocument}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-3',
              'text-muted-foreground hover:border-primary hover:text-primary',
              'transition-colors'
            )}
          >
            <Plus className='size-5' />
            <span className='text-sm'>帳票を追加</span>
          </button>

          {documents.length === 0 ? (
            <NoData
              title='帳票がありません'
              description='帳票をアップロードしてください'
              size='sm'
            />
          ) : (
            documents.map((document) => {
              const docType = getDocumentTypeById(document.documentTypeId);
              return (
                <button
                  key={document.id}
                  onClick={() => onSelectDocument(document.id)}
                  className={cn(
                    'w-full overflow-hidden rounded-lg border text-left transition-all',
                    selectedDocumentId === document.id
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'bg-muted/30 hover:bg-accent'
                  )}
                >
                  {/* サムネイル */}
                  <div className='relative aspect-[4/3] bg-muted'>
                    {document.s3Path ? (
                      <Image
                        src={document.s3Path}
                        alt={document.title}
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center'>
                        <FileText className='size-8 text-muted-foreground' />
                      </div>
                    )}
                  </div>
                  {/* 情報 */}
                  <div className='p-2'>
                    <p className='truncate text-sm font-medium'>{document.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {docType?.name ?? document.documentNumber}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
