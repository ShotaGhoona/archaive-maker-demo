'use client';

import { useState } from 'react';
import { CategoryFilter } from '../ui-block/filter/ui/CategoryFilter';
import { SearchFilter } from '../ui-block/filter/ui/SearchFilter';
import { CreateFacetModal } from '../ui-block/create-facet-modal/ui/CreateFacetModal';
import { FacetTypesList } from '../ui-block/list/ui/FacetTypesList';
import type { FacetCategory } from '@/shared/dummy-data/bom-v2/types';

export function FacetTypesContainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    FacetCategory | 'all'
  >('all');

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b bg-background px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">属性定義</h1>
          <CategoryFilter
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <SearchFilter value={searchQuery} onChange={setSearchQuery} />
        </div>
        <CreateFacetModal />
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <FacetTypesList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
