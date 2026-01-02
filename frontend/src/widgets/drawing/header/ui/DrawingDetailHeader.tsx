'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  ExternalLink,
  Info,
  Layers,
  Calculator,
  FileText,
  FileImage,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { dummyProducts } from '@/page-components/drawing/basic-information/dummy-data/drawing-detail';

const tabs: { label: string; path: string; icon: LucideIcon }[] = [
  { label: '基本情報', path: 'basic-information', icon: Info },
  { label: '類似図面', path: 'similar', icon: Layers },
  { label: '見積もり', path: 'estimate', icon: Calculator },
  { label: '帳票', path: 'documents', icon: FileText },
];

export function DrawingDetailHeader() {
  const params = useParams();
  const pathname = usePathname();
  const drawingId = params.id as string;

  // TODO: API呼び出し
  const product = dummyProducts.find((p) => p.id === drawingId) ?? dummyProducts[0];

  const currentPath = pathname.split('/').pop();

  return (
    <header className='flex shrink-0 items-center gap-2 pb-2'>
      {/* 製品名カード */}
      <div
        className={cn(
          'flex h-12 items-center gap-2 rounded-2xl px-4',
          'border border-white/60 bg-white/40 backdrop-blur-xl',
          'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
        )}
      >
        <FileImage className='size-5 text-slate-500' />
        <span className='text-base font-semibold text-slate-900'>{product.name}</span>
      </div>

      {/* タブナビゲーション（flex-1で広がる） */}
      <nav
        className={cn(
          'flex h-12 flex-1 items-center gap-1 rounded-2xl px-1.5',
          'border border-white/60 bg-white/40 backdrop-blur-xl',
          'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
        )}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path;
          return (
            <Link
              key={tab.path}
              href={`/drawing/${drawingId}/${tab.path}`}
              className={cn(
                'flex h-9 items-center gap-2 rounded-xl px-4 text-base font-medium',
                'transition-all duration-200',
                isActive
                  ? 'bg-white/70 text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                  : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'
              )}
            >
              <Icon className='size-5' />
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* 案件へボタン */}
      <Button
        variant='outline'
        className='h-12 rounded-2xl gap-2 px-4'
        asChild
      >
        <Link href={`/project/${product.project}`}>
          <ExternalLink className='size-4' />
          案件へ
        </Link>
      </Button>
    </header>
  );
}
