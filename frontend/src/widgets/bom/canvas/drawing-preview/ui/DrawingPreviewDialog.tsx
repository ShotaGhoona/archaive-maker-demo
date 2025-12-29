'use client';

import { useState } from 'react';
import { PenTool } from 'lucide-react';
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

import type { Drawing } from '@/page-components/bom/canvas/ui-block/node/dummy-data/node-data';

interface DrawingPreviewDialogProps {
  drawing: Drawing;
}

export function DrawingPreviewDialog({ drawing }: DrawingPreviewDialogProps) {
  const [open, setOpen] = useState(false);

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
              <PenTool className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{drawing.name}</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{drawing.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={drawing.previewImageUrl}
              alt={drawing.name}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {drawing.pages.length} ページ
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
