'use client';

import { useState } from 'react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
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
    <div
      className={cn(
        'flex h-full flex-col border-r bg-card shadow-md transition-all duration-300 ease-in-out',
        open ? 'w-80' : 'w-0 overflow-hidden border-r-0',
        className,
      )}
    >
      <div className='flex min-h-0 min-w-80 flex-1 flex-col'>
        {/* Tab Header */}
        <div className='flex items-center gap-2 border-b px-4 py-3'>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as FilterTab)}
            className='flex-1'
          >
            <TabsList className='w-full'>
              <TabsTrigger value='simple' className='flex-1'>
                シンプル検索
              </TabsTrigger>
              <TabsTrigger value='advanced' className='flex-1'>
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
    </div>
  );
}
