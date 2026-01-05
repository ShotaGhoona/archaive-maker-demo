'use client';

import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';
import { CsvExportModalWidget } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidget';
import {
  ViewSwitch,
  type ViewMode,
} from '@/shared/ui/components/view-switch/ui/ViewSwitch';
import { Input } from '@/shared/ui/shadcn/ui/input';

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
    <div className='flex min-h-0 flex-1 flex-col'>
      {/* 統合ヘッダー: タイトル + ツールバーを1行に */}
      <header className='flex h-12 shrink-0 items-center gap-3 border-b-2 border-border bg-white px-4'>
        {/* ページタイトル */}
        <div className='flex items-center gap-2'>
          <FileText className='size-5 text-primary' />
          <h1 className='text-base font-bold text-foreground'>図面管理</h1>
        </div>

        {/* 区切り線 */}
        <div className='h-6 w-px bg-border' />

        {/* ビュー切替 */}
        <ViewSwitch
          modes={['table', 'gallery']}
          value={viewMode}
          onChange={setViewMode}
        />

        {/* フィルター */}
        <FilterToggleButton open={filterOpen} onToggle={toggleFilter} />

        {/* 検索バー（常時展開） */}
        <div className='relative w-64'>
          <Search className='absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='検索...'
            className='h-9 pl-9 text-sm'
          />
        </div>

        {/* 右側ツール */}
        <div className='ml-auto flex items-center gap-2'>
          <DrawingColumnSettings />
          <CsvExportModalWidget
            columns={CSV_EXPORT_COLUMNS}
            data={data?.items ?? []}
          />
        </div>
      </header>

      {/* コンテンツエリア */}
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
        <div className='flex min-h-0 min-w-0 flex-1 flex-col p-4'>
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
