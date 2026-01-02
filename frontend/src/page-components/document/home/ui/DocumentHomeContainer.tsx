'use client';

import { useState } from 'react';
import { ChevronRight, ClipboardList } from 'lucide-react';

import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { FilterChipsBar } from '@/widgets/common/filter/filter-chips';
import {
  ViewSwitch,
  type ViewMode,
} from '@/shared/ui/components/view-switch/ui/ViewSwitch';

import { DocumentTablePanel } from '../ui-block/table-view/ui/DocumentTablePanel';
import { DocumentGalleryPanel } from '../ui-block/gallery-view/ui/DocumentGalleryPanel';
import { DocumentColumnSettings } from '../ui-block/column-settings/ui/DocumentColumnSettings';
import { DocumentTypeBreadcrumb } from '../ui-block/breadcrumb/ui/DocumentTypeBreadcrumb';
import { useDocumentFilter } from '../ui-block/filter/lib/use-document-filter';
import { documentTypes } from '../dummy-data/documents';

// デフォルトで最初の帳票種別を選択
const DEFAULT_TYPE_ID = documentTypes[0].id;

export function DocumentHomeContainer() {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(DEFAULT_TYPE_ID);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filter = useDocumentFilter(selectedTypeId);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        {/* 左: タイトル + パンくず */}
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-slate-700" />
          <h1 className="text-lg font-semibold text-slate-900">帳票管理</h1>
        </div>
        <ChevronRight className="size-4 text-slate-300" />
        <DocumentTypeBreadcrumb
          selectedTypeId={selectedTypeId}
          onSelectType={setSelectedTypeId}
        />

        {/* 右: ツール群 */}
        <div className="ml-auto flex items-center gap-3">
          <ViewSwitch
            modes={['table', 'gallery']}
            value={viewMode}
            onChange={setViewMode}
          />
          <SearchBar
            value={filter.searchQuery}
            onChange={filter.setSearchQuery}
            placeholder={filter.searchPlaceholder}
            expandedWidth="w-80"
          />
          <DocumentColumnSettings selectedTypeId={selectedTypeId} />
        </div>
      </div>

      {/* フィルターチップス */}
      <FilterChipsBar
        fields={filter.filterFields}
        values={filter.simpleFilterValues}
        onValuesChange={filter.setSimpleFilterValues}
      />

      {/* テーブル/ギャラリー */}
      <div className="flex min-h-0 flex-1 flex-col">
        {viewMode === 'table' ? (
          <DocumentTablePanel selectedTypeId={selectedTypeId} />
        ) : (
          <DocumentGalleryPanel selectedTypeId={selectedTypeId} />
        )}
      </div>
    </div>
  );
}
