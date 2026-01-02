'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import {
  ViewSwitch,
  type ViewMode,
} from '@/shared/ui/components/view-switch/ui/ViewSwitch';
import { BomGalleryPanel } from '../ui-block/gallery-panel/ui/BomGalleryPanel';
import { BomTreeBlock } from '../ui-block/bom-tree/ui/BomTreeBlock';
import { BomInfoPanel } from '../ui-block/info-panel/ui/BomInfoPanel';
import {
  getNodeDetailById,
  getChildGalleryItems,
  getTreeNodesFromNodeId,
} from '@/shared/dummy-data/bom/products';

export function BomBasicInformationContainer() {
  const params = useParams();
  const bomId = params.id as string;
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');

  // TODO: API呼び出し
  const bomDetail = getNodeDetailById(bomId);
  const galleryItems = getChildGalleryItems(bomId);
  const treeNodes = getTreeNodesFromNodeId(bomId);

  if (!bomDetail) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p className='text-muted-foreground'>BOMデータが見つかりません</p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction='horizontal' className='h-full gap-2'>
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className='flex h-full flex-col'>
          <div className='flex shrink-0 items-center justify-start px-4 py-2'>
            <ViewSwitch
              modes={['gallery', 'tree']}
              value={viewMode}
              onChange={setViewMode}
            />
          </div>

          <div className='min-h-0 flex-1'>
            {viewMode === 'gallery' ? (
              <BomGalleryPanel items={galleryItems} />
            ) : (
              <BomTreeBlock treeNodes={treeNodes} />
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className='mx-1 rounded-full bg-slate-200/50 transition-colors hover:bg-slate-300/50'
      />

      <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
        <BomInfoPanel bomDetail={bomDetail} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
