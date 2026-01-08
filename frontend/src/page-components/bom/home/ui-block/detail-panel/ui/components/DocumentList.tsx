import { FileText } from 'lucide-react';
import { getDocumentTypeById, type Document } from '@/shared/dummy-data/bom-v2';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) return null;

  return (
    <div>
      <h4 className="mb-2 text-base font-medium text-primary">
        ドキュメント ({documents.length})
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {documents.map((doc) => {
          const docType = getDocumentTypeById(doc.documentTypeId);
          return (
            <div
              key={doc.id}
              className="flex min-w-0 cursor-pointer items-center gap-2 rounded-md bg-muted/50 p-2 text-base hover:bg-muted"
              onClick={() => alert(`ドキュメントプレビュー（未実装）\n${doc.s3Path}`)}
            >
              <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate">{doc.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {docType?.name ?? doc.documentNumber}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
