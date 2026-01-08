'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { File } from 'lucide-react';

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
  getDocumentTypeById,
  getFacetInstanceById,
  getFacetTypeById,
  type Document,
} from '@/shared/dummy-data/bom-v2';

interface DocumentDetailModalProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentDetailModal({
  document,
  open,
  onOpenChange,
}: DocumentDetailModalProps) {
  const docType = getDocumentTypeById(document.documentTypeId);

  // FacetInstancesからフィールドを生成
  const facetFields = useMemo(() => {
    return document.facetInstanceIds.flatMap((id) => {
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
  }, [document.facetInstanceIds]);

  const handleSave = () => {
    // TODO: API呼び出し
    alert('帳票を保存しました（未実装）');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {docType?.name ?? '帳票'}
            </Badge>
            <DialogTitle>{document.title}</DialogTitle>
          </div>
        </DialogHeader>
        <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
          {/* 左側: プレビュー */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
              {document.s3Path ? (
                <Image
                  src={document.s3Path}
                  alt={document.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <File className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    <p className="text-sm">{document.documentNumber}</p>
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
                  id="documentNumber"
                  label="帳票番号"
                  value={document.documentNumber}
                  onChange={() => {}}
                />
                {document.issueDate && (
                  <TextField
                    id="issueDate"
                    label="発行日"
                    value={document.issueDate}
                    onChange={() => {}}
                  />
                )}
                {document.recipient && (
                  <TextField
                    id="recipient"
                    label="宛先"
                    value={document.recipient}
                    onChange={() => {}}
                  />
                )}
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
