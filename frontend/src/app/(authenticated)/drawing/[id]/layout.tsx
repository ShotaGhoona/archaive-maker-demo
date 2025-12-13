import { DrawingDetailHeader } from '@/widgets/drawing/header/ui/DrawingDetailHeader';

export default function DrawingDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <DrawingDetailHeader />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
