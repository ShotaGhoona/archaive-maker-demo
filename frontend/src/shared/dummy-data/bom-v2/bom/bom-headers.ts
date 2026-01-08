/**
 * BOMHeaderダミーデータ
 *
 * 各親ItemRevに対するBOMの表紙
 * - EBOM（設計BOM）のみ作成
 * - 各親ItemRevにつき1つのBOMHeader
 */

import type { BOMHeader } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 製品（Product）のBOMHeader
// ============================================

export const productBomHeaders: BOMHeader[] = [
  // PRD-ARM-1000 Rev.B のEBOM
  {
    id: 'BOM-PRD-001-B',
    parentItemRevId: 'REV-PRD-001-B',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '産業用ロボットアーム ARM-1000 設計BOM Rev.B',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },
  // PRD-AGV-2000 Rev.A のEBOM
  {
    id: 'BOM-PRD-002-A',
    parentItemRevId: 'REV-PRD-002-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'AGV（自動搬送車）AGV-2000 設計BOM Rev.A',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アセンブリ（Assembly）のBOMHeader
// ============================================

export const assemblyBomHeaders: BOMHeader[] = [
  // ASY-BASE-100 ベースユニット
  {
    id: 'BOM-ASY-001-A',
    parentItemRevId: 'REV-ASY-001-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'ベースユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-DRV-110 駆動システム Rev.B
  {
    id: 'BOM-ASY-002-B',
    parentItemRevId: 'REV-ASY-002-B',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '駆動システム EBOM',
    effectiveDate: '2024-04-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-FRM-120 フレーム構造
  {
    id: 'BOM-ASY-003-A',
    parentItemRevId: 'REV-ASY-003-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'フレーム構造 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-CTL-130 制御ボード Rev.B
  {
    id: 'BOM-ASY-004-B',
    parentItemRevId: 'REV-ASY-004-B',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '制御ボード EBOM',
    effectiveDate: '2024-07-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-ARM-200 アームユニット
  {
    id: 'BOM-ASY-005-A',
    parentItemRevId: 'REV-ASY-005-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'アームユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J1-210 第1関節
  {
    id: 'BOM-ASY-006-A',
    parentItemRevId: 'REV-ASY-006-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '第1関節 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J2-220 第2関節
  {
    id: 'BOM-ASY-007-A',
    parentItemRevId: 'REV-ASY-007-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '第2関節 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J3-230 第3関節
  {
    id: 'BOM-ASY-008-A',
    parentItemRevId: 'REV-ASY-008-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '第3関節 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-LNK-240 リンク機構
  {
    id: 'BOM-ASY-009-A',
    parentItemRevId: 'REV-ASY-009-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'リンク機構 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-END-300 エンドエフェクター
  {
    id: 'BOM-ASY-010-A',
    parentItemRevId: 'REV-ASY-010-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'エンドエフェクター EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-GRP-310 グリッパー機構
  {
    id: 'BOM-ASY-011-A',
    parentItemRevId: 'REV-ASY-011-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'グリッパー機構 EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-SNS-320 センサーユニット
  {
    id: 'BOM-ASY-012-A',
    parentItemRevId: 'REV-ASY-012-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'センサーユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-PWR-400 電源ユニット
  {
    id: 'BOM-ASY-013-A',
    parentItemRevId: 'REV-ASY-013-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '電源ユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用アセンブリ
  // ============================================

  // ASY-CHS-500 シャーシユニット
  {
    id: 'BOM-ASY-014-A',
    parentItemRevId: 'REV-ASY-014-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'シャーシユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-WHM-510 ホイールモジュール
  {
    id: 'BOM-ASY-015-A',
    parentItemRevId: 'REV-ASY-015-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'ホイールモジュール EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-NAV-600 ナビゲーションユニット
  {
    id: 'BOM-ASY-016-A',
    parentItemRevId: 'REV-ASY-016-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'ナビゲーションユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-BAT-700 バッテリーユニット
  {
    id: 'BOM-ASY-017-A',
    parentItemRevId: 'REV-ASY-017-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: 'バッテリーユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-LDU-800 搬送台ユニット
  {
    id: 'BOM-ASY-018-A',
    parentItemRevId: 'REV-ASY-018-A',
    bomType: 'EBOM',
    version: 1,
    status: 'Released',
    description: '搬送台ユニット EBOM',
    effectiveDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全BOMHeader一覧
// ============================================

export const bomHeaders: BOMHeader[] = [
  ...productBomHeaders,
  ...assemblyBomHeaders,
];

/**
 * BOMHeaderをIDで検索
 */
export function getBomHeaderById(id: string): BOMHeader | undefined {
  return bomHeaders.find((bh) => bh.id === id);
}

/**
 * 親ItemRevIdでBOMHeaderを検索
 */
export function getBomHeadersByItemRev(parentItemRevId: string): BOMHeader[] {
  return bomHeaders.filter((bh) => bh.parentItemRevId === parentItemRevId);
}

/**
 * BOMタイプでフィルタリング
 */
export function getBomHeadersByType(bomType: 'EBOM' | 'MBOM'): BOMHeader[] {
  return bomHeaders.filter((bh) => bh.bomType === bomType);
}
