'use client';

import { useRouter } from 'next/navigation';
import { ExternalLink, FileText, Image, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Separator } from '@/shared/ui/shadcn/ui/separator';

import type { BomNodeDetail } from '@/shared/dummy-data/bom/products';

interface BomDetailPanelProps {
  detail: BomNodeDetail;
  onClose: () => void;
}

export function BomDetailPanel({ detail, onClose }: BomDetailPanelProps) {
  const router = useRouter();

  const handleGoToDetail = () => {
    router.push(`/bom/${detail.id}/basic-information`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const formatValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') return value ? 'あり' : 'なし';
    return String(value);
  };

  return (
    <Card className='flex w-96 shrink-0 flex-col border-l py-0 gap-0'>
      {/* ヘッダー */}
      <div className='flex items-center justify-between border-b p-4'>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-base font-semibold'>{detail.name}</h3>
        </div>
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-4 w-4' />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className='flex-1'>
        <div className='space-y-4 p-4'>
          {/* 基本情報 */}
          <div>
            <h4 className='mb-2 text-base font-medium text-primary'>
              基本情報
            </h4>
            <div className='space-y-2 text-base'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>ID</span>
                <span className='font-mono'>{detail.id}</span>
              </div>
              {detail.quantity > 1 && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>数量</span>
                  <span>{detail.quantity}</span>
                </div>
              )}
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>作成日</span>
                <span>{formatDate(detail.createdAt)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>更新日</span>
                <span>{formatDate(detail.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* カスタム項目 */}
          {Object.keys(detail.customItems).length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className='mb-2 text-base font-medium text-primary'>
                  属性
                </h4>
                <div className='space-y-2 text-base'>
                  {Object.entries(detail.customItems).map(([key, value]) => (
                    <div key={key} className='flex justify-between'>
                      <span className='text-muted-foreground'>{key}</span>
                      <span>{formatValue(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ドキュメント */}
          {detail.documents.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className='mb-2 text-base font-medium text-primary'>
                  ドキュメント ({detail.documents.length})
                </h4>
                <div className='space-y-2'>
                  {detail.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className='flex items-center gap-2 rounded-md bg-muted/50 p-2 text-base'
                    >
                      <FileText className='h-5 w-5 shrink-0 text-muted-foreground' />
                      <div className='min-w-0 flex-1'>
                        <p className='truncate'>{doc.name || doc.typeName}</p>
                        <p className='text-sm text-muted-foreground'>
                          {doc.typeName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 図面 */}
          {detail.drawings.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className='mb-2 text-base font-medium text-primary'>
                  図面 ({detail.drawings.length})
                </h4>
                <div className='space-y-2'>
                  {detail.drawings.slice(0, 3).map((drw) => (
                    <div
                      key={drw.id}
                      className='flex items-center gap-2 rounded-md bg-muted/50 p-2 text-base'
                    >
                      <Image className='h-5 w-5 shrink-0 text-muted-foreground' />
                      <span className='min-w-0 flex-1 truncate'>{drw.name}</span>
                    </div>
                  ))}
                  {detail.drawings.length > 3 && (
                    <p className='text-sm text-muted-foreground'>
                      他 {detail.drawings.length - 3} 件
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className='border-t p-4'>
        <Button className='w-full' onClick={handleGoToDetail}>
          <ExternalLink className='mr-2 h-4 w-4' />
          詳細ページを開く
        </Button>
      </div>
    </Card>
  );
}
