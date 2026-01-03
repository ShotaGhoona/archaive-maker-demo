'use client';

import { useState } from 'react';
import {
  Search,
  FileText,
  Box,
  Users,
  FolderOpen,
  Filter,
  X,
  ChevronDown,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  SlidersHorizontal,
  ArrowUpDown,
  Columns3,
  Grid3X3,
  List,
} from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

// ダミーデータ
const drawings = [
  {
    id: 1,
    number: 'DR-2024-001',
    name: 'メインフレーム組立図',
    customer: '株式会社A',
    status: '承認済み',
    updated: '2024/12/15',
    version: 'v2.1',
  },
  {
    id: 2,
    number: 'DR-2024-002',
    name: 'サブアセンブリ詳細',
    customer: '株式会社B',
    status: 'レビュー中',
    updated: '2024/12/14',
    version: 'v1.3',
  },
  {
    id: 3,
    number: 'DR-2024-003',
    name: 'カバー部品図',
    customer: '株式会社A',
    status: 'ドラフト',
    updated: '2024/12/13',
    version: 'v1.0',
  },
  {
    id: 4,
    number: 'DR-2024-004',
    name: '電装配線図',
    customer: '株式会社C',
    status: '承認済み',
    updated: '2024/12/12',
    version: 'v3.0',
  },
  {
    id: 5,
    number: 'DR-2024-005',
    name: 'ベースプレート',
    customer: '株式会社B',
    status: '承認済み',
    updated: '2024/12/11',
    version: 'v1.5',
  },
  {
    id: 6,
    number: 'DR-2024-006',
    name: '支柱構造図',
    customer: '株式会社A',
    status: 'レビュー中',
    updated: '2024/12/10',
    version: 'v2.0',
  },
  {
    id: 7,
    number: 'DR-2024-007',
    name: 'コネクタ配置図',
    customer: '株式会社D',
    status: 'ドラフト',
    updated: '2024/12/09',
    version: 'v1.0',
  },
  {
    id: 8,
    number: 'DR-2024-008',
    name: '外装パネル',
    customer: '株式会社C',
    status: '承認済み',
    updated: '2024/12/08',
    version: 'v2.2',
  },
];

const filterOptions = {
  status: ['すべて', '承認済み', 'レビュー中', 'ドラフト'],
  customer: ['すべて', '株式会社A', '株式会社B', '株式会社C', '株式会社D'],
  dateRange: ['すべて', '今日', '今週', '今月', '過去3ヶ月'],
};

// ステータスバッジ
function StatusBadge({ status }: { status: string }) {
  const config = {
    承認済み: {
      icon: CheckCircle2,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    レビュー中: {
      icon: Clock,
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
    },
    ドラフト: {
      icon: AlertCircle,
      bg: 'bg-neutral-100 dark:bg-neutral-800',
      text: 'text-neutral-500',
    },
  };
  const {
    icon: Icon,
    bg,
    text,
  } = config[status as keyof typeof config] || config['ドラフト'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        bg,
        text,
      )}
    >
      <Icon className='h-3 w-3' />
      {status}
    </span>
  );
}

// フィルターパネル
function FilterPanel({
  open,
  onClose,
  filters,
  setFilters,
}: {
  open: boolean;
  onClose: () => void;
  filters: { status: string; customer: string; dateRange: string };
  setFilters: (filters: {
    status: string;
    customer: string;
    dateRange: string;
  }) => void;
}) {
  if (!open) return null;

  return (
    <div className='fixed bottom-6 right-6 z-50 w-80 duration-200 animate-in fade-in slide-in-from-bottom-4'>
      <div className='overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900'>
        {/* ヘッダー */}
        <div className='flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800'>
          <div className='flex items-center gap-2'>
            <SlidersHorizontal className='h-4 w-4 text-neutral-500' />
            <span className='font-medium text-neutral-900 dark:text-white'>
              フィルター
            </span>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* フィルター内容 */}
        <div className='space-y-4 p-4'>
          {/* ステータス */}
          <div>
            <label className='mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              ステータス
            </label>
            <div className='flex flex-wrap gap-2'>
              {filterOptions.status.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, status: option })}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    filters.status === option
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 顧客 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              顧客
            </label>
            <select
              value={filters.customer}
              onChange={(e) =>
                setFilters({ ...filters, customer: e.target.value })
              }
              className='w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
            >
              {filterOptions.customer.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* 日付範囲 */}
          <div>
            <label className='mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              更新日
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
              className='w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
            >
              {filterOptions.dateRange.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* フッター */}
        <div className='flex items-center justify-between border-t border-neutral-100 px-4 py-3 dark:border-neutral-800'>
          <button
            onClick={() =>
              setFilters({
                status: 'すべて',
                customer: 'すべて',
                dateRange: 'すべて',
              })
            }
            className='text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
          >
            リセット
          </button>
          <button
            onClick={onClose}
            className='rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100'
          >
            適用
          </button>
        </div>
      </div>
    </div>
  );
}

export function FloatingPanelDemo() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    status: 'すべて',
    customer: 'すべて',
    dateRange: 'すべて',
  });

  // フィルタリング
  const filteredDrawings = drawings.filter((d) => {
    if (filters.status !== 'すべて' && d.status !== filters.status)
      return false;
    if (filters.customer !== 'すべて' && d.customer !== filters.customer)
      return false;
    if (
      searchQuery &&
      !d.name.includes(searchQuery) &&
      !d.number.includes(searchQuery)
    )
      return false;
    return true;
  });

  const activeFiltersCount = [
    filters.status,
    filters.customer,
    filters.dateRange,
  ].filter((f) => f !== 'すべて').length;

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredDrawings.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredDrawings.map((d) => d.id));
    }
  };

  return (
    <div className='flex min-h-full flex-col bg-white dark:bg-neutral-950'>
      {/* タブバー（サイドバーなし） */}
      <div className='border-b border-neutral-200 dark:border-neutral-800'>
        <div className='flex items-center gap-1 px-6'>
          {[
            { icon: FileText, label: '図面', active: true, count: 1234 },
            { icon: Box, label: 'BOM', active: false, count: 567 },
            { icon: Users, label: '顧客', active: false, count: 89 },
            {
              icon: FolderOpen,
              label: 'プロジェクト',
              active: false,
              count: 45,
            },
          ].map((tab) => (
            <button
              key={tab.label}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors',
                tab.active
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300',
              )}
            >
              <tab.icon className='h-4 w-4' />
              {tab.label}
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs',
                  tab.active
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800',
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ツールバー */}
      <div className='flex items-center justify-between border-b border-neutral-100 px-6 py-3 dark:border-neutral-800'>
        <div className='flex items-center gap-3'>
          {/* 検索 */}
          <div className='flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 dark:bg-neutral-900'>
            <Search className='h-4 w-4 text-neutral-400' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='検索...'
              className='w-64 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white'
            />
          </div>

          {/* フィルターボタン */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              filterOpen || activeFiltersCount > 0
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800',
            )}
          >
            <Filter className='h-4 w-4' />
            フィルター
            {activeFiltersCount > 0 && (
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-neutral-900 dark:bg-neutral-900 dark:text-white'>
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* ソート */}
          <button className='flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'>
            <ArrowUpDown className='h-4 w-4' />
            更新日
            <ChevronDown className='h-4 w-4' />
          </button>
        </div>

        <div className='flex items-center gap-3'>
          {/* 表示切り替え */}
          <div className='flex items-center rounded-xl bg-neutral-100 p-1 dark:bg-neutral-900'>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'rounded-lg p-2 transition-colors',
                viewMode === 'table'
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300',
              )}
            >
              <List className='h-4 w-4' />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-lg p-2 transition-colors',
                viewMode === 'grid'
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300',
              )}
            >
              <Grid3X3 className='h-4 w-4' />
            </button>
          </div>

          {/* カラム設定 */}
          <button className='flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'>
            <Columns3 className='h-4 w-4' />
            カラム
          </button>
        </div>
      </div>

      {/* 選択時のアクションバー */}
      {selectedRows.length > 0 && (
        <div className='flex items-center justify-between bg-neutral-900 px-6 py-3 text-white dark:bg-white dark:text-neutral-900'>
          <span className='text-sm font-medium'>
            {selectedRows.length}件選択中
          </span>
          <div className='flex items-center gap-2'>
            <button className='flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/20'>
              <Download className='h-4 w-4' />
              エクスポート
            </button>
            <button className='flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/20'>
              <Trash2 className='h-4 w-4' />
              削除
            </button>
            <button
              onClick={() => setSelectedRows([])}
              className='ml-2 rounded-lg p-1.5 hover:bg-white/10 dark:hover:bg-neutral-900/10'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        </div>
      )}

      {/* テーブル */}
      <div className='flex-1 overflow-auto'>
        <table className='w-full'>
          <thead className='sticky top-0 bg-neutral-50 dark:bg-neutral-900'>
            <tr className='border-b border-neutral-200 dark:border-neutral-800'>
              <th className='px-6 py-3 text-left'>
                <input
                  type='checkbox'
                  checked={
                    selectedRows.length === filteredDrawings.length &&
                    filteredDrawings.length > 0
                  }
                  onChange={toggleAllRows}
                  className='h-4 w-4 rounded border-neutral-300 dark:border-neutral-600'
                />
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                図面番号
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                図面名
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                顧客
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                ステータス
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                更新日
              </th>
              <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500'>
                バージョン
              </th>
              <th className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {filteredDrawings.map((drawing) => (
              <tr
                key={drawing.id}
                className={cn(
                  'border-b border-neutral-100 transition-colors dark:border-neutral-800',
                  selectedRows.includes(drawing.id)
                    ? 'bg-neutral-50 dark:bg-neutral-900'
                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/50',
                )}
              >
                <td className='px-6 py-4'>
                  <input
                    type='checkbox'
                    checked={selectedRows.includes(drawing.id)}
                    onChange={() => toggleRow(drawing.id)}
                    className='h-4 w-4 rounded border-neutral-300 dark:border-neutral-600'
                  />
                </td>
                <td className='px-4 py-4'>
                  <span className='font-mono text-sm font-medium text-neutral-900 dark:text-white'>
                    {drawing.number}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span className='text-sm text-neutral-900 dark:text-white'>
                    {drawing.name}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span className='text-sm text-neutral-500'>
                    {drawing.customer}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <StatusBadge status={drawing.status} />
                </td>
                <td className='px-4 py-4'>
                  <span className='text-sm text-neutral-500'>
                    {drawing.updated}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <span className='rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'>
                    {drawing.version}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center justify-end gap-1'>
                    <button className='rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300'>
                      <Eye className='h-4 w-4' />
                    </button>
                    <button className='rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300'>
                      <MoreHorizontal className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* フローティングフィルターパネル */}
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
