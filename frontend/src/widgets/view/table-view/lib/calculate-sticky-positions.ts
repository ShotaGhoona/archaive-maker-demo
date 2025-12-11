import type { ColumnConfig } from '../model/types';
import type { ColumnWidths } from './use-column-resize';

export type StickyPositions = Map<string, number>;

/**
 * sticky列の位置を計算する
 * 左固定列は左端からの累積位置、右固定列は右端からの累積位置を計算
 */
export function calculateStickyPositions<T>(
  columns: ColumnConfig<T>[],
  columnWidths: ColumnWidths,
): StickyPositions {
  const positions = new Map<string, number>();

  // 左固定列の位置を計算
  let leftOffset = 0;
  for (const column of columns) {
    const key = String(column.key);
    if (column.sticky === 'left') {
      positions.set(key, leftOffset);
      leftOffset += columnWidths[key] ?? column.width ?? 0;
    }
  }

  // 右固定列の位置を計算（逆順）
  let rightOffset = 0;
  for (let i = columns.length - 1; i >= 0; i--) {
    const column = columns[i];
    const key = String(column.key);
    if (column.sticky === 'right') {
      positions.set(key, rightOffset);
      rightOffset += columnWidths[key] ?? column.width ?? 0;
    }
  }

  return positions;
}
