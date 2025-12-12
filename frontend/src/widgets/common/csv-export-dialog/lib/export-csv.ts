import * as Encoding from 'encoding-japanese';
import { formatCellValue } from './format-cell-value';
import type { CsvExportColumnConfig, CsvEncoding } from '../model/types';

/**
 * CSVのセル値をエスケープする
 */
function escapeCsvCell(value: string): string {
  if (
    value.includes('"') ||
    value.includes(',') ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * データからCSV文字列を生成する
 */
function generateCsvString<T extends object>(
  data: T[],
  columns: CsvExportColumnConfig[],
  includeHeader: boolean,
): string {
  const lines: string[] = [];

  // ヘッダー行
  if (includeHeader) {
    const headerRow = columns.map((col) => escapeCsvCell(col.label ?? col.key)).join(',');
    lines.push(headerRow);
  }

  // データ行
  for (const row of data) {
    const dataRow = columns
      .map((col) => {
        const value = (row as Record<string, unknown>)[col.key];
        const formatted = formatCellValue(value);
        return escapeCsvCell(formatted);
      })
      .join(',');
    lines.push(dataRow);
  }

  return lines.join('\r\n');
}

/**
 * CSV文字列をBlobに変換する
 */
function createCsvBlob(csvString: string, encoding: CsvEncoding): Blob {
  if (encoding === 'shift-jis') {
    const unicodeArray = Encoding.stringToCode(csvString);
    const sjisArray = Encoding.convert(unicodeArray, {
      to: 'SJIS',
      from: 'UNICODE',
    });
    return new Blob([new Uint8Array(sjisArray)], { type: 'text/csv' });
  }

  // UTF-8（BOM付き）
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  return new Blob([bom, csvString], { type: 'text/csv;charset=utf-8' });
}

/**
 * Blobをファイルとしてダウンロードする
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ExportCsvOptions<T extends object> {
  data: T[];
  columns: CsvExportColumnConfig[];
  includeHeader: boolean;
  encoding: CsvEncoding;
  filename?: string;
}

/**
 * CSVエクスポートを実行する
 */
export function exportCsv<T extends object>({
  data,
  columns,
  includeHeader,
  encoding,
  filename,
}: ExportCsvOptions<T>): void {
  const csvString = generateCsvString(data, columns, includeHeader);
  const blob = createCsvBlob(csvString, encoding);

  const defaultFilename = `export_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.csv`;
  downloadBlob(blob, filename ?? defaultFilename);
}
