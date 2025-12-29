'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Folder, FileText, Image as ImageIcon } from 'lucide-react';
import { ScrollArea } from '@/shared/ui/shadcn/ui/scroll-area';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { Card } from '@/shared/ui/shadcn/ui/card';
import type { GalleryItem } from '@/shared/dummy-data/bom/products';

interface BomGalleryPanelProps {
  items: GalleryItem[];
}

function getTypeIcon(type: GalleryItem['type']) {
  switch (type) {
    case 'directory':
      return <Folder className='size-4' />;
    case 'document':
      return <FileText className='size-4' />;
    case 'drawing':
      return <ImageIcon className='size-4' />;
  }
}

function getTypeLabel(type: GalleryItem['type']) {
  switch (type) {
    case 'directory':
      return 'ディレクトリ';
    case 'document':
      return 'ドキュメント';
    case 'drawing':
      return '図面';
  }
}

export function BomGalleryPanel({ items }: BomGalleryPanelProps) {
  const router = useRouter();

  const handleClick = (item: GalleryItem) => {
    switch (item.type) {
      case 'directory':
        router.push(`/bom/${item.id}/basic-information`);
        break;
      case 'drawing':
        router.push(`/drawing/${item.id}/basic-information`);
        break;
      case 'document':
        // TODO: ドキュメント詳細ページへの遷移
        alert(`ドキュメント詳細ページ（未実装）: ${item.id}`);
        break;
    }
  };

  if (items.length === 0) {
    return (
      <div className='flex h-full items-center justify-center bg-card'>
        <NoData title='表示するアイテムがありません' size='default' />
      </div>
    );
  }

  return (
    <ScrollArea className='h-full'>
      <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {items.map((item) => (
          <Card
            key={item.id}
            className='group cursor-pointer overflow-hidden transition-shadow hover:shadow-md py-0 gap-0'
            onClick={() => handleClick(item)}
          >
            {/* サムネイル */}
            <div className='relative aspect-[4/3] overflow-hidden bg-muted'>
              <Image
                src={item.previewImageUrl}
                alt={item.name}
                fill
                className='object-cover transition-transform group-hover:scale-105'
                unoptimized
              />
              {/* タイプバッジ */}
              <div className='absolute left-2 top-2'>
                <Badge
                  variant='secondary'
                  className='gap-1 bg-background/80 backdrop-blur-sm'
                >
                  {getTypeIcon(item.type)}
                  {item.nodeType ?? getTypeLabel(item.type)}
                </Badge>
              </div>
            </div>

            {/* 情報 */}
            <div className='p-3'>
              <p className='truncate text-sm font-medium'>{item.name}</p>
            </div>
          </Card>
        ))}
        </div>
    </ScrollArea>
  );
}
