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
} from '@/shared/ui/shadcn/ui/dialog';
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
        <Button variant="outline" className="bg-card">
          <Settings className="size-4" />
          表示項目設定
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl h-[80vh] max-h-[900px]">
        <DialogHeader>
          <DialogTitle>表示項目の設定</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          {/* アクションボタン */}
          <div className="flex shrink-0 gap-3">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleReset}
            >
              <RotateCcw className="size-4" />
              リセット
            </Button>
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleHideAll}
            >
              <EyeOff className="size-4" />
              全て非表示
            </Button>
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleShowAll}
            >
              <Eye className="size-4" />
              全て表示
            </Button>
          </div>

          {/* リスト */}
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
            {/* 非表示列 */}
            <div className="flex min-h-0 flex-col rounded-lg border bg-card py-4">
              <h3 className="mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium">
                <X className="size-5 text-muted-foreground" />
                非表示の項目
                <span className="text-muted-foreground">
                  ({hiddenKeys.length})
                </span>
              </h3>
              <div className="flex-1 space-y-2 overflow-y-auto px-4">
                {hiddenKeys.length === 0 ? (
                  <p className="py-8 text-center text-base text-muted-foreground">
                    すべての項目が表示されています
                  </p>
                ) : (
                  hiddenKeys.map((key, index) => (
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
                      transferIcon={<ChevronRight className="size-4" />}
                    />
                  ))
                )}
              </div>
            </div>

            {/* 表示列 */}
            <div className="flex min-h-0 flex-col rounded-lg border bg-card py-4">
              <h3 className="mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium">
                <Check className="size-5 text-muted-foreground" />
                表示する項目
                <span className="text-muted-foreground">
                  ({visibleKeys.length})
                </span>
              </h3>
              <div className="flex-1 space-y-2 overflow-y-auto px-4">
                {visibleKeys.length === 0 ? (
                  <p className="py-8 text-center text-base text-muted-foreground">
                    表示する項目がありません
                  </p>
                ) : (
                  visibleKeys.map((key, index) => (
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
                      transferIcon={<ChevronLeft className="size-4" />}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex shrink-0 justify-end gap-3 border-t pt-4">
          <Button type="button" variant="outline">
            キャンセル
          </Button>
          <Button type="button">保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
