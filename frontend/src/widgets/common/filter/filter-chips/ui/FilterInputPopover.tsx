'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import type { FilterFieldConfig, FilterOption } from '../model/types';

interface FilterInputPopoverProps {
  field: FilterFieldConfig;
  value: unknown;
  onValueChange: (value: unknown) => void;
  onClose: () => void;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FilterInputPopover({
  field,
  value,
  onValueChange,
  onClose,
  children,
  open,
  onOpenChange,
}: FilterInputPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          'w-72 p-3',
          'border-white/60 bg-white/90 backdrop-blur-xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
        )}
      >
        <FilterInputContent
          field={field}
          value={value}
          onValueChange={onValueChange}
          onClose={onClose}
        />
      </PopoverContent>
    </Popover>
  );
}

interface FilterInputContentProps {
  field: FilterFieldConfig;
  value: unknown;
  onValueChange: (value: unknown) => void;
  onClose: () => void;
}

function FilterInputContent({
  field,
  value,
  onValueChange,
  onClose,
}: FilterInputContentProps) {
  const [localValue, setLocalValue] = useState<unknown>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleApply = useCallback(() => {
    onValueChange(localValue);
    onClose();
  }, [localValue, onValueChange, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleApply();
      }
    },
    [handleApply]
  );

  switch (field.type) {
    case 'text':
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{field.label}</p>
          <Input
            type="text"
            placeholder={field.placeholder || `${field.label}を入力`}
            value={(localValue as string) || ''}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white/50"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              キャンセル
            </Button>
            <Button size="sm" onClick={handleApply}>
              適用
            </Button>
          </div>
        </div>
      );

    case 'multiselect':
      return (
        <MultiSelectInput
          field={field}
          value={localValue as string[] | undefined}
          onChange={setLocalValue}
          onApply={handleApply}
          onClose={onClose}
        />
      );

    case 'date':
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{field.label}</p>
          <Input
            type="date"
            value={(localValue as string) || ''}
            onChange={(e) => setLocalValue(e.target.value)}
            className="bg-white/50"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              キャンセル
            </Button>
            <Button size="sm" onClick={handleApply}>
              適用
            </Button>
          </div>
        </div>
      );

    case 'number':
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{field.label}</p>
          <Input
            type="number"
            placeholder={field.placeholder || `${field.label}を入力`}
            value={(localValue as number) || ''}
            onChange={(e) => setLocalValue(e.target.valueAsNumber || undefined)}
            onKeyDown={handleKeyDown}
            className="bg-white/50"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              キャンセル
            </Button>
            <Button size="sm" onClick={handleApply}>
              適用
            </Button>
          </div>
        </div>
      );

    case 'user':
      return (
        <UserSelectInput
          field={field}
          value={localValue as string[] | undefined}
          onChange={setLocalValue}
          onApply={handleApply}
          onClose={onClose}
        />
      );

    case 'boolean':
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">{field.label}</p>
          <div className="flex gap-2">
            <Button
              variant={localValue === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLocalValue(true)}
            >
              はい
            </Button>
            <Button
              variant={localValue === false ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLocalValue(false)}
            >
              いいえ
            </Button>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              キャンセル
            </Button>
            <Button size="sm" onClick={handleApply}>
              適用
            </Button>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// マルチセレクト入力
interface MultiSelectInputProps {
  field: FilterFieldConfig;
  value: string[] | undefined;
  onChange: (value: unknown) => void;
  onApply: () => void;
  onClose: () => void;
}

function MultiSelectInput({
  field,
  value,
  onChange,
  onApply,
  onClose,
}: MultiSelectInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedValues = value || [];
  const options = field.options || [];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700">{field.label}</p>
      <Input
        type="text"
        placeholder="検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-8 bg-white/50"
      />
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredOptions.map((option) => (
          <OptionItem
            key={option.value}
            option={option}
            selected={selectedValues.includes(option.value)}
            onToggle={() => toggleOption(option.value)}
          />
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
        <Button variant="ghost" size="sm" onClick={onClose}>
          キャンセル
        </Button>
        <Button size="sm" onClick={onApply}>
          適用
        </Button>
      </div>
    </div>
  );
}

// ユーザー選択入力
interface UserSelectInputProps {
  field: FilterFieldConfig;
  value: string[] | undefined;
  onChange: (value: unknown) => void;
  onApply: () => void;
  onClose: () => void;
}

function UserSelectInput({
  field,
  value,
  onChange,
  onApply,
  onClose,
}: UserSelectInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedValues = value || [];
  const users = field.userOptions || [];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId: string) => {
    if (selectedValues.includes(userId)) {
      onChange(selectedValues.filter((v) => v !== userId));
    } else {
      onChange([...selectedValues, userId]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700">{field.label}</p>
      <Input
        type="text"
        placeholder="ユーザーを検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-8 bg-white/50"
      />
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => toggleUser(user.id)}
            className={cn(
              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
              'transition-colors hover:bg-white/70',
              selectedValues.includes(user.id) && 'bg-white/50'
            )}
          >
            <div
              className={cn(
                'flex size-4 items-center justify-center rounded border',
                selectedValues.includes(user.id)
                  ? 'border-slate-900 bg-slate-900'
                  : 'border-slate-300'
              )}
            >
              {selectedValues.includes(user.id) && (
                <Check className="size-3 text-white" />
              )}
            </div>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="size-6 rounded-full"
              />
            ) : (
              <div className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="text-slate-700">{user.name}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
        <Button variant="ghost" size="sm" onClick={onClose}>
          キャンセル
        </Button>
        <Button size="sm" onClick={onApply}>
          適用
        </Button>
      </div>
    </div>
  );
}

// オプションアイテム
interface OptionItemProps {
  option: FilterOption;
  selected: boolean;
  onToggle: () => void;
}

function OptionItem({ option, selected, onToggle }: OptionItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
        'transition-colors hover:bg-white/70',
        selected && 'bg-white/50'
      )}
    >
      <Checkbox checked={selected} className="pointer-events-none" />
      {option.color && (
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: option.color }}
        />
      )}
      <span className="text-slate-700">{option.label}</span>
    </button>
  );
}
