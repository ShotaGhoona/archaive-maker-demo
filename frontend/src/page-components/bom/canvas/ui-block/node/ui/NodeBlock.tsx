'use client';

import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { MetadataSheet } from '@/widgets/bom/canvas/metadata-sheet/ui/MetadataSheet';
import { DocumentPreviewDialog } from '@/widgets/bom/canvas/document-preview/ui/DocumentPreviewDialog';
import { DrawingPreviewDialog } from '@/widgets/bom/canvas/drawing-preview/ui/DrawingPreviewDialog';
import { NODE_WIDTH, NODE_HEIGHT } from '@/shared/canvas/constant/size';

import type { BomTreeNode } from '@/shared/dummy-data/bom/types';

interface NodeBlockProps {
  node: BomTreeNode;
}

const TYPE_LABELS: Record<BomTreeNode['type'], string> = {
  product: 'Product',
  assy: 'Assy',
  parts: 'Parts',
};

export function NodeBlock({ node }: NodeBlockProps) {
  // 名前から品番を抽出（最後のスペース区切りの文字列）
  const nameParts = node.name.split(' ');
  const partNumber = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const displayName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : node.name;

  // タイプラベル
  const typeLabel = TYPE_LABELS[node.type];

  // ドキュメントと図面を取得
  const documents = node.type === 'parts' ? [] : node.documents;
  const drawings = node.type === 'parts' ? node.drawings : [];

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
        {/* 左下: 図面・帳票アイコン */}
        <div className="flex items-center gap-0.5">
          {drawings.map((drawing) => (
            <DrawingPreviewDialog key={drawing.id} drawing={drawing} />
          ))}
          {documents.map((document) => (
            <DocumentPreviewDialog key={document.id} document={document} />
          ))}
        </div>

        {/* 右下: メタデータボタン */}
        <div>
          <MetadataSheet nodeName={node.name} customItems={node.customItems} />
        </div>
      </div>
    </div>
  );
}
