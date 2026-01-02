'use client';

import { useParams } from 'next/navigation';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { DrawingPreviewPanel } from '@/widgets/drawing/drawing-preview-panel/ui/DrawingPreviewPanel';
import { dummyProducts } from '@/page-components/drawing/basic-information/dummy-data/drawing-detail';
import { SimilarGalleryPanel } from '../ui-block/similar-gallery/ui/SimilarGalleryPanel';

export function DrawingSimilarContainer() {
  const params = useParams();
  const productId = params.id as string;

  // TODO: API呼び出し
  const product =
    dummyProducts.find((p) => p.id === productId) ?? dummyProducts[0];

  return (
    <ResizablePanelGroup direction='horizontal' className='h-full gap-2'>
      {/* 左：プレビューパネル */}
      <ResizablePanel defaultSize={70} minSize={40}>
        <DrawingPreviewPanel drawings={product.drawings} />
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className='mx-1 rounded-full bg-slate-200/50 transition-colors hover:bg-slate-300/50'
      />

      {/* 右：類似図面ギャラリー */}
      <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
        <SimilarGalleryPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
