'use client';

import { Label } from '@/shared/ui/shadcn/ui/label';
import { Switch } from '@/shared/ui/shadcn/ui/switch';

export interface BooleanFieldProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function BooleanField({
  id,
  label,
  value,
  onChange,
  disabled,
  className,
}: BooleanFieldProps) {
  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex h-10 items-center rounded-md border border-input bg-card px-3">
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
