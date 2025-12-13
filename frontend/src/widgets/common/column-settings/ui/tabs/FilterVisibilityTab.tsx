'use client';

import { Check, X, ChevronRight, ChevronLeft, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ColumnItem } from '../ColumnItem';

interface FilterVisibilityTabProps {
  visibleKeys: string[];
  hiddenKeys: string[];
  selectedKey: string | null;
  getLabel: (key: string) => string;
  onSelect: (key: string) => void;
  onMoveUp: (keys: string[], isVisible: boolean, key: string) => void;
  onMoveDown: (keys: string[], isVisible: boolean, key: string) => void;
  onMoveToHidden: (key: string) => void;
  onMoveToVisible: (key: string) => void;
  onReset: () => void;
  onHideAll: () => void;
  onShowAll: () => void;
}

export function FilterVisibilityTab({
  visibleKeys,
  hiddenKeys,
  selectedKey,
  getLabel,
  onSelect,
  onMoveUp,
  onMoveDown,
  onMoveToHidden,
  onMoveToVisible,
  onReset,
  onHideAll,
  onShowAll,
}: FilterVisibilityTabProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* アクションボタン */}
      <div className="flex shrink-0 gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          <RotateCcw className="size-5" />
          リセット
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onHideAll}>
          <EyeOff className="size-5" />
          全て非表示
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onShowAll}>
          <Eye className="size-5" />
          全て表示
        </Button>
      </div>

      {/* リスト */}
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
        {/* 非表示フィルター */}
        <div className="flex min-h-0 flex-col rounded-lg border bg-card py-4">
          <h3 className="mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium">
            <X className="size-5 text-muted-foreground" />
            非表示のフィルター
            <span className="text-muted-foreground">({hiddenKeys.length})</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto px-4">
            {hiddenKeys.length === 0 ? (
              <p className="py-8 text-center text-base text-muted-foreground">
                すべてのフィルターが表示されています
              </p>
            ) : (
              hiddenKeys.map((key, index) => (
                <ColumnItem
                  key={key}
                  header={getLabel(key)}
                  isSelected={selectedKey === key}
                  isFirst={index === 0}
                  isLast={index === hiddenKeys.length - 1}
                  onSelect={() => onSelect(key)}
                  onMoveUp={() => onMoveUp(hiddenKeys, false, key)}
                  onMoveDown={() => onMoveDown(hiddenKeys, false, key)}
                  onTransfer={() => onMoveToVisible(key)}
                  transferIcon={<ChevronRight className="size-4" />}
                />
              ))
            )}
          </div>
        </div>

        {/* 表示フィルター */}
        <div className="flex min-h-0 flex-col rounded-lg border bg-card py-4">
          <h3 className="mb-3 flex shrink-0 items-center gap-2 px-4 text-base font-medium">
            <Check className="size-5 text-muted-foreground" />
            表示するフィルター
            <span className="text-muted-foreground">({visibleKeys.length})</span>
          </h3>
          <div className="flex-1 space-y-2 overflow-y-auto px-4">
            {visibleKeys.length === 0 ? (
              <p className="py-8 text-center text-base text-muted-foreground">
                表示するフィルターがありません
              </p>
            ) : (
              visibleKeys.map((key, index) => (
                <ColumnItem
                  key={key}
                  header={getLabel(key)}
                  isSelected={selectedKey === key}
                  isFirst={index === 0}
                  isLast={index === visibleKeys.length - 1}
                  onSelect={() => onSelect(key)}
                  onMoveUp={() => onMoveUp(visibleKeys, true, key)}
                  onMoveDown={() => onMoveDown(visibleKeys, true, key)}
                  onTransfer={() => onMoveToHidden(key)}
                  transferIcon={<ChevronLeft className="size-4" />}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
