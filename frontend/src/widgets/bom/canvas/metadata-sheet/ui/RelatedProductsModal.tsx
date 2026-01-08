'use client';

import { ExternalLink } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  FloatingModal,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
  FloatingModalDescription,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { getItemTypeLabel } from '@/shared/lib/bom-v2/item-type';
import type { Item, ItemRev, BOMLine } from '@/shared/dummy-data/bom-v2';

interface WhereUsedEntry {
  parentItemRev: ItemRev;
  parentItem: Item;
  bomLine: BOMLine;
  quantity: number;
}

interface RelatedProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  whereUsed: WhereUsedEntry[];
}

export function RelatedProductsModal({
  open,
  onOpenChange,
  whereUsed,
}: RelatedProductsModalProps) {
  return (
    <FloatingModal
      open={open}
      onOpenChange={onOpenChange}
      mode="stack"
      onBack={() => onOpenChange(false)}
    >
      <FloatingModalContent height="auto" showBackButton>
        <FloatingModalHeader>
          <FloatingModalTitle>使用先一覧</FloatingModalTitle>
          <FloatingModalDescription>
            このアイテムを使用している親アイテム
          </FloatingModalDescription>
        </FloatingModalHeader>
        <FloatingModalBody>
          {whereUsed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <p className="text-sm">使用先が見つかりませんでした</p>
            </div>
          ) : (
            <div className="space-y-3">
              {whereUsed.map((entry) => (
                <div
                  key={`${entry.parentItemRev.id}-${entry.bomLine.id}`}
                  className="rounded-lg border p-4 bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {getItemTypeLabel(entry.parentItem.itemType)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          数量: {entry.quantity}{entry.bomLine.unit}
                        </span>
                      </div>
                      <p className="font-medium truncate">{entry.parentItem.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {entry.parentItem.partNumber} / Rev.{entry.parentItemRev.revision}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </FloatingModalBody>
      </FloatingModalContent>
    </FloatingModal>
  );
}
