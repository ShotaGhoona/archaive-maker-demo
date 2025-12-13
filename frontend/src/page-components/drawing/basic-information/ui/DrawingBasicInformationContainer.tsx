'use client';

import { useParams } from 'next/navigation';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/shared/ui/shadcn/ui/resizable';
import { DrawingInfoPanel } from '../ui-block/info-panel/ui/DrawingInfoPanel';
import { dummyDrawings } from '../../home/dummy-data/drawings';

export function DrawingBasicInformationContainer() {
  const params = useParams();
  const drawingId = params.id as string;

  // TODO: API呼び出し
  const drawing = dummyDrawings.find((d) => d.id === drawingId) ?? dummyDrawings[0];

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* メインコンテンツエリア（左側） */}
      <ResizablePanel defaultSize={70} minSize={30}>
        <div className="h-full overflow-auto p-4">
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-muted/30">
            <p className="text-muted-foreground">図面プレビューエリア</p>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* 情報パネル（右側） */}
      <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
        <aside className="h-full bg-card">
          <DrawingInfoPanel drawing={drawing} />
        </aside>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
