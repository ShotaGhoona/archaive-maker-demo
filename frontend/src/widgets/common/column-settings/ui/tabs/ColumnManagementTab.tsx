'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Type, Calendar, Hash, ToggleLeft, ListChecks, User } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { ColumnDefinition, ColumnType } from '../../model/types';

const columnTypeOptions: { value: ColumnType; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'text', label: 'テキスト', icon: <Type className="size-4" />, description: '文字列データ' },
  { value: 'date', label: '日付', icon: <Calendar className="size-4" />, description: '日付データ' },
  { value: 'number', label: '数字', icon: <Hash className="size-4" />, description: '数値データ' },
  { value: 'boolean', label: 'ブーリアン', icon: <ToggleLeft className="size-4" />, description: 'はい/いいえ' },
  { value: 'multiselect', label: 'マルチセレクト', icon: <ListChecks className="size-4" />, description: '複数の選択肢' },
  { value: 'user', label: 'ユーザー', icon: <User className="size-4" />, description: 'ユーザー選択' },
];

interface ColumnManagementTabProps {
  columns: ColumnDefinition[];
  onAddColumn: (column: ColumnDefinition) => void;
  onEditColumn: (key: string, column: ColumnDefinition) => void;
  onDeleteColumn: (key: string) => void;
}

export function ColumnManagementTab({
  columns,
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
}: ColumnManagementTabProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<{
    label: string;
    description: string;
    columnType: ColumnType;
  }>({
    label: '',
    description: '',
    columnType: 'text',
  });

  const resetForm = () => {
    setFormData({ label: '', description: '', columnType: 'text' });
    setEditingKey(null);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (column: ColumnDefinition) => {
    setFormData({
      label: column.label,
      description: column.description || '',
      columnType: column.columnType,
    });
    setEditingKey(column.key);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!formData.label.trim()) return;

    if (isAdding) {
      const newKey = `custom_${Date.now()}`;
      onAddColumn({
        key: newKey,
        label: formData.label,
        description: formData.description,
        columnType: formData.columnType,
        isCustom: true,
      });
    } else if (editingKey) {
      const existingColumn = columns.find(c => c.key === editingKey);
      onEditColumn(editingKey, {
        key: editingKey,
        label: formData.label,
        description: formData.description,
        columnType: formData.columnType,
        isCustom: existingColumn?.isCustom,
      });
    }
    resetForm();
  };

  const handleDelete = (key: string) => {
    if (confirm('このカラムを削除しますか？')) {
      onDeleteColumn(key);
    }
  };

  const isEditing = isAdding || editingKey !== null;

  return (
    <div className="grid grid-cols-3 h-full gap-6">
      {/* カラム一覧 */}
      <div className="flex min-h-0 col-span-1 flex-col rounded-lg border bg-card py-4">
        <div className="mb-3 flex shrink-0 items-center justify-between px-4">
          <h3 className="text-base font-medium">カラム一覧</h3>
          <Button
            size="lg"
            variant="outline"
            onClick={handleStartAdd}
            disabled={isEditing}
          >
            <Plus className="size-5" />
            新規カラム追加
          </Button>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto px-4">
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
                editingKey === column.key
                  ? 'border-primary bg-primary/10'
                  : 'bg-background hover:bg-muted/50'
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium truncate">{column.label}</span>
                  {column.isCustom && (
                    <span className="shrink-0 rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-700">
                      カスタム
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {columnTypeOptions.find(o => o.value === column.columnType)?.icon}
                  <span>{columnTypeOptions.find(o => o.value === column.columnType)?.label}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => handleStartEdit(column)}
                  disabled={isEditing && editingKey !== column.key}
                >
                  <Pencil className="size-5" />
                </Button>
                {column.isCustom && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(column.key)}
                    disabled={isEditing}
                  >
                    <Trash2 className="size-5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 編集フォーム */}
      <div className="flex col-span-2 flex-col rounded-lg border bg-card p-6">
        <h3 className="mb-6 shrink-0 text-lg font-medium">
          {isAdding ? 'カラムを追加' : editingKey ? 'カラムを編集' : 'カラムを選択'}
        </h3>

        {isEditing ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="label" className="text-base">カラム名 *</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="カラム名を入力"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="カラムの説明を入力（任意）"
                  rows={3}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">データタイプ *</Label>
                <Select
                  value={formData.columnType}
                  onValueChange={(value: ColumnType) => setFormData(prev => ({ ...prev, columnType: value }))}
                >
                  <SelectTrigger className="h-14 text-base w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {columnTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="py-3">
                        <div className="flex items-center gap-2 text-base">
                          {option.icon}
                          <span>{option.label}</span>
                          <span className="text-sm text-muted-foreground">- {option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="shrink-0 pt-6">
              <Button size="lg" onClick={handleSave} disabled={!formData.label.trim()} className="w-full">
                {isAdding ? '追加' : '保存'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-base text-muted-foreground">
            カラムを選択するか、新規追加してください
          </div>
        )}
      </div>
    </div>
  );
}
