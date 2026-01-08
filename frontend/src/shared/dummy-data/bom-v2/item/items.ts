/**
 * Itemダミーデータ
 *
 * 品番体系:
 * - PRD-xxx: Product（完成品）
 * - ASY-xxx: Assembly（アセンブリ）
 * - PRT-xxx: Part（製造部品）
 * - PUR-xxx: Purchased（購入品）
 * - RAW-xxx: RawMaterial（原材料）
 */

import type { Item } from '../types';

const now = '2024-01-01T00:00:00Z';

// ============================================
// 完成品（Product）
// ============================================

export const productItems: Item[] = [
  {
    id: 'ITEM-PRD-001',
    partNumber: 'PRD-ARM-1000',
    name: '産業用ロボットアーム ARM-1000',
    itemType: 'Product',
    lifecycleState: 'Production',
    category: '産業機械',
    description: '6軸産業用ロボットアーム。最大可搬重量10kg、リーチ1000mm。',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRD-002',
    partNumber: 'PRD-AGV-2000',
    name: 'AGV（自動搬送車）AGV-2000',
    itemType: 'Product',
    lifecycleState: 'Production',
    category: '搬送機械',
    description: '自律走行型無人搬送車。最大積載量500kg、LiDARナビゲーション搭載。',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// アセンブリ（Assembly）
// ============================================

export const assemblyItems: Item[] = [
  // ベースユニット系
  {
    id: 'ITEM-ASY-001',
    partNumber: 'ASY-BASE-100',
    name: 'ベースユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '機構部品',
    description: 'ロボットアームの基台となるユニット',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-002',
    partNumber: 'ASY-DRV-110',
    name: '駆動システム',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'ベース部の回転駆動機構',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-003',
    partNumber: 'ASY-FRM-120',
    name: 'フレーム構造',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'ベースユニットの骨格構造',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-004',
    partNumber: 'ASY-CTL-130',
    name: '制御ボード',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'モーター制御用基板アセンブリ',
    createdAt: now,
    updatedAt: now,
  },

  // アームユニット系
  {
    id: 'ITEM-ASY-005',
    partNumber: 'ASY-ARM-200',
    name: 'アームユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '機構部品',
    description: 'ロボットアームの本体部分',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-006',
    partNumber: 'ASY-J1-210',
    name: '第1関節',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'ショルダー関節（肩）',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-007',
    partNumber: 'ASY-J2-220',
    name: '第2関節',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'エルボー関節（肘）',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-008',
    partNumber: 'ASY-J3-230',
    name: '第3関節',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'リスト関節（手首）',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-009',
    partNumber: 'ASY-LNK-240',
    name: 'リンク機構',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '機構部品',
    description: '関節間を接続するリンク部',
    createdAt: now,
    updatedAt: now,
  },

  // エンドエフェクター系
  {
    id: 'ITEM-ASY-010',
    partNumber: 'ASY-END-300',
    name: 'エンドエフェクター',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '機構部品',
    description: 'ロボットアーム先端のツール取付部',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-011',
    partNumber: 'ASY-GRP-310',
    name: 'グリッパー機構',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '機構部品',
    description: '把持機構（電動グリッパー）',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-012',
    partNumber: 'ASY-SNS-320',
    name: 'センサーユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '電子部品',
    description: '力覚・近接センサーユニット',
    createdAt: now,
    updatedAt: now,
  },

  // 電源・配線系
  {
    id: 'ITEM-ASY-013',
    partNumber: 'ASY-PWR-400',
    name: '電源ユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'AC-DC電源変換ユニット',
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用アセンブリ
  // ============================================

  // シャーシユニット
  {
    id: 'ITEM-ASY-014',
    partNumber: 'ASY-CHS-500',
    name: 'シャーシユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'AGV本体フレームとホイールモジュールを統合したシャーシ',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-ASY-015',
    partNumber: 'ASY-WHM-510',
    name: 'ホイールモジュール',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'モーター・ホイール・減速機を統合した駆動ユニット',
    createdAt: now,
    updatedAt: now,
  },

  // ナビゲーションユニット
  {
    id: 'ITEM-ASY-016',
    partNumber: 'ASY-NAV-600',
    name: 'ナビゲーションユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: 'センサー',
    description: 'LiDARとカメラによる自律走行ナビゲーションシステム',
    createdAt: now,
    updatedAt: now,
  },

  // バッテリーユニット
  {
    id: 'ITEM-ASY-017',
    partNumber: 'ASY-BAT-700',
    name: 'バッテリーユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'リチウムイオンバッテリーとBMSを統合した電源ユニット',
    createdAt: now,
    updatedAt: now,
  },

  // 搬送台ユニット
  {
    id: 'ITEM-ASY-018',
    partNumber: 'ASY-LDU-800',
    name: '搬送台ユニット',
    itemType: 'Assembly',
    lifecycleState: 'Production',
    category: '構造部品',
    description: '荷物を載せるプラットフォームユニット',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 製造部品（Part）
// ============================================

export const partItems: Item[] = [
  {
    id: 'ITEM-PRT-001',
    partNumber: 'PRT-GER-001',
    name: '減速ギア RG-50',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '機構部品',
    description: '遊星歯車減速機 減速比1:50',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-002',
    partNumber: 'PRT-PLT-001',
    name: 'ベースプレート',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'アルミ製ベースプレート 300x300x20mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-003',
    partNumber: 'PRT-COL-001',
    name: '支柱',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'アルミ押出支柱 φ60x500mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-004',
    partNumber: 'PRT-SFT-001',
    name: 'シャフト',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '機構部品',
    description: '駆動用シャフト φ20x150mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-005',
    partNumber: 'PRT-ARM-001',
    name: 'アーム部材',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'アルミ製アームリンク 400mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-006',
    partNumber: 'PRT-JNT-001',
    name: 'ジョイント',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '機構部品',
    description: '関節ジョイント部品',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-007',
    partNumber: 'PRT-FNG-001',
    name: 'フィンガー部品',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '機構部品',
    description: 'グリッパー用フィンガー',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-008',
    partNumber: 'PRT-HSG-001',
    name: 'ハウジング',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'モーターハウジング',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-009',
    partNumber: 'PRT-CVR-001',
    name: 'カバー',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: '関節部カバー（樹脂製）',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-010',
    partNumber: 'PRT-PCB-001',
    name: '制御基板',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'モータードライバ基板',
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用製造部品
  // ============================================
  {
    id: 'ITEM-PRT-011',
    partNumber: 'PRT-WHL-001',
    name: '駆動ホイール',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'ウレタンホイール φ200mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-012',
    partNumber: 'PRT-MTB-001',
    name: 'モーターブラケット',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'ホイールモジュール用モーター取付ブラケット',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-013',
    partNumber: 'PRT-FRM-002',
    name: 'シャーシフレーム',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: 'AGV本体フレーム 800x600mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PRT-014',
    partNumber: 'PRT-PLF-001',
    name: 'プラットフォーム',
    itemType: 'Part',
    lifecycleState: 'Production',
    category: '構造部品',
    description: '搬送台プレート 600x400x10mm',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 購入品（Purchased）
// ============================================

export const purchasedItems: Item[] = [
  // モーター類
  {
    id: 'ITEM-PUR-001',
    partNumber: 'PUR-MTR-001',
    name: 'ACサーボモーター 200W',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '駆動系',
    description: '安川電機製 Σ-7シリーズ 200W',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-002',
    partNumber: 'PUR-MTR-002',
    name: 'ACサーボモーター 400W',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '駆動系',
    description: '安川電機製 Σ-7シリーズ 400W',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-003',
    partNumber: 'PUR-MTR-003',
    name: 'ACサーボモーター 100W',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '駆動系',
    description: '安川電機製 Σ-7シリーズ 100W',
    createdAt: now,
    updatedAt: now,
  },

  // センサー類
  {
    id: 'ITEM-PUR-004',
    partNumber: 'PUR-ENC-001',
    name: 'アブソリュートエンコーダ',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: 'センサー',
    description: '多回転アブソリュートエンコーダ 17bit',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-005',
    partNumber: 'PUR-FSR-001',
    name: '力覚センサー',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: 'センサー',
    description: '6軸力覚センサー ±100N',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-006',
    partNumber: 'PUR-PXS-001',
    name: '近接センサー',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: 'センサー',
    description: '誘導型近接センサー 検出距離8mm',
    createdAt: now,
    updatedAt: now,
  },

  // 機械部品
  {
    id: 'ITEM-PUR-007',
    partNumber: 'PUR-BRG-001',
    name: 'ベアリング',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '機構部品',
    description: 'アンギュラ玉軸受 7206C',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-008',
    partNumber: 'PUR-BLT-001',
    name: 'ボルトM8x25',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '締結部品',
    description: '六角ボルト M8x25 SUS304',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-009',
    partNumber: 'PUR-BLT-002',
    name: 'ボルトM6x20',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '締結部品',
    description: '六角ボルト M6x20 SUS304',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-010',
    partNumber: 'PUR-NUT-001',
    name: 'ナットM8',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '締結部品',
    description: '六角ナット M8 SUS304',
    createdAt: now,
    updatedAt: now,
  },

  // 電子部品
  {
    id: 'ITEM-PUR-011',
    partNumber: 'PUR-CPU-001',
    name: 'マイコン STM32',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'STM32F407VGT6 ARM Cortex-M4',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-012',
    partNumber: 'PUR-CAP-001',
    name: 'コンデンサ 100μF',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'アルミ電解コンデンサ 100μF 50V',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-013',
    partNumber: 'PUR-RES-001',
    name: '抵抗 10kΩ',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'チップ抵抗 10kΩ 1/4W',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-014',
    partNumber: 'PUR-DRV-001',
    name: 'モータードライバIC',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'DRV8301 3相モータードライバ',
    createdAt: now,
    updatedAt: now,
  },

  // アクチュエータ
  {
    id: 'ITEM-PUR-015',
    partNumber: 'PUR-ACT-001',
    name: '電動アクチュエータ',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '駆動系',
    description: '電動シリンダ ストローク50mm',
    createdAt: now,
    updatedAt: now,
  },

  // ケーブル類
  {
    id: 'ITEM-PUR-016',
    partNumber: 'PUR-CBL-001',
    name: 'ケーブルハーネス',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '配線部品',
    description: '内部配線ハーネス一式',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-017',
    partNumber: 'PUR-CON-001',
    name: 'コネクタ',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '配線部品',
    description: '防水コネクタ 12pin',
    createdAt: now,
    updatedAt: now,
  },

  // 電源部品
  {
    id: 'ITEM-PUR-018',
    partNumber: 'PUR-PSU-001',
    name: 'スイッチング電源',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'AC-DC電源 48V 10A',
    createdAt: now,
    updatedAt: now,
  },

  // ============================================
  // AGV用購入品
  // ============================================
  {
    id: 'ITEM-PUR-019',
    partNumber: 'PUR-LDR-001',
    name: 'LiDARセンサー',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: 'センサー',
    description: '2D LiDARセンサー 検出距離30m',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-020',
    partNumber: 'PUR-CAM-001',
    name: 'カメラモジュール',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: 'センサー',
    description: '産業用カメラ 5MP USB3.0',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-021',
    partNumber: 'PUR-BAT-001',
    name: 'リチウムイオンバッテリー',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'Li-ionバッテリーパック 48V 30Ah',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-022',
    partNumber: 'PUR-BMS-001',
    name: 'バッテリーマネジメントシステム',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '電子部品',
    description: 'BMS 14S 48V 100A',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-PUR-023',
    partNumber: 'PUR-OMW-001',
    name: 'オムニホイール',
    itemType: 'Purchased',
    lifecycleState: 'Production',
    category: '駆動系',
    description: 'キャスター用オムニホイール φ100mm',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 原材料（RawMaterial）
// ============================================

export const rawMaterialItems: Item[] = [
  {
    id: 'ITEM-RAW-001',
    partNumber: 'RAW-ALM-001',
    name: 'アルミニウム合金板 A5052',
    itemType: 'RawMaterial',
    lifecycleState: 'Production',
    category: '金属材料',
    description: 'A5052-H34 板厚20mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-RAW-002',
    partNumber: 'RAW-SUS-001',
    name: 'ステンレス丸棒 SUS304',
    itemType: 'RawMaterial',
    lifecycleState: 'Production',
    category: '金属材料',
    description: 'SUS304 φ25mm',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'ITEM-RAW-003',
    partNumber: 'RAW-PLA-001',
    name: 'エンジニアリングプラスチック',
    itemType: 'RawMaterial',
    lifecycleState: 'Production',
    category: '樹脂材料',
    description: 'POM（ポリアセタール）ブロック',
    createdAt: now,
    updatedAt: now,
  },
];

// ============================================
// 全Item一覧
// ============================================

export const items: Item[] = [
  ...productItems,
  ...assemblyItems,
  ...partItems,
  ...purchasedItems,
  ...rawMaterialItems,
];

/**
 * ItemをIDで検索
 */
export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

/**
 * Itemを品番で検索
 */
export function getItemByPartNumber(partNumber: string): Item | undefined {
  return items.find((item) => item.partNumber === partNumber);
}

/**
 * ItemTypeでフィルタリング
 */
export function getItemsByType(
  itemType: 'Product' | 'Assembly' | 'Part' | 'Purchased' | 'RawMaterial'
): Item[] {
  return items.filter((item) => item.itemType === itemType);
}

/**
 * ライフサイクル状態でフィルタリング
 */
export function getItemsByLifecycle(
  state: 'Concept' | 'Development' | 'Production' | 'Discontinued' | 'Obsolete'
): Item[] {
  return items.filter((item) => item.lifecycleState === state);
}
