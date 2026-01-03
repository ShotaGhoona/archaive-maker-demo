'use client';

import { useState } from 'react';
import {
  FileText,
  Package,
  ClipboardList,
  Users,
  Briefcase,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Box,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/ui/avatar';
import { useAppSelector } from '@/store/hooks';
import { useLogout } from '@/features/auth/logout/lib/use-logout';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'drawing',
    label: '図面管理',
    icon: FileText,
    href: '/drawing',
  },
  {
    id: 'bom',
    label: 'BOM管理',
    icon: Package,
    href: '/bom',
  },
  {
    id: 'project',
    label: '案件管理',
    icon: Briefcase,
    href: '/project',
  },
  {
    id: 'document',
    label: '帳票管理',
    icon: ClipboardList,
    href: '/document',
  },
  {
    id: 'customer',
    label: '顧客管理',
    icon: Users,
    href: '/customer',
  },
];

const bottomItems: NavItem[] = [
  {
    id: 'settings',
    label: '設定',
    icon: Settings,
    href: '/settings',
  },
  {
    id: 'help',
    label: 'ヘルプ',
    icon: HelpCircle,
    href: '/help',
  },
];

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();

  const isActive = (href: string) => pathname.startsWith(href);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const displayName = user?.name || user?.email || 'ユーザー';
  const avatarInitial =
    user?.name?.slice(0, 2) || user?.email?.slice(0, 2) || 'U';

  return (
    <Card
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        'h-full gap-0 overflow-hidden py-0',
        'transition-all duration-300 ease-out',
        isExpanded ? 'w-56' : 'w-16',
      )}
    >
      {/* ロゴ */}
      <div className='flex h-14 shrink-0 items-center gap-3 border-b border-slate-200/40 px-4'>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20'>
          <Box className='h-4 w-4 text-white' />
        </div>
        <span
          className={cn(
            'whitespace-nowrap text-base font-bold text-slate-900 transition-opacity duration-200',
            isExpanded ? 'opacity-100' : 'opacity-0',
          )}
        >
          Archaive
        </span>
      </div>

      {/* メインナビゲーション */}
      <nav className='flex-1 space-y-1 overflow-y-auto p-2'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'group/item relative flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200',
                active
                  ? 'bg-white/70 text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:bg-white/50 hover:text-slate-900',
              )}
            >
              <Icon className='h-5 w-5 shrink-0' />
              <span
                className={cn(
                  'whitespace-nowrap text-sm font-medium transition-opacity duration-200',
                  isExpanded ? 'opacity-100' : 'opacity-0',
                )}
              >
                {item.label}
              </span>
              {active && isExpanded && (
                <ChevronRight className='ml-auto h-4 w-4 text-slate-400' />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 下部ナビゲーション */}
      <div className='shrink-0 border-t border-slate-200/40 p-2'>
        <div className='space-y-1'>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200',
                  active
                    ? 'bg-white/70 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-white/50 hover:text-slate-700',
                )}
              >
                <Icon className='h-5 w-5 shrink-0' />
                <span
                  className={cn(
                    'whitespace-nowrap text-sm font-medium transition-opacity duration-200',
                    isExpanded ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ユーザー */}
        <div className='mt-2 rounded-xl border border-slate-200/40 bg-white/50 p-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-7 w-7 shrink-0 border border-slate-200/60'>
              <AvatarFallback className='bg-gradient-to-br from-violet-100 to-cyan-100 text-[10px] font-medium text-slate-700'>
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'min-w-0 flex-1 transition-opacity duration-200',
                isExpanded ? 'opacity-100' : 'opacity-0',
              )}
            >
              <p className='truncate text-xs font-medium text-slate-900'>
                {displayName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className={cn(
                'shrink-0 rounded-lg p-1 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600',
                isExpanded ? 'opacity-100' : 'opacity-0',
              )}
              title='ログアウト'
            >
              <LogOut className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
