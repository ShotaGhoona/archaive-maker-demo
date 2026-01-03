'use client';

import { useState, ReactNode } from 'react';
import { Plus, Trash2, ClipboardList, Settings, Pencil } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/ui/select';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { cn } from '@/shared/ui/shadcn/lib/utils';

import {
  documentTypes,
  type DocumentType,
  type DocumentCategory,
} from '@/shared/dummy-data/document/documents';

// カテゴリラベル
const categoryLabels: Record<DocumentCategory, string> = {
  product: '製品',
  company: '会社',
};

// カテゴリカラー
const categoryColors: Record<DocumentCategory, string> = {
  product: 'bg-slate-100/50 text-slate-700 border-slate-200/60',
  company: 'bg-slate-100/50 text-slate-700 border-slate-200/60',
};

interface DocumentTypeManageDialogProps {
  trigger?: ReactNode;
}

export function DocumentTypeManageDialog({
  trigger,
}: DocumentTypeManageDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    category: DocumentCategory;
  }>({
    name: '',
    category: 'product',
  });

  const resetForm = () => {
    setFormData({ name: '', category: 'product' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (type: DocumentType) => {
    setFormData({
      name: type.name,
      category: type.category,
    });
    setEditingId(type.id);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    const categoryLabel = categoryLabels[formData.category];

    if (isAdding) {
      // TODO: API呼び出し
      alert(`「${formData.name}」（${categoryLabel}）を追加（未実装）`);
    } else if (editingId) {
      // TODO: API呼び出し
      alert(`「${formData.name}」（${categoryLabel}）に更新（未実装）`);
    }
    resetForm();
  };

  const handleDelete = (type: DocumentType) => {
    if (confirm(`「${type.name}」を削除しますか？`)) {
      // TODO: API呼び出し
      alert(`「${type.name}」を削除（未実装）`);
    }
  };

  const isEditing = isAdding || editingId !== null;

  const defaultTrigger = (
    <button className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300/60 px-3 py-2 text-sm text-slate-500 transition-all duration-200 hover:border-slate-400 hover:bg-white/60 hover:text-slate-600'>
      <Settings className='size-4' />
      帳票種別を管理
    </button>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className='h-[80vh] max-h-[900px] sm:max-w-5xl'>
        <DialogHeader>
          <DialogTitle>帳票種別の管理</DialogTitle>
        </DialogHeader>

        <div className='grid min-h-0 flex-1 grid-cols-5 gap-6'>
          {/* 帳票種別一覧 */}
          <div className='col-span-3 flex min-h-0 flex-col rounded-xl border border-slate-200/60 bg-white/50 py-4'>
            <div className='mb-3 flex shrink-0 items-center justify-between px-4'>
              <h3 className='text-base font-medium text-slate-900'>
                帳票種別一覧（{documentTypes.length}件）
              </h3>
              <Button
                size='sm'
                variant='outline'
                onClick={handleStartAdd}
                disabled={isEditing}
              >
                <Plus className='size-4' />
                新規追加
              </Button>
            </div>
            <div className='flex-1 space-y-2 overflow-y-auto px-4'>
              {documentTypes.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200',
                    editingId === type.id
                      ? 'border-slate-400 bg-white/70 shadow-sm'
                      : 'border-slate-200/60 bg-white/40 hover:bg-white/60',
                  )}
                >
                  <ClipboardList className='size-5 shrink-0 text-slate-500' />
                  <div className='min-w-0 flex-1'>
                    <span className='block truncate text-sm font-medium text-slate-700'>
                      {type.name}
                    </span>
                  </div>
                  <Badge
                    variant='outline'
                    className={cn(
                      'shrink-0 text-xs',
                      categoryColors[type.category],
                    )}
                  >
                    {categoryLabels[type.category]}
                  </Badge>
                  <div className='flex shrink-0 items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='size-8'
                      onClick={() => handleStartEdit(type)}
                      disabled={isEditing && editingId !== type.id}
                    >
                      <Pencil className='size-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='size-8 text-destructive hover:text-destructive'
                      onClick={() => handleDelete(type)}
                      disabled={isEditing}
                    >
                      <Trash2 className='size-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 編集フォーム */}
          <div className='col-span-2 flex flex-col rounded-xl border border-slate-200/60 bg-white/50 p-4'>
            <h3 className='mb-4 shrink-0 text-base font-medium text-slate-900'>
              {isAdding
                ? '帳票種別を追加'
                : editingId
                  ? '帳票種別を編集'
                  : '帳票種別を選択'}
            </h3>

            {isEditing ? (
              <div className='flex min-h-0 flex-1 flex-col'>
                <div className='flex-1 space-y-4 overflow-y-auto'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>帳票種別名 *</Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder='帳票種別名を入力'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>カテゴリ *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: value as DocumentCategory,
                        }))
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='product'>
                          製品に紐づく帳票
                        </SelectItem>
                        <SelectItem value='company'>
                          会社に紐づく帳票
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='flex shrink-0 gap-2 pt-4'>
                  <Button
                    variant='outline'
                    onClick={resetForm}
                    className='flex-1'
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!formData.name.trim()}
                    className='flex-1'
                  >
                    {isAdding ? '追加' : '保存'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='flex flex-1 items-center justify-center text-sm text-slate-500'>
                帳票種別を選択するか、新規追加してください
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
