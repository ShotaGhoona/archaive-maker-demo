'use client';

import Link from 'next/link';
import { Briefcase, Plus } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { FilterChipsBar } from '@/widgets/common/filter/filter-chips';

import { ProjectTablePanel } from '../ui-block/table-view/ui/ProjectTablePanel';
import { ProjectColumnSettings } from '../ui-block/column-settings/ui/ProjectColumnSettings';
import { ProjectCsvExport } from '../ui-block/csv-export/ui/ProjectCsvExport';
import { useProjectFilter } from '../ui-block/filter/lib/use-project-filter';
import { projectFilterFields } from '../ui-block/filter/config/filter-config';

export function ProjectHomeContainer() {
  const {
    simpleFilterValues,
    setSimpleFilterValues,
    searchQuery,
    setSearchQuery,
  } = useProjectFilter();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pt-4">
      {/* ツールバー */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-slate-700" />
          <h1 className="text-lg font-semibold text-slate-900">案件管理</h1>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="案件コード、案件名で検索..."
          expandedWidth="w-80"
        />
        <div className="ml-auto flex items-center gap-3">
          <ProjectColumnSettings />
          <ProjectCsvExport />
          <Button asChild size="xl">
            <Link href="/project/new">
              <Plus className="size-5" />
              新規作成
            </Link>
          </Button>
        </div>
      </div>

      {/* フィルターチップス */}
      <FilterChipsBar
        fields={projectFilterFields}
        values={simpleFilterValues}
        onValuesChange={setSimpleFilterValues}
      />

      {/* コンテンツエリア */}
      <div className="flex min-h-0 flex-1 flex-col">
        <ProjectTablePanel />
      </div>
    </div>
  );
}
