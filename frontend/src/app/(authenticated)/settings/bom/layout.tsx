import { BomSettingsSidebarWidget } from '@/widgets/settings/bom-sidebar/ui/BomSettingsSidebarWidget';

export default function BomSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1">
      <BomSettingsSidebarWidget />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
