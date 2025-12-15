/**
 * セルの値をCSV出力用にフォーマットする
 * 流し込むデータによっては不必要なので消してください
 * ダミーデータでは必要なので使ってます
 */
export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (value instanceof Date) return value.toLocaleDateString('ja-JP');
  if (typeof value === 'object') {
    // オブジェクトの場合、label/name/valueプロパティを優先的に使用
    const obj = value as Record<string, unknown>;
    if ('label' in obj) return String(obj.label);
    if ('name' in obj) return String(obj.name);
    if ('value' in obj) return String(obj.value);
    return JSON.stringify(value);
  }
  return String(value);
}
