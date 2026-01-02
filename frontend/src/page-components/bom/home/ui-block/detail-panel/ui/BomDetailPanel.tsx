'use client';

import { useRouter } from 'next/navigation';
import { ExternalLink, X, FileText, Image, Package } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';

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

  // 基本情報 + カスタム情報を統合
  const infoItems = [
    { label: '名前', value: detail.name },
    { label: 'タイプ', value: detail.nodeType },
    { label: 'ID', value: detail.id.slice(0, 12) + '...' },
    { label: '数量', value: String(detail.quantity) },
    { label: '作成日', value: detail.createdAt },
    { label: '更新日', value: detail.updatedAt },
    ...Object.entries(detail.customItems).map(([key, value]) => ({
      label: key,
      value: String(value),
    })),
  ];

  return (
    <Card
      className={cn(
        'flex h-full min-w-0 flex-col gap-0 py-0',
        'border-white/60 bg-white/60 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
      )}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-slate-200/40 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              'flex size-9 items-center justify-center rounded-lg shrink-0',
              'bg-gradient-to-br from-slate-100 to-slate-200'
            )}
          >
            <Package className="size-5 text-slate-600" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-medium text-slate-900">
              {detail.name}
            </h3>
            <p className="text-sm text-slate-500">{detail.nodeType}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-8 text-slate-400 hover:text-slate-600"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* コンテンツ */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="p-4 space-y-5">
          {/* 情報リスト */}
          <div className="space-y-1">
            {infoItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-medium text-slate-700 truncate ml-4 text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* ドキュメント */}
          {detail.documents.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-600">
                ドキュメント ({detail.documents.length})
              </h4>
              <div className="space-y-1.5">
                {detail.documents.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg p-2.5 text-left',
                      'bg-white/50 border border-white/60',
                      'transition-all hover:bg-white/70'
                    )}
                  >
                    <FileText className="size-5 text-blue-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                      <p className="text-sm text-slate-400">{doc.typeName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 図面 */}
          {detail.drawings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-600">
                図面 ({detail.drawings.length})
              </h4>
              <div className="space-y-1.5">
                {detail.drawings.map((drawing) => (
                  <button
                    key={drawing.id}
                    type="button"
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg p-2.5 text-left',
                      'bg-white/50 border border-white/60',
                      'transition-all hover:bg-white/70'
                    )}
                  >
                    <Image className="size-5 text-emerald-500 shrink-0" />
                    <p className="text-sm font-medium text-slate-700 truncate flex-1">{drawing.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className="border-t border-slate-200/40 p-3">
        <Button className="w-full" onClick={handleGoToDetail}>
          <ExternalLink className="mr-2 size-4" />
          詳細を開く
        </Button>
      </div>
    </Card>
  );
}
