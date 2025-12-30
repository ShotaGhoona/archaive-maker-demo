'use client';

import { NodeBlock } from './NodeBlock';
import { NodeConnector } from './NodeConnector';
import { useNodes } from '../lib/use-nodes';
import type { FlattenedNode, Connector } from '../model/types';

interface NodeLayerProps {
  initialNodes: FlattenedNode[];
  initialConnectors: Connector[];
}

export function NodeLayer({ initialNodes, initialConnectors }: NodeLayerProps) {
  const { nodes, connectors, moveNode } = useNodes({
    initialNodes,
    initialConnectors,
  });

  return (
    <>
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
        <NodeBlock
          key={flatNode.node.id}
          node={flatNode.node}
          x={flatNode.x}
          y={flatNode.y}
          onMove={(x, y) => moveNode(flatNode.node.id, x, y)}
        />
      ))}
    </>
  );
}
