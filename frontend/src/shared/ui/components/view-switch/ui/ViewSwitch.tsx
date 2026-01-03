'use client';

import { LayoutGrid, Table, GitBranch, type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';

export type ViewMode = 'table' | 'gallery' | 'tree';

interface ViewModeConfig {
  icon: LucideIcon;
  label: string;
}

const VIEW_MODE_CONFIG: Record<ViewMode, ViewModeConfig> = {
  table: { icon: Table, label: 'テーブル' },
  gallery: { icon: LayoutGrid, label: 'ギャラリー' },
  tree: { icon: GitBranch, label: 'ツリー' },
};

interface ViewSwitchProps<T extends ViewMode> {
  modes: T[];
  value: T;
  onChange: (mode: T) => void;
}

export function ViewSwitch<T extends ViewMode>({
  modes,
  value,
  onChange,
}: ViewSwitchProps<T>) {
  return (
    <div
      className={cn(
        'flex rounded-xl p-1',
        'border border-white/60 bg-white/40 backdrop-blur-xl',
        'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
      )}
    >
      {modes.map((mode) => {
        const config = VIEW_MODE_CONFIG[mode];
        const Icon = config.icon;
        const isActive = value === mode;

        return (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onChange(mode)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-white/70 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-white/50 hover:text-slate-700',
                )}
              >
                <Icon className='size-4' />
              </button>
            </TooltipTrigger>
            <TooltipContent>{config.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
