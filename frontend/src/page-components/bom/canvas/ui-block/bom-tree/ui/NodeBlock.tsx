'use client';

import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { MetadataSheet } from '@/widgets/bom/canvas/metadata-sheet/ui/MetadataSheet';
import { DocumentListSheet } from '@/widgets/bom/canvas/document-sheet/ui/DocumentListSheet';
import { DrawingListSheet } from '@/widgets/bom/canvas/drawing-sheet/ui/DrawingListSheet';
import { NODE_WIDTH, NODE_HEIGHT } from '@/shared/canvas/constant/size';
import { DetailLinkButton } from './components/DetailLinkButton';

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
  const partNumber =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const displayName =
    nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : node.name;

  // タイプラベル
  const typeLabel = TYPE_LABELS[node.type];

  // ドキュメントと図面を取得
  const documents = node.type === 'parts' ? [] : node.documents;
  const drawings = node.type === 'parts' ? node.drawings : [];

  return (
    <div
      className='relative flex flex-col rounded-xl border border-white/60 bg-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl'
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
    >
      {/* 左上: タイプバッジ */}
      <div className='absolute left-2 top-2'>
        <Badge variant='secondary' className='text-xs'>
          {typeLabel}
        </Badge>
      </div>

      {/* 右上: 詳細ページへのリンク */}
      <div className='absolute right-2 top-2'>
        <DetailLinkButton nodeId={node.id} />
      </div>

      {/* 中央: 名前と品番 */}
      <div className='flex flex-1 flex-col items-center justify-center px-3 pt-6'>
        {partNumber && (
          <p className='mt-1 text-xs text-muted-foreground'>{partNumber}</p>
        )}
        <p className='line-clamp-2 text-center text-sm font-medium leading-tight'>
          {displayName}
        </p>
      </div>

      {/* 右下: 帳票・図面・メタデータアイコン */}
      <div className='flex items-center justify-end gap-0.5 px-2 pb-2'>
        {documents.length > 0 && <DocumentListSheet documents={documents} />}
        {drawings.length > 0 && <DrawingListSheet drawings={drawings} />}
        <MetadataSheet nodeName={node.name} customItems={node.customItems} />
      </div>
    </div>
  );
}
