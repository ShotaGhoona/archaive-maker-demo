import { FileText } from 'lucide-react';

interface Document {
  id: string;
  typeName: string;
  name: string;
}

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) return null;

  return (
    <div>
      <h4 className='mb-2 text-base font-medium text-slate-900'>
        ドキュメント ({documents.length})
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className='flex min-w-0 items-center gap-2 rounded-xl border border-white/60 bg-white/40 p-2 text-base backdrop-blur-sm'
          >
            <FileText className='h-5 w-5 shrink-0 text-slate-400' />
            <div className='min-w-0 flex-1'>
              <p className='truncate text-slate-700'>
                {doc.name || doc.typeName}
              </p>
              <p className='truncate text-sm text-slate-500'>{doc.typeName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
