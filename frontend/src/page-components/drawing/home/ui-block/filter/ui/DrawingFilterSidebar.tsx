'use client';

import { FilterSidebarWidget } from '@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget';
import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import { drawingFilterFields } from '../config/filter-config';

interface DrawingFilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simpleValues: FilterValues;
  onSimpleValuesChange: (values: FilterValues) => void;
  advancedValues: AdvancedFilterValues;
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
}

export function DrawingFilterSidebar({
  open,
  onOpenChange,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
}: DrawingFilterSidebarProps) {
  return (
    <FilterSidebarWidget
      open={open}
      onOpenChange={onOpenChange}
      fields={drawingFilterFields}
      simpleValues={simpleValues}
      onSimpleValuesChange={onSimpleValuesChange}
      advancedValues={advancedValues}
      onAdvancedValuesChange={onAdvancedValuesChange}
    />
  );
}
