'use client';

import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';

interface CustomerFilterButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function CustomerFilterButton({
  open,
  onToggle,
}: CustomerFilterButtonProps) {
  return <FilterToggleButton open={open} onToggle={onToggle} />;
}
