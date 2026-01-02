'use client';

import { useState, useMemo, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import type { FilterFieldConfig, FilterValues } from '../model/types';
import { FilterChip } from './FilterChip';
import { AddFilterPopover } from './AddFilterPopover';
import { FilterInputPopover } from './FilterInputPopover';

interface FilterChipsBarProps {
  fields: FilterFieldConfig[];
  values: FilterValues;
  onValuesChange: (values: FilterValues) => void;
  className?: string;
}

export function FilterChipsBar({
  fields,
  values,
  onValuesChange,
  className,
}: FilterChipsBarProps) {
  // 編集中のフィールド
  const [editingField, setEditingField] = useState<FilterFieldConfig | null>(
    null
  );
  // 新規追加で選択されたフィールド
  const [addingField, setAddingField] = useState<FilterFieldConfig | null>(
    null
  );

  // アクティブなフィルターのキー一覧
  const activeFilterKeys = useMemo(() => {
    return Object.entries(values)
      .filter(([, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
      .map(([key]) => key);
  }, [values]);

  // フィールドキーからフィールド設定を取得
  const getFieldByKey = useCallback(
    (key: string) => fields.find((f) => f.key === key),
    [fields]
  );

  // フィルター値の表示文字列を取得
  const getDisplayValue = useCallback(
    (field: FilterFieldConfig, value: unknown): string => {
      if (value === undefined || value === null) return '';

      switch (field.type) {
        case 'text':
        case 'number':
          return String(value);

        case 'date':
          if (typeof value === 'string') {
            const date = new Date(value);
            return date.toLocaleDateString('ja-JP');
          }
          return String(value);

        case 'multiselect':
          if (Array.isArray(value)) {
            const labels = value
              .map((v) => field.options?.find((opt) => opt.value === v)?.label)
              .filter(Boolean);
            if (labels.length <= 2) {
              return labels.join(', ');
            }
            return `${labels[0]} 他${labels.length - 1}件`;
          }
          return '';

        case 'user':
          if (Array.isArray(value)) {
            const names = value
              .map((v) => field.userOptions?.find((u) => u.id === v)?.name)
              .filter(Boolean);
            if (names.length <= 2) {
              return names.join(', ');
            }
            return `${names[0]} 他${names.length - 1}件`;
          }
          return '';

        case 'boolean':
          return value === true ? 'はい' : 'いいえ';

        default:
          return String(value);
      }
    },
    []
  );

  // フィルター値を更新
  const handleValueChange = useCallback(
    (fieldKey: string, newValue: unknown) => {
      const newValues = { ...values };
      if (
        newValue === undefined ||
        newValue === null ||
        newValue === '' ||
        (Array.isArray(newValue) && newValue.length === 0)
      ) {
        delete newValues[fieldKey];
      } else {
        newValues[fieldKey] = newValue;
      }
      onValuesChange(newValues);
    },
    [values, onValuesChange]
  );

  // フィルターを削除
  const handleRemoveFilter = useCallback(
    (fieldKey: string) => {
      const newValues = { ...values };
      delete newValues[fieldKey];
      onValuesChange(newValues);
    },
    [values, onValuesChange]
  );

  // すべてクリア
  const handleClearAll = useCallback(() => {
    onValuesChange({});
  }, [onValuesChange]);

  // フィールド選択時（新規追加）
  const handleSelectField = useCallback((field: FilterFieldConfig) => {
    setAddingField(field);
  }, []);

  // 追加フィールドの値変更
  const handleAddingValueChange = useCallback(
    (value: unknown) => {
      if (addingField) {
        handleValueChange(addingField.key, value);
        setAddingField(null);
      }
    },
    [addingField, handleValueChange]
  );

  // 編集中フィールドの値変更
  const handleEditingValueChange = useCallback(
    (value: unknown) => {
      if (editingField) {
        handleValueChange(editingField.key, value);
        setEditingField(null);
      }
    },
    [editingField, handleValueChange]
  );

  // アクティブなフィルターがない場合
  const hasActiveFilters = activeFilterKeys.length > 0;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* アクティブなフィルターチップ */}
      {activeFilterKeys.map((key) => {
        const field = getFieldByKey(key);
        if (!field) return null;
        const value = values[key];
        const displayValue = getDisplayValue(field, value);

        return (
          <FilterInputPopover
            key={key}
            field={field}
            value={value}
            onValueChange={(newValue) => handleValueChange(key, newValue)}
            onClose={() => setEditingField(null)}
            open={editingField?.key === key}
            onOpenChange={(open) => {
              if (open) {
                setEditingField(field);
              } else {
                setEditingField(null);
              }
            }}
          >
            <div>
              <FilterChip
                label={field.label}
                value={displayValue}
                onRemove={() => handleRemoveFilter(key)}
              />
            </div>
          </FilterInputPopover>
        );
      })}

      {/* フィルター追加ボタン */}
      {addingField ? (
        <FilterInputPopover
          field={addingField}
          value={undefined}
          onValueChange={handleAddingValueChange}
          onClose={() => setAddingField(null)}
          open={true}
          onOpenChange={(open) => {
            if (!open) setAddingField(null);
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'gap-1.5 rounded-full px-3 text-slate-600',
              'border border-slate-300 bg-white/50'
            )}
          >
            {addingField.label}
          </Button>
        </FilterInputPopover>
      ) : (
        <AddFilterPopover
          fields={fields}
          activeFieldKeys={activeFilterKeys}
          onSelectField={handleSelectField}
        />
      )}

      {/* すべてクリアボタン */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="gap-1 text-slate-500 hover:text-slate-700"
        >
          <X className="size-3" />
          クリア
        </Button>
      )}
    </div>
  );
}
