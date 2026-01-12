'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileType, Hash, ListChecks, Building2, Users } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: 'データ定義',
    items: [
      {
        href: '/settings/bom/facet-types',
        label: '属性定義',
        icon: <FileType className="size-4" />,
      },
      {
        href: '/settings/bom/part-number-rules',
        label: '品番体系',
        icon: <Hash className="size-4" />,
      },
      {
        href: '/settings/bom/master-options',
        label: '選択肢マスタ',
        icon: <ListChecks className="size-4" />,
      },
    ],
  },
  {
    title: '組織',
    items: [
      {
        href: '/settings/bom/departments',
        label: '部署管理',
        icon: <Building2 className="size-4" />,
      },
      {
        href: '/settings/bom/users',
        label: 'ユーザー管理',
        icon: <Users className="size-4" />,
      },
    ],
  },
];

export function BomSettingsSidebarWidget() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col border-r bg-card">
      <div className="flex h-12 items-center border-b px-4">
        <h2 className="text-sm font-semibold">BOM設定</h2>
      </div>
      <nav className="flex-1 space-y-6 p-4">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
