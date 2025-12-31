'use client';

import { useState } from 'react';
import {
  Search,
  FileText,
  Box,
  Users,
  Settings,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  Filter,
} from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

// ダミーデータ
const recentDrawings = [
  { id: 1, name: 'DR-2024-001', title: 'メインフレーム組立図', status: '承認済み', date: '2時間前' },
  { id: 2, name: 'DR-2024-002', title: 'サブアセンブリ詳細', status: 'レビュー中', date: '5時間前' },
  { id: 3, name: 'DR-2024-003', title: 'カバー部品図', status: 'ドラフト', date: '1日前' },
  { id: 4, name: 'DR-2024-004', title: '電装配線図', status: '承認済み', date: '2日前' },
];

const stats = [
  { label: '図面数', value: '1,234', change: '+12%', trend: 'up' },
  { label: 'BOM数', value: '567', change: '+8%', trend: 'up' },
  { label: '保留中', value: '23', change: '-5%', trend: 'down' },
  { label: 'アクティブPJ', value: '45', change: '+3%', trend: 'up' },
];

const navItems = [
  { icon: FileText, label: '図面', count: 1234 },
  { icon: Box, label: 'BOM', count: 567 },
  { icon: Users, label: '顧客', count: 89 },
  { icon: Settings, label: '設定', count: null },
];

// Glass Card コンポーネント（ライトモード）
function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/60 bg-white/40 p-6 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
        'transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        className
      )}
    >
      {children}
    </div>
  );
}

// サイドバーアイテム（ライトモード）
function SidebarItem({
  icon: Icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: typeof FileText;
  label: string;
  count: number | null;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
        active
          ? 'bg-white/60 text-slate-900 shadow-sm'
          : 'text-slate-600 hover:bg-white/40 hover:text-slate-800'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1 font-medium">{label}</span>
      {count !== null && (
        <span className="rounded-full bg-slate-900/10 px-2.5 py-0.5 text-xs font-medium">
          {count.toLocaleString()}
        </span>
      )}
    </button>
  );
}

// ステータスバッジ（ライトモード）
function StatusBadge({ status }: { status: string }) {
  const styles = {
    '承認済み': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'レビュー中': 'bg-amber-100 text-amber-700 border-amber-200',
    'ドラフト': 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={cn(
        'rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[status as keyof typeof styles] || styles['ドラフト']
      )}
    >
      {status}
    </span>
  );
}

export function GlassmorphismDemo() {
  const [activeNav, setActiveNav] = useState('図面');

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* 背景グラデーション（ライトモード） */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />

      {/* 装飾的な光の効果（パステルカラー） */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-300/40 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-300/40 blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-pink-200/30 blur-[100px]" />

      {/* コンテンツ */}
      <div className="relative flex min-h-full">
        {/* サイドバー */}
        <div className="flex w-72 flex-col border-r border-slate-200/60 bg-white/20 p-4 backdrop-blur-sm">
          {/* ロゴ */}
          <div className="mb-8 flex items-center gap-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25">
              <Box className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Archaive</span>
          </div>

          {/* 検索 */}
          <div className="mb-6 px-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="検索..."
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">⌘K</kbd>
            </div>
          </div>

          {/* ナビゲーション */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                count={item.count}
                active={activeNav === item.label}
                onClick={() => setActiveNav(item.label)}
              />
            ))}
          </nav>

          {/* ユーザー */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/50 p-3 shadow-sm">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">山田 太郎</p>
                <p className="text-xs text-slate-500">管理者</p>
              </div>
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 overflow-auto p-8">
          {/* ヘッダー */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ダッシュボード</h1>
              <p className="mt-1 text-slate-500">図面とBOMの概要を確認</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2.5 text-sm text-slate-600 shadow-sm transition-colors hover:bg-white/80 hover:text-slate-900">
                <Filter className="h-4 w-4" />
                フィルター
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]">
                <Plus className="h-4 w-4" />
                新規作成
              </button>
            </div>
          </div>

          {/* 統計カード */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="p-5">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  <span
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    )}
                  >
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* メインカード */}
          <div className="grid grid-cols-3 gap-6">
            {/* 最近の図面 */}
            <GlassCard className="col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">最近の図面</h2>
                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
                  すべて表示
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentDrawings.map((drawing) => (
                  <div
                    key={drawing.id}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white/60 p-4 transition-colors hover:bg-white/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-cyan-100">
                      <FileText className="h-6 w-6 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{drawing.name}</span>
                        <StatusBadge status={drawing.status} />
                      </div>
                      <p className="mt-0.5 text-sm text-slate-500">{drawing.title}</p>
                    </div>
                    <span className="text-sm text-slate-400">{drawing.date}</span>
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* クイックアクション */}
            <GlassCard>
              <h2 className="mb-6 text-lg font-semibold text-slate-900">クイックアクション</h2>
              <div className="space-y-3">
                {[
                  { icon: FileText, label: '図面をアップロード', color: 'from-violet-500 to-violet-600' },
                  { icon: Box, label: 'BOMを作成', color: 'from-cyan-500 to-cyan-600' },
                  { icon: Users, label: '顧客を追加', color: 'from-emerald-500 to-emerald-600' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-white/60 p-4 text-left transition-all hover:bg-white/80 hover:shadow-sm"
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm',
                        action.color
                      )}
                    >
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-slate-900">{action.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* ストレージ使用量 */}
              <div className="mt-6 rounded-xl border border-slate-100 bg-white/60 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">ストレージ使用量</span>
                  <span className="font-medium text-slate-900">75%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    style={{ width: '75%' }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">7.5 GB / 10 GB 使用中</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
