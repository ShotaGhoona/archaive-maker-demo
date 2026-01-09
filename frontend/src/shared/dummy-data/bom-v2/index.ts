/**
 * BOM v2 ダミーデータ
 *
 * BizPM設計に基づく新しいデータ構造のエントリーポイント
 *
 * Core:
 * - Item: 品番の器（P/Nの不変ID）
 * - ItemRev: 品番の版（BOMが参照する最小単位）
 *
 * BOM Structure:
 * - BOMHeader: 構成表の表紙（EBOM/MBOM区別）
 * - BOMLine: 構成明細（親子関係と数量）
 *
 * Facet:
 * - FacetType: 属性スキーマ（JSONスキーマ）
 * - FacetInstance: 属性値（実際のデータ）
 *
 * Drawing & Document:
 * - DocumentType: 帳票種類（ユーザー定義可能）
 * - Drawing: 図面（ItemRevに紐づく）
 * - Document: 帳票（ItemRevに紐づく）
 *
 * Task:
 * - Task: タスク（ItemRevに紐づく）
 */

// ============================================
// 型定義のエクスポート
// ============================================

export * from './types';

// ============================================
// Core: Item
// ============================================

export {
  items,
  getItemById,
  getItemByPartNumber,
  getItemsByType,
  getItemsByLifecycle,
} from './item/items';

// ============================================
// Core: ItemRev
// ============================================

export {
  itemRevs,
  getItemRevById,
  getItemRevsByItemId,
  getLatestReleasedRev,
  getItemRevsByStatus,
} from './item-rev/item-revs';

// ============================================
// BOM: BOMHeader
// ============================================

export {
  bomHeaders,
  getBomHeaderById,
  getBomHeadersByItemRev,
  getBomHeadersByType,
} from './bom/bom-headers';

// ============================================
// BOM: BOMLine
// ============================================

export {
  bomLines,
  getBomLineById,
  getBomLinesByHeader,
  getBomLinesByChildRev,
} from './bom/bom-lines';

// ============================================
// Facet: FacetType
// ============================================

export {
  facetTypes,
  getFacetTypeById,
  getFacetTypeByCode,
  getFacetTypesByCategory,
} from './facet/facet-types';

// ============================================
// Facet: FacetInstance
// ============================================

export {
  facetInstances,
  getFacetInstanceById,
  getFacetInstancesByType,
} from './facet/facet-instances';

// ============================================
// DocumentType: 帳票種類
// ============================================

export {
  documentTypes,
  getDocumentTypeById,
  getDocumentTypeByCode,
} from './document/document-types';

// ============================================
// Drawing: 図面
// ============================================

export {
  drawings,
  getDrawingById,
  getDrawingsByItemRev,
  getDrawingsByType,
} from './drawing/drawings';

// ============================================
// Document: 帳票
// ============================================

export {
  documents,
  getDocumentById,
  getDocumentsByItemRev,
  getDocumentsByType,
} from './document/documents';

// ============================================
// Task: タスク
// ============================================

export * from './task/types';

export {
  dummyUsers,
  dummyDepartments,
  dummyTasks,
  getTasksByItemRevId,
  getIncompleteTaskCountByItemRevId,
  getAllTasks,
} from './task/tasks';

// ============================================
// Comment: コメント
// ============================================

export * from './comment/types';

export {
  commentThreads,
  getCommentThreadById,
  enrichThreadWithAuthors,
  getCommentThreadsWithAuthors,
} from './comment/comments';

// ============================================
// 追加クエリ関数
// ============================================

import { getItemRevById } from './item-rev/item-revs';
import { getBomHeaderById, getBomHeadersByItemRev } from './bom/bom-headers';
import { getBomLinesByChildRev } from './bom/bom-lines';
import { getFacetInstanceById } from './facet/facet-instances';
import { getItemById } from './item/items';
import { getDrawingById } from './drawing/drawings';
import type { Item, ItemRev, BOMLine, FacetInstance, Drawing } from './types';

/**
 * ItemRevに紐付くFacetInstanceを取得
 */
export function getFacetInstancesByItemRev(itemRevId: string): FacetInstance[] {
  const itemRev = getItemRevById(itemRevId);
  if (!itemRev) return [];

  return itemRev.facetInstanceIds
    .map((id) => getFacetInstanceById(id))
    .filter((fi): fi is FacetInstance => fi !== undefined);
}

/**
 * Drawingに紐付くFacetInstanceを取得
 */
export function getFacetInstancesByDrawing(drawingId: string): FacetInstance[] {
  const drawing = getDrawingById(drawingId);
  if (!drawing) return [];

  return drawing.facetInstanceIds
    .map((id) => getFacetInstanceById(id))
    .filter((fi): fi is FacetInstance => fi !== undefined);
}

/**
 * Where-Used: 指定したItemRevがどこで使われているかを検索
 *
 * @param itemRevId 検索対象のItemRevID
 * @returns 使用先の親情報配列
 */
export function findWhereUsed(
  itemRevId: string
): Array<{
  parentItemRev: ItemRev;
  parentItem: Item;
  bomLine: BOMLine;
  quantity: number;
}> {
  const results: Array<{
    parentItemRev: ItemRev;
    parentItem: Item;
    bomLine: BOMLine;
    quantity: number;
  }> = [];

  // BOMLineで検索
  for (const line of getBomLinesByChildRev(itemRevId)) {
    // BOMHeaderから親ItemRevを取得
    const header = getBomHeaderById(line.bomHeaderId);
    if (!header) continue;

    const parentRev = getItemRevById(header.parentItemRevId);
    if (!parentRev) continue;

    const parentItem = getItemById(parentRev.itemId);
    if (!parentItem) continue;

    results.push({
      parentItemRev: parentRev,
      parentItem,
      bomLine: line,
      quantity: line.quantity,
    });
  }

  return results;
}

/**
 * 統計情報を取得
 */
export function getStatistics(): {
  itemCount: number;
  itemRevCount: number;
  bomHeaderCount: number;
  bomLineCount: number;
  facetTypeCount: number;
  facetInstanceCount: number;
  documentTypeCount: number;
  drawingCount: number;
  documentCount: number;
} {
  const { items } = require('./item/items');
  const { itemRevs } = require('./item-rev/item-revs');
  const { bomHeaders } = require('./bom/bom-headers');
  const { bomLines } = require('./bom/bom-lines');
  const { facetTypes } = require('./facet/facet-types');
  const { facetInstances } = require('./facet/facet-instances');
  const { documentTypes } = require('./document/document-types');
  const { drawings } = require('./drawing/drawings');
  const { documents } = require('./document/documents');

  return {
    itemCount: items.length,
    itemRevCount: itemRevs.length,
    bomHeaderCount: bomHeaders.length,
    bomLineCount: bomLines.length,
    facetTypeCount: facetTypes.length,
    facetInstanceCount: facetInstances.length,
    documentTypeCount: documentTypes.length,
    drawingCount: drawings.length,
    documentCount: documents.length,
  };
}

/**
 * BOM展開（Explosion）: 親ItemRevから全子孫を再帰的に取得
 *
 * @param parentItemRevId 親ItemRevのID
 * @param depth 展開する深さ（undefinedで無制限）
 * @returns フラットな展開結果
 */
export function explodeBom(
  parentItemRevId: string,
  depth?: number
): Array<{
  level: number;
  parentItemRevId: string;
  childItemRevId: string;
  childItem: Item;
  childItemRev: ItemRev;
  quantity: number;
  bomLine: BOMLine;
}> {
  const results: Array<{
    level: number;
    parentItemRevId: string;
    childItemRevId: string;
    childItem: Item;
    childItemRev: ItemRev;
    quantity: number;
    bomLine: BOMLine;
  }> = [];

  function explodeRecursive(itemRevId: string, currentLevel: number) {
    if (depth !== undefined && currentLevel > depth) return;

    const headers = getBomHeadersByItemRev(itemRevId);
    if (headers.length === 0) return;

    // 最初のBOMHeader（通常はEBOM）を使用
    const { getBomLinesByHeader } = require('./bom/bom-lines');
    const lines = getBomLinesByHeader(headers[0].id) as BOMLine[];

    for (const line of lines) {
      const childRev = getItemRevById(line.childItemRevId);
      if (!childRev) continue;

      const childItem = getItemById(childRev.itemId);
      if (!childItem) continue;

      results.push({
        level: currentLevel,
        parentItemRevId: itemRevId,
        childItemRevId: line.childItemRevId,
        childItem,
        childItemRev: childRev,
        quantity: line.quantity,
        bomLine: line,
      });

      // 再帰的に子を展開
      explodeRecursive(line.childItemRevId, currentLevel + 1);
    }
  }

  explodeRecursive(parentItemRevId, 1);
  return results;
}
