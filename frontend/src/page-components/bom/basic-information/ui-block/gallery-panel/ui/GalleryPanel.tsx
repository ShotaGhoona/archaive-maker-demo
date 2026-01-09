'use client';

import { useState } from 'react';
import { Plus, FileImage } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/shadcn/ui/tabs';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import {
  getDocumentTypeById,
  type Drawing,
  type Document,
} from '@/shared/dummy-data/bom-v2';

interface GalleryPanelProps {
  drawings: Drawing[];
  documents: Document[];
}

export function GalleryPanel({ drawings, documents }: GalleryPanelProps) {
  const [activeTab, setActiveTab] = useState<'drawings' | 'documents'>('drawings');

  const handleAddDrawing = () => {
    alert('図面を追加（未実装）');
  };

  const handleAddDocument = () => {
    alert('ドキュメントを追加（未実装）');
  };

  const handleClick = (title: string) => {
    alert(`プレビュー: ${title}（未実装）`);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col gap-0 py-0">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'drawings' | 'documents')}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList className="h-12 w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="drawings"
            className="h-full rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            図面 ({drawings.length})
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="h-full rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            帳票 ({documents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drawings" className="mt-0 min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {drawings.length === 0 ? (
                <NoData
                  title="図面がありません"
                  description="図面をアップロードしてください"
                  size="sm"
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {drawings.map((drawing) => (
                    <button
                      key={drawing.id}
                      onClick={() => handleClick(drawing.title)}
                      className="group overflow-hidden rounded-lg border bg-muted/30 text-left transition-colors hover:bg-accent"
                    >
                      {/* サムネイル */}
                      <div className="relative aspect-[4/3] bg-muted">
                        {drawing.s3Path ? (
                          <Image
                            src={drawing.s3Path}
                            alt={drawing.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <FileImage className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {/* タイトル */}
                      <div className="p-2">
                        <p className="truncate text-sm font-medium">{drawing.title}</p>
                        <p className="text-xs text-muted-foreground">{drawing.drawingType}</p>
                      </div>
                    </button>
                  ))}

                  {/* アップロードカード */}
                  <button
                    onClick={handleAddDrawing}
                    className={cn(
                      'flex aspect-[4/3] flex-col items-center justify-center rounded-lg border-2 border-dashed',
                      'text-muted-foreground hover:border-primary hover:text-primary',
                      'transition-colors'
                    )}
                  >
                    <Plus className="mb-2 h-8 w-8" />
                    <span className="text-sm">図面を追加</span>
                  </button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="documents" className="mt-0 min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {documents.length === 0 ? (
                <NoData
                  title="帳票がありません"
                  description="帳票をアップロードしてください"
                  size="sm"
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {documents.map((doc) => {
                    const documentType = getDocumentTypeById(doc.documentTypeId);
                    return (
                      <button
                        key={doc.id}
                        onClick={() => handleClick(doc.title)}
                        className="group overflow-hidden rounded-lg border bg-muted/30 text-left transition-colors hover:bg-accent"
                      >
                        {/* サムネイル */}
                        <div className="relative aspect-[4/3] bg-muted">
                          {doc.s3Path ? (
                            <Image
                              src={doc.s3Path}
                              alt={doc.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FileImage className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        {/* タイトル */}
                        <div className="p-2">
                          <p className="truncate text-sm font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {documentType?.name ?? '-'}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {/* アップロードカード */}
                  <button
                    onClick={handleAddDocument}
                    className={cn(
                      'flex aspect-[4/3] flex-col items-center justify-center rounded-lg border-2 border-dashed',
                      'text-muted-foreground hover:border-primary hover:text-primary',
                      'transition-colors'
                    )}
                  >
                    <Plus className="mb-2 h-8 w-8" />
                    <span className="text-sm">帳票を追加</span>
                  </button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
