'use client';

import { useState } from 'react';
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

import type { Document } from '@/page-components/bom/canvas/ui-block/node/dummy-data/node-data';

interface DocumentPreviewDialogProps {
  document: Document;
}

export function DocumentPreviewDialog({ document }: DocumentPreviewDialogProps) {
  const [open, setOpen] = useState(false);

  const latestVersion = document.versions[document.versions.length - 1];

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{document.typeName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={latestVersion.previewImageUrl}
              alt={latestVersion.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            v{latestVersion.version} - {latestVersion.name}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
