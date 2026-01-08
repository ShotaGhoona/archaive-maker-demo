/**
 * BOM v2 型定義
 *
 * BizPM設計に基づく新しいデータ構造
 * - Item: 品番の器（不変の名札）
 * - ItemRev: 品番の版（BOMが参照する最小単位）
 * - BOMHeader: 構成表の表紙
 * - BOMLine: 構成明細
 * - FacetType: 属性スキーマ
 * - FacetInstance: 属性値
 */

// ============================================
// 基本列挙型
// ============================================

/** ライフサイクル状態 - Itemの全体的な状態 */
export type LifecycleState =
  | 'Concept' // 構想段階
  | 'Development' // 開発中
  | 'Production' // 量産中
  | 'Discontinued' // 生産終了
  | 'Obsolete'; // 廃止

/** リビジョンステータス - ItemRevの承認状態 */
export type RevisionStatus =
  | 'Draft' // 下書き
  | 'InReview' // レビュー中
  | 'Released' // リリース済み
  | 'Obsolete'; // 廃止

/** アイテムタイプ */
export type ItemType =
  | 'Product' // 完成品
  | 'Assembly' // アセンブリ（組立品）
  | 'Part' // 製造部品
  | 'Purchased' // 購入品
  | 'RawMaterial'; // 原材料

/** BOM種別 */
export type BomType =
  | 'EBOM' // Engineering BOM（設計BOM）
  | 'MBOM'; // Manufacturing BOM（製造BOM）

/** Facetカテゴリ */
export type FacetCategory =
  | 'Design' // 設計属性
  | 'Procurement' // 調達属性
  | 'Manufacturing' // 製造属性
  | 'Drawing' // 図面属性
  | 'Document'; // 帳票属性

// ============================================
// Item - 品番の器（不変の名札）
// ============================================

export interface Item {
  /** ID (ULID形式) */
  id: string;
  /** 品番（P/N）例: "PRD-ARM-1000" */
  partNumber: string;
  /** 品名 */
  name: string;
  /** アイテムタイプ */
  itemType: ItemType;
  /** ライフサイクル状態 */
  lifecycleState: LifecycleState;
  /** カテゴリ分類 */
  category?: string;
  /** 説明 */
  description?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// ItemRev - 品番の版（BOMが参照する最小単位）
// ============================================

export interface ItemRev {
  /** ID (ULID形式) */
  id: string;
  /** 親ItemのID */
  itemId: string;
  /** リビジョン記号 "A", "B", "C"... */
  revision: string;
  /** リビジョンステータス */
  status: RevisionStatus;
  /** 有効開始日 */
  effectiveDate?: string;
  /** 有効終了日 */
  expirationDate?: string;
  /** 変更理由 */
  changeNote?: string;
  /** FacetInstanceのIDリスト */
  facetInstanceIds: string[];
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// BOMHeader - 親ItemRevに対する構成表の表紙
// ============================================

export interface BOMHeader {
  /** ID (ULID形式) */
  id: string;
  /** 親ItemRevのID */
  parentItemRevId: string;
  /** BOM種別（EBOM or MBOM） */
  bomType: BomType;
  /** BOMバージョン（同じ親Revに複数バージョン可） */
  version: number;
  /** BOMのステータス */
  status: RevisionStatus;
  /** BOM説明 */
  description?: string;
  /** 有効開始日 */
  effectiveDate?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// BOMLine - 子ItemRevと数量を結びつける
// ============================================

export interface BOMLine {
  /** ID (ULID形式) */
  id: string;
  /** 所属するBOMHeaderのID */
  bomHeaderId: string;
  /** 子ItemRevのID */
  childItemRevId: string;
  /** 表示順序 */
  sequence: number;
  /** 員数 */
  quantity: number;
  /** 単位（"EA", "kg", "m"等） */
  unit: string;
  /** 照合番号（図面のバルーン番号等） */
  findNumber?: string;
  /** 参照識別子（電子部品のR1,C1等） */
  referenceDesignator?: string;
  /** 備考 */
  notes?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// FacetType - 属性の型定義（JSONスキーマ）
// ============================================

export interface FacetType {
  /** ID (ULID形式) */
  id: string;
  /** 属性タイプ名 */
  name: string;
  /** コード（一意識別子） */
  code: string;
  /** 属性カテゴリ */
  category: FacetCategory;
  /** JSONスキーマ定義 */
  schema: FacetSchema;
  /** このFacetTypeが適用可能なItemType */
  applicableItemTypes: ItemType[];
  /** 説明 */
  description?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

/** JSONスキーマ（簡易版） */
export interface FacetSchema {
  type: 'object';
  properties: Record<string, FacetSchemaProperty>;
  required?: string[];
}

/** スキーマプロパティ */
export interface FacetSchemaProperty {
  /** データ型 */
  type: 'string' | 'number' | 'boolean' | 'array';
  /** 表示ラベル */
  title: string;
  /** 説明 */
  description?: string;
  /** 選択肢 */
  enum?: (string | number)[];
  /** デフォルト値 */
  default?: unknown;
  /** 単位（mm, kg等） */
  unit?: string;
  /** 最小値 */
  minimum?: number;
  /** 最大値 */
  maximum?: number;
}

// ============================================
// FacetInstance - 実際の属性値
// ============================================

export interface FacetInstance {
  /** ID (ULID形式) */
  id: string;
  /** FacetTypeのID */
  facetTypeId: string;
  /** 実際の値（FacetTypeのスキーマに準拠） */
  values: Record<string, unknown>;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// DocumentType - 帳票種類（ユーザー定義可能）
// ============================================

export interface DocumentType {
  /** ID (ULID形式) */
  id: string;
  /** 帳票種類コード 例: "QUOTE", "PO", "DN" */
  code: string;
  /** 帳票種類名 例: "見積書", "発注書", "納品書" */
  name: string;
  /** 説明 */
  description?: string;
  /** 帳票番号の採番ルール（プレフィックス） */
  numberPrefix: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// Drawing - 図面（ItemRevに紐づく）
// ============================================

export interface Drawing {
  /** ID (ULID形式) */
  id: string;
  /** 図面番号 例: "DWG-PRT-GER-001-B" */
  drawingNumber: string;
  /** 図面タイトル */
  title: string;
  /** 紐づくItemRevのID */
  itemRevId: string;
  /** 図面タイプ 例: "組立図", "部品図", "配線図" */
  drawingType: string;
  /** 図面サイズ 例: "A1", "A2", "A3", "A4" */
  sheetSize: string;
  /** シート番号 */
  sheetNumber: number;
  /** 総シート数 */
  totalSheets: number;
  /** S3パス（ファイル格納場所） */
  s3Path?: string;
  /** 紐づくFacetInstanceのIDリスト */
  facetInstanceIds: string[];
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

// ============================================
// Document - 帳票（ItemRevに紐づく）
// ============================================

export interface Document {
  /** ID (ULID形式) */
  id: string;
  /** 帳票番号 例: "QT-2024-001" */
  documentNumber: string;
  /** 帳票タイトル */
  title: string;
  /** 紐づくItemRevのID */
  itemRevId: string;
  /** 帳票種類のID（DocumentType参照） */
  documentTypeId: string;
  /** S3パス（ファイル格納場所） */
  s3Path?: string;
  /** 紐づくFacetInstanceのIDリスト */
  facetInstanceIds: string[];
  /** 発行日 */
  issueDate?: string;
  /** 宛先（取引先名など） */
  recipient?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

