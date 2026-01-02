'use client';

import { useParams } from 'next/navigation';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { DrawingInfoPanel } from '../ui-block/info-panel/ui/DrawingInfoPanel';
import { DrawingPreviewPanel } from '@/widgets/drawing/drawing-preview-panel/ui/DrawingPreviewPanel';
import { dummyProducts } from '../dummy-data/drawing-detail';

export function DrawingBasicInformationContainer() {
  const params = useParams();
  const productId = params.id as string;

  // TODO: API呼び出し
  const product =
    dummyProducts.find((p) => p.id === productId) ?? dummyProducts[0];

  return (
    <ResizablePanelGroup direction='horizontal' className='h-full gap-2'>
      {/* プレビューパネル（左側 + 中央） */}
      <ResizablePanel defaultSize={70} minSize={40}>
        <DrawingPreviewPanel drawings={product.drawings} />
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className='mx-1 rounded-full bg-slate-200/50 transition-colors hover:bg-slate-300/50'
      />

      {/* 情報パネル（右側） */}
      <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
        <DrawingInfoPanel product={product} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
