'use client';

import { useState } from 'react';

import { DocumentSidebar } from '../ui-block/sidebar/ui/DocumentSidebar';
import { DocumentTablePanel } from '../ui-block/table-view/ui/DocumentTablePanel';
import { DocumentGalleryPanel } from '../ui-block/gallery-view/ui/DocumentGalleryPanel';
import { DocumentFilterSidebar } from '../ui-block/filter/ui/DocumentFilterSidebar';
import { DocumentFilterButton } from '../ui-block/filter/ui/DocumentFilterButton';
import { DocumentSearchBar } from '../ui-block/filter/ui/DocumentSearchBar';
import { useDocumentFilter } from '../ui-block/filter/lib/use-document-filter';
import { DocumentColumnSettings } from '../ui-block/column-settings/ui/DocumentColumnSettings';
import { ViewModeSwitch } from '@/widgets/view/shared/ui/ViewModeSwitch';
import type { ViewMode } from '@/widgets/view/shared/model/types';
import { documentTypes } from '../dummy-data/documents';

// デフォルトで最初の帳票種別を選択
const DEFAULT_TYPE_ID = documentTypes[0].id;

export function DocumentHomeContainer() {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(DEFAULT_TYPE_ID);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filter = useDocumentFilter(selectedTypeId);

  return (
    <div className='flex h-screen flex-col'>
      <main className='flex min-h-0 flex-1'>
        {/* 帳票種別サイドバー */}
        <DocumentSidebar
          selectedTypeId={selectedTypeId}
          onSelectType={setSelectedTypeId}
          collapsed={filter.filterOpen}
        />

        {/* フィルターサイドバー + メインコンテンツ */}
        <div className='flex min-h-0 flex-1'>
          <DocumentFilterSidebar
            open={filter.filterOpen}
            onOpenChange={filter.setFilterOpen}
            fields={filter.filterFields}
            simpleValues={filter.simpleFilterValues}
            onSimpleValuesChange={filter.setSimpleFilterValues}
            advancedValues={filter.advancedFilterValues}
            onAdvancedValuesChange={filter.setAdvancedFilterValues}
          />

          <div className='flex min-h-0 flex-1 flex-col px-6 pt-4'>
            {/* ツールバー */}
            <div className='mb-4 flex items-center gap-4'>
              <ViewModeSwitch
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              <DocumentFilterButton
                open={filter.filterOpen}
                onToggle={filter.toggleFilter}
              />
              <DocumentSearchBar
                value={filter.searchQuery}
                onChange={filter.setSearchQuery}
                placeholder={filter.searchPlaceholder}
              />
              <div className='ml-auto flex items-center gap-2'>
                <DocumentColumnSettings selectedTypeId={selectedTypeId} />
              </div>
            </div>

            {/* テーブル/ギャラリー */}
            {viewMode === 'table' ? (
              <DocumentTablePanel selectedTypeId={selectedTypeId} />
            ) : (
              <DocumentGalleryPanel selectedTypeId={selectedTypeId} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
