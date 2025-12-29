'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/ui/shadcn/ui/dialog';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (productName: string) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
  onAdd,
}: AddProductDialogProps) {
  const [productName, setProductName] = useState('');

  const handleAdd = () => {
    if (productName.trim()) {
      onAdd(productName.trim());
      setProductName('');
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setProductName('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>製品を追加</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <TextField
            id='productName'
            label='製品名'
            value={productName}
            onChange={setProductName}
            placeholder='製品名を入力'
          />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            キャンセル
          </Button>
          <Button onClick={handleAdd} disabled={!productName.trim()}>
            <Plus className='size-4' />
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
