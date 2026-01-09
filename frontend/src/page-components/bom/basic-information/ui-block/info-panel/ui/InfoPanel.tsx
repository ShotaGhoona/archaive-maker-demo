'use client';

import { Save } from 'lucide-react';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { renderFacetField } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import {
  getFacetTypeById,
  type Item,
  type ItemRev,
  type FacetInstance,
} from '@/shared/dummy-data/bom-v2';

interface InfoPanelProps {
  item: Item;
  itemRev: ItemRev;
  facetInstances: FacetInstance[];
  formData: Record<string, unknown>;
  onFieldChange: (key: string, value: unknown) => void;
  onSave: () => void;
}

export function InfoPanel({
  item,
  itemRev,
  facetInstances,
  formData,
  onFieldChange,
  onSave,
}: InfoPanelProps) {
  return (
    <Card className="flex w-[480px] shrink-0 flex-col gap-0 py-0">
      {/* ヘッダー */}
      <div className="flex h-12 items-center gap-2 border-b px-4">
        <h3 className="truncate text-sm font-semibold">{item.name}</h3>
        <span className="shrink-0 text-sm text-muted-foreground">
          {item.partNumber} / Rev.{itemRev.revision}
        </span>
      </div>

      {/* コンテンツ */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-4">
          {/* 基本情報 */}
          <div>
            <h4 className="mb-3 text-base font-medium text-primary">基本情報</h4>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="partNumber"
                label="品番"
                value={String(formData.partNumber ?? '')}
                onChange={(v) => onFieldChange('partNumber', v)}
              />
              <TextField
                id="name"
                label="品名"
                value={String(formData.name ?? '')}
                onChange={(v) => onFieldChange('name', v)}
              />
              <TextField
                id="itemType"
                label="タイプ"
                value={String(formData.itemType ?? '')}
                onChange={(v) => onFieldChange('itemType', v)}
              />
              <TextField
                id="lifecycleState"
                label="LC状態"
                value={String(formData.lifecycleState ?? '')}
                onChange={(v) => onFieldChange('lifecycleState', v)}
              />
            </div>
          </div>

          {/* Facet属性 */}
          {facetInstances.map((instance) => {
            const facetType = getFacetTypeById(instance.facetTypeId);
            if (!facetType) return null;

            return (
              <div key={instance.id}>
                <h4 className="mb-3 text-base font-medium text-primary">
                  {facetType.name}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(facetType.schema.properties).map(([key, prop]) =>
                    renderFacetField({
                      fieldKey: key,
                      property: prop,
                      value: formData[key],
                      onChange: onFieldChange,
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* フッター */}
      <div className="border-t p-4">
        <Button className="w-full" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          保存
        </Button>
      </div>
    </Card>
  );
}
