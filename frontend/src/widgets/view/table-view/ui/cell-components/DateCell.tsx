'use client';

interface DateCellProps {
  value: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function DateCell({ value }: DateCellProps) {
  return value ? <span>{formatDate(value)}</span> : null;
}
