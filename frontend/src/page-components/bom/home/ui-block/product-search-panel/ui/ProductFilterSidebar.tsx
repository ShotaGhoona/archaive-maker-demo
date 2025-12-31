'use client';

import { FilterSidebarWidget } from '@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget';
import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import { productFilterFields } from '../config/filter-config';

interface ProductFilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simpleValues: FilterValues;
  onSimpleValuesChange: (values: FilterValues) => void;
  advancedValues: AdvancedFilterValues;
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
}

export function ProductFilterSidebar({
  open,
  onOpenChange,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
}: ProductFilterSidebarProps) {
  return (
    <FilterSidebarWidget
      open={open}
      onOpenChange={onOpenChange}
      fields={productFilterFields}
      simpleValues={simpleValues}
      onSimpleValuesChange={onSimpleValuesChange}
      advancedValues={advancedValues}
      onAdvancedValuesChange={onAdvancedValuesChange}
    />
  );
}
