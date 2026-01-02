'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import type { Product } from '@/shared/dummy-data/bom/products';
import { ProductFilterButton } from './ProductFilterButton';
import { ProductFilterSidebar } from './ProductFilterSidebar';

interface ProductSearchPanelProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
}

export function ProductSearchPanel({
  products,
  selectedProductId,
  onSelectProduct,
}: ProductSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [simpleValues, setSimpleValues] = useState<FilterValues>({});
  const [advancedValues, setAdvancedValues] = useState<AdvancedFilterValues>({
    conditions: [],
  });

  // 今後消す==========================================
  const filteredProducts = products.filter(
    (product) =>
      product.productNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // =================================================

  return (
    <div className='flex h-full'>
      {/* フィルターサイドバー */}
      <ProductFilterSidebar
        open={filterOpen}
        onOpenChange={setFilterOpen}
        simpleValues={simpleValues}
        onSimpleValuesChange={setSimpleValues}
        advancedValues={advancedValues}
        onAdvancedValuesChange={setAdvancedValues}
      />

      {/* 製品検索パネル */}
      <div className='flex w-96 shrink-0 flex-col border-r border-slate-200/60 bg-white/40 backdrop-blur-xl'>
        <div className='border-b border-slate-200/60 p-4'>
          <div className='flex gap-2'>
            <div className='relative min-w-0 flex-1'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <Input
                placeholder='製品番号、製品名で検索...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-9'
              />
            </div>
            <ProductFilterButton
              open={filterOpen}
              onToggle={() => setFilterOpen(!filterOpen)}
            />
          </div>
        </div>

        <ScrollArea className='flex-1'>
          <div className='p-2'>
            {filteredProducts.length === 0 ? (
              <NoData
                title='製品が見つかりません'
                description='検索条件を変更してください'
                size='sm'
              />
            ) : (
              <div className='space-y-1'>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product.id)}
                    className={cn(
                      'w-full rounded-xl px-3 py-2 text-left transition-all duration-200',
                      'hover:bg-white/60',
                      selectedProductId === product.id &&
                        'bg-white/70 shadow-sm',
                    )}
                  >
                    <p className='text-sm font-medium text-slate-900'>{product.productNumber}</p>
                    <p className='text-xs text-slate-500'>
                      {product.productName}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
