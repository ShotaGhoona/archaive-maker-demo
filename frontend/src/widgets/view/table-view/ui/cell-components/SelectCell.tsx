'use client';

import type { SelectCellValue } from '../../model/types';

interface SelectCellProps {
  value: SelectCellValue;
}

export function SelectCell({ value }: SelectCellProps) {
  return (
    <span
      className='inline-block rounded-md px-2.5 py-1.5 text-sm font-medium'
      style={{
        backgroundColor: `${value.color}10`,
      }}
    >
      {value.label}
    </span>
  );
}

// SelectCellValue型かどうかを判定するタイプガード
export function isSelectCellValue(value: unknown): value is SelectCellValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'label' in value &&
    'color' in value &&
    typeof (value as SelectCellValue).label === 'string' &&
    typeof (value as SelectCellValue).color === 'string'
  );
}
