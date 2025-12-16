'use client';

import { FilterToggleButton } from '@/widgets/common/filter/filter-sidebar/ui/FilterToggleButton';

interface ProjectFilterButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function ProjectFilterButton({
  open,
  onToggle,
}: ProjectFilterButtonProps) {
  return <FilterToggleButton open={open} onToggle={onToggle} />;
}
