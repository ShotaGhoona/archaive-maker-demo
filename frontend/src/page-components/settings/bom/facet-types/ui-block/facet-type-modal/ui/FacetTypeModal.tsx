'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/ui/shadcn/ui/dialog';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import { Checkbox } from '@/shared/ui/shadcn/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { PropertyList } from './components/PropertyList';
import { AddPropertyForm } from './components/AddPropertyForm';
import type {
  FacetType,
  FacetCategory,
  FacetSchemaProperty,
  ItemType,
} from '@/shared/dummy-data/bom-v2/types';

interface FacetTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facetType?: FacetType;
  mode: 'create' | 'edit';
}

interface FormData {
  name: string;
  code: string;
  category: FacetCategory;
  description: string;
  applicableItemTypes: ItemType[];
  properties: Record<string, FacetSchemaProperty>;
  required: string[];
}

const categoryOptions: { value: FacetCategory; label: string }[] = [
  { value: 'Design', label: '設計属性' },
  { value: 'Procurement', label: '調達属性' },
  { value: 'Manufacturing', label: '製造属性' },
  { value: 'Drawing', label: '図面属性' },
  { value: 'Document', label: '帳票属性' },
];

const itemTypeOptions: { value: ItemType; label: string }[] = [
  { value: 'Product', label: '完成品' },
  { value: 'Assembly', label: 'アセンブリ' },
  { value: 'Part', label: '製造部品' },
  { value: 'Purchased', label: '購入品' },
  { value: 'RawMaterial', label: '原材料' },
];

const initialFormData: FormData = {
  name: '',
  code: '',
  category: 'Design',
  description: '',
  applicableItemTypes: [],
  properties: {},
  required: [],
};

export function FacetTypeModal({
  open,
  onOpenChange,
  facetType,
  mode,
}: FacetTypeModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && facetType) {
        setFormData({
          name: facetType.name,
          code: facetType.code,
          category: facetType.category,
          description: facetType.description || '',
          applicableItemTypes: facetType.applicableItemTypes,
          properties: facetType.schema.properties,
          required: facetType.schema.required || [],
        });
      } else {
        setFormData(initialFormData);
      }
      setShowAddForm(false);
    }
  }, [open, mode, facetType]);

  const handleItemTypeToggle = (itemType: ItemType) => {
    setFormData((prev) => ({
      ...prev,
      applicableItemTypes: prev.applicableItemTypes.includes(itemType)
        ? prev.applicableItemTypes.filter((t) => t !== itemType)
        : [...prev.applicableItemTypes, itemType],
    }));
  };

  const handleAddProperty = (
    key: string,
    property: FacetSchemaProperty,
    isRequired: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      properties: { ...prev.properties, [key]: property },
      required: isRequired
        ? [...prev.required, key]
        : prev.required.filter((k) => k !== key),
    }));
    setShowAddForm(false);
  };

  const handleDeleteProperty = (key: string) => {
    setFormData((prev) => {
      const newProperties = { ...prev.properties };
      delete newProperties[key];
      return {
        ...prev,
        properties: newProperties,
        required: prev.required.filter((k) => k !== key),
      };
    });
  };

  const handleSave = () => {
    alert(
      `${mode === 'create' ? '新規作成' : '更新'}: ${formData.name}（未実装）`
    );
    // TODO: API呼び出し
    onOpenChange(false);
  };

  const propertyCount = Object.keys(formData.properties).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] sm:max-w-7xl flex-col gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>
            {mode === 'create' ? '属性定義を作成' : `${formData.name} を編集`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-2">
          {/* 左カラム: 基本情報 */}
          <div className="border-r">
            <div className="border-b bg-muted/30 px-4 py-2">
              <h3 className="text-sm font-medium">基本情報</h3>
            </div>
            <ScrollArea className="h-[calc(85vh-180px)]">
              <div className="space-y-4 p-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="name" className="text-xs">
                    属性名 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="例: 基本設計属性"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="code" className="text-xs">
                    コード <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="例: DESIGN_BASIC"
                  />
                  <p className="text-xs text-muted-foreground">
                    英数字・アンダースコアのみ
                  </p>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="category" className="text-xs">
                    カテゴリ <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: v as FacetCategory,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="description" className="text-xs">
                    説明
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="この属性の用途"
                    rows={2}
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label className="text-xs">
                    適用アイテムタイプ{' '}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {itemTypeOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={formData.applicableItemTypes.includes(
                            option.value
                          )}
                          onCheckedChange={() =>
                            handleItemTypeToggle(option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* 右カラム: 属性項目 */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
              <h3 className="text-sm font-medium">
                属性項目
                {propertyCount > 0 && (
                  <span className="ml-2 text-muted-foreground">
                    ({propertyCount})
                  </span>
                )}
              </h3>
              {!showAddForm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                >
                  項目追加
                </Button>
              )}
            </div>
            <ScrollArea className="h-[calc(85vh-180px)]">
              <div className="p-4">
                {showAddForm && (
                  <div className="mb-4">
                    <AddPropertyForm
                      onAdd={handleAddProperty}
                      onCancel={() => setShowAddForm(false)}
                    />
                  </div>
                )}
                <PropertyList
                  properties={formData.properties}
                  required={formData.required}
                  onDelete={handleDeleteProperty}
                />
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>
            {mode === 'create' ? '作成する' : '保存する'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
