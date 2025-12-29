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
import { SelectField } from '@/shared/ui/form-fields/ui/SelectField';

import type { CustomField } from '@/page-components/bom/canvas/ui-block/node/dummy-data/node-data';

interface MetadataSheetProps {
  nodeName: string;
  customFields: CustomField[];
}

export function MetadataSheet({ nodeName, customFields }: MetadataSheetProps) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<CustomField[]>(customFields);

  const updateField = useCallback((key: string, value: string | number | boolean) => {
    setFields((prev) =>
      prev.map((field) => (field.key === key ? { ...field, value } : field))
    );
  }, []);

  const handleSave = useCallback(() => {
    // TODO: API呼び出し
    alert(`メタデータを保存しました（未実装）\n${JSON.stringify(fields, null, 2)}`);
  }, [fields]);

  const renderField = (field: CustomField) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.key}
            id={field.key}
            label={field.label}
            value={field.value as string}
            onChange={(value) => updateField(field.key, value)}
          />
        );
      case 'number':
        return (
          <NumberField
            key={field.key}
            id={field.key}
            label={field.label}
            value={field.value as number}
            onChange={(value) => updateField(field.key, value === '' ? 0 : value)}
          />
        );
      case 'boolean':
        return (
          <BooleanField
            key={field.key}
            id={field.key}
            label={field.label}
            value={field.value as boolean}
            onChange={(value) => updateField(field.key, value)}
          />
        );
      case 'select':
        return (
          <SelectField
            key={field.key}
            id={field.key}
            label={field.label}
            value={field.value as string}
            onChange={(value) => updateField(field.key, value)}
            options={field.options || []}
          />
        );
      default:
        return null;
    }
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
      <SheetContent className="flex flex-col ">
        <SheetHeader>
          <SheetTitle className="text-left">{nodeName}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col justify-between px-4">
          <div className="mt-6 space-y-4">
            <div className="space-y-4">
              {fields.map((field) => renderField(field))}
            </div>
          </div>
          <div className="pb-4 pt-6 border-t ">
            <Button onClick={handleSave} className="w-full">
              保存
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
