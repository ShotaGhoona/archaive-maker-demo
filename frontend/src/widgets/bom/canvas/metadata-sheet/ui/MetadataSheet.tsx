'use client';

import { useState, useMemo } from 'react';
import { Info, Link2 } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  FloatingModalRoot,
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalFooter,
  FloatingModalTitle,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { renderFacetFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import {
  getFacetInstancesByItemRev,
  getFacetTypeById,
  findWhereUsed,
  type Item,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';
import { RelatedProductsModal } from './RelatedProductsModal';

interface MetadataSheetProps {
  item: Item;
  itemRev: ItemRev;
}

export function MetadataSheet({ item, itemRev }: MetadataSheetProps) {
  const [open, setOpen] = useState(false);
  const [relatedOpen, setRelatedOpen] = useState(false);

  // FacetInstancesからフィールドを生成
  const facetFields = useMemo(() => {
    const instances = getFacetInstancesByItemRev(itemRev.id);
    return instances.flatMap((instance) => {
      const type = getFacetTypeById(instance.facetTypeId);
      if (!type) return [];

      return renderFacetFields({
        schema: type.schema.properties,
        values: instance.values,
        onChange: () => {},
        idPrefix: instance.id,
      });
    });
  }, [itemRev.id]);

  // Where-Used（このItemRevを使用している親一覧）
  const whereUsed = useMemo(() => findWhereUsed(itemRev.id), [itemRev.id]);

  const handleSave = () => {
    // TODO: API呼び出し
    alert('メタデータを保存しました（未実装）');
  };

  return (
    <FloatingModalRoot side="right" align="end">
      <FloatingModal open={open} onOpenChange={setOpen}>
        <FloatingModalTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Info className="h-4 w-4" />
          </Button>
        </FloatingModalTrigger>
        <FloatingModalContent height="full">
          <FloatingModalHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <FloatingModalTitle>{item.name}</FloatingModalTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.partNumber} / Rev.{itemRev.revision}
                </p>
              </div>
              {whereUsed.length > 0 && (
                <button
                  onClick={() => setRelatedOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-xs text-foreground"
                >
                  <Link2 className="h-3 w-3" />
                  <span>{whereUsed.length}件の使用先</span>
                </button>
              )}
            </div>
          </FloatingModalHeader>
          <FloatingModalBody className="space-y-3">
            {facetFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Info className="mb-2 size-8 opacity-50" />
                <p className="text-sm">属性データがありません</p>
              </div>
            ) : (
              facetFields
            )}
          </FloatingModalBody>
          <FloatingModalFooter>
            <Button onClick={handleSave} className="w-full">
              保存
            </Button>
          </FloatingModalFooter>
        </FloatingModalContent>
      </FloatingModal>

      <RelatedProductsModal
        open={relatedOpen}
        onOpenChange={setRelatedOpen}
        whereUsed={whereUsed}
      />
    </FloatingModalRoot>
  );
}
