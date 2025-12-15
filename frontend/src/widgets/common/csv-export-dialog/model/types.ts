/**
 * CSV エクスポートダイアログの型定義
 */

/** カラム設定の入力型 */
export interface CsvExportColumnConfig {
  key: string;
  label?: string;
}

/** エンコーディング */
export type CsvEncoding = 'utf-8' | 'shift-jis';

/** エクスポート設定の出力型 */
export interface CsvExportConfig {
  columns: { key: string; label: string }[];
  includeHeader: boolean;
  encoding: CsvEncoding;
}

/** CsvExportDialog のプロパティ */
export interface CsvExportModalWidgetProps<T> {
  columns: CsvExportColumnConfig[];
  data: T[];
  onExport?: (config: CsvExportConfig) => void;
}

/** カラム状態管理の戻り値型 */
export interface CsvExportState {
  columnOrder: string[];
  includedColumns: Set<string>;
  selectedKey: string | null;
  targetColumns: CsvExportColumnConfig[];
  includeHeader: boolean;
  encoding: CsvEncoding;
  getColumn: (key: string) => CsvExportColumnConfig | undefined;
  toggleInclude: (key: string) => void;
  moveUp: (key: string) => void;
  moveDown: (key: string) => void;
  selectKey: (key: string | null) => void;
  setIncludeHeader: (value: boolean) => void;
  setEncoding: (value: CsvEncoding) => void;
  reset: () => void;
  selectAll: () => void;
  deselectAll: () => void;
}
