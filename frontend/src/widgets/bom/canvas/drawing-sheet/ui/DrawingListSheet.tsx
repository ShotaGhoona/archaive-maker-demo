'use client';

import { useState } from 'react';
import { PenTool } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { DrawingDetailModal } from './DrawingDetailModal';

import type { Drawing } from '@/shared/dummy-data/bom/types';

interface DrawingListSheetProps {
  drawings: Drawing[];
}

export function DrawingListSheet({ drawings }: DrawingListSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDrawingClick = (drawing: Drawing) => {
    setSelectedDrawing(drawing);
    setModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedDrawing(null);
    }
  };

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => e.stopPropagation()}
              >
                <PenTool className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>図面一覧 ({drawings.length})</p>
          </TooltipContent>
        </Tooltip>
        <SheetContent
          className="flex flex-col overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          <SheetHeader>
            <SheetTitle className="text-left">図面一覧</SheetTitle>
          </SheetHeader>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-1 pb-4">
            {drawings.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <NoData title="図面がありません" size="sm" />
              </div>
            ) : (
              <div className="space-y-3">
                {drawings.map((drawing) => (
                  <button
                    key={drawing.id}
                    className="w-full rounded-lg border p-3 text-left transition-colors bg-card"
                    onClick={() => handleDrawingClick(drawing)}
                  >
                    {/* サムネイル */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-muted">
                      <Image
                        src={drawing.previewImageUrl}
                        alt={drawing.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* 情報 */}
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        {drawing.fileExtension.toUpperCase()}
                      </p>
                      <p className="truncate text-sm font-medium">
                        {drawing.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* 詳細モーダル */}
      {selectedDrawing && (
        <DrawingDetailModal
          drawing={selectedDrawing}
          open={modalOpen}
          onOpenChange={handleModalClose}
        />
      )}
    </>
  );
}
