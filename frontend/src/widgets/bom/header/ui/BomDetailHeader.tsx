'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  ArrowLeft,
  Trash2,
  Copy,
  Download,
  Info,
  MessageSquare,
  CheckSquare,
  GitBranch,
  PenTool,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/ui/dropdown-menu';
import { cn } from '@/shared/ui/shadcn/lib/utils';

const tabs: { label: string; path: string; icon: LucideIcon }[] = [
  { label: '基本情報', path: 'basic-information', icon: Info },
  { label: '図面', path: 'drawings', icon: PenTool },
  { label: '帳票', path: 'documents', icon: FileText },
  { label: 'コメント', path: 'comments', icon: MessageSquare },
  { label: 'タスク', path: 'tasks', icon: CheckSquare },
  { label: 'リビジョン', path: 'revisions', icon: GitBranch },
];

export function BomDetailHeader() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const bomId = params.id as string;

  // タブのアクティブ判定用（/drawings/DWG-001 のような場合も対応）
  const isTabActive = (tabPath: string) => pathname.includes(`/${tabPath}`);

  const handleBack = () => {
    router.push('/bom');
  };

  const handleDelete = () => {
    alert('BOMを削除（未実装）');
  };

  return (
    <header className='flex h-12 shrink-0 items-center border-b bg-card'>
      {/* Navigation Tabs */}
      <nav className='flex h-full items-center'>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              href={`/bom/${bomId}/${tab.path}`}
              className={cn(
                'relative flex h-full items-center gap-2 px-4 text-sm font-medium transition-colors',
                'hover:text-foreground',
                index !== 0 && 'border-l border-border/50',
                isTabActive(tab.path)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className='size-4' />
              {tab.label}
              {isTabActive(tab.path) && (
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary' />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className='flex-1' />

      {/* Actions Menu */}
      <div className='flex h-full items-center border-l border-border/50 px-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='size-8'>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleBack}>
              <ArrowLeft />
              一覧に戻る
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onClick={handleDelete}>
              <Trash2 />
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
