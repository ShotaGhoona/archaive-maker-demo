'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { FilterChipsBar } from '@/widgets/common/filter/filter-chips';
import { CsvExportModalWidget } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidget';
import {
  ViewSwitch,
  type ViewMode,
} from '@/shared/ui/components/view-switch/ui/ViewSwitch';

import { useDrawingPages } from '@/features/product/drawing-page/get-list/lib/use-drawing-pages';

import { DrawingTablePanel } from '../ui-block/table-view/ui/DrawingTablePanel';
import { DrawingGalleryPanel } from '../ui-block/gallery-view/ui/DrawingGalleryPanel';
import { DrawingColumnSettings } from '../ui-block/column-settings/ui/DrawingColumnSettings';
import { useDrawingFilter } from '../ui-block/filter/lib/use-drawing-filter';
import { FILTER_FIELDS } from '../ui-block/filter/config/filter-fields';
import { CSV_EXPORT_COLUMNS } from '../ui-block/csv-export/config/csv-export-columns';

export function DrawingHomeContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const {
    simpleFilterValues,
    setSimpleFilterValues,
    searchQuery,
    setSearchQuery,
  } = useDrawingFilter();

  // CSVエクスポート用にデータ取得
  const { data } = useDrawingPages({ page: 1, perPage: 100 });

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* ツールバー */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-700" />
          <h1 className="text-lg font-semibold text-slate-900">図面管理</h1>
        </div>
        <ViewSwitch
          modes={['table', 'gallery']}
          value={viewMode}
          onChange={setViewMode}
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="図面番号、図面名で検索..."
          expandedWidth="w-80"
        />
        <div className="ml-auto flex items-center gap-3">
          <DrawingColumnSettings />
          <CsvExportModalWidget
            columns={CSV_EXPORT_COLUMNS}
            data={data?.items ?? []}
          />
        </div>
      </div>

      {/* フィルターチップス */}
      <FilterChipsBar
        fields={FILTER_FIELDS}
        values={simpleFilterValues}
        onValuesChange={setSimpleFilterValues}
      />

      {/* コンテンツエリア */}
      <div className="flex min-h-0 flex-1 flex-col">
        {viewMode === 'table' ? (
          <DrawingTablePanel />
        ) : (
          <DrawingGalleryPanel />
        )}
      </div>
    </div>
  );
}
