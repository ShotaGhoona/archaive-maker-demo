'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { FileImage } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/ui/dialog';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { renderFacetFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';
import {
  getFacetInstanceById,
  getFacetTypeById,
  type Drawing,
} from '@/shared/dummy-data/bom-v2';

interface DrawingDetailModalProps {
  drawing: Drawing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DrawingDetailModal({
  drawing,
  open,
  onOpenChange,
}: DrawingDetailModalProps) {
  // FacetInstancesからフィールドを生成
  const facetFields = useMemo(() => {
    return drawing.facetInstanceIds.flatMap((id) => {
      const instance = getFacetInstanceById(id);
      if (!instance) return [];
      const type = getFacetTypeById(instance.facetTypeId);
      if (!type) return [];

      return renderFacetFields({
        schema: type.schema.properties,
        values: instance.values,
        onChange: () => {},
        idPrefix: instance.id,
      });
    });
  }, [drawing.facetInstanceIds]);

  const handleSave = () => {
    // TODO: API呼び出し
    alert('図面を保存しました（未実装）');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {drawing.drawingType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {drawing.sheetSize}
            </Badge>
            <DialogTitle>{drawing.title}</DialogTitle>
          </div>
        </DialogHeader>
        <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
          {/* 左側: プレビュー */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
              {drawing.s3Path ? (
                <Image
                  src={drawing.s3Path}
                  alt={drawing.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <FileImage className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    <p className="text-sm">{drawing.drawingNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* 右側: 属性 */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="flex h-full flex-col pl-4">
              <div className="flex-1 space-y-3 overflow-auto">
                <TextField
                  id="drawingNumber"
                  label="図面番号"
                  value={drawing.drawingNumber}
                  onChange={() => {}}
                />
                <TextField
                  id="drawingType"
                  label="図面種類"
                  value={drawing.drawingType}
                  onChange={() => {}}
                />
                <TextField
                  id="sheetSize"
                  label="図面サイズ"
                  value={drawing.sheetSize}
                  onChange={() => {}}
                />
                <TextField
                  id="sheetInfo"
                  label="シート"
                  value={`${drawing.sheetNumber}/${drawing.totalSheets}`}
                  onChange={() => {}}
                />
                {facetFields}
              </div>

              <div className="border-t pt-4">
                <Button onClick={handleSave} className="w-full">
                  保存
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DialogContent>
    </Dialog>
  );
}
