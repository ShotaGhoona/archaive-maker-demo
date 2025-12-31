'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';

interface DetailLinkButtonProps {
  nodeId: string;
}

export function DetailLinkButton({ nodeId }: DetailLinkButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/bom/${nodeId}/basic-information`}>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>詳細ページを開く</p>
      </TooltipContent>
    </Tooltip>
  );
}
