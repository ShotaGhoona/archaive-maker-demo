'use client';

import { Info, FileImage, ZoomIn, ZoomOut, RotateCw, ScanSearch } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import type { Drawing } from '@/shared/dummy-data/bom-v2';

interface DrawingPreviewPanelProps {
  drawing: Drawing | null;
  zoom: number;
  showInfo: boolean;
  showSimilar: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onToggleInfo: () => void;
  onToggleSimilar: () => void;
}

export function DrawingPreviewPanel({
  drawing,
  zoom,
  showInfo,
  showSimilar,
  onZoomIn,
  onZoomOut,
  onRotate,
  onToggleInfo,
  onToggleSimilar,
}: DrawingPreviewPanelProps) {
  if (!drawing) {
    return (
      <Card className='flex min-h-0 flex-1 flex-col items-center justify-center gap-0'>
        <FileImage className='mb-4 size-16 text-muted-foreground/50' />
        <p className='text-lg font-medium text-muted-foreground'>
          図面を選択してください
        </p>
        <p className='mt-1 text-sm text-muted-foreground'>
          左のリストから図面を選択するとプレビューが表示されます
        </p>
      </Card>
    );
  }

  return (
    <Card className='relative flex min-h-0 flex-1 flex-col gap-0 overflow-hidden'>
      {/* 右上ツールバー */}
      <div className='absolute right-3 top-3 z-10 flex items-center gap-2'>
        {/* 類似図面検索ボタン */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showSimilar ? 'default' : 'outline'}
              size='icon'
              className={cn('size-10 shadow-sm', !showSimilar && 'bg-background/95 backdrop-blur')}
              onClick={onToggleSimilar}
            >
              <ScanSearch className='size-5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>類似図面を検索</TooltipContent>
        </Tooltip>

        {/* 情報ボタン */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showInfo ? 'default' : 'outline'}
              size='icon'
              className={cn('size-10 shadow-sm', !showInfo && 'bg-background/95 backdrop-blur')}
              onClick={onToggleInfo}
            >
              <Info className='size-5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>図面情報</TooltipContent>
        </Tooltip>
      </div>

      {/* 右下ズームコントロール（縦長） */}
      <div className='absolute bottom-3 right-3 z-10 flex flex-col items-center gap-1 rounded-lg border bg-background/95 p-1 shadow-sm backdrop-blur'>
        <Button
          variant='ghost'
          size='icon'
          className='size-8'
          onClick={onZoomIn}
          disabled={zoom >= 200}
        >
          <ZoomIn className='size-4' />
        </Button>
        <span className='py-1 text-center text-xs font-medium'>
          {zoom}%
        </span>
        <Button
          variant='ghost'
          size='icon'
          className='size-8'
          onClick={onZoomOut}
          disabled={zoom <= 50}
        >
          <ZoomOut className='size-4' />
        </Button>
        <div className='my-1 h-px w-6 bg-border' />
        <Button
          variant='ghost'
          size='icon'
          className='size-8'
          onClick={onRotate}
        >
          <RotateCw className='size-4' />
        </Button>
      </div>

      {/* プレビュー画像 */}
      <div className='flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/30 p-8'>
        {drawing.s3Path ? (
          <div
            className='relative transition-transform duration-200'
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <Image
              src={drawing.s3Path}
              alt={drawing.title}
              width={800}
              height={600}
              unoptimized
            />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-muted-foreground'>
            <FileImage className='mb-4 size-24 opacity-50' />
            <p className='text-lg font-medium'>プレビューがありません</p>
            <p className='mt-1 text-sm'>この図面にはプレビュー画像が設定されていません</p>
          </div>
        )}
      </div>
    </Card>
  );
}
