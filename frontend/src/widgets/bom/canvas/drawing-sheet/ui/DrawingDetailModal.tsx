'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

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
import { renderDynamicFields } from '@/shared/ui/form-fields/lib/render-dynamic-field';

import type { Drawing } from '@/shared/dummy-data/bom/types';

interface DrawingDetailModalProps {
  drawing: Drawing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 図面データをフラットなメタデータに変換
function buildMetadata(drawing: Drawing): Record<string, unknown> {
  const metadata: Record<string, unknown> = {
    ファイル名: drawing.name,
    拡張子: drawing.fileExtension,
    ページ数: drawing.pages.length,
  };

  drawing.pages.forEach((page, index) => {
    const prefix = `ページ${index + 1}`;
    metadata[`${prefix}_図番`] = page.drawingNumber;
    metadata[`${prefix}_外部図番`] = page.externalDrawingNumber;
  });

  if (drawing.remarks) {
    metadata['備考'] = drawing.remarks;
  }

  return metadata;
}

export function DrawingDetailModal({
  drawing,
  open,
  onOpenChange,
}: DrawingDetailModalProps) {
  const [metadata, setMetadata] = useState<Record<string, unknown>>(() =>
    buildMetadata(drawing),
  );

  const updateItem = useCallback((key: string, value: unknown) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    // TODO: API呼び出し
    alert(
      `図面情報を保存しました（未実装）\n${JSON.stringify(metadata, null, 2)}`,
    );
  }, [metadata]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-7xl'>
        <DialogHeader>
          <DialogTitle>{drawing.name}</DialogTitle>
        </DialogHeader>
        <ResizablePanelGroup direction='horizontal' className='min-h-[400px]'>
          {/* 左側: プレビュー */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className='relative h-full w-full overflow-hidden rounded-lg bg-muted'>
              <Image
                src={drawing.previewImageUrl}
                alt={drawing.name}
                fill
                className='object-contain'
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* 右側: メタデータ */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className='flex h-full flex-col pl-4'>
              <div className='flex-1 space-y-3 overflow-auto'>
                {renderDynamicFields(metadata, updateItem)}
              </div>

              {/* 保存ボタン */}
              <div className='border-t pt-4'>
                <Button onClick={handleSave} className='w-full'>
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
