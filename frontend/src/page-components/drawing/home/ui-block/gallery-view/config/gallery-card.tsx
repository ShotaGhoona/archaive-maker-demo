import type { GalleryCardConfig } from '@/widgets/view/gallery-view/model/types';
import type { DrawingPage } from '@/entities/product/drawing-page/model/entity';

/**
 * ギャラリーカード設定
 */
export const GALLERY_CARD_CONFIG: GalleryCardConfig<DrawingPage> = {
  thumbnailKey: 's3Url',
  contentRenderer: (item) => (
    <>
      <h3 className="truncate font-medium">
        {item.leafProductName || item.drawingFileName || '(名称なし)'}
      </h3>
      <p className="truncate text-sm text-muted-foreground">
        {item.drawingNumber || '(図番なし)'}
      </p>
    </>
  ),
};
