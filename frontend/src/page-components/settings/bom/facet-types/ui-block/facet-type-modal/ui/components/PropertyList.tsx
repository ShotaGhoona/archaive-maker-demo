'use client';

import { GripVertical, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import type { FacetSchemaProperty } from '@/shared/dummy-data/bom-v2/types';

interface PropertyListProps {
  properties: Record<string, FacetSchemaProperty>;
  required: string[];
  onDelete: (key: string) => void;
}

const typeLabels: Record<string, string> = {
  string: 'テキスト',
  number: '数値',
  boolean: '真偽値',
  array: '配列',
};

export function PropertyList({
  properties,
  required,
  onDelete,
}: PropertyListProps) {
  const propertyEntries = Object.entries(properties);

  if (propertyEntries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          属性項目がありません。「項目追加」から追加してください。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {propertyEntries.map(([key, property]) => {
        const isRequired = required.includes(key);
        const hasEnum = property.enum && property.enum.length > 0;

        return (
          <div
            key={key}
            className="group flex items-start gap-3 rounded-lg border bg-card p-3"
          >
            <div className="mt-1 cursor-grab text-muted-foreground">
              <GripVertical className="size-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{property.title}</span>
                {isRequired && (
                  <Badge variant="destructive" className="text-xs">
                    必須
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{key}</span>
                <span>|</span>
                <span>{hasEnum ? '選択式' : typeLabels[property.type]}</span>
                {property.unit && (
                  <>
                    <span>|</span>
                    <span>単位: {property.unit}</span>
                  </>
                )}
              </div>
              {hasEnum && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  選択肢: {property.enum?.join(', ')}
                </p>
              )}
              {property.description && !hasEnum && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {property.description}
                </p>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(key)}
              className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground">
        ※ ドラッグ&ドロップで並び替え可能（未実装）
      </p>
    </div>
  );
}
