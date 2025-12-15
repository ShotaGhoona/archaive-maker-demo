import { BomDetailHeader } from '@/widgets/bom/header/ui/BomDetailHeader';

export default function BomDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full flex-col'>
      <BomDetailHeader />
      <main className='flex min-h-0 flex-1 flex-col'>{children}</main>
    </div>
  );
}
