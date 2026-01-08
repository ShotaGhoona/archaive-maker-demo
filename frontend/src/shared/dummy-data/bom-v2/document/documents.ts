/**
 * Documentダミーデータ
 *
 * ItemRevに紐づく帳票データ
 * - 見積書（Quotation）
 * - 発注書（Purchase Order）
 * - 納品書（Delivery Note）
 * - 仕様書（Specification）
 * - 検査成績書（Inspection Report）
 */

import type { Document } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 製品（Product）の帳票
// ============================================

export const productDocuments: Document[] = [
  // PRD-ARM-1000 産業用ロボットアーム Rev.B
  {
    id: 'DOC-PRD-001-B-SPEC-001',
    documentNumber: 'SPEC-2024-001',
    title: '産業用ロボットアーム ARM-1000 製品仕様書',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-SPEC',
    filePath: '/documents/PRD-ARM-1000-B/spec.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-SPEC-001'],
    issueDate: '2024-01-15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PRD-001-B-QT-001',
    documentNumber: 'QT-2024-001',
    title: '産業用ロボットアーム ARM-1000 見積書',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-QUOTE',
    filePath: '/documents/PRD-ARM-1000-B/quote.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-QT-001'],
    issueDate: '2024-02-01',
    recipient: '株式会社ABC製作所',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PRD-001-B-WI-001',
    documentNumber: 'WI-2024-001',
    title: '産業用ロボットアーム ARM-1000 組立作業手順書',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-WI',
    filePath: '/documents/PRD-ARM-1000-B/work-instruction.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-WI-001'],
    issueDate: '2024-01-20',
    createdAt: now,
    updatedAt: now,
  },

  // PRD-AGV-2000 AGV Rev.A
  {
    id: 'DOC-PRD-002-A-SPEC-001',
    documentNumber: 'SPEC-2024-002',
    title: 'AGV AGV-2000 製品仕様書',
    itemRevId: 'REV-PRD-002-A',
    documentTypeId: 'DT-SPEC',
    filePath: '/documents/PRD-AGV-2000-A/spec.pdf',
    facetInstanceIds: ['FI-DOC-PRD-002-A-SPEC-001'],
    issueDate: '2024-01-15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PRD-002-A-QT-001',
    documentNumber: 'QT-2024-002',
    title: 'AGV AGV-2000 見積書',
    itemRevId: 'REV-PRD-002-A',
    documentTypeId: 'DT-QUOTE',
    filePath: '/documents/PRD-AGV-2000-A/quote.pdf',
    facetInstanceIds: ['FI-DOC-PRD-002-A-QT-001'],
    issueDate: '2024-03-01',
    recipient: '株式会社XYZ物流',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アセンブリ（Assembly）の帳票
// ============================================

export const assemblyDocuments: Document[] = [
  // ASY-BASE-100 ベースユニット
  {
    id: 'DOC-ASY-001-A-IR-001',
    documentNumber: 'IR-2024-001',
    title: 'ベースユニット 検査成績書',
    itemRevId: 'REV-ASY-001-A',
    documentTypeId: 'DT-IR',
    filePath: '/documents/ASY-BASE-100-A/inspection.pdf',
    facetInstanceIds: ['FI-DOC-ASY-001-A-IR-001'],
    issueDate: '2024-01-25',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-ASY-001-A-WI-001',
    documentNumber: 'WI-2024-002',
    title: 'ベースユニット 組立作業手順書',
    itemRevId: 'REV-ASY-001-A',
    documentTypeId: 'DT-WI',
    filePath: '/documents/ASY-BASE-100-A/work-instruction.pdf',
    facetInstanceIds: ['FI-DOC-ASY-001-A-WI-001'],
    issueDate: '2024-01-20',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-CTL-130 制御ボード Rev.B
  {
    id: 'DOC-ASY-004-B-IR-001',
    documentNumber: 'IR-2024-002',
    title: '制御ボード 検査成績書',
    itemRevId: 'REV-ASY-004-B',
    documentTypeId: 'DT-IR',
    filePath: '/documents/ASY-CTL-130-B/inspection.pdf',
    facetInstanceIds: ['FI-DOC-ASY-004-B-IR-001'],
    issueDate: '2024-07-10',
    createdAt: now,
    updatedAt: now,
  },

  // ASY-END-300 エンドエフェクター
  {
    id: 'DOC-ASY-010-A-IR-001',
    documentNumber: 'IR-2024-003',
    title: 'エンドエフェクター 検査成績書',
    itemRevId: 'REV-ASY-010-A',
    documentTypeId: 'DT-IR',
    filePath: '/documents/ASY-END-300-A/inspection.pdf',
    facetInstanceIds: ['FI-DOC-ASY-010-A-IR-001'],
    issueDate: '2024-01-28',
    createdAt: now,
    updatedAt: now,
  },

  // AGV用アセンブリ
  // ASY-BAT-700 バッテリーユニット
  {
    id: 'DOC-ASY-017-A-IR-001',
    documentNumber: 'IR-2024-004',
    title: 'バッテリーユニット 検査成績書',
    itemRevId: 'REV-ASY-017-A',
    documentTypeId: 'DT-IR',
    filePath: '/documents/ASY-BAT-700-A/inspection.pdf',
    facetInstanceIds: ['FI-DOC-ASY-017-A-IR-001'],
    issueDate: '2024-02-05',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 購入品（Purchased）の帳票
// ============================================

export const purchasedDocuments: Document[] = [
  // PUR-MTR-001 サーボモーター
  {
    id: 'DOC-PUR-001-A-PO-001',
    documentNumber: 'PO-2024-001',
    title: 'サーボモーター 発注書',
    itemRevId: 'REV-PUR-001-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-MTR-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-001-A-PO-001'],
    issueDate: '2024-01-10',
    recipient: '安川電機株式会社',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PUR-001-A-DN-001',
    documentNumber: 'DN-2024-001',
    title: 'サーボモーター 納品書',
    itemRevId: 'REV-PUR-001-A',
    documentTypeId: 'DT-DN',
    filePath: '/documents/PUR-MTR-001-A/dn.pdf',
    facetInstanceIds: ['FI-DOC-PUR-001-A-DN-001'],
    issueDate: '2024-01-25',
    recipient: '自社',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PUR-001-A-INV-001',
    documentNumber: 'INV-2024-001',
    title: 'サーボモーター 請求書',
    itemRevId: 'REV-PUR-001-A',
    documentTypeId: 'DT-INV',
    filePath: '/documents/PUR-MTR-001-A/invoice.pdf',
    facetInstanceIds: ['FI-DOC-PUR-001-A-INV-001'],
    issueDate: '2024-01-31',
    recipient: '自社',
    createdAt: now,
    updatedAt: now,
  },

  // PUR-ENC-001 エンコーダ
  {
    id: 'DOC-PUR-002-A-PO-001',
    documentNumber: 'PO-2024-002',
    title: 'エンコーダ 発注書',
    itemRevId: 'REV-PUR-002-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-ENC-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-002-A-PO-001'],
    issueDate: '2024-01-12',
    recipient: 'ヘイデンハイン株式会社',
    createdAt: now,
    updatedAt: now,
  },

  // PUR-CPU-001 マイコン
  {
    id: 'DOC-PUR-004-A-PO-001',
    documentNumber: 'PO-2024-003',
    title: 'マイコン 発注書',
    itemRevId: 'REV-PUR-004-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-CPU-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-004-A-PO-001'],
    issueDate: '2024-01-15',
    recipient: 'STマイクロエレクトロニクス株式会社',
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BRG-001 ベアリング
  {
    id: 'DOC-PUR-007-A-PO-001',
    documentNumber: 'PO-2024-004',
    title: 'ベアリング 発注書',
    itemRevId: 'REV-PUR-007-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-BRG-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-007-A-PO-001'],
    issueDate: '2024-01-08',
    recipient: 'NSK株式会社',
    createdAt: now,
    updatedAt: now,
  },

  // AGV用購入品
  // PUR-LDR-001 LiDARセンサー
  {
    id: 'DOC-PUR-012-A-PO-001',
    documentNumber: 'PO-2024-005',
    title: 'LiDARセンサー 発注書',
    itemRevId: 'REV-PUR-012-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-LDR-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-012-A-PO-001'],
    issueDate: '2024-02-01',
    recipient: 'Velodyne Lidar Japan株式会社',
    createdAt: now,
    updatedAt: now,
  },

  // PUR-BAT-001 リチウムイオン電池
  {
    id: 'DOC-PUR-014-A-PO-001',
    documentNumber: 'PO-2024-006',
    title: 'リチウムイオン電池 発注書',
    itemRevId: 'REV-PUR-014-A',
    documentTypeId: 'DT-PO',
    filePath: '/documents/PUR-BAT-001-A/po.pdf',
    facetInstanceIds: ['FI-DOC-PUR-014-A-PO-001'],
    issueDate: '2024-02-05',
    recipient: 'パナソニック株式会社',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 出荷帳票
// ============================================

export const shipmentDocuments: Document[] = [
  // PRD-ARM-1000 出荷検査表
  {
    id: 'DOC-PRD-001-B-SI-001',
    documentNumber: 'SI-2024-001',
    title: '産業用ロボットアーム ARM-1000 出荷検査表',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-SI',
    filePath: '/documents/PRD-ARM-1000-B/shipment-inspection.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-SI-001'],
    issueDate: '2024-03-15',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PRD-001-B-DN-001',
    documentNumber: 'DN-2024-002',
    title: '産業用ロボットアーム ARM-1000 納品書',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-DN',
    filePath: '/documents/PRD-ARM-1000-B/delivery-note.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-DN-001'],
    issueDate: '2024-03-20',
    recipient: '株式会社ABC製作所',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'DOC-PRD-001-B-INV-001',
    documentNumber: 'INV-2024-002',
    title: '産業用ロボットアーム ARM-1000 請求書',
    itemRevId: 'REV-PRD-001-B',
    documentTypeId: 'DT-INV',
    filePath: '/documents/PRD-ARM-1000-B/invoice.pdf',
    facetInstanceIds: ['FI-DOC-PRD-001-B-INV-001'],
    issueDate: '2024-03-31',
    recipient: '株式会社ABC製作所',
    createdAt: now,
    updatedAt: now,
  },

  // PRD-AGV-2000 出荷検査表
  {
    id: 'DOC-PRD-002-A-SI-001',
    documentNumber: 'SI-2024-002',
    title: 'AGV AGV-2000 出荷検査表',
    itemRevId: 'REV-PRD-002-A',
    documentTypeId: 'DT-SI',
    filePath: '/documents/PRD-AGV-2000-A/shipment-inspection.pdf',
    facetInstanceIds: ['FI-DOC-PRD-002-A-SI-001'],
    issueDate: '2024-04-10',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全Document一覧
// ============================================

export const documents: Document[] = [
  ...productDocuments,
  ...assemblyDocuments,
  ...purchasedDocuments,
  ...shipmentDocuments,
];

/**
 * DocumentをIDで検索
 */
export function getDocumentById(id: string): Document | undefined {
  return documents.find((d) => d.id === id);
}

/**
 * ItemRevIdでDocumentを検索
 */
export function getDocumentsByItemRev(itemRevId: string): Document[] {
  return documents.filter((d) => d.itemRevId === itemRevId);
}

/**
 * DocumentTypeIdでDocumentをフィルタリング
 */
export function getDocumentsByType(documentTypeId: string): Document[] {
  return documents.filter((d) => d.documentTypeId === documentTypeId);
}
