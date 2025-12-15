'use client';

import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/ui/collapsible';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { Card } from '@/shared/ui/shadcn/ui/card';

import type { BomNode } from '@/shared/dummy-data/bom/products';

interface BomTreePanelProps {
  bomTree: BomNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export function BomTreePanel({
  bomTree,
  selectedNodeId,
  onSelectNode,
}: BomTreePanelProps) {
  if (bomTree.length === 0) {
    return (
      <div className='flex min-h-0 flex-1 items-center justify-center'>
        <NoData title='左サイドバーから製品を選択してください' size='default' />
      </div>
    );
  }

  return (
    <Card className='min-h-0 flex-1 overflow-auto p-4'>
      <div className='space-y-1'>
        {bomTree.map((node) => (
          <BomTreeNode
            key={node.id}
            node={node}
            level={0}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
          />
        ))}
      </div>
    </Card>
  );
}

interface BomTreeNodeProps {
  node: BomNode;
  level: number;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

function BomTreeNode({
  node,
  level,
  selectedNodeId,
  onSelectNode,
}: BomTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNodeId === node.id;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-accent',
          isSelected && 'bg-accent'
        )}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => onSelectNode(node.id)}
      >
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              className='flex h-6 w-6 items-center justify-center rounded hover:bg-muted'
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight
                className={cn(
                  'h-5 w-5 transition-transform',
                  isOpen && 'rotate-90'
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : (
          <span className='h-6 w-6' />
        )}

        {isOpen ? (
          <FolderOpen className='h-5 w-5 text-primary' />
        ) : (
          <Folder className='h-5 w-5 text-primary' />
        )}

        <span className='flex-1 truncate text-base'>{node.name}</span>

        <Badge variant='outline' className='shrink-0'>
          {node.nodeType}
        </Badge>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          {node.children!.map((child) => (
            <BomTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
