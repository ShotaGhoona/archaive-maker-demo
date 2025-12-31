import { Image } from 'lucide-react';

interface Drawing {
  id: string;
  name: string;
  previewImageUrl: string;
}

interface DrawingListProps {
  drawings: Drawing[];
}

export function DrawingList({ drawings }: DrawingListProps) {
  if (drawings.length === 0) return null;

  return (
    <div>
      <h4 className='mb-2 text-base font-medium text-primary'>
        図面 ({drawings.length})
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {drawings.map((drw) => (
          <div
            key={drw.id}
            className='flex min-w-0 items-center gap-2 rounded-md bg-muted/50 p-2 text-base'
          >
            <Image className='h-5 w-5 shrink-0 text-muted-foreground' />
            <span className='min-w-0 flex-1 truncate'>{drw.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
