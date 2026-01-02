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
      <h4 className='mb-2 text-base font-medium text-slate-900'>
        図面 ({drawings.length})
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {drawings.map((drw) => (
          <div
            key={drw.id}
            className='flex min-w-0 items-center gap-2 rounded-xl border border-white/60 bg-white/40 p-2 text-base backdrop-blur-sm'
          >
            <Image className='h-5 w-5 shrink-0 text-slate-400' />
            <span className='min-w-0 flex-1 truncate text-slate-700'>{drw.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
