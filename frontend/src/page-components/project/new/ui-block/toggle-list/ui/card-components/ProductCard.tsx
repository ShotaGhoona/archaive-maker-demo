'use client';

import { Card, CardContent } from '@/shared/ui/shadcn/ui/card';

import { UploadArea, type UploadedFile } from '../components/UploadArea';

interface ProductCardProps {
  files: UploadedFile[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (fileId: string) => void;
}

export function ProductCard({
  files,
  onFilesAdd,
  onFileRemove,
}: ProductCardProps) {
  return (
    <Card>
      <CardContent className='pt-6'>
        <UploadArea
          files={files}
          onFilesAdd={onFilesAdd}
          onFileRemove={onFileRemove}
          accept='.pdf,.png,.jpg,.jpeg,.dwg,.dxf'
        />
      </CardContent>
    </Card>
  );
}
