'use client';

import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';

interface CheckboxCellProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxCell({
  checked,
  indeterminate,
  onChange,
}: CheckboxCellProps) {
  return (
    <div className='flex justify-center px-2'>
      <Checkbox
        checked={indeterminate ? 'indeterminate' : checked}
        onCheckedChange={(value) => onChange(value === true)}
        className='h-8 w-8 rounded-[4px] border-foreground/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary'
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
