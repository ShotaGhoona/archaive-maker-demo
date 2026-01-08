/**
 * DocumentType（帳票種類）ダミーデータ
 *
 * ユーザーが定義可能な帳票種類の定義
 * - 見積書（Quotation）
 * - 発注書（Purchase Order）
 * - 納品書（Delivery Note）
 * - 請求書（Invoice）
 * - 検査成績書（Inspection Report）
 * - 仕様書（Specification）
 */

import type { DocumentType } from '../types';

const now = '2024-01-01T00:00:00Z';

/**
 * 見積書
 */
export const quotationDocType: DocumentType = {
  id: 'DT-QUOTE',
  code: 'QUOTE',
  name: '見積書',
  description: '製品・部品の価格見積もりを提示する帳票',
  numberPrefix: 'QT',
  createdAt: now,
  updatedAt: now,
};

/**
 * 発注書
 */
export const purchaseOrderDocType: DocumentType = {
  id: 'DT-PO',
  code: 'PO',
  name: '発注書',
  description: '仕入先への発注内容を記載した帳票',
  numberPrefix: 'PO',
  createdAt: now,
  updatedAt: now,
};

/**
 * 納品書
 */
export const deliveryNoteDocType: DocumentType = {
  id: 'DT-DN',
  code: 'DN',
  name: '納品書',
  description: '製品・部品の納品内容を記載した帳票',
  numberPrefix: 'DN',
  createdAt: now,
  updatedAt: now,
};

/**
 * 請求書
 */
export const invoiceDocType: DocumentType = {
  id: 'DT-INV',
  code: 'INV',
  name: '請求書',
  description: '取引の代金請求を行う帳票',
  numberPrefix: 'INV',
  createdAt: now,
  updatedAt: now,
};

/**
 * 検査成績書
 */
export const inspectionReportDocType: DocumentType = {
  id: 'DT-IR',
  code: 'IR',
  name: '検査成績書',
  description: '製品・部品の検査結果を記録した帳票',
  numberPrefix: 'IR',
  createdAt: now,
  updatedAt: now,
};

/**
 * 仕様書
 */
export const specificationDocType: DocumentType = {
  id: 'DT-SPEC',
  code: 'SPEC',
  name: '仕様書',
  description: '製品・部品の技術仕様を記載した帳票',
  numberPrefix: 'SPEC',
  createdAt: now,
  updatedAt: now,
};

/**
 * 作業手順書
 */
export const workInstructionDocType: DocumentType = {
  id: 'DT-WI',
  code: 'WI',
  name: '作業手順書',
  description: '製造・組立の作業手順を記載した帳票',
  numberPrefix: 'WI',
  createdAt: now,
  updatedAt: now,
};

/**
 * 出荷検査表
 */
export const shipmentInspectionDocType: DocumentType = {
  id: 'DT-SI',
  code: 'SI',
  name: '出荷検査表',
  description: '出荷前の最終検査結果を記録した帳票',
  numberPrefix: 'SI',
  createdAt: now,
  updatedAt: now,
};

/**
 * 全DocumentType一覧
 */
export const documentTypes: DocumentType[] = [
  quotationDocType,
  purchaseOrderDocType,
  deliveryNoteDocType,
  invoiceDocType,
  inspectionReportDocType,
  specificationDocType,
  workInstructionDocType,
  shipmentInspectionDocType,
];

/**
 * DocumentTypeをIDで検索
 */
export function getDocumentTypeById(id: string): DocumentType | undefined {
  return documentTypes.find((dt) => dt.id === id);
}

/**
 * DocumentTypeをコードで検索
 */
export function getDocumentTypeByCode(code: string): DocumentType | undefined {
  return documentTypes.find((dt) => dt.code === code);
}
