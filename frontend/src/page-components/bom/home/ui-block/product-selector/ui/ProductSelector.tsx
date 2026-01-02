'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, Check, Package, Search } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import type { Product } from '@/shared/dummy-data/bom/products';

interface ProductSelectorProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
}: ProductSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // カテゴリでグループ化
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    products.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [products]);

  // 検索フィルター
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.productName.toLowerCase().includes(query) ||
        p.productNumber.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // フィルター後のカテゴリグループ
  const filteredByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  const handleSelect = (productId: string) => {
    onSelectProduct(productId);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 px-3 max-w-xs"
        >
          {selectedProduct ? (
            <>
              <span className="truncate">{selectedProduct.productName}</span>
              <Badge variant="secondary" className="ml-1 shrink-0">
                {selectedProduct.category}
              </Badge>
            </>
          ) : (
            <span className="text-slate-500">製品を選択...</span>
          )}
          <ChevronRight className="size-4 rotate-90 text-slate-400 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          'w-80 p-0',
          'border-white/60 bg-white/95 backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
        )}
      >
        {/* 検索 */}
        <div className="p-2 border-b border-slate-200/40">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="製品を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8 bg-white/50"
            />
          </div>
        </div>

        {/* 製品リスト */}
        <div className="max-h-80 overflow-y-auto p-1">
          {Object.keys(filteredByCategory).length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              該当する製品がありません
            </p>
          ) : (
            Object.entries(filteredByCategory).map(([category, categoryProducts]) => (
              <div key={category} className="mb-2 last:mb-0">
                <div className="px-2 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {category}
                </div>
                {categoryProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelect(product.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left',
                      'transition-colors hover:bg-white/70',
                      selectedProductId === product.id && 'bg-white/50'
                    )}
                  >
                    <div
                      className={cn(
                        'flex size-8 items-center justify-center rounded-lg',
                        'bg-gradient-to-br from-slate-100 to-slate-200'
                      )}
                    >
                      <Package className="size-4 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          'text-sm truncate',
                          selectedProductId === product.id
                            ? 'font-medium text-slate-900'
                            : 'text-slate-700'
                        )}
                      >
                        {product.productName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {product.productNumber}
                      </p>
                    </div>
                    {selectedProductId === product.id && (
                      <Check className="size-4 shrink-0 text-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
