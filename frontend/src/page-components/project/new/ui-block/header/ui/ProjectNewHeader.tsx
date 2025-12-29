'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/shadcn/ui/button';

interface ProjectNewHeaderProps {
  onSave: () => void;
  isSaving?: boolean;
}

export function ProjectNewHeader({ onSave, isSaving }: ProjectNewHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/project');
  };

  return (
    <header className='flex h-14 shrink-0 items-center justify-between border-b bg-card px-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='sm' onClick={handleBack}>
          <ArrowLeft className='size-4' />
          戻る
        </Button>
        <h1 className='text-lg font-semibold'>案件を新規作成</h1>
      </div>
      <Button onClick={onSave} disabled={isSaving}>
        <Save className='size-4' />
        {isSaving ? '保存中...' : '保存'}
      </Button>
    </header>
  );
}
