'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';

import { ProjectTablePanel } from '../ui-block/table-view/ui/ProjectTablePanel';
import { ProjectFilterSidebar } from '../ui-block/filter/ui/ProjectFilterSidebar';
import { ProjectFilterButton } from '../ui-block/filter/ui/ProjectFilterButton';
import { ProjectSearchBar } from '../ui-block/filter/ui/ProjectSearchBar';
import { ProjectColumnSettings } from '../ui-block/column-settings/ui/ProjectColumnSettings';
import { ProjectCsvExport } from '../ui-block/csv-export/ui/ProjectCsvExport';
import { useProjectFilter } from '../ui-block/filter/lib/use-project-filter';

export function ProjectHomeContainer() {
  const {
    filterOpen,
    setFilterOpen,
    toggleFilter,
    simpleFilterValues,
    setSimpleFilterValues,
    advancedFilterValues,
    setAdvancedFilterValues,
    searchQuery,
    setSearchQuery,
  } = useProjectFilter();

  return (
    <div className='flex min-h-0 flex-1'>
      {/* サイドバーフィルター */}
      <ProjectFilterSidebar
        open={filterOpen}
        onOpenChange={setFilterOpen}
        simpleValues={simpleFilterValues}
        onSimpleValuesChange={setSimpleFilterValues}
        advancedValues={advancedFilterValues}
        onAdvancedValuesChange={setAdvancedFilterValues}
      />

      {/* メインコンテンツ */}
      <div className='flex min-h-0 min-w-0 flex-1 flex-col px-6 pt-4'>
        <div className='mb-4 flex items-center gap-4'>
          <ProjectFilterButton open={filterOpen} onToggle={toggleFilter} />
          <ProjectSearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className='ml-auto flex items-center gap-2'>
            <ProjectColumnSettings />
            <ProjectCsvExport />
            <Button asChild size='xl'>
              <Link href='/project/new'>
                <Plus className='size-5' />
                新規作成
              </Link>
            </Button>
          </div>
        </div>

        <div className='flex min-h-0 flex-1 flex-col'>
          <ProjectTablePanel />
        </div>
      </div>
    </div>
  );
}
