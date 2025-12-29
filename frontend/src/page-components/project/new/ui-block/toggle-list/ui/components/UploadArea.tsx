'use client';

import { useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/ui/shadcn/lib/utils';

export interface UploadedFile {
  id: string;
  name: string;
  file: File;
}

interface UploadAreaProps {
  files: UploadedFile[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (fileId: string) => void;
  accept?: string;
  multiple?: boolean;
}

export function UploadArea({
  files,
  onFilesAdd,
  onFileRemove,
  accept = '.pdf,.png,.jpg,.jpeg',
  multiple = true,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onFilesAdd(Array.from(selectedFiles));
    }
    // リセットして同じファイルを再選択可能にする
    e.target.value = '';
  };

  const hasFiles = files.length > 0;

  return (
    <div className='w-full'>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className='hidden'
      />

      {!hasFiles ? (
        // 未アップロード時: 横幅いっぱいの点線ボタン
        <button
          type='button'
          onClick={handleClick}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 py-8 transition-colors',
            'hover:border-primary/50 hover:bg-primary/10',
          )}
        >
          <Upload className='size-5 text-primary/60' />
          <span className='text-primary/60'>ファイルをアップロード</span>
        </button>
      ) : (
        // アップロード後: グリッド表示
        <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3'>
          {/* アップロードボタン（左端） */}
          <button
            type='button'
            onClick={handleClick}
            className={cn(
              'flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 transition-colors',
              'hover:border-primary/50 hover:bg-primary/10',
            )}
          >
            <Upload className='size-5 text-primary/60' />
            <span className='text-xs text-primary/60'>追加</span>
          </button>

          {/* アップロード済みファイル */}
          {files.map((file) => (
            <div
              key={file.id}
              className='group relative flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-border/50 bg-white p-2 shadow-sm'
            >
              <FileText className='size-8 text-primary/50' />
              <span className='w-full truncate text-center text-xs'>
                {file.name}
              </span>
              <Button
                variant='destructive'
                size='icon'
                className='absolute -right-2 -top-2 size-6 opacity-0 transition-opacity group-hover:opacity-100'
                onClick={() => onFileRemove(file.id)}
              >
                <X className='size-3' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
