'use client';

import { InfiniteCanvas } from '@/widgets/bom/canvas/viewport/ui/InfiniteCanvas';
import { NodeBlock } from '../ui-block/node/ui/NodeBlock';
import { dummyNodes } from '../ui-block/node/dummy-data/node-data';

export function BomCanvasContainer() {
  return (
    <div className="h-full w-full">
      <InfiniteCanvas>
        {/* ダミーノードを配置 */}
        {dummyNodes.map((node, index) => (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: 100 + index * 250,
              top: 100 + (index % 2) * 150,
            }}
          >
            <NodeBlock node={node} />
          </div>
        ))}
      </InfiniteCanvas>
    </div>
  );
}
