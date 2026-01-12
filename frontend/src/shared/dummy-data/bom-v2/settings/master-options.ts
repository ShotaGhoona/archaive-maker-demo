/**
 * 選択肢マスタ用ダミーデータ
 * FacetTypeで使用する選択肢を一元管理
 */

export interface MasterOption {
  id: string;
  name: string;
  code: string;
  options: string[];
  usedByFacetTypes: string[];
  createdAt: string;
  updatedAt: string;
}

const now = '2024-01-01T00:00:00Z';

export const masterOptions: MasterOption[] = [
  {
    id: 'mo-001',
    name: '材質',
    code: 'MATERIAL',
    options: [
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
    usedByFacetTypes: ['基本設計属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-002',
    name: '表面処理',
    code: 'SURFACE_TREATMENT',
    options: [
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
    usedByFacetTypes: ['基本設計属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-003',
    name: '公差等級',
    code: 'TOLERANCE_CLASS',
    options: ['IT5', 'IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11', 'IT12'],
    usedByFacetTypes: ['基本設計属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-004',
    name: '保護等級（IP）',
    code: 'IP_CLASS',
    options: ['IP20', 'IP40', 'IP54', 'IP55', 'IP65', 'IP67', 'IP68'],
    usedByFacetTypes: ['電気特性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-005',
    name: '通貨',
    code: 'CURRENCY',
    options: ['JPY', 'USD', 'EUR', 'CNY'],
    usedByFacetTypes: ['調達属性', '帳票メタデータ'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-006',
    name: '製造工程',
    code: 'PROCESS',
    options: [
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
    usedByFacetTypes: ['製造属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-007',
    name: '製造拠点',
    code: 'MANUFACTURING_LOCATION',
    options: ['本社工場', '第二工場', '協力工場A', '協力工場B', '海外工場'],
    usedByFacetTypes: ['製造属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-008',
    name: '調達区分',
    code: 'PROCUREMENT_TYPE',
    options: ['内製', '外注', '購入'],
    usedByFacetTypes: ['調達属性'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-009',
    name: '適用規格',
    code: 'STANDARD',
    options: ['JIS', 'ISO', 'ANSI', 'DIN', 'BS', '社内規格'],
    usedByFacetTypes: ['図面メタデータ'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-010',
    name: '投影法',
    code: 'PROJECTION_METHOD',
    options: ['第一角法', '第三角法'],
    usedByFacetTypes: ['図面メタデータ'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mo-011',
    name: 'CADシステム',
    code: 'CAD_SYSTEM',
    options: [
      'SolidWorks',
      'AutoCAD',
      'CATIA',
      'NX',
      'Inventor',
      'Fusion 360',
      'Creo',
      'その他',
    ],
    usedByFacetTypes: ['図面メタデータ'],
    createdAt: now,
    updatedAt: now,
  },
];

export function getMasterOptionById(id: string): MasterOption | undefined {
  return masterOptions.find((mo) => mo.id === id);
}

export function getMasterOptionByCode(code: string): MasterOption | undefined {
  return masterOptions.find((mo) => mo.code === code);
}
