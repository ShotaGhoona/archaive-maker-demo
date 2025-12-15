'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/shared/ui/shadcn/ui/sheet';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { EmailField } from '@/shared/ui/form-fields/ui/EmailField';
import { PhoneField } from '@/shared/ui/form-fields/ui/PhoneField';
import { SelectField } from '@/shared/ui/form-fields/ui/SelectField';
import { TextareaField } from '@/shared/ui/form-fields/ui/TextareaField';
import {
  industryOptions,
  statusOptions,
  rankOptions,
  salesRepOptions,
} from '../config/form-options';

interface CustomerFormData {
  customerCode: string;
  companyName: string;
  department: string;
  contactName: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  industry: string;
  status: string;
  rank: string;
  salesRep: string;
  remarks: string;
}

const initialFormData: CustomerFormData = {
  customerCode: '',
  companyName: '',
  department: '',
  contactName: '',
  email: '',
  phone: '',
  postalCode: '',
  address: '',
  industry: '',
  status: '見込み',
  rank: 'C',
  salesRep: '',
  remarks: '',
};

export function CreateCustomerSheet() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);

  const handleChange = (field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert(`顧客を作成（未実装）: ${formData.companyName}`);
    // TODO: API呼び出し
    setFormData(initialFormData);
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} size='xl'>
        <Plus className='size-5' />
        新規作成
      </Button>
      <SheetContent side='right' className='w-[500px] sm:max-w-[500px]'>
        <SheetHeader>
          <SheetTitle>顧客を作成</SheetTitle>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto px-4'>
          <div className='space-y-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='customerCode'
                label='顧客コード'
                value={formData.customerCode}
                onChange={(v) => handleChange('customerCode', v)}
                placeholder='C-001'
              />
              <SelectField
                id='rank'
                label='ランク'
                value={formData.rank}
                onChange={(v) => handleChange('rank', v)}
                options={rankOptions}
              />
            </div>

            <TextField
              id='companyName'
              label='会社名'
              value={formData.companyName}
              onChange={(v) => handleChange('companyName', v)}
              placeholder='株式会社〇〇'
            />

            <div className='grid grid-cols-2 gap-4'>
              <TextField
                id='department'
                label='部署'
                value={formData.department}
                onChange={(v) => handleChange('department', v)}
                placeholder='営業部'
              />
              <TextField
                id='contactName'
                label='担当者名'
                value={formData.contactName}
                onChange={(v) => handleChange('contactName', v)}
                placeholder='山田太郎'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <EmailField
                id='email'
                label='メール'
                value={formData.email}
                onChange={(v) => handleChange('email', v)}
                placeholder='example@example.com'
              />
              <PhoneField
                id='phone'
                label='電話番号'
                value={formData.phone}
                onChange={(v) => handleChange('phone', v)}
                placeholder='03-1234-5678'
              />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <TextField
                id='postalCode'
                label='郵便番号'
                value={formData.postalCode}
                onChange={(v) => handleChange('postalCode', v)}
                placeholder='100-0001'
              />
              <div className='col-span-2'>
                <TextField
                  id='address'
                  label='住所'
                  value={formData.address}
                  onChange={(v) => handleChange('address', v)}
                  placeholder='東京都千代田区...'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <SelectField
                id='industry'
                label='業種'
                value={formData.industry}
                onChange={(v) => handleChange('industry', v)}
                options={industryOptions}
                placeholder='選択してください'
              />
              <SelectField
                id='status'
                label='ステータス'
                value={formData.status}
                onChange={(v) => handleChange('status', v)}
                options={statusOptions}
              />
            </div>

            <SelectField
              id='salesRep'
              label='営業担当'
              value={formData.salesRep}
              onChange={(v) => handleChange('salesRep', v)}
              options={salesRepOptions}
              placeholder='選択してください'
            />

            <TextareaField
              id='remarks'
              label='備考'
              value={formData.remarks}
              onChange={(v) => handleChange('remarks', v)}
              placeholder='備考を入力...'
            />
          </div>
        </div>

        <SheetFooter className='flex-row'>
          <Button variant='outline' onClick={handleCancel} className='w-1/2'>
            <X className='size-4' />
            キャンセル
          </Button>
          <Button onClick={handleSubmit} className='w-1/2'>
            <Plus className='size-4' />
            作成
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
