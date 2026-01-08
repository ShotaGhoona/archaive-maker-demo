/**
 * FacetInstanceダミーデータ
 *
 * 各ItemRevに紐付く実際の属性値
 * - DESIGN: 基本設計属性
 * - ELEC: 電気特性
 * - PROC: 調達属性
 * - MFG: 製造属性
 */

import type { FacetInstance } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 製品（Product）の属性
// ============================================

export const productFacetInstances: FacetInstance[] = [
  // PRD-ARM-1000 Rev.B 設計属性
  {
    id: 'FI-PRD-001-B-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 125.5,
      dimensions: '1200 x 800 x 1500',
      surfaceTreatment: '粉体塗装',
      color: 'ホワイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  // PRD-ARM-1000 Rev.B 製造属性
  {
    id: 'FI-PRD-001-B-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '最終組立ライン',
      standardTime: 480,
      setupTime: 60,
      manufacturingLocation: '本社工場',
      lotSize: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  // PRD-ARM-1000 Rev.A（旧版）設計属性
  {
    id: 'FI-PRD-001-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 130.0,
      dimensions: '1200 x 800 x 1500',
      surfaceTreatment: '塗装',
      color: 'グレー',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'FI-PRD-001-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '最終組立ライン',
      standardTime: 540,
      setupTime: 90,
      manufacturingLocation: '本社工場',
      lotSize: 5,
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },

  // PRD-AGV-2000 Rev.A 設計属性
  {
    id: 'FI-PRD-002-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 280.0,
      dimensions: '800 x 600 x 400',
      surfaceTreatment: '粉体塗装',
      color: 'オレンジ',
    },
    createdAt: now,
    updatedAt: now,
  },
  // PRD-AGV-2000 Rev.A 製造属性
  {
    id: 'FI-PRD-002-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: 'AGV組立ライン',
      standardTime: 360,
      setupTime: 45,
      manufacturingLocation: '第二工場',
      lotSize: 5,
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アセンブリ（Assembly）の属性
// ============================================

export const assemblyFacetInstances: FacetInstance[] = [
  // ASY-BASE-100 ベースユニット
  {
    id: 'FI-ASY-001-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 35.0,
      dimensions: '400 x 400 x 300',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-001-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '組立セル1',
      standardTime: 120,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-DRV-110 駆動システム Rev.B
  {
    id: 'FI-ASY-002-B-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 8.5,
      dimensions: '200 x 150 x 180',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-002-B-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '組立セル2',
      standardTime: 90,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-002-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 9.0,
      dimensions: '200 x 150 x 180',
    },
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
  },

  // ASY-FRM-120 フレーム構造
  {
    id: 'FI-ASY-003-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 15.0,
      dimensions: '350 x 350 x 250',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-003-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '溶接',
      workCenter: '溶接セル',
      standardTime: 60,
      setupTime: 20,
      equipmentRequired: 'TIG溶接機',
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-CTL-130 制御ボード Rev.B
  {
    id: 'FI-ASY-004-B-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.8,
      dimensions: '120 x 80 x 25',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-004-B-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: 'はんだ付け',
      workCenter: 'SMT実装ライン',
      standardTime: 30,
      setupTime: 45,
      equipmentRequired: 'リフロー炉、マウンター',
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-004-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.85,
      dimensions: '120 x 80 x 25',
    },
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
  },
  {
    id: 'FI-ASY-004-C-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.75,
      dimensions: '100 x 70 x 20',
    },
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // ASY-ARM-200 アームユニット
  {
    id: 'FI-ASY-005-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 45.0,
      dimensions: '800 x 200 x 200',
      surfaceTreatment: '硬質アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-005-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '組立セル3',
      standardTime: 180,
      setupTime: 30,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J1-210 第1関節
  {
    id: 'FI-ASY-006-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 12.0,
      dimensions: '180 x 180 x 150',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-006-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '精密組立セル',
      standardTime: 45,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J2-220 第2関節
  {
    id: 'FI-ASY-007-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 10.0,
      dimensions: '160 x 160 x 130',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-007-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '精密組立セル',
      standardTime: 40,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-J3-230 第3関節
  {
    id: 'FI-ASY-008-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 6.0,
      dimensions: '120 x 120 x 100',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-008-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '精密組立セル',
      standardTime: 35,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-LNK-240 リンク機構
  {
    id: 'FI-ASY-009-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 8.0,
      dimensions: '400 x 100 x 80',
      surfaceTreatment: '硬質アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-009-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 60,
      setupTime: 20,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-END-300 エンドエフェクター
  {
    id: 'FI-ASY-010-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 5.0,
      dimensions: '150 x 120 x 100',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-010-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '精密組立セル',
      standardTime: 60,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-GRP-310 グリッパー機構
  {
    id: 'FI-ASY-011-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 2.5,
      dimensions: '100 x 80 x 60',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-011-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '精密組立セル',
      standardTime: 30,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-SNS-320 センサーユニット
  {
    id: 'FI-ASY-012-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.5,
      dimensions: '60 x 40 x 30',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-012-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '電子組立セル',
      standardTime: 20,
      setupTime: 5,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-PWR-400 電源ユニット
  {
    id: 'FI-ASY-013-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 8.0,
      dimensions: '200 x 150 x 100',
      surfaceTreatment: '塗装',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-013-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '電源組立セル',
      standardTime: 45,
      setupTime: 10,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用アセンブリの属性
  // ============================================

  // ASY-CHS-500 シャーシユニット
  {
    id: 'FI-ASY-014-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 120.0,
      dimensions: '800 x 600 x 150',
      surfaceTreatment: '粉体塗装',
      color: 'オレンジ',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-014-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '溶接・組立',
      workCenter: 'AGV組立セル',
      standardTime: 180,
      setupTime: 30,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-WHM-510 ホイールモジュール
  {
    id: 'FI-ASY-015-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 8.5,
      dimensions: '200 x 150 x 200',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-015-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '駆動ユニット組立セル',
      standardTime: 45,
      setupTime: 10,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-NAV-600 ナビゲーションユニット
  {
    id: 'FI-ASY-016-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 2.5,
      dimensions: '200 x 150 x 100',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-016-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: '電子組立セル',
      standardTime: 60,
      setupTime: 15,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-BAT-700 バッテリーユニット
  {
    id: 'FI-ASY-017-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 45.0,
      dimensions: '400 x 300 x 150',
      surfaceTreatment: '塗装',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-017-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '組立',
      workCenter: 'バッテリー組立セル',
      standardTime: 30,
      setupTime: 10,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ASY-LDU-800 搬送台ユニット
  {
    id: 'FI-ASY-018-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 15.0,
      dimensions: '600 x 400 x 50',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-ASY-018-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 60,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 製造部品（Part）の属性
// ============================================

export const partFacetInstances: FacetInstance[] = [
  // PRT-GER-001 減速ギア Rev.B
  {
    id: 'FI-PRT-001-B-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 2.5,
      dimensions: 'φ80 x 50',
      surfaceTreatment: '浸炭焼入れ',
      toleranceClass: 'IT6',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-001-B-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '協力工場A',
      procurementType: '外注',
      unitPrice: 15000,
      moq: 10,
      leadTimeDays: 21,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-001-B-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'ギア加工セル',
      standardTime: 120,
      setupTime: 30,
      equipmentRequired: 'ホブ盤、研削盤',
      manufacturingLocation: '協力工場A',
    },
    createdAt: now,
    updatedAt: now,
  },
  // Rev.A（旧版）
  {
    id: 'FI-PRT-001-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 2.6,
      dimensions: 'φ80 x 52',
      surfaceTreatment: '浸炭焼入れ',
      toleranceClass: 'IT7',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'FI-PRT-001-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '協力工場A',
      procurementType: '外注',
      unitPrice: 14000,
      moq: 10,
      leadTimeDays: 28,
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'FI-PRT-001-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'ギア加工セル',
      standardTime: 150,
      setupTime: 45,
      manufacturingLocation: '協力工場A',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  // Rev.C（開発中）
  {
    id: 'FI-PRT-001-C-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 1.8,
      dimensions: 'φ80 x 45',
      surfaceTreatment: '硬質アルマイト',
      toleranceClass: 'IT6',
    },
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
  },

  // PRT-PLT-001 ベースプレート
  {
    id: 'FI-PRT-002-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 8.0,
      dimensions: '300 x 300 x 20',
      surfaceTreatment: 'アルマイト',
      toleranceClass: 'IT8',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-002-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 5000,
      leadTimeDays: 7,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-002-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 45,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-COL-001 支柱
  {
    id: 'FI-PRT-003-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 3.5,
      dimensions: 'φ60 x 500',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-003-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 2500,
      leadTimeDays: 5,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-003-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: '旋盤セル',
      standardTime: 30,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-SFT-001 シャフト
  {
    id: 'FI-PRT-004-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 0.8,
      dimensions: 'φ20 x 150',
      surfaceTreatment: '研磨',
      toleranceClass: 'IT6',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-004-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 1500,
      leadTimeDays: 3,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-004-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: '円筒研削セル',
      standardTime: 20,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-ARM-001 アーム部材
  {
    id: 'FI-PRT-005-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 4.0,
      dimensions: '400 x 80 x 40',
      surfaceTreatment: '硬質アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-005-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 8000,
      leadTimeDays: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-005-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 90,
      setupTime: 20,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-JNT-001 ジョイント
  {
    id: 'FI-PRT-006-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 0.5,
      dimensions: '60 x 60 x 40',
      surfaceTreatment: 'アルマイト',
      toleranceClass: 'IT7',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-006-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 2000,
      leadTimeDays: 5,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-006-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 25,
      setupTime: 10,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-FNG-001 フィンガー部品
  {
    id: 'FI-PRT-007-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 0.3,
      dimensions: '80 x 30 x 15',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-007-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 1200,
      leadTimeDays: 3,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-007-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 15,
      setupTime: 5,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-HSG-001 ハウジング
  {
    id: 'FI-PRT-008-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 1.5,
      dimensions: '100 x 100 x 80',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-008-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 4500,
      leadTimeDays: 7,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-008-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 60,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-CVR-001 カバー
  {
    id: 'FI-PRT-009-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.2,
      dimensions: '120 x 80 x 3',
      surfaceTreatment: 'なし',
      color: 'ホワイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-009-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '外注',
      supplierName: '樹脂成形工業',
      unitPrice: 800,
      moq: 100,
      leadTimeDays: 14,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-009-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '射出成形',
      workCenter: '成形機',
      standardTime: 1,
      setupTime: 60,
      manufacturingLocation: '協力工場B',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-PCB-001 制御基板
  {
    id: 'FI-PRT-010-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.1,
      dimensions: '100 x 60 x 1.6',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-010-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '外注',
      supplierName: 'プリント基板工業',
      unitPrice: 1500,
      moq: 50,
      leadTimeDays: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-010-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: 'はんだ付け',
      workCenter: 'SMT実装ライン',
      standardTime: 5,
      setupTime: 30,
      manufacturingLocation: '第二工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用製造部品の属性
  // ============================================

  // PRT-WHL-001 駆動ホイール
  {
    id: 'FI-PRT-011-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ウレタン/アルミニウム合金',
      weight: 2.5,
      dimensions: 'φ200 x 60',
      surfaceTreatment: 'アルマイト（ハブ部）',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-011-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '外注',
      supplierName: 'ホイール製作所',
      unitPrice: 8000,
      moq: 20,
      leadTimeDays: 14,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-011-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: 'ウレタン成形',
      workCenter: '成形セル',
      standardTime: 30,
      setupTime: 60,
      manufacturingLocation: '協力工場C',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-MTB-001 モーターブラケット
  {
    id: 'FI-PRT-012-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 1.2,
      dimensions: '150 x 100 x 80',
      surfaceTreatment: 'アルマイト',
      toleranceClass: 'IT8',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-012-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 3500,
      leadTimeDays: 5,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-012-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 45,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-FRM-002 シャーシフレーム
  {
    id: 'FI-PRT-013-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 35.0,
      dimensions: '800 x 600 x 100',
      surfaceTreatment: '粉体塗装',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-013-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '外注',
      supplierName: '鋼材加工工業',
      unitPrice: 25000,
      moq: 5,
      leadTimeDays: 21,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-013-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: 'レーザー加工・溶接',
      workCenter: '溶接セル',
      standardTime: 120,
      setupTime: 30,
      manufacturingLocation: '協力工場D',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PRT-PLF-001 プラットフォーム
  {
    id: 'FI-PRT-014-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 8.0,
      dimensions: '600 x 400 x 10',
      surfaceTreatment: 'アルマイト',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-014-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      procurementType: '内製',
      unitPrice: 6000,
      leadTimeDays: 7,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PRT-014-A-MFG',
    facetTypeId: 'FT-MANUFACTURING',
    values: {
      processName: '機械加工',
      workCenter: 'マシニングセンタ',
      standardTime: 60,
      setupTime: 15,
      manufacturingLocation: '本社工場',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 購入品（Purchased）の属性
// ============================================

export const purchasedFacetInstances: FacetInstance[] = [
  // PUR-MTR-001 ACサーボモーター 200W
  {
    id: 'FI-PUR-001-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 2.0,
      dimensions: '80 x 80 x 120',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-001-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 200,
      ratedCurrent: 1.5,
      powerConsumption: 200,
      protectionClass: 'IP65',
      operatingTemp: '-10℃ ~ +40℃',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-001-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '安川電機',
      supplierCode: 'SUP-001',
      supplierPartNumber: 'SGMJV-02ADA21',
      unitPrice: 45000,
      currency: 'JPY',
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-MTR-002 ACサーボモーター 400W
  {
    id: 'FI-PUR-002-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 3.5,
      dimensions: '100 x 100 x 150',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-002-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 200,
      ratedCurrent: 3.0,
      powerConsumption: 400,
      protectionClass: 'IP65',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-002-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '安川電機',
      supplierCode: 'SUP-001',
      supplierPartNumber: 'SGMJV-04ADA21',
      unitPrice: 65000,
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-MTR-003 ACサーボモーター 100W
  {
    id: 'FI-PUR-003-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 1.2,
      dimensions: '60 x 60 x 100',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-003-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 200,
      ratedCurrent: 0.8,
      powerConsumption: 100,
      protectionClass: 'IP65',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-003-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '安川電機',
      supplierCode: 'SUP-001',
      supplierPartNumber: 'SGMJV-01ADA21',
      unitPrice: 35000,
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-ENC-001 アブソリュートエンコーダ
  {
    id: 'FI-PUR-004-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.3,
      dimensions: 'φ50 x 30',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-004-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 5,
      ratedCurrent: 0.1,
      protectionClass: 'IP54',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-004-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '多摩川精機',
      supplierCode: 'SUP-002',
      supplierPartNumber: 'TS5700N21',
      unitPrice: 25000,
      moq: 1,
      leadTimeDays: 21,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-FSR-001 力覚センサー
  {
    id: 'FI-PUR-005-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 0.5,
      dimensions: 'φ60 x 40',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-005-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 24,
      ratedCurrent: 0.05,
      protectionClass: 'IP65',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-005-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ロボテック',
      supplierCode: 'SUP-003',
      supplierPartNumber: 'FT-300',
      unitPrice: 180000,
      moq: 1,
      leadTimeDays: 30,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-PXS-001 近接センサー
  {
    id: 'FI-PUR-006-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.05,
      dimensions: 'M12 x 40',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-006-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 24,
      ratedCurrent: 0.02,
      protectionClass: 'IP67',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-006-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'オムロン',
      supplierCode: 'SUP-004',
      supplierPartNumber: 'E2E-X8MD1',
      unitPrice: 3500,
      moq: 5,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BRG-001 ベアリング
  {
    id: 'FI-PUR-007-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 0.15,
      dimensions: 'φ62 x 30 x 16',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-007-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'NSK',
      supplierCode: 'SUP-005',
      supplierPartNumber: '7206C',
      unitPrice: 2500,
      moq: 10,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BLT-001 ボルトM8x25
  {
    id: 'FI-PUR-008-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 0.02,
      dimensions: 'M8 x 25',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-008-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ミスミ',
      supplierCode: 'SUP-006',
      supplierPartNumber: 'SCB8-25',
      unitPrice: 15,
      moq: 100,
      leadTimeDays: 3,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BLT-002 ボルトM6x20
  {
    id: 'FI-PUR-009-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 0.01,
      dimensions: 'M6 x 20',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-009-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ミスミ',
      supplierCode: 'SUP-006',
      supplierPartNumber: 'SCB6-20',
      unitPrice: 10,
      moq: 100,
      leadTimeDays: 3,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-NUT-001 ナットM8
  {
    id: 'FI-PUR-010-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 0.01,
      dimensions: 'M8',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-010-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ミスミ',
      supplierCode: 'SUP-006',
      supplierPartNumber: 'HXNUT8',
      unitPrice: 5,
      moq: 100,
      leadTimeDays: 3,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CPU-001 マイコン
  {
    id: 'FI-PUR-011-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.005,
      dimensions: '10 x 10 x 1.4',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-011-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 3.3,
      ratedCurrent: 0.15,
      operatingTemp: '-40℃ ~ +85℃',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-011-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'DigiKey',
      supplierCode: 'SUP-007',
      supplierPartNumber: 'STM32F407VGT6',
      unitPrice: 1500,
      moq: 10,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CAP-001 コンデンサ
  {
    id: 'FI-PUR-012-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.002,
      dimensions: '8 x 12',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-012-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 50,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-012-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'DigiKey',
      supplierCode: 'SUP-007',
      supplierPartNumber: 'UVR1H101MHD',
      unitPrice: 20,
      moq: 100,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-RES-001 抵抗
  {
    id: 'FI-PUR-013-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.001,
      dimensions: '2.0 x 1.25',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-013-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 50,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-013-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'DigiKey',
      supplierCode: 'SUP-007',
      supplierPartNumber: 'RC0805FR-0710KL',
      unitPrice: 1,
      moq: 1000,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-DRV-001 モータードライバIC
  {
    id: 'FI-PUR-014-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.003,
      dimensions: '9 x 9 x 1',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-014-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 60,
      ratedCurrent: 60,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-014-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'DigiKey',
      supplierCode: 'SUP-007',
      supplierPartNumber: 'DRV8301DCAR',
      unitPrice: 800,
      moq: 10,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-ACT-001 電動アクチュエータ
  {
    id: 'FI-PUR-015-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 0.8,
      dimensions: '80 x 40 x 40',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-015-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 24,
      ratedCurrent: 2.0,
      powerConsumption: 48,
      protectionClass: 'IP65',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-015-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'SMC',
      supplierCode: 'SUP-008',
      supplierPartNumber: 'LEY32DB-50',
      unitPrice: 35000,
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CBL-001 ケーブルハーネス
  {
    id: 'FI-PUR-016-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 1.5,
      dimensions: '全長2000mm',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-016-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ハーネス工業',
      supplierCode: 'SUP-009',
      supplierPartNumber: 'WH-ARM1000',
      unitPrice: 8000,
      moq: 10,
      leadTimeDays: 21,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CON-001 コネクタ
  {
    id: 'FI-PUR-017-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.05,
      dimensions: '30 x 20 x 15',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-017-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ヒロセ電機',
      supplierCode: 'SUP-010',
      supplierPartNumber: 'HR10A-10P-12S',
      unitPrice: 500,
      moq: 20,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-PSU-001 スイッチング電源
  {
    id: 'FI-PUR-018-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '炭素鋼',
      weight: 2.5,
      dimensions: '200 x 100 x 50',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-018-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 48,
      ratedCurrent: 10,
      powerConsumption: 480,
      protectionClass: 'IP20',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-018-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'TDKラムダ',
      supplierCode: 'SUP-011',
      supplierPartNumber: 'HWS600-48',
      unitPrice: 25000,
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用購入品の属性
  // ============================================

  // PUR-LDR-001 LiDARセンサー
  {
    id: 'FI-PUR-019-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 0.85,
      dimensions: '100 x 100 x 70',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-019-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 12,
      ratedCurrent: 0.5,
      protectionClass: 'IP65',
      operatingTemp: '-10℃ ~ +50℃',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-019-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'SICK',
      supplierCode: 'SUP-015',
      supplierPartNumber: 'TIM781-2174101',
      unitPrice: 350000,
      moq: 1,
      leadTimeDays: 45,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CAM-001 カメラモジュール
  {
    id: 'FI-PUR-020-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 0.25,
      dimensions: '50 x 50 x 50',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-020-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 5,
      ratedCurrent: 0.5,
      protectionClass: 'IP54',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-020-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'FLIR',
      supplierCode: 'SUP-016',
      supplierPartNumber: 'BFS-U3-51S5C-C',
      unitPrice: 85000,
      moq: 1,
      leadTimeDays: 21,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BAT-001 リチウムイオンバッテリー
  {
    id: 'FI-PUR-021-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'その他',
      weight: 18.0,
      dimensions: '300 x 200 x 100',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-021-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 48,
      ratedCurrent: 30,
      protectionClass: 'IP54',
      operatingTemp: '-20℃ ~ +60℃',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-021-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'パナソニック',
      supplierCode: 'SUP-017',
      supplierPartNumber: 'NCR18650BD-30AH',
      unitPrice: 120000,
      moq: 1,
      leadTimeDays: 30,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BMS-001 バッテリーマネジメントシステム
  {
    id: 'FI-PUR-022-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 0.5,
      dimensions: '150 x 100 x 30',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-022-A-ELEC',
    facetTypeId: 'FT-DESIGN-ELEC',
    values: {
      ratedVoltage: 48,
      ratedCurrent: 100,
      protectionClass: 'IP20',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-022-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'バッテリージャパン',
      supplierCode: 'SUP-018',
      supplierPartNumber: 'BMS-14S-100A',
      unitPrice: 35000,
      moq: 1,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // PUR-OMW-001 オムニホイール
  {
    id: 'FI-PUR-023-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ナイロン/ゴム',
      weight: 0.8,
      dimensions: 'φ100 x 40',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-PUR-023-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: 'ミスミ',
      supplierCode: 'SUP-006',
      supplierPartNumber: 'OMNI-100',
      unitPrice: 5000,
      moq: 4,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 原材料（RawMaterial）の属性
// ============================================

export const rawMaterialFacetInstances: FacetInstance[] = [
  // RAW-ALM-001 アルミニウム合金板
  {
    id: 'FI-RAW-001-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'アルミニウム合金',
      weight: 15.0,
      dimensions: '1000 x 500 x 20',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-RAW-001-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '住友軽金属',
      supplierCode: 'SUP-012',
      supplierPartNumber: 'A5052-H34-20',
      unitPrice: 5000,
      moq: 10,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // RAW-SUS-001 ステンレス丸棒
  {
    id: 'FI-RAW-002-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: 'ステンレス鋼',
      weight: 3.0,
      dimensions: 'φ25 x 1000',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-RAW-002-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '日本製鉄',
      supplierCode: 'SUP-013',
      supplierPartNumber: 'SUS304-φ25',
      unitPrice: 3000,
      moq: 5,
      leadTimeDays: 7,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // RAW-PLA-001 エンジニアリングプラスチック
  {
    id: 'FI-RAW-003-A-DESIGN',
    facetTypeId: 'FT-DESIGN-BASIC',
    values: {
      material: '樹脂',
      weight: 2.0,
      dimensions: '300 x 300 x 50',
      color: 'ナチュラル',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-RAW-003-A-PROC',
    facetTypeId: 'FT-PROCUREMENT',
    values: {
      supplierName: '旭化成',
      supplierCode: 'SUP-014',
      supplierPartNumber: 'TENAC-C',
      unitPrice: 8000,
      moq: 5,
      leadTimeDays: 14,
      procurementType: '購入',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 図面（Drawing）のメタデータ属性
// ============================================

export const drawingFacetInstances: FacetInstance[] = [
  // 製品図面
  {
    id: 'FI-DWG-PRD-001-B-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '山田 太郎',
      checkedBy: '鈴木 一郎',
      approvedBy: '佐藤 部長',
      drawnDate: '2024-01-10',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:10',
      cadSystem: 'SolidWorks',
      revisionHistory: 'Rev.B 安全機能追加に伴う外観変更',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRD-002-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '田中 次郎',
      checkedBy: '高橋 二郎',
      approvedBy: '佐藤 部長',
      drawnDate: '2024-01-15',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:15',
      cadSystem: 'SolidWorks',
      revisionHistory: '初版',
    },
    createdAt: now,
    updatedAt: now,
  },

  // アセンブリ図面
  {
    id: 'FI-DWG-ASY-001-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '山田 太郎',
      checkedBy: '鈴木 一郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-05',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:5',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-001-A-002',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '山田 太郎',
      checkedBy: '鈴木 一郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-06',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:2',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-002-B-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '田中 次郎',
      checkedBy: '高橋 二郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-03-20',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:3',
      cadSystem: 'SolidWorks',
      revisionHistory: 'Rev.B 高トルクモーター対応',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-003-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '山田 太郎',
      checkedBy: '鈴木 一郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-03',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:5',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-004-B-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '中村 三郎',
      checkedBy: '伊藤 四郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-06-15',
      standard: 'JIS',
      scale: '1:1',
      cadSystem: 'AutoCAD',
      revisionHistory: 'Rev.B CPU性能向上',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-004-B-002',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '中村 三郎',
      checkedBy: '伊藤 四郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-06-16',
      standard: 'JIS',
      scale: '1:1',
      cadSystem: 'AutoCAD',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-005-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '山田 太郎',
      checkedBy: '鈴木 一郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-08',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:5',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-010-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '田中 次郎',
      checkedBy: '高橋 二郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-12',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:2',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-011-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '田中 次郎',
      checkedBy: '高橋 二郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-14',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:1',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  // AGV用アセンブリ図面
  {
    id: 'FI-DWG-ASY-014-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '佐々木 五郎',
      checkedBy: '小林 六郎',
      approvedBy: '佐藤 部長',
      drawnDate: '2024-01-20',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:10',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-016-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '中村 三郎',
      checkedBy: '伊藤 四郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-25',
      standard: 'JIS',
      scale: '1:2',
      cadSystem: 'AutoCAD',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-ASY-017-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '佐々木 五郎',
      checkedBy: '小林 六郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-28',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:3',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },

  // 部品図面
  {
    id: 'FI-DWG-PRT-001-B-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-03-10',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '2:1',
      cadSystem: 'SolidWorks',
      revisionHistory: 'Rev.B 歯形精度向上',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-002-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-02',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:2',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-003-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-02',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:3',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-004-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-03',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '2:1',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-005-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-04',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:2',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-006-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-04',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '2:1',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-007-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '木村 七郎',
      checkedBy: '山本 八郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-05',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '2:1',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  // AGV用部品図面
  {
    id: 'FI-DWG-PRT-008-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '佐々木 五郎',
      checkedBy: '小林 六郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-18',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:1',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DWG-PRT-010-A-001',
    facetTypeId: 'FT-DRAWING-META',
    values: {
      drawnBy: '佐々木 五郎',
      checkedBy: '小林 六郎',
      approvedBy: '渡辺 課長',
      drawnDate: '2024-01-19',
      standard: 'JIS',
      projectionMethod: '第三角法',
      scale: '1:5',
      cadSystem: 'SolidWorks',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 帳票（Document）のメタデータ属性
// ============================================

export const documentFacetInstances: FacetInstance[] = [
  // 製品帳票
  {
    id: 'FI-DOC-PRD-001-B-SPEC-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '設計部 山田',
      approvedBy: '品質保証部 田中',
      createdDate: '2024-01-15',
      notes: '最新仕様',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-001-B-QT-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '営業部 鈴木',
      approvedBy: '営業部長 高橋',
      createdDate: '2024-02-01',
      validUntil: '2024-03-31',
      currency: 'JPY',
      totalAmount: 4500000,
      taxRate: 10,
      paymentTerms: '月末締め翌月末払い',
      deliveryTerms: '工場渡し',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-001-B-WI-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '製造部 佐藤',
      approvedBy: '製造部長 渡辺',
      createdDate: '2024-01-20',
      notes: '標準作業手順',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-002-A-SPEC-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '設計部 田中',
      approvedBy: '品質保証部 伊藤',
      createdDate: '2024-01-15',
      notes: '初版',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-002-A-QT-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '営業部 中村',
      approvedBy: '営業部長 高橋',
      createdDate: '2024-03-01',
      validUntil: '2024-04-30',
      currency: 'JPY',
      totalAmount: 6800000,
      taxRate: 10,
      paymentTerms: '月末締め翌月末払い',
      deliveryTerms: '客先納入',
    },
    createdAt: now,
    updatedAt: now,
  },

  // アセンブリ帳票
  {
    id: 'FI-DOC-ASY-001-A-IR-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 木村',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-01-25',
      notes: '全項目合格',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-ASY-001-A-WI-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '製造部 佐藤',
      approvedBy: '製造部長 渡辺',
      createdDate: '2024-01-20',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-ASY-004-B-IR-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 加藤',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-07-10',
      notes: '電気特性試験含む',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-ASY-010-A-IR-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 木村',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-01-28',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-ASY-017-A-IR-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 加藤',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-02-05',
      notes: 'バッテリー性能試験含む',
    },
    createdAt: now,
    updatedAt: now,
  },

  // 購入品帳票
  {
    id: 'FI-DOC-PUR-001-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 松田',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-01-10',
      currency: 'JPY',
      totalAmount: 450000,
      taxRate: 10,
      paymentTerms: '月末締め翌月末払い',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-001-A-DN-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '安川電機 配送担当',
      createdDate: '2024-01-25',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-001-A-INV-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '安川電機 経理担当',
      createdDate: '2024-01-31',
      currency: 'JPY',
      totalAmount: 495000,
      taxRate: 10,
      paymentTerms: '月末締め翌月末払い',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-002-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 松田',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-01-12',
      currency: 'JPY',
      totalAmount: 250000,
      taxRate: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-004-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 山口',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-01-15',
      currency: 'JPY',
      totalAmount: 15000,
      taxRate: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-007-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 松田',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-01-08',
      currency: 'JPY',
      totalAmount: 25000,
      taxRate: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-012-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 山口',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-02-01',
      currency: 'JPY',
      totalAmount: 385000,
      taxRate: 10,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PUR-014-A-PO-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '購買部 山口',
      approvedBy: '購買部長 岡田',
      createdDate: '2024-02-05',
      currency: 'JPY',
      totalAmount: 132000,
      taxRate: 10,
    },
    createdAt: now,
    updatedAt: now,
  },

  // 出荷帳票
  {
    id: 'FI-DOC-PRD-001-B-SI-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 木村',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-03-15',
      notes: '出荷前最終検査 全項目合格',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-001-B-DN-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '物流部 斉藤',
      createdDate: '2024-03-20',
      deliveryTerms: 'トラック配送',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-001-B-INV-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '経理部 井上',
      approvedBy: '経理部長 近藤',
      createdDate: '2024-03-31',
      currency: 'JPY',
      totalAmount: 4950000,
      taxRate: 10,
      paymentTerms: '月末締め翌月末払い',
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'FI-DOC-PRD-002-A-SI-001',
    facetTypeId: 'FT-DOCUMENT-META',
    values: {
      createdBy: '品質管理部 加藤',
      approvedBy: '品質保証部長 山本',
      createdDate: '2024-04-10',
      notes: '走行試験・センサー試験含む',
    },
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全FacetInstance一覧
// ============================================

export const facetInstances: FacetInstance[] = [
  ...productFacetInstances,
  ...assemblyFacetInstances,
  ...partFacetInstances,
  ...purchasedFacetInstances,
  ...rawMaterialFacetInstances,
  ...drawingFacetInstances,
  ...documentFacetInstances,
];

/**
 * FacetInstanceをIDで検索
 */
export function getFacetInstanceById(id: string): FacetInstance | undefined {
  return facetInstances.find((fi) => fi.id === id);
}

/**
 * FacetTypeIdでフィルタリング
 */
export function getFacetInstancesByType(facetTypeId: string): FacetInstance[] {
  return facetInstances.filter((fi) => fi.facetTypeId === facetTypeId);
}
