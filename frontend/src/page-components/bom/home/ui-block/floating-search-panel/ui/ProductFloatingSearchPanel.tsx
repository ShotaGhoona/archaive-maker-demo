'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';

import { Input } from '@/shared/ui/shadcn/ui/input';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import {
  FloatingModalRoot,
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
} from '@/shared/ui/shadcn/ui/floating-modal';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { getItemsByType, type Item } from '@/shared/dummy-data/bom-v2';

interface ProductFloatingSearchPanelProps {
  selectedProduct: Item | null;
  onSelectProduct: (productId: string) => void;
}

export function ProductFloatingSearchPanel({
  selectedProduct,
  onSelectProduct,
}: ProductFloatingSearchPanelProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 製品リスト取得
  const products = useMemo(() => getItemsByType('Product'), []);

  // 今後消す==========================================
  const filteredProducts = products.filter(
    (product) =>
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // =================================================

  const handleSelect = (productId: string) => {
    onSelectProduct(productId);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <FloatingModalRoot side="left" align="start">
      <FloatingModal open={open} onOpenChange={setOpen} width="lg">
        <FloatingModalTrigger asChild>
          <button
            className={cn(
              'flex items-center gap-1 rounded-md px-3 py-1.5',
              'bg-card font-semibold',
              'hover:bg-accent transition-colors'
            )}
          >
            {selectedProduct?.name ?? '製品を選択'}
            <ChevronDown className="h-4 w-4" />
          </button>
        </FloatingModalTrigger>

        <FloatingModalContent height="full" showCloseButton>
          <FloatingModalHeader>
            <FloatingModalTitle>製品を選択</FloatingModalTitle>
          </FloatingModalHeader>
          <FloatingModalBody className="flex flex-col gap-4 px-4">
            {/* 検索 */}
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="品番、品名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* 製品リスト */}
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {filteredProducts.length === 0 ? (
                  <NoData
                    title="製品が見つかりません"
                    description="検索条件を変更してください"
                    size="sm"
                  />
                ) : (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product.id)}
                      className={cn(
                        'w-full rounded-md px-3 py-2 text-left transition-colors',
                        'hover:bg-accent',
                        selectedProduct?.id === product.id &&
                          'bg-accent text-accent-foreground'
                      )}
                    >
                      <p className="text-sm font-medium">{product.partNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.name}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </FloatingModalBody>
        </FloatingModalContent>
      </FloatingModal>
    </FloatingModalRoot>
  );
}
