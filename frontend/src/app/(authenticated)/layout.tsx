/**
 * 認証済みユーザー用レイアウト
 * 認証チェックはMiddlewareで実施済みのため、ここではレイアウトのみを提供
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
    <div className='flex h-screen bg-background'>
      <AppSidebar />
      <main className='flex min-h-0 min-w-0 flex-1 flex-col bg-background'>
        {children}
      </main>
    </div>
  );
}
