'use client';

import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import type {
  FilterFieldConfig,
  AdvancedFilterValues,
  AdvancedFilterCondition,
  AdvancedFilterOperator,
} from '../model/types';

interface AdvancedFilterPanelProps {
  fields: FilterFieldConfig[];
  values: AdvancedFilterValues;
  onValuesChange: (values: AdvancedFilterValues) => void;
  onReset?: () => void;
}

const OPERATORS: { value: AdvancedFilterOperator; label: string }[] = [
  { value: 'equals', label: '等しい' },
  { value: 'not_equals', label: '等しくない' },
  { value: 'contains', label: '含む' },
  { value: 'not_contains', label: '含まない' },
  { value: 'starts_with', label: 'で始まる' },
  { value: 'ends_with', label: 'で終わる' },
  { value: 'greater_than', label: 'より大きい' },
  { value: 'less_than', label: 'より小さい' },
  { value: 'is_empty', label: '空である' },
  { value: 'is_not_empty', label: '空でない' },
];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function AdvancedFilterPanel({
  fields,
  values,
  onValuesChange,
  onReset,
}: AdvancedFilterPanelProps) {
  const { conditions } = values;

  const handleAddCondition = () => {
    const newCondition: AdvancedFilterCondition = {
      id: generateId(),
      field: fields[0]?.key ?? '',
      operator: 'equals',
      value: '',
    };
    onValuesChange({
      conditions: [...conditions, newCondition],
    });
  };

  const handleRemoveCondition = (id: string) => {
    onValuesChange({
      conditions: conditions.filter((c) => c.id !== id),
    });
  };

  const handleConditionChange = (
    id: string,
    key: keyof AdvancedFilterCondition,
    value: unknown
  ) => {
    onValuesChange({
      conditions: conditions.map((c) =>
        c.id === id ? { ...c, [key]: value } : c
      ),
    });
  };

  const handleReset = () => {
    onValuesChange({ conditions: [] });
    onReset?.();
  };

  const isValueRequired = (operator: AdvancedFilterOperator) => {
    return operator !== 'is_empty' && operator !== 'is_not_empty';
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        {conditions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p className="text-sm">条件が設定されていません</p>
            <p className="text-xs mt-1">下のボタンから条件を追加してください</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {conditions.map((condition, index) => (
              <div key={condition.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center py-2">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      AND
                    </span>
                  </div>
                )}
                <div className="group relative rounded-lg border bg-card p-3 flex flex-col gap-2">
                  {/* 削除ボタン（ホバー時のみ表示） */}
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(condition.id)}
                    className="absolute -right-2 -top-2 rounded-full bg-muted p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>

                {/* 対象フィールド */}
                <div className="flex items-center gap-2">
                  <Label className="w-8 shrink-0 text-xs text-muted-foreground">対象</Label>
                  <Select
                    value={condition.field}
                    onValueChange={(v) =>
                      handleConditionChange(condition.id, 'field', v)
                    }
                  >
                    <SelectTrigger className="bg-card w-full">
                      <SelectValue placeholder="対象を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={field.key} value={field.key}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 条件 */}
                <div className="flex items-center gap-2">
                  <Label className="w-8 shrink-0 text-xs text-muted-foreground">条件</Label>
                  <Select
                    value={condition.operator}
                    onValueChange={(v) =>
                      handleConditionChange(
                        condition.id,
                        'operator',
                        v as AdvancedFilterOperator
                      )
                    }
                  >
                    <SelectTrigger className="bg-card w-full">
                      <SelectValue placeholder="条件を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPERATORS.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 値 */}
                {isValueRequired(condition.operator) && (
                  <div className="flex items-center gap-2">
                    <Label className="w-8 shrink-0 text-xs text-muted-foreground">値</Label>
                    <Input
                      placeholder="値を入力"
                      value={(condition.value as string) ?? ''}
                      onChange={(e) =>
                        handleConditionChange(condition.id, 'value', e.target.value)
                      }
                      className="bg-card"
                    />
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 条件追加ボタン */}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={handleAddCondition}
        >
          <Plus className="h-4 w-4 mr-1" />
          条件を追加
        </Button>
      </div>

      <div className="border-t px-4 py-3">
        <Button variant="outline" className="w-full" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
}
