'use client';

import { NodeBlock } from './NodeBlock';
import { NodeConnector } from './components/NodeConnector';
import type { FlattenedNode, Connector } from '../model/types';

interface BomTreeLayerProps {
  nodes: FlattenedNode[];
  connectors: Connector[];
}

export function BomTreeLayer({ nodes, connectors }: BomTreeLayerProps) {
  return (
    <>
      {/* コネクタ（SVGレイヤー） */}
      <svg
        className='pointer-events-none absolute inset-0'
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
          data-node
          style={{
            position: 'absolute',
            left: flatNode.x,
            top: flatNode.y,
          }}
        >
          <NodeBlock node={flatNode.node} />
        </div>
      ))}
    </>
  );
}
