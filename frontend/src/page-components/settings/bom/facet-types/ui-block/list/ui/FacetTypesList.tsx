'use client';

import { useMemo } from 'react';
import { FacetTypeCard } from './components/FacetTypeCard';
import { facetTypes } from '@/shared/dummy-data/bom-v2/facet/facet-types';
import type { FacetCategory, FacetType } from '@/shared/dummy-data/bom-v2/types';

interface FacetTypesListProps {
  searchQuery: string;
  selectedCategory: FacetCategory | 'all';
}

const categoryLabels: Record<FacetCategory, string> = {
  Design: '設計属性',
  Procurement: '調達属性',
  Manufacturing: '製造属性',
  Drawing: '図面属性',
  Document: '帳票属性',
};

const categoryOrder: FacetCategory[] = [
  'Design',
  'Procurement',
  'Manufacturing',
  'Drawing',
  'Document',
];

export function FacetTypesList({
  searchQuery,
  selectedCategory,
}: FacetTypesListProps) {
  // 今後消す==========================================
  const filteredFacetTypes = useMemo(() => {
    return facetTypes.filter((ft) => {
      if (selectedCategory !== 'all' && ft.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          ft.name.toLowerCase().includes(query) ||
          ft.code.toLowerCase().includes(query) ||
          ft.description?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);
  // =================================================

  const groupedFacetTypes = useMemo(() => {
    const groups: Record<FacetCategory, FacetType[]> = {
      Design: [],
      Procurement: [],
      Manufacturing: [],
      Drawing: [],
      Document: [],
    };

    filteredFacetTypes.forEach((ft) => {
      groups[ft.category].push(ft);
    });

    return groups;
  }, [filteredFacetTypes]);

  const handleDelete = (facetType: FacetType) => {
    alert(`削除: ${facetType.name}（未実装）`);
    // TODO: API呼び出し
  };

  return (
    <div className="space-y-6 p-6">
      {categoryOrder.map((category) => {
        const items = groupedFacetTypes[category];
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              {categoryLabels[category]} ({category})
            </h2>
            <div className="space-y-2">
              {items.map((facetType) => (
                <FacetTypeCard
                  key={facetType.id}
                  facetType={facetType}
                  onDelete={() => handleDelete(facetType)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filteredFacetTypes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">
            該当する属性定義が見つかりませんでした
          </p>
        </div>
      )}
    </div>
  );
}
