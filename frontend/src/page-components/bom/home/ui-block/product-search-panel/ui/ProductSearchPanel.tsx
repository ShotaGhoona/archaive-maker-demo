'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import type { Item } from '@/shared/dummy-data/bom-v2';

interface ProductSearchPanelProps {
  products: Item[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function ProductSearchPanel({
  products,
  selectedProductId,
  onSelectProduct,
}: ProductSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 今後消す==========================================
  const filteredProducts = products.filter(
    (product) =>
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // =================================================

  return (
    <div className="flex w-96 shrink-0 flex-col border-r bg-card">
      {/* 検索ヘッダー */}
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="品番、品名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* 製品リスト */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredProducts.length === 0 ? (
            <NoData
              title="製品が見つかりません"
              description="検索条件を変更してください"
              size="sm"
            />
          ) : (
            <div className="space-y-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className={cn(
                    'w-full rounded-md px-3 py-2 text-left transition-colors',
                    'hover:bg-accent',
                    selectedProductId === product.id &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  <p className="text-sm font-medium">{product.partNumber}</p>
                  <p className="text-xs text-muted-foreground">{product.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
