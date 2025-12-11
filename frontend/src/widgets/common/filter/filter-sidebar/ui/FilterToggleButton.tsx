'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';

interface FilterToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function FilterToggleButton({ open, onToggle }: FilterToggleButtonProps) {
  return (
    <Button size="xl" variant="outline" className="bg-card" onClick={onToggle}>
      {open ? (
        <>
          <X className="h-5 w-5" />
          閉じる
        </>
      ) : (
        <>
          <Filter className="h-5 w-5" />
          フィルター
        </>
      )}
    </Button>
  );
}
