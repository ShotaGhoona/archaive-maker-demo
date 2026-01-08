'use client';

import { useMemo } from 'react';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { MetadataSheet } from '@/widgets/bom/canvas/metadata-sheet/ui/MetadataSheet';
import { DocumentListSheet } from '@/widgets/bom/canvas/document-sheet/ui/DocumentListSheet';
import { DrawingListSheet } from '@/widgets/bom/canvas/drawing-sheet/ui/DrawingListSheet';
import { TaskSheet } from '@/widgets/bom/canvas/task-sheet/ui/TaskSheet';
import { NODE_WIDTH, NODE_HEIGHT } from '@/shared/canvas/constant/size';
import { DetailLinkButton } from './components/DetailLinkButton';
import { getItemTypeLabel } from '@/shared/lib/bom-v2/item-type';
import {
  getDrawingsByItemRev,
  getDocumentsByItemRev,
} from '@/shared/dummy-data/bom-v2';

import type { CanvasBomNode } from '../model/types';

interface NodeBlockProps {
  node: CanvasBomNode;
}

export function NodeBlock({ node }: NodeBlockProps) {
  const { item, itemRev } = node;

  // タイプラベル
  const typeLabel = getItemTypeLabel(item.itemType);

  // ドキュメントと図面を取得
  const documents = useMemo(
    () => getDocumentsByItemRev(itemRev.id),
    [itemRev.id]
  );
  const drawings = useMemo(
    () => getDrawingsByItemRev(itemRev.id),
    [itemRev.id]
  );

  return (
    <div
      className="relative flex flex-col rounded-lg border bg-white shadow-sm"
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
    >
      {/* 左上: タイプバッジ */}
      <div className="absolute left-2 top-2">
        <Badge variant="secondary" className="text-xs">
          {typeLabel}
        </Badge>
      </div>

      {/* 右上: 詳細ページへのリンク */}
      <div className="absolute right-2 top-2">
        <DetailLinkButton itemId={item.id} />
      </div>

      {/* 中央: 名前と品番 */}
      <div className="flex flex-1 flex-col items-center justify-center px-3 pt-6">
        <p className="mt-1 text-xs text-muted-foreground">{item.partNumber}</p>
        <p className="line-clamp-2 text-center text-sm font-medium leading-tight">
          {item.name}
        </p>
      </div>

      {/* 下部: タスク（左）・帳票・図面・メタデータ（右） */}
      <div className="flex items-center justify-between px-2 pb-2">
        {/* 左下: タスクアイコン */}
        <div className="flex items-center gap-0.5">
          <TaskSheet
            itemRevId={itemRev.id}
            itemId={item.id}
            itemName={item.name}
            partNumber={item.partNumber}
            itemType={item.itemType}
          />
        </div>
        {/* 右下: 帳票・図面・メタデータアイコン */}
        <div className="flex items-center gap-0.5">
          {documents.length > 0 && <DocumentListSheet documents={documents} />}
          {drawings.length > 0 && <DrawingListSheet drawings={drawings} />}
          <MetadataSheet
            item={item}
            itemRev={itemRev}
          />
        </div>
      </div>
    </div>
  );
}
