'use client';

import { Card, CardContent } from '@/shared/ui/shadcn/ui/card';
import { TextField } from '@/shared/ui/form-fields/ui/TextField';
import { SelectField } from '@/shared/ui/form-fields/ui/SelectField';
import { DateField } from '@/shared/ui/form-fields/ui/DateField';
import { NumberField } from '@/shared/ui/form-fields/ui/NumberField';
import { TextareaField } from '@/shared/ui/form-fields/ui/TextareaField';

export interface ProjectInfo {
  projectCode: string;
  projectName: string;
  customerName: string;
  startDate: string;
  endDate: string;
  budget: number | '';
  salesRep: string;
  projectManager: string;
  remarks: string;
}

interface InfoCardProps {
  value: ProjectInfo;
  onChange: (value: ProjectInfo) => void;
}

const customerOptions = [
  { value: '株式会社山田製作所', label: '株式会社山田製作所' },
  { value: '田中工業株式会社', label: '田中工業株式会社' },
  { value: '佐藤商事株式会社', label: '佐藤商事株式会社' },
  { value: '鈴木電機株式会社', label: '鈴木電機株式会社' },
  { value: '高橋建設株式会社', label: '高橋建設株式会社' },
];

const salesRepOptions = [
  { value: '佐藤花子', label: '佐藤花子' },
  { value: '鈴木次郎', label: '鈴木次郎' },
  { value: '高橋美咲', label: '高橋美咲' },
  { value: '伊藤健太', label: '伊藤健太' },
  { value: '渡辺真理', label: '渡辺真理' },
];

const projectManagerOptions = [
  { value: '田中一郎', label: '田中一郎' },
  { value: '高橋誠', label: '高橋誠' },
  { value: '渡辺洋子', label: '渡辺洋子' },
  { value: '小林浩二', label: '小林浩二' },
  { value: '加藤隆', label: '加藤隆' },
];

export function InfoCard({ value, onChange }: InfoCardProps) {
  const handleChange = <K extends keyof ProjectInfo>(
    field: K,
    fieldValue: ProjectInfo[K],
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Card>
      <CardContent className='space-y-4 pt-6'>
        <div className='grid grid-cols-2 gap-4'>
          <TextField
            id='projectCode'
            label='案件コード'
            value={value.projectCode}
            onChange={(v) => handleChange('projectCode', v)}
            placeholder='P-001'
          />
          <TextField
            id='projectName'
            label='案件名'
            value={value.projectName}
            onChange={(v) => handleChange('projectName', v)}
            placeholder='〇〇システム開発'
          />
        </div>

        <SelectField
          id='customerName'
          label='顧客名'
          value={value.customerName}
          onChange={(v) => handleChange('customerName', v)}
          options={customerOptions}
          placeholder='顧客を選択'
        />

        <div className='grid grid-cols-2 gap-4'>
          <DateField
            id='startDate'
            label='開始日'
            value={value.startDate}
            onChange={(v) => handleChange('startDate', v)}
          />
          <DateField
            id='endDate'
            label='終了日'
            value={value.endDate}
            onChange={(v) => handleChange('endDate', v)}
          />
        </div>

        <NumberField
          id='budget'
          label='予算（円）'
          value={value.budget}
          onChange={(v) => handleChange('budget', v)}
          placeholder='0'
        />

        <div className='grid grid-cols-2 gap-4'>
          <SelectField
            id='salesRep'
            label='営業担当'
            value={value.salesRep}
            onChange={(v) => handleChange('salesRep', v)}
            options={salesRepOptions}
            placeholder='選択してください'
          />
          <SelectField
            id='projectManager'
            label='PM'
            value={value.projectManager}
            onChange={(v) => handleChange('projectManager', v)}
            options={projectManagerOptions}
            placeholder='選択してください'
          />
        </div>

        <TextareaField
          id='remarks'
          label='備考'
          value={value.remarks}
          onChange={(v) => handleChange('remarks', v)}
          placeholder='備考を入力...'
        />
      </CardContent>
    </Card>
  );
}
