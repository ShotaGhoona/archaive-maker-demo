'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/ui/collapsible';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Badge } from '@/shared/ui/shadcn/ui/badge';

import type { TreeNode, GalleryItemType } from '@/shared/dummy-data/bom/products';

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedNodeId: string | null;
  onSelectNode?: (node: TreeNode) => void;
  /** 表示するタイプを指定（省略時は全て表示） */
  allowedTypes?: GalleryItemType[];
  /** デフォルトで開く階層の深さ（デフォルト: 1） */
  defaultOpenLevel?: number;
}

export function TreeNodeItem({
  node,
  level,
  selectedNodeId,
  onSelectNode,
  allowedTypes,
  defaultOpenLevel = 1,
}: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = useState(level < defaultOpenLevel);
  const isDirectory = node.type === 'directory';

  // allowedTypesでフィルタリングされた子要素
  const filteredChildren = node.children?.filter(
    (child) => !allowedTypes || allowedTypes.includes(child.type)
  );
  const hasChildren = filteredChildren && filteredChildren.length > 0;
  const isSelected = selectedNodeId === node.id;

  const getIcon = () => {
    switch (node.type) {
      case 'directory':
        return isOpen ? (
          <FolderOpen className='h-5 w-5 text-primary' />
        ) : (
          <Folder className='h-5 w-5 text-primary' />
        );
      case 'document':
        return <FileText className='h-5 w-5 text-blue-500' />;
      case 'drawing':
        return <ImageIcon className='h-5 w-5 text-green-500' />;
    }
  };

  const getBadgeLabel = () => {
    switch (node.type) {
      case 'directory':
        return node.nodeType ?? 'ディレクトリ';
      case 'document':
        return 'ドキュメント';
      case 'drawing':
        return '図面';
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-accent',
          isSelected && 'bg-accent',
        )}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => onSelectNode?.(node)}
      >
        {isDirectory && hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              className='flex h-6 w-6 items-center justify-center rounded hover:bg-muted'
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight
                className={cn(
                  'h-5 w-5 transition-transform',
                  isOpen && 'rotate-90',
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : (
          <span className='h-6 w-6' />
        )}

        {getIcon()}

        <span className='flex-1 truncate text-base'>{node.name}</span>

        <Badge variant='outline' className='shrink-0'>
          {getBadgeLabel()}
        </Badge>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          {filteredChildren!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
              allowedTypes={allowedTypes}
              defaultOpenLevel={defaultOpenLevel}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
