/**
 * ItemType関連のユーティリティ
 */

import type { ItemType } from '@/shared/dummy-data/bom-v2';

/**
 * ItemTypeのラベルマッピング
 */
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  Product: '製品',
  Assembly: 'Assy',
  Part: '製造部品',
  Purchased: '購入品',
  RawMaterial: '原材料',
};

/**
 * ItemTypeの短縮ラベルマッピング（バッジ用）
 */
export const ITEM_TYPE_SHORT_LABELS: Record<ItemType, string> = {
  Product: 'Product',
  Assembly: 'Assy',
  Part: 'Part',
  Purchased: 'Purchase',
  RawMaterial: 'Material',
};

/**
 * ItemTypeからラベルを取得
 */
export function getItemTypeLabel(itemType: ItemType): string {
  return ITEM_TYPE_LABELS[itemType] ?? itemType;
}

/**
 * ItemTypeから短縮ラベルを取得
 */
export function getItemTypeShortLabel(itemType: ItemType): string {
  return ITEM_TYPE_SHORT_LABELS[itemType] ?? itemType;
}
