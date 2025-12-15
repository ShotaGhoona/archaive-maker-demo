'use client';

import type { MultiSelectCellValue } from '../../model/types';

interface MultiSelectCellProps {
  value: MultiSelectCellValue[];
}

export function MultiSelectCell({ value }: MultiSelectCellProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-1'>
      {value.map((item, index) => (
        <span
          key={index}
          className='inline-block rounded-md px-2 py-1 text-sm font-medium'
          style={{
            backgroundColor: `${item.color}10`,
          }}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

// MultiSelectCellValue配列かどうかを判定するタイプガード
export function isMultiSelectCellValue(
  value: unknown,
): value is MultiSelectCellValue[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'label' in item &&
      'color' in item &&
      typeof item.label === 'string' &&
      typeof item.color === 'string',
  );
}
