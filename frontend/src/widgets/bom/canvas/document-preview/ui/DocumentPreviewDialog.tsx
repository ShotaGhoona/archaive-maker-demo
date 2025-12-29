'use client';

import { useState, useCallback } from 'react';
import { FileText } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { renderDynamicFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';

import type { Document } from '@/shared/dummy-data/bom/types';

interface DocumentPreviewDialogProps {
  document: Document;
}

export function DocumentPreviewDialog({ document }: DocumentPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const latestVersion = document.versions[document.versions.length - 1];

  // 基本情報とカスタム項目を統合
  const [metadata, setMetadata] = useState<Record<string, unknown>>({
    ファイル名: latestVersion.name,
    バージョン: latestVersion.version,
    パスワード保護: latestVersion.isPasswordProtected,
    ...latestVersion.customItems,
  });

  const updateItem = useCallback((key: string, value: unknown) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    // TODO: API呼び出し
    alert(`メタデータを保存しました（未実装）\n${JSON.stringify(metadata, null, 2)}`);
  }, [metadata]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{document.typeName}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-7xl">
        <DialogHeader>
          <DialogTitle>{document.typeName}</DialogTitle>
        </DialogHeader>
        <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
          {/* 左側: プレビュー */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={latestVersion.previewImageUrl}
                alt={latestVersion.name}
                fill
                className="object-contain"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* 右側: メタデータ */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="flex h-full flex-col pl-4">
              <div className="flex-1 space-y-3 overflow-auto">
                {renderDynamicFields(metadata, updateItem)}
              </div>

              {/* 保存ボタン */}
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
