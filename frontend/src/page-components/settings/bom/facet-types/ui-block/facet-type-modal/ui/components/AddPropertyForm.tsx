'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/shadcn/ui/radio-group';
import type { FacetSchemaProperty } from '@/shared/dummy-data/bom-v2/types';

interface AddPropertyFormProps {
  onAdd: (
    key: string,
    property: FacetSchemaProperty,
    isRequired: boolean
  ) => void;
  onCancel: () => void;
}

type DataType = 'string' | 'number' | 'boolean' | 'enum';

interface FormData {
  title: string;
  key: string;
  dataType: DataType;
  isRequired: boolean;
  description: string;
  unit: string;
  minimum: string;
  maximum: string;
  enumValues: string[];
}

const initialFormData: FormData = {
  title: '',
  key: '',
  dataType: 'string',
  isRequired: false,
  description: '',
  unit: '',
  minimum: '',
  maximum: '',
  enumValues: [''],
};

export function AddPropertyForm({ onAdd, onCancel }: AddPropertyFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAdd = () => {
    const property: FacetSchemaProperty = {
      type: formData.dataType === 'enum' ? 'string' : formData.dataType,
      title: formData.title,
    };

    if (formData.description) {
      property.description = formData.description;
    }

    if (formData.dataType === 'number') {
      if (formData.unit) property.unit = formData.unit;
      if (formData.minimum) property.minimum = parseFloat(formData.minimum);
      if (formData.maximum) property.maximum = parseFloat(formData.maximum);
    }

    if (formData.dataType === 'enum') {
      property.enum = formData.enumValues.filter((v) => v.trim() !== '');
    }

    onAdd(formData.key, property, formData.isRequired);
    setFormData(initialFormData);
  };

  const handleEnumAdd = () => {
    setFormData((prev) => ({
      ...prev,
      enumValues: [...prev.enumValues, ''],
    }));
  };

  const handleEnumChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      enumValues: prev.enumValues.map((v, i) => (i === index ? value : v)),
    }));
  };

  const handleEnumRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      enumValues: prev.enumValues.filter((_, i) => i !== index),
    }));
  };

  const isValid =
    formData.title.trim() !== '' &&
    formData.key.trim() !== '' &&
    (formData.dataType !== 'enum' ||
      formData.enumValues.filter((v) => v.trim() !== '').length > 0);

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-medium">新しい項目</h4>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="size-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <Label htmlFor="prop-title" className="text-xs">
              項目名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prop-title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="例: 材質"
              className="h-8"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="prop-key" className="text-xs">
              キー <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prop-key"
              value={formData.key}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  key: e.target.value.replace(/[^a-zA-Z0-9_]/g, ''),
                }))
              }
              placeholder="例: material"
              className="h-8"
            />
          </div>
        </div>

        <div className="grid gap-1">
          <Label className="text-xs">データ型</Label>
          <RadioGroup
            value={formData.dataType}
            onValueChange={(v) =>
              setFormData((prev) => ({ ...prev, dataType: v as DataType }))
            }
            className="flex gap-4"
          >
            {[
              { value: 'string', label: 'テキスト' },
              { value: 'number', label: '数値' },
              { value: 'enum', label: '選択式' },
              { value: 'boolean', label: '真偽値' },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-1.5 text-sm"
              >
                <RadioGroupItem value={item.value} />
                {item.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* 数値オプション */}
        {formData.dataType === 'number' && (
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-1">
              <Label className="text-xs">単位</Label>
              <Input
                value={formData.unit}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, unit: e.target.value }))
                }
                placeholder="kg"
                className="h-8"
              />
            </div>
            <div className="grid gap-1">
              <Label className="text-xs">最小値</Label>
              <Input
                type="number"
                value={formData.minimum}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, minimum: e.target.value }))
                }
                className="h-8"
              />
            </div>
            <div className="grid gap-1">
              <Label className="text-xs">最大値</Label>
              <Input
                type="number"
                value={formData.maximum}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, maximum: e.target.value }))
                }
                className="h-8"
              />
            </div>
          </div>
        )}

        {/* 選択式オプション */}
        {formData.dataType === 'enum' && (
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">選択肢</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleEnumAdd}
                className="h-6 px-2 text-xs"
              >
                <Plus className="mr-1 size-3" />
                追加
              </Button>
            </div>
            <div className="space-y-1.5">
              {formData.enumValues.map((value, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <Input
                    value={value}
                    onChange={(e) => handleEnumChange(index, e.target.value)}
                    placeholder={`選択肢 ${index + 1}`}
                    className="h-8"
                  />
                  {formData.enumValues.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEnumRemove(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="size-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-1">
          <Label className="text-xs">説明（任意）</Label>
          <Input
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="入力時のヒント"
            className="h-8"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={formData.isRequired}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isRequired: checked === true,
                }))
              }
            />
            必須項目
          </label>
          <Button size="sm" onClick={handleAdd} disabled={!isValid}>
            追加
          </Button>
        </div>
      </div>
    </div>
  );
}
