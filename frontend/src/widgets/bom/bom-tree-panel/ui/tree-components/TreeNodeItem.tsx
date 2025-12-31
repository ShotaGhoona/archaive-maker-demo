'use client';

import { useState, useEffect } from 'react';
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

import type {
  TreeNode,
  GalleryItemType,
} from '@/shared/dummy-data/bom/products';

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedNodeId: string | null;
  onSelectNode?: (node: TreeNode) => void;
  /** 表示するタイプを指定（省略時は全て表示） */
  allowedTypes?: GalleryItemType[];
  /** デフォルトで開く階層の深さ（デフォルト: 1） */
  defaultOpenLevel?: number;
  /** 現在フォーカスされているマッチノードID */
  highlightedNodeId?: string | null;
  /** マッチしたノードIDのリスト */
  matchedNodeIds?: string[];
  /** 強制的に展開するノードIDのセット */
  forceExpandIds?: Set<string>;
  /** 検索クエリ（テキストハイライト用） */
  searchQuery?: string;
}

// テキスト内の検索クエリ部分をハイライト表示
function HighlightedText({
  text,
  query,
  isCurrentMatch,
}: {
  text: string;
  query: string;
  isCurrentMatch: boolean;
}) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return <>{text}</>;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark
        className={cn(
          'rounded px-0.5',
          isCurrentMatch
            ? 'bg-primary text-primary-foreground'
            : 'bg-yellow-200 dark:bg-yellow-600',
        )}
      >
        {match}
      </mark>
      {after}
    </>
  );
}

export function TreeNodeItem({
  node,
  level,
  selectedNodeId,
  onSelectNode,
  allowedTypes,
  defaultOpenLevel = 1,
  highlightedNodeId,
  matchedNodeIds = [],
  forceExpandIds,
  searchQuery = '',
}: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = useState(level < defaultOpenLevel);
  const isDirectory = node.type === 'directory';

  // 強制展開が必要な場合
  const shouldForceExpand = forceExpandIds?.has(node.id) ?? false;

  useEffect(() => {
    if (shouldForceExpand && !isOpen) {
      setIsOpen(true);
    }
  }, [shouldForceExpand, isOpen]);

  // allowedTypesでフィルタリングされた子要素
  const filteredChildren = node.children?.filter(
    (child) => !allowedTypes || allowedTypes.includes(child.type),
  );
  const hasChildren = filteredChildren && filteredChildren.length > 0;
  const isSelected = selectedNodeId === node.id;
  const isHighlighted = highlightedNodeId === node.id;
  const isMatched = matchedNodeIds.includes(node.id);

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

        <span className='flex-1 truncate text-base'>
          <HighlightedText
            text={node.name}
            query={searchQuery}
            isCurrentMatch={isHighlighted}
          />
        </span>

        <span className='flex shrink-0 items-center gap-2'>
          <span className='text-sm text-muted-foreground'>{getBadgeLabel()}</span>
          <Badge variant='secondary'>Lv{level + 1}</Badge>
        </span>
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
              highlightedNodeId={highlightedNodeId}
              matchedNodeIds={matchedNodeIds}
              forceExpandIds={forceExpandIds}
              searchQuery={searchQuery}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
