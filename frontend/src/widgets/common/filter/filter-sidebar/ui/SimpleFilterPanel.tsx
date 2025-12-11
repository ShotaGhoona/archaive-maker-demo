'use client';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { FilterTextField } from './form-components/FilterTextField';
import { FilterMultiSelectField } from './form-components/FilterMultiSelectField';
import { FilterDateField } from './form-components/FilterDateField';
import { FilterNumberField } from './form-components/FilterNumberField';
import { FilterBooleanField } from './form-components/FilterBooleanField';
import { FilterUserField } from './form-components/FilterUserField';
import type { FilterFieldConfig, FilterValues } from '../model/types';

interface SimpleFilterPanelProps {
  fields: FilterFieldConfig[];
  values: FilterValues;
  onValuesChange: (values: FilterValues) => void;
  onReset?: () => void;
}

export function SimpleFilterPanel({
  fields,
  values,
  onValuesChange,
  onReset,
}: SimpleFilterPanelProps) {
  const handleFieldChange = (key: string, value: unknown) => {
    onValuesChange({ ...values, [key]: value });
  };

  const handleReset = () => {
    const resetValues: FilterValues = {};
    fields.forEach((field) => {
      resetValues[field.key] = field.defaultValue ?? getDefaultValue(field.type);
    });
    onValuesChange(resetValues);
    onReset?.();
  };

  const renderField = (field: FilterFieldConfig) => {
    const value = values[field.key];

    switch (field.type) {
      case 'text':
        return (
          <FilterTextField
            key={field.key}
            label={field.label}
            value={(value as string) ?? ''}
            onChange={(v) => handleFieldChange(field.key, v)}
            placeholder={field.placeholder}
          />
        );
      case 'multiselect':
        return (
          <FilterMultiSelectField
            key={field.key}
            label={field.label}
            value={(value as string[]) ?? []}
            onChange={(v) => handleFieldChange(field.key, v)}
            options={field.options ?? []}
            placeholder={field.placeholder}
          />
        );
      case 'date':
        return (
          <FilterDateField
            key={field.key}
            label={field.label}
            value={(value as string) ?? ''}
            onChange={(v) => handleFieldChange(field.key, v)}
            placeholder={field.placeholder}
          />
        );
      case 'number':
        return (
          <FilterNumberField
            key={field.key}
            label={field.label}
            value={(value as number | null) ?? null}
            onChange={(v) => handleFieldChange(field.key, v)}
            placeholder={field.placeholder}
          />
        );
      case 'boolean':
        return (
          <FilterBooleanField
            key={field.key}
            label={field.label}
            value={(value as boolean) ?? false}
            onChange={(v) => handleFieldChange(field.key, v)}
          />
        );
      case 'user':
        return (
          <FilterUserField
            key={field.key}
            label={field.label}
            value={(value as string[]) ?? []}
            onChange={(v) => handleFieldChange(field.key, v)}
            options={field.userOptions ?? []}
            placeholder={field.placeholder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-4">
        {fields.map(renderField)}
      </div>
      <div className="border-t px-4 py-3">
        <Button variant="outline" className="w-full" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
}

function getDefaultValue(type: string): unknown {
  switch (type) {
    case 'text':
    case 'date':
      return '';
    case 'multiselect':
    case 'user':
      return [];
    case 'number':
      return null;
    case 'boolean':
      return false;
    default:
      return '';
  }
}
