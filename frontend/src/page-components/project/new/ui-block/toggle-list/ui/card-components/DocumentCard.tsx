'use client';

import { Card, CardContent } from '@/shared/ui/shadcn/ui/card';

import { UploadArea, type UploadedFile } from '../components/UploadArea';

interface DocumentCardProps {
  files: UploadedFile[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (fileId: string) => void;
}

export function DocumentCard({
  files,
  onFilesAdd,
  onFileRemove,
}: DocumentCardProps) {
  return (
    <Card>
      <CardContent className='pt-6'>
        <UploadArea
          files={files}
          onFilesAdd={onFilesAdd}
          onFileRemove={onFileRemove}
          accept='.pdf,.xlsx,.xls,.doc,.docx'
        />
      </CardContent>
    </Card>
  );
}
