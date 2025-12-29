'use client';

import { useState } from 'react';
import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';
import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { CsvExportModalWidget } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidget';
import {
  ViewSwitch,
  type ViewMode,
} from '@/shared/ui/components/view-switch/ui/ViewSwitch';

import { useDrawingPages } from '@/features/product/drawing-page/get-list/lib/use-drawing-pages';

import { DrawingTablePanel } from '../ui-block/table-view/ui/DrawingTablePanel';
import { DrawingGalleryPanel } from '../ui-block/gallery-view/ui/DrawingGalleryPanel';
import { DrawingFilterSidebar } from '../ui-block/filter/ui/DrawingFilterSidebar';
import { DrawingColumnSettings } from '../ui-block/column-settings/ui/DrawingColumnSettings';
import { useDrawingFilter } from '../ui-block/filter/lib/use-drawing-filter';
import { CSV_EXPORT_COLUMNS } from '../ui-block/csv-export/config/csv-export-columns';

export function DrawingHomeContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

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
  } = useDrawingFilter();

  // CSVエクスポート用にデータ取得
  const { data } = useDrawingPages({ page: 1, perPage: 100 });

  return (
    <div className='flex min-h-0 flex-1'>
      {/* サイドバーフィルター */}
      <DrawingFilterSidebar
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
          <ViewSwitch
            modes={['table', 'gallery']}
            value={viewMode}
            onChange={setViewMode}
          />
          <FilterToggleButton open={filterOpen} onToggle={toggleFilter} />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='図面番号、図面名で検索...'
            expandedWidth='w-96'
          />
          <div className='ml-auto flex items-center gap-2'>
            <DrawingColumnSettings />
            <CsvExportModalWidget
              columns={CSV_EXPORT_COLUMNS}
              data={data?.items ?? []}
            />
          </div>
        </div>

        <div className='flex min-h-0 flex-1 flex-col'>
          {viewMode === 'table' ? (
            <DrawingTablePanel />
          ) : (
            <DrawingGalleryPanel />
          )}
        </div>
      </div>
    </div>
  );
}
