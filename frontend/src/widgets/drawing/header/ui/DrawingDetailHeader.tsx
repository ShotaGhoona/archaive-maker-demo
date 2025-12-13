'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { MoreHorizontal, ArrowLeft, Trash2, Copy, Download } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/ui/dropdown-menu';
import { cn } from '@/shared/ui/shadcn/lib/utils';

const tabs = [
  { label: '基本情報', path: 'basic-information' },
  { label: '類似図面', path: 'similar' },
  { label: '見積もり情報', path: 'estimate' },
  { label: '帳票', path: 'documents' },
];

export function DrawingDetailHeader() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const drawingId = params.id as string;

  const currentPath = pathname.split('/').pop();

  const handleBack = () => {
    router.push('/drawing');
  };

  const handleDuplicate = () => {
    alert('図面を複製（未実装）');
  };

  const handleDownload = () => {
    alert('図面をダウンロード（未実装）');
  };

  const handleDelete = () => {
    alert('図面を削除（未実装）');
  };

  return (
    <header className="flex h-12 shrink-0 items-center border-b bg-card">
      {/* Navigation Tabs */}
      <nav className="flex h-full items-center">
        {tabs.map((tab, index) => (
          <Link
            key={tab.path}
            href={`/drawing/${drawingId}/${tab.path}`}
            className={cn(
              'relative flex h-full items-center px-4 text-lg font-medium transition-colors',
              'hover:text-foreground',
              index !== 0 && 'border-l border-border/50',
              currentPath === tab.path
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {tab.label}
            {currentPath === tab.path && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </Link>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions Menu */}
      <div className="flex h-full items-center border-l border-border/50 px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleBack}>
              <ArrowLeft />
              一覧に戻る
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy />
              複製
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download />
              ダウンロード
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <Trash2 />
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
