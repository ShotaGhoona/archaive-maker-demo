'use client';

import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';

interface DocumentFilterButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function DocumentFilterButton({
  open,
  onToggle,
}: DocumentFilterButtonProps) {
  return <FilterToggleButton open={open} onToggle={onToggle} />;
}
