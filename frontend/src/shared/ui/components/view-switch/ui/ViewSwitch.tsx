'use client';

import { LayoutGrid, Table, GitBranch, type LucideIcon } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
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
    <div className='flex rounded-lg border bg-card p-1'>
      {modes.map((mode) => {
        const config = VIEW_MODE_CONFIG[mode];
        const Icon = config.icon;
        return (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <Button
                variant={value === mode ? 'default' : 'ghost'}
                size='icon'
                className='h-10 w-10'
                onClick={() => onChange(mode)}
              >
                <Icon className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{config.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
