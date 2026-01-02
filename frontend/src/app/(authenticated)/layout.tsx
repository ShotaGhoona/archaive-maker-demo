/**
 * 認証済みユーザー用レイアウト
 */
import { generateAuthenticatedMetadata } from '@/shared/lib/global-metadata';
import { AppSidebar } from '@/widgets/common/layout/sidebar/ui/AppSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = generateAuthenticatedMetadata();

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen overflow-hidden bg-background p-4">
      {/* 背景グラデーション */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" /> */}

      {/* 装飾的な光の効果 */}
      {/* <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-pink-100/40 blur-[100px]" /> */}

      {/* コンテンツエリア */}
      <div className="relative flex h-full gap-4">
        {/* サイドバーカード */}
        <AppSidebar />

        {/* メインコンテンツ */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
