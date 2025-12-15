'use client';

import { X, User } from 'lucide-react';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/ui/popover';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/shadcn/ui/avatar';
import { cn } from '@/shared/ui/shadcn/lib/utils';

export interface UserOption {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface UserSelectFieldProps {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: UserOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function UserSelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'ユーザーを選択',
  disabled,
  className,
}: UserSelectFieldProps) {
  const selectedUsers = options.filter((opt) => value.includes(opt.id));

  const handleToggle = (userId: string) => {
    if (value.includes(userId)) {
      onChange(value.filter((v) => v !== userId));
    } else {
      onChange([...value, userId]);
    }
  };

  const handleRemove = (userId: string) => {
    onChange(value.filter((v) => v !== userId));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              selectedUsers.length === 0 && 'text-muted-foreground',
            )}
          >
            {selectedUsers.length > 0 ? (
              <div className='flex flex-wrap gap-1'>
                {selectedUsers.map((user) => (
                  <Badge
                    key={user.id}
                    variant='secondary'
                    className='gap-1 pr-1'
                  >
                    {user.name}
                    <X
                      className='h-3 w-3 cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(user.id);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span className='flex items-center gap-2'>
                <User className='h-4 w-4' />
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-2' align='start'>
          <div className='space-y-1'>
            {options.map((user) => (
              <div
                key={user.id}
                className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted'
                onClick={() => handleToggle(user.id)}
              >
                <Checkbox
                  checked={value.includes(user.id)}
                  onCheckedChange={() => handleToggle(user.id)}
                />
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className='text-xs'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className='text-base'>{user.name}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
