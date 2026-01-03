'use client';

import { useState } from 'react';
import {
  FileText,
  Box,
  Users,
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Search,
  BarChart3,
  Activity,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

// ダミーデータ
const recentItems = [
  {
    id: 1,
    type: 'drawing',
    name: 'DR-2024-001',
    title: 'メインフレーム',
    time: '2時間前',
    status: 'approved',
  },
  {
    id: 2,
    type: 'bom',
    name: 'BOM-001',
    title: '製品A構成',
    time: '3時間前',
    status: 'review',
  },
  {
    id: 3,
    type: 'drawing',
    name: 'DR-2024-002',
    title: 'サブAssembly',
    time: '5時間前',
    status: 'draft',
  },
  {
    id: 4,
    type: 'drawing',
    name: 'DR-2024-003',
    title: 'カバー部品',
    time: '1日前',
    status: 'approved',
  },
];

const activities = [
  { user: '山田', action: '図面を承認', target: 'DR-2024-001', time: '10分前' },
  { user: '佐藤', action: 'BOMを更新', target: 'BOM-002', time: '30分前' },
  {
    user: '田中',
    action: 'コメントを追加',
    target: 'DR-2024-005',
    time: '1時間前',
  },
  {
    user: '鈴木',
    action: '顧客を登録',
    target: '株式会社ABC',
    time: '2時間前',
  },
];

// Bento カード
function BentoCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900',
        hover &&
          'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50',
        className,
      )}
    >
      {children}
    </div>
  );
}

// メトリクスカード
function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  sublabel: string;
  color: string;
}) {
  return (
    <BentoCard className='flex flex-col justify-between'>
      <div
        className={cn(
          'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
          color,
        )}
      >
        <Icon className='h-6 w-6 text-white' />
      </div>
      <div className='mt-4'>
        <p className='text-sm text-neutral-500'>{label}</p>
        <p className='mt-1 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white'>
          {value}
        </p>
        <p className='mt-1 text-sm text-neutral-400'>{sublabel}</p>
      </div>
    </BentoCard>
  );
}

// ステータスインジケーター
function StatusIndicator({ status }: { status: string }) {
  const config = {
    approved: {
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    review: {
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    draft: {
      icon: AlertCircle,
      color: 'text-neutral-400',
      bg: 'bg-neutral-100 dark:bg-neutral-800',
    },
  };
  const {
    icon: Icon,
    color,
    bg,
  } = config[status as keyof typeof config] || config.draft;

  return (
    <div
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-full',
        bg,
      )}
    >
      <Icon className={cn('h-4 w-4', color)} />
    </div>
  );
}

export function BentoGridDemo() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='min-h-full bg-white p-8 dark:bg-neutral-950'>
      {/* ヘッダー */}
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-neutral-900 dark:text-white'>
            おはようございます
          </h1>
          <p className='mt-1 text-neutral-500'>
            今日のタスクと最新の更新を確認しましょう
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3 dark:bg-neutral-900'>
            <Search className='h-5 w-5 text-neutral-400' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='検索...'
              className='w-64 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white'
            />
            <kbd className='rounded-lg bg-neutral-200 px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-800'>
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className='grid auto-rows-[180px] grid-cols-4 gap-4'>
        {/* メトリクス - 横1列 */}
        <MetricCard
          icon={FileText}
          label='図面'
          value='1,234'
          sublabel='今月 +128'
          color='bg-gradient-to-br from-blue-500 to-blue-600'
        />
        <MetricCard
          icon={Box}
          label='BOM'
          value='567'
          sublabel='今月 +45'
          color='bg-gradient-to-br from-violet-500 to-violet-600'
        />
        <MetricCard
          icon={Users}
          label='顧客'
          value='89'
          sublabel='今月 +12'
          color='bg-gradient-to-br from-emerald-500 to-emerald-600'
        />
        <MetricCard
          icon={FolderOpen}
          label='プロジェクト'
          value='45'
          sublabel='アクティブ'
          color='bg-gradient-to-br from-amber-500 to-amber-600'
        />

        {/* 最近のアイテム - 大きなカード */}
        <BentoCard className='col-span-2 row-span-2' hover={false}>
          <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-neutral-900 dark:text-white'>
                最近のアイテム
              </h2>
              <button className='flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white'>
                すべて表示
                <ArrowUpRight className='h-4 w-4' />
              </button>
            </div>
            <div className='mt-4 flex-1 space-y-2 overflow-auto'>
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className='group flex cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-neutral-800'
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl',
                      item.type === 'drawing'
                        ? 'bg-blue-50 dark:bg-blue-500/10'
                        : 'bg-violet-50 dark:bg-violet-500/10',
                    )}
                  >
                    {item.type === 'drawing' ? (
                      <FileText className='h-6 w-6 text-blue-500' />
                    ) : (
                      <Box className='h-6 w-6 text-violet-500' />
                    )}
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium text-neutral-900 dark:text-white'>
                      {item.name}
                    </p>
                    <p className='text-sm text-neutral-500'>{item.title}</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-neutral-400'>
                      {item.time}
                    </span>
                    <StatusIndicator status={item.status} />
                  </div>
                  <ChevronRight className='h-5 w-5 text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100' />
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* アクティビティグラフ */}
        <BentoCard className='col-span-2 row-span-1 overflow-hidden'>
          <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <BarChart3 className='h-5 w-5 text-neutral-400' />
                <h2 className='font-semibold text-neutral-900 dark:text-white'>
                  週間アクティビティ
                </h2>
              </div>
              <span className='text-sm text-emerald-500'>+23% 前週比</span>
            </div>
            <div className='mt-4 flex flex-1 items-end gap-2'>
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div
                  key={i}
                  className='flex flex-1 flex-col items-center gap-2'
                >
                  <div
                    className='w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-500 hover:from-blue-600 hover:to-blue-500'
                    style={{ height: `${height}%` }}
                  />
                  <span className='text-xs text-neutral-400'>
                    {['月', '火', '水', '木', '金', '土', '日'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* タイムライン */}
        <BentoCard className='col-span-2 row-span-1' hover={false}>
          <div className='flex h-full flex-col'>
            <div className='flex items-center gap-2'>
              <Activity className='h-5 w-5 text-neutral-400' />
              <h2 className='font-semibold text-neutral-900 dark:text-white'>
                最近のアクティビティ
              </h2>
            </div>
            <div className='mt-4 flex-1 space-y-3 overflow-auto'>
              {activities.map((activity, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <div className='h-8 w-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600' />
                  <div className='flex-1'>
                    <p className='text-sm text-neutral-900 dark:text-white'>
                      <span className='font-medium'>{activity.user}</span>
                      <span className='text-neutral-500'> が </span>
                      {activity.action}
                    </p>
                    <p className='text-xs text-neutral-400'>
                      {activity.target}
                    </p>
                  </div>
                  <span className='text-xs text-neutral-400'>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* クイックアクセス */}
        <BentoCard className='col-span-1 row-span-1'>
          <div className='flex h-full flex-col'>
            <div className='flex items-center gap-2'>
              <Layers className='h-5 w-5 text-neutral-400' />
              <h2 className='font-semibold text-neutral-900 dark:text-white'>
                クイック
              </h2>
            </div>
            <div className='mt-4 grid flex-1 grid-cols-2 gap-2'>
              {[
                { icon: FileText, label: '図面', color: 'bg-blue-500' },
                { icon: Box, label: 'BOM', color: 'bg-violet-500' },
                { icon: Users, label: '顧客', color: 'bg-emerald-500' },
                { icon: FolderOpen, label: 'PJ', color: 'bg-amber-500' },
              ].map((item) => (
                <button
                  key={item.label}
                  className='flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-2 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-neutral-800'
                >
                  <div
                    className={cn(
                      'h-8 w-8 rounded-lg',
                      item.color,
                      'flex items-center justify-center',
                    )}
                  >
                    <item.icon className='h-4 w-4 text-white' />
                  </div>
                  <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* レビュー待ち */}
        <BentoCard className='col-span-1 row-span-1'>
          <div className='flex h-full flex-col items-center justify-center text-center'>
            <div className='relative'>
              <Eye className='h-10 w-10 text-amber-500' />
              <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white'>
                5
              </span>
            </div>
            <p className='mt-3 text-2xl font-bold text-neutral-900 dark:text-white'>
              5件
            </p>
            <p className='text-sm text-neutral-500'>レビュー待ち</p>
            <button className='mt-3 text-sm font-medium text-amber-500 hover:text-amber-600'>
              確認する →
            </button>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
