'use client';

import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';

const HELP_CONTENT = [
  { action: 'ズーム', mouse: 'ホイールスクロール', trackpad: 'ピンチ' },
  {
    action: '移動',
    mouse: '中クリック + ドラッグ',
    trackpad: '2本指スクロール',
  },
  { action: '移動', mouse: '右クリック + ドラッグ', trackpad: '-' },
  { action: '移動', mouse: 'Space + ドラッグ', trackpad: 'Space + ドラッグ' },
  { action: 'リセット', mouse: 'ダブルクリック', trackpad: 'ダブルクリック' },
];

interface CanvasControlsProps {
  className?: string;
}

export function CanvasControls({ className }: CanvasControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('absolute', className)}>
      {isOpen ? (
        <div className='rounded-xl border border-white/60 bg-white/80 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-xs font-medium text-gray-700'>
              操作ガイド
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className='rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          </div>
          <table className='text-xs'>
            <tbody>
              {HELP_CONTENT.map((row, index) => (
                <tr key={index}>
                  <td className='py-0.5 pr-3 font-medium text-gray-600'>
                    {row.action}
                  </td>
                  <td className='py-0.5 pr-3 text-gray-500'>{row.mouse}</td>
                  <td className='py-0.5 text-gray-400'>{row.trackpad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className='mt-2 text-[10px] text-gray-400'>
            ※ 中クリック = ホイールを押し込む
          </p>
        </div>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 rounded-xl border-white/60 bg-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl hover:bg-white/60'
          onClick={() => setIsOpen(true)}
          title='操作ヘルプ'
        >
          <HelpCircle className='h-4 w-4 text-slate-600' />
        </Button>
      )}
    </div>
  );
}
