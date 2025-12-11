'use client';

interface TextCellProps {
  value: string;
}

export function TextCell({ value }: TextCellProps) {
  return <span>{value}</span>;
}
