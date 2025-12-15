'use client';

import { useState } from 'react';
import {
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Eye,
  EyeOff,
  Settings,
} from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/shared/ui/shadcn/ui/dialog';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { FieldItem } from './components/FieldItem';

interface FieldConfig {
  key: string;
  label: string;
}

interface FieldSettingsModalProps {
  fields: FieldConfig[];
}

export function FieldSettingsModal({ fields }: FieldSettingsModalProps) {
  // UI用のダミーstate（実際には動作しない）
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [visibleKeys] = useState<string[]>(fields.map((f) => f.key));
  const [hiddenKeys] = useState<string[]>([]);

  const getLabel = (key: string) => {
    return fields.find((f) => f.key === key)?.label ?? key;
  };

  // ダミーハンドラー（UIのみ）
  const handleSelect = (key: string) => {
    setSelectedKey(key === selectedKey ? null : key);
  };

  const handleMoveUp = () => {
    // TODO: 実装
  };

  const handleMoveDown = () => {
    // TODO: 実装
  };

  const handleMoveToHidden = () => {
    // TODO: 実装
  };

  const handleMoveToVisible = () => {
    // TODO: 実装
  };

  const handleReset = () => {
    // TODO: 実装
  };

  const handleHideAll = () => {
    // TODO: 実装
  };

  const handleShowAll = () => {
    // TODO: 実装
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='bg-card'>
          <Settings className='size-4' />
          表示項目設定
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-[80vh] max-h-[900px] flex-col gap-0 p-0 sm:max-w-5xl'>
        <DialogHeader className='shrink-0 border-b px-6 py-4'>
          <DialogTitle>表示項目の設定</DialogTitle>
        </DialogHeader>

        <div className='flex min-h-0 flex-1 flex-col p-6'>
          {/* リスト */}
          <div className='grid min-h-0 flex-1 grid-cols-2 gap-6'>
            {/* 非表示列 */}
            <div className='flex min-h-0 flex-col rounded-lg border bg-card py-4'>
              <h3 className='mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium'>
                <X className='size-5 text-muted-foreground' />
                非表示の項目
                <span className='text-muted-foreground'>
                  ({hiddenKeys.length})
                </span>
              </h3>
              <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-4'>
                {hiddenKeys.length === 0 ? (
                  <div className='flex flex-1 items-center justify-center'>
                    <NoData title='すべての項目が表示されています' size='sm' />
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {hiddenKeys.map((key, index) => (
                      <FieldItem
                        key={key}
                        label={getLabel(key)}
                        isSelected={selectedKey === key}
                        isFirst={index === 0}
                        isLast={index === hiddenKeys.length - 1}
                        onSelect={() => handleSelect(key)}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        onTransfer={handleMoveToVisible}
                        transferIcon={<ChevronRight className='size-4' />}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 表示列 */}
            <div className='flex min-h-0 flex-col rounded-lg border bg-card py-4'>
              <h3 className='mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium'>
                <Check className='size-5 text-muted-foreground' />
                表示する項目
                <span className='text-muted-foreground'>
                  ({visibleKeys.length})
                </span>
              </h3>
              <div className='flex min-h-0 flex-1 flex-col overflow-y-auto px-4'>
                {visibleKeys.length === 0 ? (
                  <div className='flex flex-1 items-center justify-center'>
                    <NoData title='表示する項目がありません' size='sm' />
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {visibleKeys.map((key, index) => (
                      <FieldItem
                        key={key}
                        label={getLabel(key)}
                        isSelected={selectedKey === key}
                        isFirst={index === 0}
                        isLast={index === visibleKeys.length - 1}
                        onSelect={() => handleSelect(key)}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        onTransfer={handleMoveToHidden}
                        transferIcon={<ChevronLeft className='size-4' />}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <DialogFooter className='shrink-0 border-t bg-background px-6 py-4'>
          <div className='mr-auto flex gap-2'>
            <Button type='button' variant='outline' onClick={handleReset}>
              <RotateCcw className='size-4' />
              リセット
            </Button>
            <Button type='button' variant='outline' onClick={handleHideAll}>
              <EyeOff className='size-4' />
              全て非表示
            </Button>
            <Button type='button' variant='outline' onClick={handleShowAll}>
              <Eye className='size-4' />
              全て表示
            </Button>
          </div>
          <Button type='button' variant='outline'>
            <X className='size-4' />
            キャンセル
          </Button>
          <Button type='button'>
            <Check className='size-4' />
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
