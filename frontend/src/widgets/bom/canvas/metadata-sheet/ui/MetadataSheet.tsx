'use client';

import { useState, useCallback } from 'react';
import { Info } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn/ui/sheet';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { BooleanField } from '@/shared/ui/form-fields/ui/BooleanField';

interface MetadataSheetProps {
  nodeName: string;
  customItems: Record<string, unknown>;
}

export function MetadataSheet({ nodeName, customItems }: MetadataSheetProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Record<string, unknown>>(customItems);

  const updateItem = useCallback((key: string, value: unknown) => {
    setItems((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    // TODO: API呼び出し
    alert(`メタデータを保存しました（未実装）\n${JSON.stringify(items, null, 2)}`);
  }, [items]);

  const renderField = (key: string, value: unknown) => {
    if (typeof value === 'boolean') {
      return (
        <BooleanField
          key={key}
          id={key}
          label={key}
          value={value}
          onChange={(v) => updateItem(key, v)}
        />
      );
    }
    if (typeof value === 'number') {
      return (
        <NumberField
          key={key}
          id={key}
          label={key}
          value={value}
          onChange={(v) => updateItem(key, v === '' ? 0 : v)}
        />
      );
    }
    // デフォルトはテキストフィールド
    return (
      <TextField
        key={key}
        id={key}
        label={key}
        value={String(value)}
        onChange={(v) => updateItem(key, v)}
      />
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Info className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left">{nodeName}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col justify-between px-4">
          <div className="mt-6 space-y-4">
            <div className="space-y-4">
              {Object.entries(items).map(([key, value]) => renderField(key, value))}
            </div>
          </div>
          <div className="border-t pb-4 pt-6">
            <Button onClick={handleSave} className="w-full">
              保存
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
