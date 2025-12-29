'use client';

import { useMemo } from 'react';

import { InfiniteCanvas } from '@/widgets/bom/canvas/viewport/ui/InfiniteCanvas';
import { NodeBlock } from '../ui-block/node/ui/NodeBlock';
import { NodeConnector } from '../ui-block/connector/ui/NodeConnector';
import { calculateBomTreeLayout } from '../lib/tree-layout';

import bomData from '@/shared/dummy-data/bom/mock6LayerRobotArm.json';
import type { BomData } from '../ui-block/node/dummy-data/node-data';

export function BomCanvasContainer() {
  const { nodes, connectors } = useMemo(() => {
    const data = bomData as BomData;
    return calculateBomTreeLayout(data.root);
  }, []);

  return (
    <div className="h-full w-full">
      <InfiniteCanvas>
        {/* コネクタ（SVGレイヤー） */}
        <svg
          className="pointer-events-none absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          {connectors.map((connector) => (
            <NodeConnector
              key={`${connector.fromId}-${connector.toId}`}
              fromX={connector.fromX}
              fromY={connector.fromY}
              toX={connector.toX}
              toY={connector.toY}
            />
          ))}
        </svg>

        {/* ノード */}
        {nodes.map((flatNode) => (
          <div
            key={flatNode.node.id}
            style={{
              position: 'absolute',
              left: flatNode.x,
              top: flatNode.y,
            }}
          >
            <NodeBlock node={flatNode.node} />
          </div>
        ))}
      </InfiniteCanvas>
    </div>
  );
}
