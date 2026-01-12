'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { FacetTypeModal } from '../../../facet-type-modal/ui/FacetTypeModal';
import type { FacetType, ItemType } from '@/shared/dummy-data/bom-v2/types';

interface FacetTypeCardProps {
  facetType: FacetType;
  onDelete: () => void;
}

const itemTypeLabels: Record<ItemType, string> = {
  Product: '完成品',
  Assembly: 'アセンブリ',
  Part: '製造部品',
  Purchased: '購入品',
  RawMaterial: '原材料',
};

export function FacetTypeCard({ facetType, onDelete }: FacetTypeCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const propertyCount = Object.keys(facetType.schema.properties).length;

  return (
    <>
      <div className="group flex items-start justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-medium">{facetType.name}</h3>
            <span className="text-xs text-muted-foreground">
              {propertyCount}項目
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{facetType.code}</p>
          {facetType.description && (
            <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
              {facetType.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {facetType.applicableItemTypes.map((itemType) => (
              <Badge key={itemType} variant="secondary" className="text-xs">
                {itemTypeLabels[itemType]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="ml-4 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" />
            <span className="sr-only">編集</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
            <span className="sr-only">削除</span>
          </Button>
        </div>
      </div>

      <FacetTypeModal
        open={editOpen}
        onOpenChange={setEditOpen}
        facetType={facetType}
        mode="edit"
      />
    </>
  );
}
