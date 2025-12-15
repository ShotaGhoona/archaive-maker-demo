'use client';

import { X } from 'lucide-react';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import { cn } from '@/shared/ui/shadcn/lib/utils';

export interface MultiSelectOption {
  label: string;
  value: string;
  color?: string;
}

export interface MultiSelectFieldProps {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = '選択してください',
  disabled,
  className,
}: MultiSelectFieldProps) {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            disabled={disabled}
            className={cn(
              'h-auto min-h-10 w-full justify-start bg-card px-3 py-2 text-left text-base font-normal',
              selectedOptions.length === 0 && 'text-muted-foreground',
            )}
          >
            {selectedOptions.length > 0 ? (
              <div className='flex flex-wrap gap-1'>
                {selectedOptions.map((opt) => (
                  <Badge
                    key={opt.value}
                    variant='secondary'
                    className='gap-1 pr-1'
                    style={
                      opt.color
                        ? {
                            backgroundColor: `${opt.color}20`,
                            color: opt.color,
                          }
                        : undefined
                    }
                  >
                    {opt.label}
                    <X
                      className='h-3 w-3 cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(opt.value);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-2' align='start'>
          <div className='space-y-1'>
            {options.map((option) => (
              <div
                key={option.value}
                className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted'
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={() => handleToggle(option.value)}
                />
                {option.color && (
                  <span
                    className='h-2 w-2 rounded-full'
                    style={{ backgroundColor: option.color }}
                  />
                )}
                <span className='text-base'>{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
