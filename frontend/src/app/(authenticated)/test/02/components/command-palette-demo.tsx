'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  FileText,
  Box,
  Users,
  FolderOpen,
  Clock,
  Star,
  ArrowRight,
  Command,
  CornerDownLeft,
  Hash,
  ChevronRight,
  Plus,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

// ダミーデータ
const recentItems = [
  { id: 1, type: 'drawing', name: 'DR-2024-001', title: 'メインフレーム組立図' },
  { id: 2, type: 'bom', name: 'BOM-001', title: '製品A構成' },
  { id: 3, type: 'project', name: 'PJ-2024-001', title: '新製品開発プロジェクト' },
];

const commands = [
  { icon: FileText, label: '図面を検索', shortcut: 'D' },
  { icon: Box, label: 'BOMを検索', shortcut: 'B' },
  { icon: Users, label: '顧客を検索', shortcut: 'C' },
  { icon: Plus, label: '新規作成', shortcut: 'N' },
  { icon: Settings, label: '設定', shortcut: ',' },
  { icon: HelpCircle, label: 'ヘルプ', shortcut: '?' },
];

const searchResults = [
  { type: 'drawing', name: 'DR-2024-001', title: 'メインフレーム組立図', match: '図面' },
  { type: 'drawing', name: 'DR-2024-002', title: 'サブアセンブリ詳細', match: '図面' },
  { type: 'bom', name: 'BOM-001', title: '製品A構成', match: 'BOM' },
  { type: 'project', name: 'PJ-2024-001', title: '新製品開発', match: 'プロジェクト' },
];

// アイコン選択
function TypeIcon({ type, className }: { type: string; className?: string }) {
  const icons = {
    drawing: FileText,
    bom: Box,
    project: FolderOpen,
    customer: Users,
  };
  const Icon = icons[type as keyof typeof icons] || FileText;
  return <Icon className={className} />;
}

export function CommandPaletteDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredResults = query
    ? searchResults.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative min-h-full bg-neutral-50 dark:bg-neutral-950">
      {/* 背景のコンテンツ（ぼかし） */}
      <div className={cn('min-h-full p-8 transition-all duration-300', isOpen && 'blur-sm opacity-50')}>
        <div className="mx-auto max-w-5xl">
          {/* ヘッダー */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">ワークスペース</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-neutral-900"
            >
              <Command className="h-4 w-4" />
              コマンドパレット
              <kbd className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs dark:bg-neutral-900/20">⌘K</kbd>
            </button>
          </div>

          {/* 最近のアイテム */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-neutral-500">最近のアイテム</h2>
            <div className="grid grid-cols-3 gap-4">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl',
                        item.type === 'drawing' && 'bg-blue-100 dark:bg-blue-500/10',
                        item.type === 'bom' && 'bg-violet-100 dark:bg-violet-500/10',
                        item.type === 'project' && 'bg-amber-100 dark:bg-amber-500/10'
                      )}
                    >
                      <TypeIcon
                        type={item.type}
                        className={cn(
                          'h-6 w-6',
                          item.type === 'drawing' && 'text-blue-600',
                          item.type === 'bom' && 'text-violet-600',
                          item.type === 'project' && 'text-amber-600'
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 dark:text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-neutral-500">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* プレースホルダーコンテンツ */}
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/50 p-12 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
            <Command className="mx-auto h-12 w-12 text-neutral-300 dark:text-neutral-600" />
            <p className="mt-4 text-lg font-medium text-neutral-400">
              ⌘K でコマンドパレットを開く
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              すべての操作をキーボードから素早くアクセス
            </p>
          </div>
        </div>
      </div>

      {/* コマンドパレット */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* オーバーレイ */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* パレット本体 */}
          <div className="relative w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
              {/* 検索入力 */}
              <div className="flex items-center gap-3 border-b border-neutral-100 px-4 dark:border-neutral-800">
                <Search className="h-5 w-5 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="検索またはコマンドを入力..."
                  className="h-14 flex-1 bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
                />
                <kbd className="rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-1 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800">
                  ESC
                </kbd>
              </div>

              {/* 検索結果 or コマンド一覧 */}
              <div className="max-h-[400px] overflow-auto p-2">
                {query ? (
                  // 検索結果
                  <div>
                    <p className="px-3 py-2 text-xs font-medium text-neutral-400">検索結果</p>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result, index) => (
                        <button
                          key={result.name}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                            selectedIndex === index
                              ? 'bg-neutral-100 dark:bg-neutral-800'
                              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                          )}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-lg',
                              result.type === 'drawing' && 'bg-blue-100 dark:bg-blue-500/10',
                              result.type === 'bom' && 'bg-violet-100 dark:bg-violet-500/10',
                              result.type === 'project' && 'bg-amber-100 dark:bg-amber-500/10'
                            )}
                          >
                            <TypeIcon
                              type={result.type}
                              className={cn(
                                'h-5 w-5',
                                result.type === 'drawing' && 'text-blue-600',
                                result.type === 'bom' && 'text-violet-600',
                                result.type === 'project' && 'text-amber-600'
                              )}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-neutral-900 dark:text-white">{result.name}</p>
                            <p className="text-sm text-neutral-500">{result.title}</p>
                          </div>
                          <span className="rounded-lg bg-neutral-100 px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-800">
                            {result.match}
                          </span>
                          <ChevronRight className="h-4 w-4 text-neutral-300" />
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-8 text-center">
                        <p className="text-neutral-500">結果が見つかりません</p>
                        <p className="mt-1 text-sm text-neutral-400">別のキーワードで試してください</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // コマンド一覧
                  <>
                    {/* 最近使用 */}
                    <div className="mb-2">
                      <p className="px-3 py-2 text-xs font-medium text-neutral-400">最近使用</p>
                      {recentItems.slice(0, 2).map((item, index) => (
                        <button
                          key={item.id}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                            selectedIndex === index
                              ? 'bg-neutral-100 dark:bg-neutral-800'
                              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                          )}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <Clock className="h-4 w-4 text-neutral-400" />
                          <span className="flex-1 text-neutral-900 dark:text-white">{item.name}</span>
                          <span className="text-sm text-neutral-400">{item.title}</span>
                        </button>
                      ))}
                    </div>

                    {/* コマンド */}
                    <div>
                      <p className="px-3 py-2 text-xs font-medium text-neutral-400">コマンド</p>
                      {commands.map((cmd, index) => (
                        <button
                          key={cmd.label}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                            selectedIndex === index + 2
                              ? 'bg-neutral-100 dark:bg-neutral-800'
                              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                          )}
                          onMouseEnter={() => setSelectedIndex(index + 2)}
                        >
                          <cmd.icon className="h-4 w-4 text-neutral-400" />
                          <span className="flex-1 text-neutral-900 dark:text-white">{cmd.label}</span>
                          <kbd className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800">
                            ⌘{cmd.shortcut}
                          </kbd>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* フッター */}
              <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3 dark:border-neutral-800">
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1 dark:border-neutral-700 dark:bg-neutral-800">↑↓</kbd>
                    移動
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="h-3 w-3" />
                    選択
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1 dark:border-neutral-700 dark:bg-neutral-800">ESC</kbd>
                    閉じる
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Star className="h-3 w-3" />
                  <span>お気に入りに追加</span>
                  <kbd className="ml-1 rounded border border-neutral-200 bg-neutral-100 px-1 dark:border-neutral-700 dark:bg-neutral-800">⌘S</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
