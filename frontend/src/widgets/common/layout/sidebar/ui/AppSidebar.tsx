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

export function AppSidebar() {
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
    <aside className='flex h-full w-56 shrink-0 flex-col border-r-2 border-border bg-primary'>
      {/* Logo */}
      <div className='flex h-16 shrink-0 items-center justify-center border-b-2 border-primary-foreground/20 px-4'>
        <Image
          src='/SVG/header-logo.svg'
          alt='ARCHAIVE'
          width={140}
          height={30}
          priority
        />
      </div>

      {/* Main Navigation */}
      <nav className='flex flex-1 flex-col gap-1 p-3'>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded px-4 py-3 text-sm font-semibold transition-colors',
              'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
              isActive(item.href) &&
                'bg-primary-foreground/20 text-primary-foreground',
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className='shrink-0 border-t-2 border-primary-foreground/20 p-3'>
        {/* Settings & Help */}
        <div className='mb-2 flex flex-col gap-1'>
          <button className='flex items-center gap-3 rounded px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground'>
            <Settings className='size-4' />
            設定
          </button>
          <button className='flex items-center gap-3 rounded px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground'>
            <HelpCircle className='size-4' />
            ヘルプ
          </button>
        </div>

        {/* User */}
        <Popover>
          <PopoverTrigger asChild>
            <button className='flex w-full items-center gap-3 rounded border-2 border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-left transition-colors hover:bg-primary-foreground/20'>
              <Avatar className='size-8 border-2 border-primary-foreground/30'>
                <AvatarFallback className='bg-primary-foreground/20 text-xs font-bold text-primary-foreground'>
                  {avatarInitial}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold text-primary-foreground'>
                  {displayName}
                </p>
              </div>
              <ChevronDown className='size-4 shrink-0 text-primary-foreground/60' />
            </button>
          </PopoverTrigger>
          <PopoverContent align='start' side='top' className='w-56 p-2'>
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
    </aside>
  );
}
