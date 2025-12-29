'use client';

import { FilterSidebarWidget } from '@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget';
import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import { projectFilterFields } from '../config/filter-config';

interface ProjectFilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simpleValues: FilterValues;
  onSimpleValuesChange: (values: FilterValues) => void;
  advancedValues: AdvancedFilterValues;
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
}

export function ProjectFilterSidebar({
  open,
  onOpenChange,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
}: ProjectFilterSidebarProps) {
  return (
    <FilterSidebarWidget
      open={open}
      onOpenChange={onOpenChange}
      fields={projectFilterFields}
      simpleValues={simpleValues}
      onSimpleValuesChange={onSimpleValuesChange}
      advancedValues={advancedValues}
      onAdvancedValuesChange={onAdvancedValuesChange}
    />
  );
}
