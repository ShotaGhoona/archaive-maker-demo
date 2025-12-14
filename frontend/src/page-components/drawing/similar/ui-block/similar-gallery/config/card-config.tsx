import type { GalleryCardConfig } from '@/widgets/view/gallery-view/model/types';
import type { SimilarDrawing } from '../../../dummy-data/similar-drawings';

export const similarDrawingCardConfig: GalleryCardConfig<SimilarDrawing> = {
  thumbnailKey: 'thumbnailUrl',
  contentRenderer: (item) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
          {item.similarity}%
        </span>
      </div>
      <p className="truncate text-xs text-muted-foreground">
        {item.drawingNumber}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{item.category}</span>
        <span>·</span>
        <span>{item.createdAt}</span>
      </div>
    </div>
  ),
};
