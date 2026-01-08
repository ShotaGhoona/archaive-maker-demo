/**
 * ItemRevダミーデータ
 *
 * リビジョン管理ルール:
 * - 各Itemに1〜3リビジョン
 * - 最新Released版が1つ（BOMで参照される）
 * - 一部にDraft/InReview版を含む
 */

import type { ItemRev } from '../types';

// ============================================
// 製品（Product）のリビジョン
// ============================================

export const productRevs: ItemRev[] = [
  // PRD-ARM-1000 産業用ロボットアーム
  {
    id: 'REV-PRD-001-A',
    itemId: 'ITEM-PRD-001',
    revision: 'A',
    status: 'Obsolete',
    effectiveDate: '2023-01-01',
    expirationDate: '2023-12-31',
    changeNote: '初版リリース',
    facetInstanceIds: ['FI-PRD-001-A-DESIGN', 'FI-PRD-001-A-MFG'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-12-31T00:00:00Z',
  },
  {
    id: 'REV-PRD-001-B',
    itemId: 'ITEM-PRD-001',
    revision: 'B',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '安全機能強化、可搬重量向上',
    facetInstanceIds: ['FI-PRD-001-B-DESIGN', 'FI-PRD-001-B-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRD-AGV-2000 AGV（自動搬送車）
  {
    id: 'REV-PRD-002-A',
    itemId: 'ITEM-PRD-002',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版リリース',
    facetInstanceIds: ['FI-PRD-002-A-DESIGN', 'FI-PRD-002-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// アセンブリ（Assembly）のリビジョン
// ============================================

export const assemblyRevs: ItemRev[] = [
  // ASY-BASE-100 ベースユニット
  {
    id: 'REV-ASY-001-A',
    itemId: 'ITEM-ASY-001',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版リリース',
    facetInstanceIds: ['FI-ASY-001-A-DESIGN', 'FI-ASY-001-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-DRV-110 駆動システム
  {
    id: 'REV-ASY-002-A',
    itemId: 'ITEM-ASY-002',
    revision: 'A',
    status: 'Obsolete',
    effectiveDate: '2023-06-01',
    expirationDate: '2024-03-31',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-002-A-DESIGN'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-03-31T00:00:00Z',
  },
  {
    id: 'REV-ASY-002-B',
    itemId: 'ITEM-ASY-002',
    revision: 'B',
    status: 'Released',
    effectiveDate: '2024-04-01',
    changeNote: '高トルクモーター対応',
    facetInstanceIds: ['FI-ASY-002-B-DESIGN', 'FI-ASY-002-B-MFG'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  },

  // ASY-FRM-120 フレーム構造
  {
    id: 'REV-ASY-003-A',
    itemId: 'ITEM-ASY-003',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-003-A-DESIGN', 'FI-ASY-003-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-CTL-130 制御ボード
  {
    id: 'REV-ASY-004-A',
    itemId: 'ITEM-ASY-004',
    revision: 'A',
    status: 'Obsolete',
    effectiveDate: '2023-06-01',
    expirationDate: '2024-06-30',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-004-A-DESIGN'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-06-30T00:00:00Z',
  },
  {
    id: 'REV-ASY-004-B',
    itemId: 'ITEM-ASY-004',
    revision: 'B',
    status: 'Released',
    effectiveDate: '2024-07-01',
    changeNote: 'CPU高速化、ノイズ対策強化',
    facetInstanceIds: ['FI-ASY-004-B-DESIGN', 'FI-ASY-004-B-MFG'],
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
  },
  {
    id: 'REV-ASY-004-C',
    itemId: 'ITEM-ASY-004',
    revision: 'C',
    status: 'InReview',
    changeNote: '省電力設計',
    facetInstanceIds: ['FI-ASY-004-C-DESIGN'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // ASY-ARM-200 アームユニット
  {
    id: 'REV-ASY-005-A',
    itemId: 'ITEM-ASY-005',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-005-A-DESIGN', 'FI-ASY-005-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-J1-210 第1関節
  {
    id: 'REV-ASY-006-A',
    itemId: 'ITEM-ASY-006',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-006-A-DESIGN', 'FI-ASY-006-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-J2-220 第2関節
  {
    id: 'REV-ASY-007-A',
    itemId: 'ITEM-ASY-007',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-007-A-DESIGN', 'FI-ASY-007-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-J3-230 第3関節
  {
    id: 'REV-ASY-008-A',
    itemId: 'ITEM-ASY-008',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-008-A-DESIGN', 'FI-ASY-008-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-LNK-240 リンク機構
  {
    id: 'REV-ASY-009-A',
    itemId: 'ITEM-ASY-009',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-009-A-DESIGN', 'FI-ASY-009-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-END-300 エンドエフェクター
  {
    id: 'REV-ASY-010-A',
    itemId: 'ITEM-ASY-010',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-010-A-DESIGN', 'FI-ASY-010-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-GRP-310 グリッパー機構
  {
    id: 'REV-ASY-011-A',
    itemId: 'ITEM-ASY-011',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-011-A-DESIGN', 'FI-ASY-011-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-SNS-320 センサーユニット
  {
    id: 'REV-ASY-012-A',
    itemId: 'ITEM-ASY-012',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-012-A-DESIGN', 'FI-ASY-012-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-PWR-400 電源ユニット
  {
    id: 'REV-ASY-013-A',
    itemId: 'ITEM-ASY-013',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-013-A-DESIGN', 'FI-ASY-013-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ============================================
  // AGV用アセンブリ
  // ============================================

  // ASY-CHS-500 シャーシユニット
  {
    id: 'REV-ASY-014-A',
    itemId: 'ITEM-ASY-014',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-014-A-DESIGN', 'FI-ASY-014-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-WHM-510 ホイールモジュール
  {
    id: 'REV-ASY-015-A',
    itemId: 'ITEM-ASY-015',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-015-A-DESIGN', 'FI-ASY-015-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-NAV-600 ナビゲーションユニット
  {
    id: 'REV-ASY-016-A',
    itemId: 'ITEM-ASY-016',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-016-A-DESIGN', 'FI-ASY-016-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-BAT-700 バッテリーユニット
  {
    id: 'REV-ASY-017-A',
    itemId: 'ITEM-ASY-017',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-017-A-DESIGN', 'FI-ASY-017-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ASY-LDU-800 搬送台ユニット
  {
    id: 'REV-ASY-018-A',
    itemId: 'ITEM-ASY-018',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-ASY-018-A-DESIGN', 'FI-ASY-018-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// 製造部品（Part）のリビジョン
// ============================================

export const partRevs: ItemRev[] = [
  // PRT-GER-001 減速ギア
  {
    id: 'REV-PRT-001-A',
    itemId: 'ITEM-PRT-001',
    revision: 'A',
    status: 'Obsolete',
    effectiveDate: '2023-01-01',
    expirationDate: '2024-06-30',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-001-A-DESIGN', 'FI-PRT-001-A-PROC', 'FI-PRT-001-A-MFG'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-06-30T00:00:00Z',
  },
  {
    id: 'REV-PRT-001-B',
    itemId: 'ITEM-PRT-001',
    revision: 'B',
    status: 'Released',
    effectiveDate: '2024-07-01',
    changeNote: '歯形精度向上',
    facetInstanceIds: ['FI-PRT-001-B-DESIGN', 'FI-PRT-001-B-PROC', 'FI-PRT-001-B-MFG'],
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: '2024-07-01T00:00:00Z',
  },
  {
    id: 'REV-PRT-001-C',
    itemId: 'ITEM-PRT-001',
    revision: 'C',
    status: 'Draft',
    changeNote: '軽量化設計',
    facetInstanceIds: ['FI-PRT-001-C-DESIGN'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // PRT-PLT-001 ベースプレート
  {
    id: 'REV-PRT-002-A',
    itemId: 'ITEM-PRT-002',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-002-A-DESIGN', 'FI-PRT-002-A-PROC', 'FI-PRT-002-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-COL-001 支柱
  {
    id: 'REV-PRT-003-A',
    itemId: 'ITEM-PRT-003',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-003-A-DESIGN', 'FI-PRT-003-A-PROC', 'FI-PRT-003-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-SFT-001 シャフト
  {
    id: 'REV-PRT-004-A',
    itemId: 'ITEM-PRT-004',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-004-A-DESIGN', 'FI-PRT-004-A-PROC', 'FI-PRT-004-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-ARM-001 アーム部材
  {
    id: 'REV-PRT-005-A',
    itemId: 'ITEM-PRT-005',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-005-A-DESIGN', 'FI-PRT-005-A-PROC', 'FI-PRT-005-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-JNT-001 ジョイント
  {
    id: 'REV-PRT-006-A',
    itemId: 'ITEM-PRT-006',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-006-A-DESIGN', 'FI-PRT-006-A-PROC', 'FI-PRT-006-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-FNG-001 フィンガー部品
  {
    id: 'REV-PRT-007-A',
    itemId: 'ITEM-PRT-007',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-007-A-DESIGN', 'FI-PRT-007-A-PROC', 'FI-PRT-007-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-HSG-001 ハウジング
  {
    id: 'REV-PRT-008-A',
    itemId: 'ITEM-PRT-008',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-008-A-DESIGN', 'FI-PRT-008-A-PROC', 'FI-PRT-008-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-CVR-001 カバー
  {
    id: 'REV-PRT-009-A',
    itemId: 'ITEM-PRT-009',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-009-A-DESIGN', 'FI-PRT-009-A-PROC', 'FI-PRT-009-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-PCB-001 制御基板
  {
    id: 'REV-PRT-010-A',
    itemId: 'ITEM-PRT-010',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-010-A-DESIGN', 'FI-PRT-010-A-PROC', 'FI-PRT-010-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ============================================
  // AGV用製造部品
  // ============================================

  // PRT-WHL-001 駆動ホイール
  {
    id: 'REV-PRT-011-A',
    itemId: 'ITEM-PRT-011',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-011-A-DESIGN', 'FI-PRT-011-A-PROC', 'FI-PRT-011-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-MTB-001 モーターブラケット
  {
    id: 'REV-PRT-012-A',
    itemId: 'ITEM-PRT-012',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-012-A-DESIGN', 'FI-PRT-012-A-PROC', 'FI-PRT-012-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-FRM-002 シャーシフレーム
  {
    id: 'REV-PRT-013-A',
    itemId: 'ITEM-PRT-013',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-013-A-DESIGN', 'FI-PRT-013-A-PROC', 'FI-PRT-013-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PRT-PLF-001 プラットフォーム
  {
    id: 'REV-PRT-014-A',
    itemId: 'ITEM-PRT-014',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PRT-014-A-DESIGN', 'FI-PRT-014-A-PROC', 'FI-PRT-014-A-MFG'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// 購入品（Purchased）のリビジョン
// ============================================

export const purchasedRevs: ItemRev[] = [
  // PUR-MTR-001 ACサーボモーター 200W
  {
    id: 'REV-PUR-001-A',
    itemId: 'ITEM-PUR-001',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-001-A-DESIGN', 'FI-PUR-001-A-ELEC', 'FI-PUR-001-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-MTR-002 ACサーボモーター 400W
  {
    id: 'REV-PUR-002-A',
    itemId: 'ITEM-PUR-002',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-002-A-DESIGN', 'FI-PUR-002-A-ELEC', 'FI-PUR-002-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-MTR-003 ACサーボモーター 100W
  {
    id: 'REV-PUR-003-A',
    itemId: 'ITEM-PUR-003',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-003-A-DESIGN', 'FI-PUR-003-A-ELEC', 'FI-PUR-003-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-ENC-001 アブソリュートエンコーダ
  {
    id: 'REV-PUR-004-A',
    itemId: 'ITEM-PUR-004',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-004-A-DESIGN', 'FI-PUR-004-A-ELEC', 'FI-PUR-004-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-FSR-001 力覚センサー
  {
    id: 'REV-PUR-005-A',
    itemId: 'ITEM-PUR-005',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-005-A-DESIGN', 'FI-PUR-005-A-ELEC', 'FI-PUR-005-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-PXS-001 近接センサー
  {
    id: 'REV-PUR-006-A',
    itemId: 'ITEM-PUR-006',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-006-A-DESIGN', 'FI-PUR-006-A-ELEC', 'FI-PUR-006-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-BRG-001 ベアリング
  {
    id: 'REV-PUR-007-A',
    itemId: 'ITEM-PUR-007',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-007-A-DESIGN', 'FI-PUR-007-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-BLT-001 ボルトM8x25
  {
    id: 'REV-PUR-008-A',
    itemId: 'ITEM-PUR-008',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-008-A-DESIGN', 'FI-PUR-008-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-BLT-002 ボルトM6x20
  {
    id: 'REV-PUR-009-A',
    itemId: 'ITEM-PUR-009',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-009-A-DESIGN', 'FI-PUR-009-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-NUT-001 ナットM8
  {
    id: 'REV-PUR-010-A',
    itemId: 'ITEM-PUR-010',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-010-A-DESIGN', 'FI-PUR-010-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-CPU-001 マイコン
  {
    id: 'REV-PUR-011-A',
    itemId: 'ITEM-PUR-011',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-011-A-DESIGN', 'FI-PUR-011-A-ELEC', 'FI-PUR-011-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-CAP-001 コンデンサ
  {
    id: 'REV-PUR-012-A',
    itemId: 'ITEM-PUR-012',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-012-A-DESIGN', 'FI-PUR-012-A-ELEC', 'FI-PUR-012-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-RES-001 抵抗
  {
    id: 'REV-PUR-013-A',
    itemId: 'ITEM-PUR-013',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-013-A-DESIGN', 'FI-PUR-013-A-ELEC', 'FI-PUR-013-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-DRV-001 モータードライバIC
  {
    id: 'REV-PUR-014-A',
    itemId: 'ITEM-PUR-014',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-014-A-DESIGN', 'FI-PUR-014-A-ELEC', 'FI-PUR-014-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-ACT-001 電動アクチュエータ
  {
    id: 'REV-PUR-015-A',
    itemId: 'ITEM-PUR-015',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-015-A-DESIGN', 'FI-PUR-015-A-ELEC', 'FI-PUR-015-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-CBL-001 ケーブルハーネス
  {
    id: 'REV-PUR-016-A',
    itemId: 'ITEM-PUR-016',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-016-A-DESIGN', 'FI-PUR-016-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-CON-001 コネクタ
  {
    id: 'REV-PUR-017-A',
    itemId: 'ITEM-PUR-017',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-017-A-DESIGN', 'FI-PUR-017-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-PSU-001 スイッチング電源
  {
    id: 'REV-PUR-018-A',
    itemId: 'ITEM-PUR-018',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-018-A-DESIGN', 'FI-PUR-018-A-ELEC', 'FI-PUR-018-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // ============================================
  // AGV用購入品
  // ============================================

  // PUR-LDR-001 LiDARセンサー
  {
    id: 'REV-PUR-019-A',
    itemId: 'ITEM-PUR-019',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-019-A-DESIGN', 'FI-PUR-019-A-ELEC', 'FI-PUR-019-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-CAM-001 カメラモジュール
  {
    id: 'REV-PUR-020-A',
    itemId: 'ITEM-PUR-020',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-020-A-DESIGN', 'FI-PUR-020-A-ELEC', 'FI-PUR-020-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-BAT-001 リチウムイオンバッテリー
  {
    id: 'REV-PUR-021-A',
    itemId: 'ITEM-PUR-021',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-021-A-DESIGN', 'FI-PUR-021-A-ELEC', 'FI-PUR-021-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-BMS-001 バッテリーマネジメントシステム
  {
    id: 'REV-PUR-022-A',
    itemId: 'ITEM-PUR-022',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-022-A-DESIGN', 'FI-PUR-022-A-ELEC', 'FI-PUR-022-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // PUR-OMW-001 オムニホイール
  {
    id: 'REV-PUR-023-A',
    itemId: 'ITEM-PUR-023',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-PUR-023-A-DESIGN', 'FI-PUR-023-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// 原材料（RawMaterial）のリビジョン
// ============================================

export const rawMaterialRevs: ItemRev[] = [
  // RAW-ALM-001 アルミニウム合金板
  {
    id: 'REV-RAW-001-A',
    itemId: 'ITEM-RAW-001',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-RAW-001-A-DESIGN', 'FI-RAW-001-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // RAW-SUS-001 ステンレス丸棒
  {
    id: 'REV-RAW-002-A',
    itemId: 'ITEM-RAW-002',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-RAW-002-A-DESIGN', 'FI-RAW-002-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // RAW-PLA-001 エンジニアリングプラスチック
  {
    id: 'REV-RAW-003-A',
    itemId: 'ITEM-RAW-003',
    revision: 'A',
    status: 'Released',
    effectiveDate: '2024-01-01',
    changeNote: '初版',
    facetInstanceIds: ['FI-RAW-003-A-DESIGN', 'FI-RAW-003-A-PROC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// 全ItemRev一覧
// ============================================

export const itemRevs: ItemRev[] = [
  ...productRevs,
  ...assemblyRevs,
  ...partRevs,
  ...purchasedRevs,
  ...rawMaterialRevs,
];

/**
 * ItemRevをIDで検索
 */
export function getItemRevById(id: string): ItemRev | undefined {
  return itemRevs.find((rev) => rev.id === id);
}

/**
 * ItemIdでItemRevを検索
 */
export function getItemRevsByItemId(itemId: string): ItemRev[] {
  return itemRevs.filter((rev) => rev.itemId === itemId);
}

/**
 * ItemIdから最新のReleased版を取得
 */
export function getLatestReleasedRev(itemId: string): ItemRev | undefined {
  const revs = getItemRevsByItemId(itemId).filter((rev) => rev.status === 'Released');
  // revision順でソート（降順）してから最初のものを返す
  return revs.sort((a, b) => b.revision.localeCompare(a.revision))[0];
}

/**
 * ステータスでフィルタリング
 */
export function getItemRevsByStatus(
  status: 'Draft' | 'InReview' | 'Released' | 'Obsolete'
): ItemRev[] {
  return itemRevs.filter((rev) => rev.status === status);
}
