'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/shared/ui/shadcn/ui/card';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/shadcn/ui/tabs';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { BomNavTreeNodeItem } from './components/BomNavTreeNodeItem';
import {
  explodeBom,
  findWhereUsed,
  getItemById,
  getItemRevById,
  type Item,
  type ItemRev,
} from '@/shared/dummy-data/bom-v2';

interface BomNavigationPanelProps {
  itemRevId: string;
}

/** ツリーノード型 */
export interface BomNavTreeNode {
  id: string;
  item: Item;
  itemRev: ItemRev;
  quantity: number;
  level: number;
  children: BomNavTreeNode[];
}

export function BomNavigationPanel({ itemRevId }: BomNavigationPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'children' | 'whereUsed'>('children');

  // 子部品ツリーを構築
  const childrenTree = useMemo(() => {
    const itemRev = getItemRevById(itemRevId);
    if (!itemRev) return null;

    const item = getItemById(itemRev.itemId);
    if (!item) return null;

    const explosion = explodeBom(itemRevId);

    // ルートノード
    const root: BomNavTreeNode = {
      id: itemRevId,
      item,
      itemRev,
      quantity: 1,
      level: 0,
      children: [],
    };

    // フラットな展開結果をツリー構造に変換
    const nodeMap = new Map<string, BomNavTreeNode>();
    nodeMap.set(itemRevId, root);

    const sorted = [...explosion].sort((a, b) => a.level - b.level);

    for (const row of sorted) {
      const node: BomNavTreeNode = {
        id: row.childItemRevId,
        item: row.childItem,
        itemRev: row.childItemRev,
        quantity: row.quantity,
        level: row.level,
        children: [],
      };

      nodeMap.set(row.childItemRevId, node);

      const parent = nodeMap.get(row.parentItemRevId);
      if (parent) {
        parent.children.push(node);
      }
    }

    return root;
  }, [itemRevId]);

  // 使用先リストを取得
  const whereUsedList = useMemo(() => {
    return findWhereUsed(itemRevId);
  }, [itemRevId]);

  const handleNavigate = (itemId: string) => {
    router.push(`/bom/${itemId}/basic-information`);
  };

  return (
    <Card className="flex w-72 shrink-0 flex-col py-0">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'children' | 'whereUsed')}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList className="h-12 w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="children"
            className="h-full rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            子部品
          </TabsTrigger>
          <TabsTrigger
            value="whereUsed"
            className="h-full rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
          >
            使用先
          </TabsTrigger>
        </TabsList>

        <TabsContent value="children" className="mt-0 min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="p-2">
              {childrenTree ? (
                <BomNavTreeNodeItem
                  node={childrenTree}
                  level={0}
                  currentItemRevId={itemRevId}
                  onNavigate={handleNavigate}
                  defaultOpen
                />
              ) : (
                <NoData title="データがありません" size="sm" />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="whereUsed" className="mt-0 min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {whereUsedList.length === 0 ? (
                <NoData
                  title="使用先がありません"
                  description="このアイテムはどこでも使用されていません"
                  size="sm"
                />
              ) : (
                whereUsedList.map((usage) => (
                  <button
                    key={usage.bomLine.id}
                    onClick={() => handleNavigate(usage.parentItem.id)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                      'hover:bg-accent transition-colors'
                    )}
                  >
                    <span className="flex-1 truncate">{usage.parentItem.partNumber}</span>
                    {usage.quantity > 1 && (
                      <span className="text-xs text-muted-foreground">×{usage.quantity}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
