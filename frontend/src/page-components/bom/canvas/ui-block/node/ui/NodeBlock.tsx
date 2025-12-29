'use client';

import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { MetadataSheet } from '@/widgets/bom/canvas/metadata-sheet/ui/MetadataSheet';
import { DocumentPreviewDialog } from '@/widgets/bom/canvas/document-preview/ui/DocumentPreviewDialog';
import { DrawingPreviewDialog } from '@/widgets/bom/canvas/drawing-preview/ui/DrawingPreviewDialog';

import type { BomNode } from '../dummy-data/node-data';

interface NodeBlockProps {
  node: BomNode;
}

export function NodeBlock({ node }: NodeBlockProps) {
  // 名前から品番を抽出（最後のスペース区切りの文字列）
  const nameParts = node.name.split(' ');
  const partNumber = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const displayName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : node.name;

  return (
    <div className="relative flex h-[150px] w-[250px] flex-col rounded-lg border bg-white shadow-sm">
      {/* 左上: タイプバッジ */}
      <div className="absolute left-2 top-2">
        <Badge variant="secondary" className="text-xs">
          {node.directoryTypeName || node.type}
        </Badge>
      </div>

      {/* 中央: 名前と品番 */}
      <div className="flex flex-1 flex-col items-center justify-center px-3 pt-6">
        {partNumber && (
          <p className="mt-1 text-xs text-muted-foreground">{partNumber}</p>
        )}
        <p className="line-clamp-2 text-center text-sm font-medium leading-tight">
          {displayName}
        </p>
      </div>

      {/* 下部: アイコン類 */}
      <div className="flex items-center justify-between px-2 pb-2">
        {/* 左下: 図面・帳票アイコン（各アイテムごとにアイコン表示） */}
        <div className="flex items-center gap-0.5">
          {node.drawings.map((drawing) => (
            <DrawingPreviewDialog key={drawing.id} drawing={drawing} />
          ))}
          {node.documents.map((document) => (
            <DocumentPreviewDialog key={document.id} document={document} />
          ))}
        </div>

        {/* 右下: メタデータボタン */}
        <div>
          <MetadataSheet nodeName={node.name} customFields={node.customFields} />
        </div>
      </div>
    </div>
  );
}
