'use client';

interface EmailCellProps {
  value: string;
}

export function EmailCell({ value }: EmailCellProps) {
  return <span>{value}</span>;
}
