'use client';

import {
  FileText,
  Package,
  ClipboardList,
  Users,
  Briefcase,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  CheckSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/ui/avatar';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { useLogout } from '@/features/auth/logout/lib/use-logout';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'drawing',
    label: '図面管理',
    icon: <FileText className='size-5' />,
    href: '/drawing',
  },
  {
    id: 'bom',
    label: 'BOM管理',
    icon: <Package className='size-5' />,
    href: '/bom',
  },
  {
    id: 'project',
    label: '案件管理',
    icon: <Briefcase className='size-5' />,
    href: '/project',
  },
  {
    id: 'document',
    label: '帳票管理',
    icon: <ClipboardList className='size-5' />,
    href: '/document',
  },
  {
    id: 'customer',
    label: '顧客管理',
    icon: <Users className='size-5' />,
    href: '/customer',
  },
];

export function AppHeader() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();

  const isActive = (href: string) => pathname.startsWith(href);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // ユーザー名の表示（名前があれば名前、なければメールアドレス）
  const displayName = user?.name || user?.email || 'ユーザー';
  // アバターのイニシャル（名前の最初の2文字、またはメールの最初の2文字）
  const avatarInitial =
    user?.name?.slice(0, 2) || user?.email?.slice(0, 2) || 'U';

  return (
    <header className='z-10 flex h-12 shrink-0 items-center bg-primary px-2 shadow-md'>
      {/* Left: Logo */}
      <div className='flex h-full items-center px-2'>
        <Image
          src='/SVG/header-logo.svg'
          alt='ARCHAIVE'
          width={120}
          height={26}
          priority
        />
      </div>

      {/* Navigation Tabs */}
      <nav className='flex h-full items-center border-l border-primary-foreground/20'>
        {navItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'relative flex h-full items-center gap-2 px-4 text-base font-medium transition-colors',
              'text-primary-foreground/90 hover:text-primary-foreground',
              isActive(item.href) && 'text-primary-foreground',
              index !== 0 && 'border-l border-primary-foreground/20',
            )}
          >
            {item.icon}
            {item.label}
            {isActive(item.href) && (
              <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground' />
            )}
          </Link>
        ))}
      </nav>

      {/* Spacer */}
      <div className='flex-1' />

      {/* Right: Tasks, Settings, Help, User */}
      <div className='flex h-full items-center border-l border-primary-foreground/20'>
        <Link
          href='/tasks'
          className='relative flex h-full items-center gap-2 border-r border-primary-foreground/20 px-4 text-base font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground'
        >
          <CheckSquare className='size-5' />
          タスク管理
        </Link>
        <button className='relative flex h-full items-center gap-2 border-r border-primary-foreground/20 px-4 text-base font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground'>
          <Settings className='size-5' />
          設定
        </button>
        <button className='relative flex h-full items-center gap-2 border-r border-primary-foreground/20 px-4 text-base font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground'>
          <HelpCircle className='size-5' />
          ヘルプ
        </button>

        {/* User Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button className='relative flex h-full items-center gap-2 px-4 text-base font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground'>
              <Avatar className='size-6 border border-primary-foreground/30'>
                <AvatarFallback className='bg-primary-foreground/20 text-xs text-primary-foreground'>
                  {avatarInitial}
                </AvatarFallback>
              </Avatar>
              <span className='max-w-[100px] truncate'>{displayName}</span>
              <ChevronDown className='size-3.5' />
            </button>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-56 p-2'>
            <div className='mb-2 px-2 py-1.5'>
              {user?.name && <p className='text-sm font-medium'>{user.name}</p>}
              {user?.email && (
                <p className='text-xs text-muted-foreground'>{user.email}</p>
              )}
              {!user?.name && !user?.email && (
                <p className='text-sm font-medium'>ユーザーID: {user?.id}</p>
              )}
            </div>
            <Separator className='my-2' />
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive'
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className='size-4' />
              {logoutMutation.isPending ? 'ログアウト中...' : 'ログアウト'}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
