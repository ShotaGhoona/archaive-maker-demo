'use client';

import { FilterSidebarWidget } from '@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget';
import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import { customerFilterFields } from '../config/filter-config';

interface CustomerFilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simpleValues: FilterValues;
  onSimpleValuesChange: (values: FilterValues) => void;
  advancedValues: AdvancedFilterValues;
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
}

export function CustomerFilterSidebar({
  open,
  onOpenChange,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
}: CustomerFilterSidebarProps) {
  return (
    <FilterSidebarWidget
      open={open}
      onOpenChange={onOpenChange}
      fields={customerFilterFields}
      simpleValues={simpleValues}
      onSimpleValuesChange={onSimpleValuesChange}
      advancedValues={advancedValues}
      onAdvancedValuesChange={onAdvancedValuesChange}
    />
  );
}
