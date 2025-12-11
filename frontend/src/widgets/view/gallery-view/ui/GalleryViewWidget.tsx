'use client';

import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { ViewPagination } from '@/widgets/view/shared/ui/ViewPagination';
import { GalleryCard } from './GalleryCard';
import { GallerySkeleton } from './skeleton/GallerySkeleton';
import type { GalleryViewProps } from '../model/types';

export function GalleryViewWidget<T extends object>({
  data,
  cardConfig,
  pagination,
  onPageChange,
  onPageSizeChange,
  onCardClick,
  isLoading,
  columns = 4,
  onColumnsChange,
}: GalleryViewProps<T>) {
  // ローディング時はスケルトンを表示
  if (isLoading) {
    return <GallerySkeleton columns={columns} />;
  }

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns] || 'grid-cols-4';

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {data.length === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <NoData
            title="データがありません"
            description="フィルター条件を変更してください"
          />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-auto">
          <div className={`grid ${gridColsClass} gap-4`}>
            {data.map((item, index) => (
              <GalleryCard
                key={index}
                item={item}
                index={index}
                cardConfig={cardConfig}
                onClick={onCardClick}
              />
            ))}
          </div>
        </div>
      )}

      {pagination && (
        <ViewPagination
          pagination={pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showGridColumns={!!onColumnsChange}
          gridColumns={columns}
          onGridColumnsChange={onColumnsChange}
        />
      )}
    </div>
  );
}
