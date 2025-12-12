'use client';

import { useMemo, useState } from 'react';
import { TableViewWidget } from '@/widgets/view/table-view/ui/TableViewWidgets';
import { GalleryViewWidget } from '@/widgets/view/gallery-view/ui/GalleryViewWidget';
import { FilterSidebarWidget } from '@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget';
import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';
import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { CsvExportModalWidgets } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidgets';
import type {
  SortState,
  PaginationConfig,
} from '@/widgets/view/table-view/model/types';
import type { GalleryCardConfig, GridColumns } from '@/widgets/view/gallery-view/model/types';
import type { FilterValues, AdvancedFilterValues } from '@/widgets/common/filter/filter-sidebar/model/types';
import { dummyDrawings, type DrawingItem } from '../dummy-data/drawings';
import { createDrawingColumns } from '../config/column-config';
import { drawingFilterFields } from '../config/filter-config';
import { ViewModeSwitch, type ViewMode } from './components/ViewModeSwitch';

// ギャラリーカード設定
const galleryCardConfig: GalleryCardConfig<DrawingItem> = {
  thumbnailKey: 'thumbnailUrl',
  contentRenderer: (item) => (
    <>
      <h3 className="truncate font-medium">{item.name}</h3>
      <p className="truncate text-sm text-muted-foreground">{item.drawingNumber}</p>
    </>
  ),
};

export function DrawingHomeContainer() {
  // UI状態のみ管理
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortState, setSortState] = useState<SortState>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    totalItems: dummyDrawings.length,
    pageSizeOptions: [10, 20, 50],
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [galleryColumns, setGalleryColumns] = useState<GridColumns>(4);
  const [filterOpen, setFilterOpen] = useState(false);
  const [simpleFilterValues, setSimpleFilterValues] = useState<FilterValues>({});
  const [advancedFilterValues, setAdvancedFilterValues] = useState<AdvancedFilterValues>({
    conditions: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = (row: DrawingItem) => {
    alert(`図面を開く（未実装）: ${row.drawingNumber} - ${row.name}`);
    // TODO: router.push(`/drawing/${row.id}`)
  };

  const handleDelete = (row: DrawingItem) => {
    alert(`図面を削除（未実装）: ${row.drawingNumber} - ${row.name}`);
    // TODO: API呼び出し
  };

  const columns = useMemo(
    () => createDrawingColumns(handleOpen, handleDelete),
    []
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // TODO: API呼び出し
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
      currentPage: 1,
    }));
    // TODO: API呼び出し
  };

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
    // TODO: API呼び出し
  };

  const handleSelectionChange = (newSelectedRows: Set<number>) => {
    setSelectedRows(newSelectedRows);
  };

  const handleCardClick = (item: DrawingItem) => {
    alert(`図面詳細へ遷移（未実装）: ${item.drawingNumber} - ${item.name}`);
    // TODO: router.push(`/drawing/${item.id}`)
  };

  return (
    <div className="flex min-h-0 flex-1">
      {/* サイドバーフィルター */}
      <FilterSidebarWidget
        open={filterOpen}
        onOpenChange={setFilterOpen}
        fields={drawingFilterFields}
        simpleValues={simpleFilterValues}
        onSimpleValuesChange={setSimpleFilterValues}
        advancedValues={advancedFilterValues}
        onAdvancedValuesChange={setAdvancedFilterValues}
      />

      {/* メインコンテンツ */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-6 pt-4">
        <div className="mb-4 flex items-center gap-4">
          <ViewModeSwitch value={viewMode} onChange={setViewMode} />
          <FilterToggleButton
            open={filterOpen}
            onToggle={() => setFilterOpen(!filterOpen)}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="図面番号、図面名で検索..."
            expandedWidth="w-96"
          />
          <div className="ml-auto">
            <CsvExportModalWidgets
              columns={columns}
              data={dummyDrawings}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {viewMode === 'table' ? (
            <TableViewWidget
              data={dummyDrawings}
              columns={columns}
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              sortState={sortState}
              onSortChange={handleSortChange}
              selectedRows={selectedRows}
              onSelectionChange={handleSelectionChange}
            />
          ) : (
            <GalleryViewWidget
              data={dummyDrawings}
              cardConfig={galleryCardConfig}
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onCardClick={handleCardClick}
              columns={galleryColumns}
              onColumnsChange={setGalleryColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
}
