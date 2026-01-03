import type { DrawingItem } from '@/shared/dummy-data/drawing/types';
import {
  CARD_HEIGHT,
  CARD_SPACING,
  CARD_WIDTH,
  EXPANDED_GAP,
  MAX_VISIBLE_STACK,
  SIDEBAR_PADDING,
  STACK_OFFSET,
} from './constants';

/** スタック時の高さを計算 */
export function getStackHeight(thumbnailCount: number): number {
  if (thumbnailCount <= 1) return 0;
  return (Math.min(thumbnailCount, MAX_VISIBLE_STACK) - 1) * 2;
}

/** 各図面グループの開始Y位置を計算 */
export function getDrawingTop(drawings: DrawingItem[], index: number): number {
  let top = SIDEBAR_PADDING;
  for (let i = 0; i < index; i++) {
    const d = drawings[i];
    const stackHeight = getStackHeight(d.thumbnails.length);
    top += CARD_HEIGHT + stackHeight + CARD_SPACING;
  }
  return top;
}

/** カードの左位置を計算（展開/折りたたみ） */
export function getCardLeft(index: number, isExpanded: boolean): number {
  if (isExpanded) {
    return index * (CARD_WIDTH + EXPANDED_GAP);
  }
  return Math.min(index, MAX_VISIBLE_STACK - 1) * STACK_OFFSET;
}

/** カードの上位置を計算（展開/折りたたみ） */
export function getCardTop(index: number, isExpanded: boolean): number {
  if (isExpanded) return 0;
  return Math.min(index, MAX_VISIBLE_STACK - 1) * 2;
}

/** カードが表示されるかどうか */
export function isCardVisible(index: number, isExpanded: boolean): boolean {
  return isExpanded || index < MAX_VISIBLE_STACK;
}

/** 閉じるボタンの左位置を計算 */
export function getCloseButtonLeft(thumbnailCount: number): number {
  return thumbnailCount * (CARD_WIDTH + EXPANDED_GAP);
}
