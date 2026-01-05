'use client';

import { useState, useCallback } from 'react';
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
import { renderDynamicFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import { RelatedProductsModal, RELATED_PRODUCTS } from './RelatedProductsModal';

interface MetadataSheetProps {
  nodeName: string;
  customItems: Record<string, unknown>;
}

export function MetadataSheet({ nodeName, customItems }: MetadataSheetProps) {
  const [open, setOpen] = useState(false);
  const [relatedOpen, setRelatedOpen] = useState(false);
  const [items, setItems] = useState<Record<string, unknown>>(customItems);

  const updateItem = useCallback((key: string, value: unknown) => {
    setItems((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    // TODO: API呼び出し
    alert(`メタデータを保存しました（未実装）\n${JSON.stringify(items, null, 2)}`);
  }, [items]);

  return (
    <FloatingModalRoot side="right" align="end">
      {/* メインのメタデータモーダル */}
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
              <FloatingModalTitle>{nodeName}</FloatingModalTitle>
              {/* 関連Product - タイトル横のバッジボタン */}
              <button
                onClick={() => setRelatedOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-xs text-foreground"
              >
                <Link2 className="h-3 w-3" />
                <span>{RELATED_PRODUCTS.length}件の関連</span>
              </button>
            </div>
          </FloatingModalHeader>
          <FloatingModalBody className="space-y-4">
            {renderDynamicFields(items, updateItem)}
          </FloatingModalBody>
          <FloatingModalFooter>
            <Button onClick={handleSave} className="w-full">
              保存
            </Button>
          </FloatingModalFooter>
        </FloatingModalContent>
      </FloatingModal>

      {/* 関連Productモーダル（stack） */}
      <RelatedProductsModal open={relatedOpen} onOpenChange={setRelatedOpen} />
    </FloatingModalRoot>
  );
}
