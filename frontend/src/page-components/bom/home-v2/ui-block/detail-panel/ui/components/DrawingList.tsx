import { Image } from 'lucide-react';
import type { Drawing } from '@/shared/dummy-data/bom-v2';

interface DrawingListProps {
  drawings: Drawing[];
}

export function DrawingList({ drawings }: DrawingListProps) {
  if (drawings.length === 0) return null;

  return (
    <div>
      <h4 className="mb-2 text-base font-medium text-primary">
        図面 ({drawings.length})
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {drawings.map((drw) => (
          <div
            key={drw.id}
            className="flex min-w-0 cursor-pointer items-center gap-2 rounded-md bg-muted/50 p-2 text-base hover:bg-muted"
            onClick={() => alert(`図面プレビュー（未実装）\n${drw.filePath}`)}
          >
            <Image className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate">{drw.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {drw.drawingType} / {drw.sheetSize}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
