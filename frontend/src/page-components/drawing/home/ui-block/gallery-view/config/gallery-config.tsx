import type { GalleryCardConfig } from '@/widgets/view/gallery-view/model/types';
import type { DrawingItem } from '../../../dummy-data/drawings';

export const drawingGalleryCardConfig: GalleryCardConfig<DrawingItem> = {
  thumbnailKey: 'thumbnailUrl',
  contentRenderer: (item) => (
    <>
      <h3 className="truncate font-medium">{item.name}</h3>
      <p className="truncate text-sm text-muted-foreground">{item.drawingNumber}</p>
    </>
  ),
};
