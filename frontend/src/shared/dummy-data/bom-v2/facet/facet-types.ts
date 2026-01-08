/**
 * FacetType定義
 *
 * 属性スキーマの定義。6種類のFacetTypeを用意：
 * - DESIGN_BASIC: 基本設計属性（材質・重量・寸法）
 * - DESIGN_ELECTRICAL: 電気特性（電圧・電流・消費電力）
 * - PROCUREMENT: 調達属性（仕入先・価格・リードタイム）
 * - MANUFACTURING: 製造属性（工程・設備・工数）
 * - DRAWING_META: 図面メタデータ（作成者・承認者・規格）
 * - DOCUMENT_META: 帳票メタデータ（作成者・承認者・有効期限）
 */

import type { FacetType } from '../types';

const now = '2024-01-01T00:00:00Z';

/**
 * 基本設計属性
 * 材質、重量、寸法、表面処理など
 */
export const designBasicFacetType: FacetType = {
  id: 'FT-DESIGN-BASIC',
  name: '基本設計属性',
  code: 'DESIGN_BASIC',
  category: 'Design',
  applicableItemTypes: ['Product', 'Assembly', 'Part'],
  description:
    '部品・製品の基本的な設計情報。材質、重量、寸法、表面処理などを管理します。',
  schema: {
    type: 'object',
    properties: {
      material: {
        type: 'string',
        title: '材質',
        description: '主要材質',
        enum: [
          'アルミニウム合金',
          'ステンレス鋼',
          '炭素鋼',
          '鋳鉄',
          '銅合金',
          '樹脂',
          'CFRP',
          'セラミック',
          '複合材',
          'その他',
        ],
      },
      weight: {
        type: 'number',
        title: '重量',
        description: '製品重量',
        unit: 'kg',
        minimum: 0,
      },
      dimensions: {
        type: 'string',
        title: '寸法',
        description: 'W x D x H (mm)',
      },
      surfaceTreatment: {
        type: 'string',
        title: '表面処理',
        enum: [
          'なし',
          'アルマイト',
          '硬質アルマイト',
          'ニッケルメッキ',
          'クロムメッキ',
          '亜鉛メッキ',
          '塗装',
          '粉体塗装',
          '研磨',
          'ショットブラスト',
        ],
      },
      toleranceClass: {
        type: 'string',
        title: '公差等級',
        description: 'JIS規格の公差等級',
        enum: ['IT5', 'IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11', 'IT12'],
      },
      color: {
        type: 'string',
        title: '色',
        description: '外観色',
      },
    },
    required: ['material'],
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 電気特性（設計属性の一部として）
 * 電圧、電流、消費電力、保護等級
 */
export const designElectricalFacetType: FacetType = {
  id: 'FT-DESIGN-ELEC',
  name: '電気特性',
  code: 'DESIGN_ELECTRICAL',
  category: 'Design',
  applicableItemTypes: ['Assembly', 'Part', 'Purchased'],
  description: '電気・電子部品の電気特性。電圧、電流、保護等級などを管理します。',
  schema: {
    type: 'object',
    properties: {
      ratedVoltage: {
        type: 'number',
        title: '定格電圧',
        unit: 'V',
        minimum: 0,
      },
      ratedCurrent: {
        type: 'number',
        title: '定格電流',
        unit: 'A',
        minimum: 0,
      },
      powerConsumption: {
        type: 'number',
        title: '消費電力',
        unit: 'W',
        minimum: 0,
      },
      protectionClass: {
        type: 'string',
        title: '保護等級',
        description: 'IP規格',
        enum: ['IP20', 'IP40', 'IP54', 'IP55', 'IP65', 'IP67', 'IP68'],
      },
      operatingTemp: {
        type: 'string',
        title: '動作温度範囲',
        description: '例: -10℃ ~ +60℃',
      },
    },
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 調達属性
 * 仕入先、価格、リードタイム、最小発注数量
 */
export const procurementFacetType: FacetType = {
  id: 'FT-PROCUREMENT',
  name: '調達属性',
  code: 'PROCUREMENT',
  category: 'Procurement',
  applicableItemTypes: ['Part', 'Purchased', 'RawMaterial'],
  description:
    '部品の調達に関する情報。仕入先、価格、リードタイムなどを管理します。',
  schema: {
    type: 'object',
    properties: {
      supplierName: {
        type: 'string',
        title: '仕入先名',
        description: '主要サプライヤー名',
      },
      supplierCode: {
        type: 'string',
        title: '仕入先コード',
      },
      supplierPartNumber: {
        type: 'string',
        title: '仕入先品番',
        description: 'サプライヤー側の品番',
      },
      unitPrice: {
        type: 'number',
        title: '単価',
        unit: '円',
        minimum: 0,
      },
      currency: {
        type: 'string',
        title: '通貨',
        enum: ['JPY', 'USD', 'EUR', 'CNY'],
        default: 'JPY',
      },
      moq: {
        type: 'number',
        title: '最小発注数量',
        description: 'Minimum Order Quantity',
        minimum: 1,
      },
      leadTimeDays: {
        type: 'number',
        title: 'リードタイム',
        unit: '日',
        minimum: 0,
      },
      procurementType: {
        type: 'string',
        title: '調達区分',
        enum: ['内製', '外注', '購入'],
      },
      alternateSupplier: {
        type: 'string',
        title: '代替サプライヤー',
      },
    },
    required: ['supplierName', 'unitPrice'],
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 製造属性
 * 製造工程、ワークセンター、標準工数、段取時間
 */
export const manufacturingFacetType: FacetType = {
  id: 'FT-MANUFACTURING',
  name: '製造属性',
  code: 'MANUFACTURING',
  category: 'Manufacturing',
  applicableItemTypes: ['Product', 'Assembly', 'Part'],
  description:
    '製造に関する情報。製造工程、標準工数、必要設備などを管理します。',
  schema: {
    type: 'object',
    properties: {
      processName: {
        type: 'string',
        title: '工程名',
        description: '主要製造工程',
        enum: [
          '機械加工',
          '溶接',
          '板金加工',
          '表面処理',
          '組立',
          '検査',
          'はんだ付け',
          '射出成形',
          '鋳造',
          '鍛造',
        ],
      },
      workCenter: {
        type: 'string',
        title: 'ワークセンター',
        description: '製造を行う作業場所',
      },
      standardTime: {
        type: 'number',
        title: '標準工数',
        unit: '分',
        minimum: 0,
      },
      setupTime: {
        type: 'number',
        title: '段取時間',
        unit: '分',
        minimum: 0,
      },
      equipmentRequired: {
        type: 'string',
        title: '必要設備',
        description: '製造に必要な設備・機械',
      },
      manufacturingLocation: {
        type: 'string',
        title: '製造拠点',
        enum: ['本社工場', '第二工場', '協力工場A', '協力工場B', '海外工場'],
      },
      lotSize: {
        type: 'number',
        title: '標準ロットサイズ',
        minimum: 1,
      },
    },
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 図面メタデータ
 * 作成者、承認者、使用規格、改訂履歴など
 */
export const drawingMetaFacetType: FacetType = {
  id: 'FT-DRAWING-META',
  name: '図面メタデータ',
  code: 'DRAWING_META',
  category: 'Drawing',
  applicableItemTypes: ['Product', 'Assembly', 'Part'],
  description: '図面に関するメタデータ。作成者、承認者、使用規格などを管理します。',
  schema: {
    type: 'object',
    properties: {
      drawnBy: {
        type: 'string',
        title: '作成者',
        description: '図面作成者の名前',
      },
      checkedBy: {
        type: 'string',
        title: '検図者',
        description: '検図担当者の名前',
      },
      approvedBy: {
        type: 'string',
        title: '承認者',
        description: '図面承認者の名前',
      },
      drawnDate: {
        type: 'string',
        title: '作成日',
        description: '図面作成日（YYYY-MM-DD）',
      },
      standard: {
        type: 'string',
        title: '適用規格',
        description: '図面に適用される規格',
        enum: ['JIS', 'ISO', 'ANSI', 'DIN', 'BS', '社内規格'],
      },
      projectionMethod: {
        type: 'string',
        title: '投影法',
        enum: ['第一角法', '第三角法'],
      },
      scale: {
        type: 'string',
        title: '尺度',
        description: '例: 1:1, 1:2, 2:1',
      },
      cadSystem: {
        type: 'string',
        title: 'CADシステム',
        enum: ['SolidWorks', 'AutoCAD', 'CATIA', 'NX', 'Inventor', 'Fusion 360', 'Creo', 'その他'],
      },
      revisionHistory: {
        type: 'string',
        title: '改訂履歴',
        description: '改訂内容の概要',
      },
    },
    required: ['drawnBy'],
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 帳票メタデータ
 * 作成者、承認者、有効期限、関連帳票など
 */
export const documentMetaFacetType: FacetType = {
  id: 'FT-DOCUMENT-META',
  name: '帳票メタデータ',
  code: 'DOCUMENT_META',
  category: 'Document',
  applicableItemTypes: ['Product', 'Assembly', 'Part', 'Purchased', 'RawMaterial'],
  description: '帳票に関するメタデータ。作成者、承認者、有効期限などを管理します。',
  schema: {
    type: 'object',
    properties: {
      createdBy: {
        type: 'string',
        title: '作成者',
        description: '帳票作成者の名前',
      },
      approvedBy: {
        type: 'string',
        title: '承認者',
        description: '帳票承認者の名前',
      },
      createdDate: {
        type: 'string',
        title: '作成日',
        description: '帳票作成日（YYYY-MM-DD）',
      },
      validUntil: {
        type: 'string',
        title: '有効期限',
        description: '見積書など有効期限がある場合（YYYY-MM-DD）',
      },
      currency: {
        type: 'string',
        title: '通貨',
        enum: ['JPY', 'USD', 'EUR', 'CNY'],
        default: 'JPY',
      },
      totalAmount: {
        type: 'number',
        title: '合計金額',
        unit: '円',
        minimum: 0,
      },
      taxRate: {
        type: 'number',
        title: '消費税率',
        unit: '%',
        minimum: 0,
        maximum: 100,
      },
      paymentTerms: {
        type: 'string',
        title: '支払条件',
        description: '例: 月末締め翌月末払い',
      },
      deliveryTerms: {
        type: 'string',
        title: '納品条件',
        description: '例: 工場渡し、客先納入',
      },
      relatedDocumentIds: {
        type: 'array',
        title: '関連帳票ID',
        description: '関連する帳票のIDリスト',
      },
      notes: {
        type: 'string',
        title: '備考',
        description: '特記事項',
      },
    },
    required: ['createdBy'],
  },
  createdAt: now,
  updatedAt: now,
};

/**
 * 全FacetType一覧
 */
export const facetTypes: FacetType[] = [
  designBasicFacetType,
  designElectricalFacetType,
  procurementFacetType,
  manufacturingFacetType,
  drawingMetaFacetType,
  documentMetaFacetType,
];

/**
 * FacetTypeをIDで検索
 */
export function getFacetTypeById(id: string): FacetType | undefined {
  return facetTypes.find((ft) => ft.id === id);
}

/**
 * FacetTypeをコードで検索
 */
export function getFacetTypeByCode(code: string): FacetType | undefined {
  return facetTypes.find((ft) => ft.code === code);
}

/**
 * カテゴリでFacetTypeをフィルタリング
 */
export function getFacetTypesByCategory(
  category: 'Design' | 'Procurement' | 'Manufacturing' | 'Drawing' | 'Document'
): FacetType[] {
  return facetTypes.filter((ft) => ft.category === category);
}
