/**
 * BOMLineダミーデータ
 *
 * BOM構成明細（親子関係と数量）
 * - 単階層の親子関係のみ
 * - 多階層は再帰的に解決
 */

import type { BOMLine } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 製品レベルのBOMLine
// PRD-ARM-1000 → 子アセンブリ
// ============================================

export const productBomLines: BOMLine[] = [
  // PRD-ARM-1000 Rev.B の子
  {
    id: 'BL-PRD-001-01',
    bomHeaderId: 'BOM-PRD-001-B',
    childItemRevId: 'REV-ASY-001-A', // ベースユニット
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-001-02',
    bomHeaderId: 'BOM-PRD-001-B',
    childItemRevId: 'REV-ASY-005-A', // アームユニット
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-001-03',
    bomHeaderId: 'BOM-PRD-001-B',
    childItemRevId: 'REV-ASY-010-A', // エンドエフェクター
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-001-04',
    bomHeaderId: 'BOM-PRD-001-B',
    childItemRevId: 'REV-ASY-013-A', // 電源ユニット
    sequence: 4,
    quantity: 1,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-001-05',
    bomHeaderId: 'BOM-PRD-001-B',
    childItemRevId: 'REV-PUR-016-A', // ケーブルハーネス
    sequence: 5,
    quantity: 1,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },

  // PRD-AGV-2000 Rev.A の子
  {
    id: 'BL-PRD-002-01',
    bomHeaderId: 'BOM-PRD-002-A',
    childItemRevId: 'REV-ASY-014-A', // シャーシユニット
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-002-02',
    bomHeaderId: 'BOM-PRD-002-A',
    childItemRevId: 'REV-ASY-016-A', // ナビゲーションユニット
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-002-03',
    bomHeaderId: 'BOM-PRD-002-A',
    childItemRevId: 'REV-ASY-017-A', // バッテリーユニット
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-002-04',
    bomHeaderId: 'BOM-PRD-002-A',
    childItemRevId: 'REV-ASY-018-A', // 搬送台ユニット
    sequence: 4,
    quantity: 1,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-PRD-002-05',
    bomHeaderId: 'BOM-PRD-002-A',
    childItemRevId: 'REV-PUR-016-A', // ケーブルハーネス（再利用）
    sequence: 5,
    quantity: 1,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// ベースユニット (ASY-BASE-100) のBOMLine
// ============================================

export const baseUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-001-01',
    bomHeaderId: 'BOM-ASY-001-A',
    childItemRevId: 'REV-ASY-002-B', // 駆動システム
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-001-02',
    bomHeaderId: 'BOM-ASY-001-A',
    childItemRevId: 'REV-ASY-003-A', // フレーム構造
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-001-03',
    bomHeaderId: 'BOM-ASY-001-A',
    childItemRevId: 'REV-ASY-004-B', // 制御ボード
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 駆動システム (ASY-DRV-110) のBOMLine
// ============================================

export const driveSystemBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-002-01',
    bomHeaderId: 'BOM-ASY-002-B',
    childItemRevId: 'REV-PUR-001-A', // サーボモーター 200W
    sequence: 1,
    quantity: 2,
    unit: 'EA',
    findNumber: '1',
    notes: 'ベース回転用',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-002-02',
    bomHeaderId: 'BOM-ASY-002-B',
    childItemRevId: 'REV-PRT-001-B', // 減速ギア
    sequence: 2,
    quantity: 2,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-002-03',
    bomHeaderId: 'BOM-ASY-002-B',
    childItemRevId: 'REV-PUR-004-A', // エンコーダ
    sequence: 3,
    quantity: 2,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-002-04',
    bomHeaderId: 'BOM-ASY-002-B',
    childItemRevId: 'REV-PRT-008-A', // ハウジング
    sequence: 4,
    quantity: 1,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// フレーム構造 (ASY-FRM-120) のBOMLine
// ============================================

export const frameStructureBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-003-01',
    bomHeaderId: 'BOM-ASY-003-A',
    childItemRevId: 'REV-PRT-002-A', // ベースプレート
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-003-02',
    bomHeaderId: 'BOM-ASY-003-A',
    childItemRevId: 'REV-PRT-003-A', // 支柱
    sequence: 2,
    quantity: 4,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-003-03',
    bomHeaderId: 'BOM-ASY-003-A',
    childItemRevId: 'REV-PUR-008-A', // ボルトM8x25
    sequence: 3,
    quantity: 20,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-003-04',
    bomHeaderId: 'BOM-ASY-003-A',
    childItemRevId: 'REV-PUR-010-A', // ナットM8
    sequence: 4,
    quantity: 20,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-003-05',
    bomHeaderId: 'BOM-ASY-003-A',
    childItemRevId: 'REV-RAW-001-A', // アルミニウム合金板
    sequence: 5,
    quantity: 0.5,
    unit: 'EA',
    findNumber: '5',
    notes: '加工素材',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 制御ボード (ASY-CTL-130) のBOMLine
// ============================================

export const controlBoardBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-004-01',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PRT-010-A', // 制御基板
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-004-02',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PUR-011-A', // マイコン
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    referenceDesignator: 'U1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-004-03',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PUR-014-A', // モータードライバIC
    sequence: 3,
    quantity: 6,
    unit: 'EA',
    findNumber: '3',
    referenceDesignator: 'U2-U7',
    notes: '6軸分',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-004-04',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PUR-012-A', // コンデンサ
    sequence: 4,
    quantity: 20,
    unit: 'EA',
    findNumber: '4',
    referenceDesignator: 'C1-C20',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-004-05',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PUR-013-A', // 抵抗
    sequence: 5,
    quantity: 30,
    unit: 'EA',
    findNumber: '5',
    referenceDesignator: 'R1-R30',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-004-06',
    bomHeaderId: 'BOM-ASY-004-B',
    childItemRevId: 'REV-PUR-017-A', // コネクタ
    sequence: 6,
    quantity: 8,
    unit: 'EA',
    findNumber: '6',
    referenceDesignator: 'J1-J8',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アームユニット (ASY-ARM-200) のBOMLine
// ============================================

export const armUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-005-01',
    bomHeaderId: 'BOM-ASY-005-A',
    childItemRevId: 'REV-ASY-006-A', // 第1関節
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-005-02',
    bomHeaderId: 'BOM-ASY-005-A',
    childItemRevId: 'REV-ASY-007-A', // 第2関節
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-005-03',
    bomHeaderId: 'BOM-ASY-005-A',
    childItemRevId: 'REV-ASY-008-A', // 第3関節
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-005-04',
    bomHeaderId: 'BOM-ASY-005-A',
    childItemRevId: 'REV-ASY-009-A', // リンク機構
    sequence: 4,
    quantity: 2,
    unit: 'EA',
    findNumber: '4',
    notes: '上腕・前腕用',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 第1関節 (ASY-J1-210) のBOMLine
// ============================================

export const joint1BomLines: BOMLine[] = [
  {
    id: 'BL-ASY-006-01',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PUR-002-A', // サーボモーター 400W
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-02',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PRT-001-B', // 減速ギア
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-03',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PRT-004-A', // シャフト
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-04',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PUR-007-A', // ベアリング
    sequence: 4,
    quantity: 2,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-05',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PRT-008-A', // ハウジング
    sequence: 5,
    quantity: 1,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-06',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PRT-009-A', // カバー
    sequence: 6,
    quantity: 2,
    unit: 'EA',
    findNumber: '6',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-006-07',
    bomHeaderId: 'BOM-ASY-006-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 7,
    quantity: 12,
    unit: 'EA',
    findNumber: '7',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 第2関節 (ASY-J2-220) のBOMLine
// ============================================

export const joint2BomLines: BOMLine[] = [
  {
    id: 'BL-ASY-007-01',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PUR-001-A', // サーボモーター 200W
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-02',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PRT-001-B', // 減速ギア
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-03',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PRT-004-A', // シャフト
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-04',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PUR-007-A', // ベアリング
    sequence: 4,
    quantity: 2,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-05',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PRT-008-A', // ハウジング
    sequence: 5,
    quantity: 1,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-06',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PRT-009-A', // カバー
    sequence: 6,
    quantity: 2,
    unit: 'EA',
    findNumber: '6',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-007-07',
    bomHeaderId: 'BOM-ASY-007-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 7,
    quantity: 10,
    unit: 'EA',
    findNumber: '7',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 第3関節 (ASY-J3-230) のBOMLine
// ============================================

export const joint3BomLines: BOMLine[] = [
  {
    id: 'BL-ASY-008-01',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PUR-003-A', // サーボモーター 100W
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-008-02',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PRT-001-B', // 減速ギア
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-008-03',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PRT-004-A', // シャフト
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-008-04',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PUR-007-A', // ベアリング
    sequence: 4,
    quantity: 2,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-008-05',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PRT-009-A', // カバー
    sequence: 5,
    quantity: 2,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-008-06',
    bomHeaderId: 'BOM-ASY-008-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 6,
    quantity: 8,
    unit: 'EA',
    findNumber: '6',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// リンク機構 (ASY-LNK-240) のBOMLine
// ============================================

export const linkMechanismBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-009-01',
    bomHeaderId: 'BOM-ASY-009-A',
    childItemRevId: 'REV-PRT-005-A', // アーム部材
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-009-02',
    bomHeaderId: 'BOM-ASY-009-A',
    childItemRevId: 'REV-PRT-006-A', // ジョイント
    sequence: 2,
    quantity: 2,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-009-03',
    bomHeaderId: 'BOM-ASY-009-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 3,
    quantity: 8,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-009-04',
    bomHeaderId: 'BOM-ASY-009-A',
    childItemRevId: 'REV-RAW-001-A', // アルミニウム合金板
    sequence: 4,
    quantity: 0.2,
    unit: 'EA',
    findNumber: '4',
    notes: '加工素材',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// エンドエフェクター (ASY-END-300) のBOMLine
// ============================================

export const endEffectorBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-010-01',
    bomHeaderId: 'BOM-ASY-010-A',
    childItemRevId: 'REV-ASY-011-A', // グリッパー機構
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-010-02',
    bomHeaderId: 'BOM-ASY-010-A',
    childItemRevId: 'REV-ASY-012-A', // センサーユニット
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-010-03',
    bomHeaderId: 'BOM-ASY-010-A',
    childItemRevId: 'REV-PUR-017-A', // コネクタ
    sequence: 3,
    quantity: 2,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// グリッパー機構 (ASY-GRP-310) のBOMLine
// ============================================

export const gripperBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-011-01',
    bomHeaderId: 'BOM-ASY-011-A',
    childItemRevId: 'REV-PUR-015-A', // 電動アクチュエータ
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-011-02',
    bomHeaderId: 'BOM-ASY-011-A',
    childItemRevId: 'REV-PRT-007-A', // フィンガー部品
    sequence: 2,
    quantity: 2,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-011-03',
    bomHeaderId: 'BOM-ASY-011-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 3,
    quantity: 6,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-011-04',
    bomHeaderId: 'BOM-ASY-011-A',
    childItemRevId: 'REV-RAW-003-A', // エンジニアリングプラスチック
    sequence: 4,
    quantity: 0.1,
    unit: 'EA',
    findNumber: '4',
    notes: '加工素材',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// センサーユニット (ASY-SNS-320) のBOMLine
// ============================================

export const sensorUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-012-01',
    bomHeaderId: 'BOM-ASY-012-A',
    childItemRevId: 'REV-PUR-005-A', // 力覚センサー
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-012-02',
    bomHeaderId: 'BOM-ASY-012-A',
    childItemRevId: 'REV-PUR-006-A', // 近接センサー
    sequence: 2,
    quantity: 2,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-012-03',
    bomHeaderId: 'BOM-ASY-012-A',
    childItemRevId: 'REV-PUR-017-A', // コネクタ
    sequence: 3,
    quantity: 3,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 電源ユニット (ASY-PWR-400) のBOMLine
// ============================================

export const powerUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-013-01',
    bomHeaderId: 'BOM-ASY-013-A',
    childItemRevId: 'REV-PUR-018-A', // スイッチング電源
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-013-02',
    bomHeaderId: 'BOM-ASY-013-A',
    childItemRevId: 'REV-PUR-012-A', // コンデンサ
    sequence: 2,
    quantity: 10,
    unit: 'EA',
    findNumber: '2',
    notes: 'ノイズフィルタ用',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-013-03',
    bomHeaderId: 'BOM-ASY-013-A',
    childItemRevId: 'REV-PUR-017-A', // コネクタ
    sequence: 3,
    quantity: 4,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-013-04',
    bomHeaderId: 'BOM-ASY-013-A',
    childItemRevId: 'REV-PUR-008-A', // ボルトM8x25
    sequence: 4,
    quantity: 4,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// AGV用BOMLine
// ============================================

// シャーシユニット (ASY-CHS-500) のBOMLine
export const chassisUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-014-01',
    bomHeaderId: 'BOM-ASY-014-A',
    childItemRevId: 'REV-ASY-015-A', // ホイールモジュール
    sequence: 1,
    quantity: 4,
    unit: 'EA',
    findNumber: '1',
    notes: '駆動輪4輪',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-014-02',
    bomHeaderId: 'BOM-ASY-014-A',
    childItemRevId: 'REV-PRT-013-A', // シャーシフレーム
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-014-03',
    bomHeaderId: 'BOM-ASY-014-A',
    childItemRevId: 'REV-PUR-023-A', // オムニホイール
    sequence: 3,
    quantity: 2,
    unit: 'EA',
    findNumber: '3',
    notes: 'キャスター用',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-014-04',
    bomHeaderId: 'BOM-ASY-014-A',
    childItemRevId: 'REV-PUR-008-A', // ボルトM8x25
    sequence: 4,
    quantity: 30,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
];

// ホイールモジュール (ASY-WHM-510) のBOMLine
export const wheelModuleBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-015-01',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PUR-001-A', // サーボモーター200W
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-015-02',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PRT-001-B', // 減速ギア
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-015-03',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PRT-011-A', // 駆動ホイール
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-015-04',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PRT-012-A', // モーターブラケット
    sequence: 4,
    quantity: 1,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-015-05',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PUR-007-A', // ベアリング
    sequence: 5,
    quantity: 2,
    unit: 'EA',
    findNumber: '5',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-015-06',
    bomHeaderId: 'BOM-ASY-015-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 6,
    quantity: 8,
    unit: 'EA',
    findNumber: '6',
    createdAt: now,
    updatedAt: now,
  },
];

// ナビゲーションユニット (ASY-NAV-600) のBOMLine
export const navigationUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-016-01',
    bomHeaderId: 'BOM-ASY-016-A',
    childItemRevId: 'REV-PUR-019-A', // LiDARセンサー
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-016-02',
    bomHeaderId: 'BOM-ASY-016-A',
    childItemRevId: 'REV-PUR-020-A', // カメラモジュール
    sequence: 2,
    quantity: 2,
    unit: 'EA',
    findNumber: '2',
    notes: '前方・後方',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-016-03',
    bomHeaderId: 'BOM-ASY-016-A',
    childItemRevId: 'REV-PUR-011-A', // マイコン（再利用）
    sequence: 3,
    quantity: 1,
    unit: 'EA',
    findNumber: '3',
    referenceDesignator: 'U1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-016-04',
    bomHeaderId: 'BOM-ASY-016-A',
    childItemRevId: 'REV-PUR-017-A', // コネクタ（再利用）
    sequence: 4,
    quantity: 4,
    unit: 'EA',
    findNumber: '4',
    createdAt: now,
    updatedAt: now,
  },
];

// バッテリーユニット (ASY-BAT-700) のBOMLine
export const batteryUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-017-01',
    bomHeaderId: 'BOM-ASY-017-A',
    childItemRevId: 'REV-PUR-021-A', // リチウムイオンバッテリー
    sequence: 1,
    quantity: 2,
    unit: 'EA',
    findNumber: '1',
    notes: '直列接続',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-017-02',
    bomHeaderId: 'BOM-ASY-017-A',
    childItemRevId: 'REV-PUR-022-A', // BMS
    sequence: 2,
    quantity: 1,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-017-03',
    bomHeaderId: 'BOM-ASY-017-A',
    childItemRevId: 'REV-PUR-017-A', // コネクタ（再利用）
    sequence: 3,
    quantity: 2,
    unit: 'EA',
    findNumber: '3',
    createdAt: now,
    updatedAt: now,
  },
];

// 搬送台ユニット (ASY-LDU-800) のBOMLine
export const loadingUnitBomLines: BOMLine[] = [
  {
    id: 'BL-ASY-018-01',
    bomHeaderId: 'BOM-ASY-018-A',
    childItemRevId: 'REV-PRT-014-A', // プラットフォーム
    sequence: 1,
    quantity: 1,
    unit: 'EA',
    findNumber: '1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'BL-ASY-018-02',
    bomHeaderId: 'BOM-ASY-018-A',
    childItemRevId: 'REV-PUR-009-A', // ボルトM6x20
    sequence: 2,
    quantity: 16,
    unit: 'EA',
    findNumber: '2',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全BOMLine一覧
// ============================================

export const bomLines: BOMLine[] = [
  ...productBomLines,
  ...baseUnitBomLines,
  ...driveSystemBomLines,
  ...frameStructureBomLines,
  ...controlBoardBomLines,
  ...armUnitBomLines,
  ...joint1BomLines,
  ...joint2BomLines,
  ...joint3BomLines,
  ...linkMechanismBomLines,
  ...endEffectorBomLines,
  ...gripperBomLines,
  ...sensorUnitBomLines,
  ...powerUnitBomLines,
  // AGV用
  ...chassisUnitBomLines,
  ...wheelModuleBomLines,
  ...navigationUnitBomLines,
  ...batteryUnitBomLines,
  ...loadingUnitBomLines,
];

/**
 * BOMLineをIDで検索
 */
export function getBomLineById(id: string): BOMLine | undefined {
  return bomLines.find((bl) => bl.id === id);
}

/**
 * BOMHeaderIdでBOMLineを検索
 */
export function getBomLinesByHeader(bomHeaderId: string): BOMLine[] {
  return bomLines.filter((bl) => bl.bomHeaderId === bomHeaderId);
}

/**
 * 子ItemRevIdでBOMLineを検索（Where-Used）
 */
export function getBomLinesByChildRev(childItemRevId: string): BOMLine[] {
  return bomLines.filter((bl) => bl.childItemRevId === childItemRevId);
}
