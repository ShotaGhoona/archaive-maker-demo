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
      <h4 className='mb-2 text-base font-medium text-primary'>
        ドキュメント ({documents.length})
      </h4>
      <div className='grid grid-cols-2 gap-2'>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className='flex min-w-0 items-center gap-2 rounded-md bg-muted/50 p-2 text-base'
          >
            <FileText className='h-5 w-5 shrink-0 text-muted-foreground' />
            <div className='min-w-0 flex-1'>
              <p className='truncate'>{doc.name || doc.typeName}</p>
              <p className='truncate text-sm text-muted-foreground'>{doc.typeName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
