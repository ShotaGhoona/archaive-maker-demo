'use client';

import { useState } from 'react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Card } from '@/shared/ui/shadcn/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/shadcn/ui/tabs';
import { SimpleFilterPanel } from './SimpleFilterPanel';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import type { FilterSidebarProps } from '../model/types';

type FilterTab = 'simple' | 'advanced';

interface FilterSidebarWidgetProps extends FilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function FilterSidebarWidget({
  open,
  fields,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
  onReset,
  footerRenderer,
  className,
}: FilterSidebarWidgetProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('simple');

  return (
    <Card
      className={cn(
        'flex h-full flex-col gap-0 py-0 overflow-hidden',
        'transition-all duration-300 ease-out',
        open ? 'w-80' : 'w-0 border-0 p-0 shadow-none',
        className
      )}
    >
      <div
        className={cn(
          'flex min-h-0 min-w-80 flex-1 flex-col',
          !open && 'invisible'
        )}
      >
        {/* Tab Header */}
        <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/40 px-4 py-3">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as FilterTab)}
            className="flex-1"
          >
            <TabsList className="w-full bg-white/50">
              <TabsTrigger
                value="simple"
                className="flex-1 data-[state=active]:bg-white/70 data-[state=active]:shadow-sm"
              >
                シンプル検索
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="flex-1 data-[state=active]:bg-white/70 data-[state=active]:shadow-sm"
              >
                高度な検索
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {activeTab === 'simple' ? (
          <SimpleFilterPanel
            fields={fields}
            values={simpleValues}
            onValuesChange={onSimpleValuesChange}
            onReset={onReset}
          />
        ) : (
          <AdvancedFilterPanel
            fields={fields}
            values={advancedValues}
            onValuesChange={onAdvancedValuesChange}
            onReset={onReset}
          />
        )}

        {footerRenderer?.()}
      </div>
    </Card>
  );
}
