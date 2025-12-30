'use client';

import { useState, useCallback, useMemo } from 'react';
import type { FlattenedNode, Connector } from '../model/types';
import { NODE_WIDTH, NODE_HEIGHT } from '@/shared/canvas/constant/size';

interface UseNodesOptions {
  initialNodes: FlattenedNode[];
  initialConnectors: Connector[];
}

export function useNodes({ initialNodes, initialConnectors }: UseNodesOptions) {
  const [nodes, setNodes] = useState<FlattenedNode[]>(initialNodes);

  // ノードの位置を更新
  const moveNode = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.node.id === id ? { ...node, x, y } : node
      )
    );
  }, []);

  // ノードの位置からコネクタを再計算
  const connectors = useMemo(() => {
    const nodeMap = new Map(nodes.map((n) => [n.node.id, n]));

    return initialConnectors.map((connector) => {
      const fromNode = nodeMap.get(connector.fromId);
      const toNode = nodeMap.get(connector.toId);

      if (!fromNode || !toNode) return connector;

      return {
        ...connector,
        fromX: fromNode.x + NODE_WIDTH,
        fromY: fromNode.y + NODE_HEIGHT / 2,
        toX: toNode.x,
        toY: toNode.y + NODE_HEIGHT / 2,
      };
    });
  }, [nodes, initialConnectors]);

  return {
    nodes,
    connectors,
    moveNode,
  };
}
