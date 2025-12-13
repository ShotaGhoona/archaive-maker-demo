"use client";

import { FilterSidebarWidget } from "@/widgets/common/filter/filter-sidebar/ui/FilterSidebarWidget";
import type {
  FilterValues,
  AdvancedFilterValues,
  FilterFieldConfig,
} from "@/widgets/common/filter/filter-sidebar/model/types";

interface DocumentFilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: FilterFieldConfig[];
  simpleValues: FilterValues;
  onSimpleValuesChange: (values: FilterValues) => void;
  advancedValues: AdvancedFilterValues;
  onAdvancedValuesChange: (values: AdvancedFilterValues) => void;
}

export function DocumentFilterSidebar({
  open,
  onOpenChange,
  fields,
  simpleValues,
  onSimpleValuesChange,
  advancedValues,
  onAdvancedValuesChange,
}: DocumentFilterSidebarProps) {
  return (
    <FilterSidebarWidget
      open={open}
      onOpenChange={onOpenChange}
      fields={fields}
      simpleValues={simpleValues}
      onSimpleValuesChange={onSimpleValuesChange}
      advancedValues={advancedValues}
      onAdvancedValuesChange={onAdvancedValuesChange}
    />
  );
}
