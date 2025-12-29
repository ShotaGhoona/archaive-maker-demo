'use client';

import { InfiniteCanvas } from '@/widgets/bom/canvas/viewport/ui/InfiniteCanvas';

export function BomCanvasContainer() {
  return (
    <div className="h-full w-full">
      <InfiniteCanvas>
        {/* TODO: ノードとコネクタをここに配置 */}
      </InfiniteCanvas>
    </div>
  );
}
