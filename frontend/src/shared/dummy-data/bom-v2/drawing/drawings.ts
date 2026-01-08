/**
 * Drawingダミーデータ
 *
 * ItemRevに紐づく図面データ
 * - 組立図：アセンブリの組立方法を示す図面
 * - 部品図：個々の部品の形状・寸法を示す図面
 * - 配線図：電気回路・配線を示す図面
 * - 外観図：製品の外観を示す図面
 */

import type { Drawing } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 製品（Product）の図面
// ============================================

export const productDrawings: Drawing[] = [
  // PRD-ARM-1000 産業用ロボットアーム Rev.B
  {
    id: 'DWG-PRD-001-B-001',
    drawingNumber: 'DWG-PRD-ARM-1000-B',
    title: '産業用ロボットアーム ARM-1000 外観図',
    itemRevId: 'REV-PRD-001-B',
    drawingType: '外観図',
    sheetSize: 'A1',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing1/400/300',
    facetInstanceIds: ['FI-DWG-PRD-001-B-001'],
    createdAt: now,
    updatedAt: now,
  },
  // PRD-AGV-2000 AGV Rev.A
  {
    id: 'DWG-PRD-002-A-001',
    drawingNumber: 'DWG-PRD-AGV-2000-A',
    title: 'AGV AGV-2000 外観図',
    itemRevId: 'REV-PRD-002-A',
    drawingType: '外観図',
    sheetSize: 'A1',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing2/400/300',
    facetInstanceIds: ['FI-DWG-PRD-002-A-001'],
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アセンブリ（Assembly）の図面
// ============================================

export const assemblyDrawings: Drawing[] = [
  // ASY-BASE-100 ベースユニット
  {
    id: 'DWG-ASY-001-A-001',
    drawingNumber: 'DWG-ASY-BASE-100-A',
    title: 'ベースユニット 組立図',
    itemRevId: 'REV-ASY-001-A',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 2,
    s3Path: 'https://picsum.photos/seed/drawing3/400/300',
    facetInstanceIds: ['FI-DWG-ASY-001-A-001'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DWG-ASY-001-A-002',
    drawingNumber: 'DWG-ASY-BASE-100-A-2',
    title: 'ベースユニット 組立図（詳細）',
    itemRevId: 'REV-ASY-001-A',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 2,
    totalSheets: 2,
    s3Path: 'https://picsum.photos/seed/drawing4/400/300',
    facetInstanceIds: ['FI-DWG-ASY-001-A-002'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-DRV-110 駆動システム Rev.B
  {
    id: 'DWG-ASY-002-B-001',
    drawingNumber: 'DWG-ASY-DRV-110-B',
    title: '駆動システム 組立図',
    itemRevId: 'REV-ASY-002-B',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing5/400/300',
    facetInstanceIds: ['FI-DWG-ASY-002-B-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-FRM-120 フレーム構造
  {
    id: 'DWG-ASY-003-A-001',
    drawingNumber: 'DWG-ASY-FRM-120-A',
    title: 'フレーム構造 組立図',
    itemRevId: 'REV-ASY-003-A',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing6/400/300',
    facetInstanceIds: ['FI-DWG-ASY-003-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-CTL-130 制御ボード Rev.B
  {
    id: 'DWG-ASY-004-B-001',
    drawingNumber: 'DWG-ASY-CTL-130-B',
    title: '制御ボード 配線図',
    itemRevId: 'REV-ASY-004-B',
    drawingType: '配線図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 2,
    s3Path: 'https://picsum.photos/seed/drawing7/400/300',
    facetInstanceIds: ['FI-DWG-ASY-004-B-001'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DWG-ASY-004-B-002',
    drawingNumber: 'DWG-ASY-CTL-130-B-2',
    title: '制御ボード 回路図',
    itemRevId: 'REV-ASY-004-B',
    drawingType: '回路図',
    sheetSize: 'A3',
    sheetNumber: 2,
    totalSheets: 2,
    s3Path: 'https://picsum.photos/seed/drawing8/400/300',
    facetInstanceIds: ['FI-DWG-ASY-004-B-002'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-ARM-200 アームユニット
  {
    id: 'DWG-ASY-005-A-001',
    drawingNumber: 'DWG-ASY-ARM-200-A',
    title: 'アームユニット 組立図',
    itemRevId: 'REV-ASY-005-A',
    drawingType: '組立図',
    sheetSize: 'A1',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing9/400/300',
    facetInstanceIds: ['FI-DWG-ASY-005-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-END-300 エンドエフェクター
  {
    id: 'DWG-ASY-010-A-001',
    drawingNumber: 'DWG-ASY-END-300-A',
    title: 'エンドエフェクター 組立図',
    itemRevId: 'REV-ASY-010-A',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing10/400/300',
    facetInstanceIds: ['FI-DWG-ASY-010-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-GRP-310 グリッパー機構
  {
    id: 'DWG-ASY-011-A-001',
    drawingNumber: 'DWG-ASY-GRP-310-A',
    title: 'グリッパー機構 組立図',
    itemRevId: 'REV-ASY-011-A',
    drawingType: '組立図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing11/400/300',
    facetInstanceIds: ['FI-DWG-ASY-011-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // AGV用アセンブリ
  // ASY-CHS-500 シャーシユニット
  {
    id: 'DWG-ASY-014-A-001',
    drawingNumber: 'DWG-ASY-CHS-500-A',
    title: 'シャーシユニット 組立図',
    itemRevId: 'REV-ASY-014-A',
    drawingType: '組立図',
    sheetSize: 'A1',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing12/400/300',
    facetInstanceIds: ['FI-DWG-ASY-014-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-NAV-600 ナビゲーションユニット
  {
    id: 'DWG-ASY-016-A-001',
    drawingNumber: 'DWG-ASY-NAV-600-A',
    title: 'ナビゲーションユニット 配線図',
    itemRevId: 'REV-ASY-016-A',
    drawingType: '配線図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing13/400/300',
    facetInstanceIds: ['FI-DWG-ASY-016-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // ASY-BAT-700 バッテリーユニット
  {
    id: 'DWG-ASY-017-A-001',
    drawingNumber: 'DWG-ASY-BAT-700-A',
    title: 'バッテリーユニット 組立図',
    itemRevId: 'REV-ASY-017-A',
    drawingType: '組立図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing14/400/300',
    facetInstanceIds: ['FI-DWG-ASY-017-A-001'],
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 部品（Part）の図面
// ============================================

export const partDrawings: Drawing[] = [
  // PRT-GER-001 減速ギア Rev.B
  {
    id: 'DWG-PRT-001-B-001',
    drawingNumber: 'DWG-PRT-GER-001-B',
    title: '減速ギア 部品図',
    itemRevId: 'REV-PRT-001-B',
    drawingType: '部品図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing15/400/300',
    facetInstanceIds: ['FI-DWG-PRT-001-B-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-PLT-001 ベースプレート
  {
    id: 'DWG-PRT-002-A-001',
    drawingNumber: 'DWG-PRT-PLT-001-A',
    title: 'ベースプレート 部品図',
    itemRevId: 'REV-PRT-002-A',
    drawingType: '部品図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing16/400/300',
    facetInstanceIds: ['FI-DWG-PRT-002-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-COL-001 支柱
  {
    id: 'DWG-PRT-003-A-001',
    drawingNumber: 'DWG-PRT-COL-001-A',
    title: '支柱 部品図',
    itemRevId: 'REV-PRT-003-A',
    drawingType: '部品図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing17/400/300',
    facetInstanceIds: ['FI-DWG-PRT-003-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-SFT-001 シャフト
  {
    id: 'DWG-PRT-004-A-001',
    drawingNumber: 'DWG-PRT-SFT-001-A',
    title: 'シャフト 部品図',
    itemRevId: 'REV-PRT-004-A',
    drawingType: '部品図',
    sheetSize: 'A4',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing18/400/300',
    facetInstanceIds: ['FI-DWG-PRT-004-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-ARM-001 アーム部材
  {
    id: 'DWG-PRT-005-A-001',
    drawingNumber: 'DWG-PRT-ARM-001-A',
    title: 'アーム部材 部品図',
    itemRevId: 'REV-PRT-005-A',
    drawingType: '部品図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing19/400/300',
    facetInstanceIds: ['FI-DWG-PRT-005-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-JNT-001 ジョイント
  {
    id: 'DWG-PRT-006-A-001',
    drawingNumber: 'DWG-PRT-JNT-001-A',
    title: 'ジョイント 部品図',
    itemRevId: 'REV-PRT-006-A',
    drawingType: '部品図',
    sheetSize: 'A4',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing20/400/300',
    facetInstanceIds: ['FI-DWG-PRT-006-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-FNG-001 フィンガー部品
  {
    id: 'DWG-PRT-007-A-001',
    drawingNumber: 'DWG-PRT-FNG-001-A',
    title: 'フィンガー部品 部品図',
    itemRevId: 'REV-PRT-007-A',
    drawingType: '部品図',
    sheetSize: 'A4',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing21/400/300',
    facetInstanceIds: ['FI-DWG-PRT-007-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // AGV用パーツ
  // PRT-WHL-001 駆動ホイール
  {
    id: 'DWG-PRT-008-A-001',
    drawingNumber: 'DWG-PRT-WHL-001-A',
    title: '駆動ホイール 部品図',
    itemRevId: 'REV-PRT-008-A',
    drawingType: '部品図',
    sheetSize: 'A3',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing22/400/300',
    facetInstanceIds: ['FI-DWG-PRT-008-A-001'],
    createdAt: now,
    updatedAt: now,
  },

  // PRT-FRM-002 シャーシフレーム
  {
    id: 'DWG-PRT-010-A-001',
    drawingNumber: 'DWG-PRT-FRM-002-A',
    title: 'シャーシフレーム 部品図',
    itemRevId: 'REV-PRT-010-A',
    drawingType: '部品図',
    sheetSize: 'A2',
    sheetNumber: 1,
    totalSheets: 1,
    s3Path: 'https://picsum.photos/seed/drawing23/400/300',
    facetInstanceIds: ['FI-DWG-PRT-010-A-001'],
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全Drawing一覧
// ============================================

export const drawings: Drawing[] = [
  ...productDrawings,
  ...assemblyDrawings,
  ...partDrawings,
];

/**
 * DrawingをIDで検索
 */
export function getDrawingById(id: string): Drawing | undefined {
  return drawings.find((d) => d.id === id);
}

/**
 * ItemRevIdでDrawingを検索
 */
export function getDrawingsByItemRev(itemRevId: string): Drawing[] {
  return drawings.filter((d) => d.itemRevId === itemRevId);
}

/**
 * 図面種類でDrawingをフィルタリング
 */
export function getDrawingsByType(drawingType: string): Drawing[] {
  return drawings.filter((d) => d.drawingType === drawingType);
}
