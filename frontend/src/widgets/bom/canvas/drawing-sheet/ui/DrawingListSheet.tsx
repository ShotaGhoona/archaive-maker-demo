'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PenTool, FileImage } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
} from '@/shared/ui/shadcn/ui/floating-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { DrawingDetailModal } from './DrawingDetailModal';
import type { Drawing } from '@/shared/dummy-data/bom-v2';

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
      <FloatingModal open={sheetOpen} onOpenChange={setSheetOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <FloatingModalTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => e.stopPropagation()}
              >
                <PenTool className="h-4 w-4" />
              </Button>
            </FloatingModalTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>図面一覧 ({drawings.length})</p>
          </TooltipContent>
        </Tooltip>
        <FloatingModalContent height="full" onWheel={(e) => e.stopPropagation()}>
          <FloatingModalHeader>
            <FloatingModalTitle>図面一覧</FloatingModalTitle>
          </FloatingModalHeader>
          <FloatingModalBody className="overflow-y-auto">
            {drawings.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <NoData title="図面がありません" size="sm" />
              </div>
            ) : (
              <div className="space-y-3">
                {drawings.map((drawing) => (
                  <button
                    key={drawing.id}
                    className="w-full rounded-lg border p-3 text-left transition-colors bg-card hover:bg-accent/50"
                    onClick={() => handleDrawingClick(drawing)}
                  >
                    {/* サムネイル */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-muted">
                      {drawing.s3Path ? (
                        <Image
                          src={drawing.s3Path}
                          alt={drawing.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FileImage className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    {/* 情報 */}
                    <div className="mt-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {drawing.drawingType}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {drawing.sheetSize}
                        </Badge>
                      </div>
                      <p className="truncate text-sm font-medium">
                        {drawing.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {drawing.drawingNumber}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </FloatingModalBody>
        </FloatingModalContent>
      </FloatingModal>

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
