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
          isCurrentMatch ? 'bg-slate-900 text-white' : 'bg-amber-200',
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
          <FolderOpen className='size-4 text-slate-600' />
        ) : (
          <Folder className='size-4 text-slate-600' />
        );
      case 'document':
        return <FileText className='size-4 text-blue-500' />;
      case 'drawing':
        return <ImageIcon className='size-4 text-emerald-500' />;
    }
  };

  const getTypeLabel = () => {
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
          'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5',
          'transition-all',
          'hover:bg-white/60',
          isSelected && 'bg-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => onSelectNode?.(node)}
      >
        {isDirectory && hasChildren ? (
          <CollapsibleTrigger asChild>
            <button
              className='flex size-5 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/50 hover:text-slate-600'
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight
                className={cn(
                  'size-4 transition-transform',
                  isOpen && 'rotate-90',
                )}
              />
            </button>
          </CollapsibleTrigger>
        ) : (
          <span className='size-5' />
        )}

        {getIcon()}

        <span className='flex-1 truncate text-sm text-slate-700'>
          <HighlightedText
            text={node.name}
            query={searchQuery}
            isCurrentMatch={isHighlighted}
          />
        </span>

        <span className='shrink-0 text-xs text-slate-400'>
          {getTypeLabel()}
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
