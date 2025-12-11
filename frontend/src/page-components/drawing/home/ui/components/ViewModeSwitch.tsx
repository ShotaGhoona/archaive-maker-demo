'use client';

import { LayoutGrid, Table } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';

export type ViewMode = 'table' | 'gallery';

interface ViewModeSwitchProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeSwitch({ value, onChange }: ViewModeSwitchProps) {
  return (
    <div className="flex rounded-radius border p-1 bg-card h-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={value === 'table' ? 'default' : 'ghost'}
            size="icon"
            className="h-10 w-10"
            onClick={() => onChange('table')}
          >
            <Table className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>テーブル</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={value === 'gallery' ? 'default' : 'ghost'}
            size="icon"
            className="h-10 w-10"
            onClick={() => onChange('gallery')}
          >
            <LayoutGrid className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>ギャラリー</TooltipContent>
      </Tooltip>
    </div>
  );
}
