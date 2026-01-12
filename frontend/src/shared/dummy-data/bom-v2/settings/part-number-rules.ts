/**
 * 品番体系用ダミーデータ
 * アイテムタイプごとの品番採番ルール
 */

import type { ItemType } from '../types';

export interface PartNumberCategory {
  code: string;
  name: string;
}

export interface PartNumberRule {
  id: string;
  itemType: ItemType;
  itemTypeName: string;
  prefix: string;
  format: string;
  example: string;
  startNumber: number;
  categories: PartNumberCategory[];
  createdAt: string;
  updatedAt: string;
}

const now = '2024-01-01T00:00:00Z';

export const partNumberRules: PartNumberRule[] = [
  {
    id: 'pnr-001',
    itemType: 'Product',
    itemTypeName: '完成品',
    prefix: 'PRD-',
    format: 'PRD-{カテゴリ}-{連番4桁}',
    example: 'PRD-ARM-1000',
    startNumber: 1000,
    categories: [
      { code: 'ARM', name: 'ロボットアーム' },
      { code: 'AGV', name: '無人搬送車' },
      { code: 'CNC', name: 'CNC工作機械' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'pnr-002',
    itemType: 'Assembly',
    itemTypeName: 'アセンブリ',
    prefix: 'ASY-',
    format: 'ASY-{カテゴリ}-{連番3桁}',
    example: 'ASY-BASE-100',
    startNumber: 100,
    categories: [
      { code: 'BASE', name: 'ベースユニット' },
      { code: 'DRV', name: '駆動ユニット' },
      { code: 'CTRL', name: '制御ユニット' },
      { code: 'SENS', name: 'センサーユニット' },
      { code: 'FRM', name: 'フレーム' },
      { code: 'ARM', name: 'アーム' },
      { code: 'END', name: 'エンドエフェクター' },
      { code: 'PWR', name: '電源' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'pnr-003',
    itemType: 'Part',
    itemTypeName: '製造部品',
    prefix: 'PRT-',
    format: 'PRT-{カテゴリ}-{連番3桁}',
    example: 'PRT-GER-001',
    startNumber: 1,
    categories: [
      { code: 'GER', name: 'ギア類' },
      { code: 'PLT', name: 'プレート類' },
      { code: 'SFT', name: 'シャフト類' },
      { code: 'BRK', name: 'ブラケット類' },
      { code: 'HSG', name: 'ハウジング類' },
      { code: 'COL', name: '支柱類' },
      { code: 'ARM', name: 'アーム部材' },
      { code: 'JNT', name: 'ジョイント' },
      { code: 'CVR', name: 'カバー' },
      { code: 'PCB', name: '基板' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'pnr-004',
    itemType: 'Purchased',
    itemTypeName: '購入品',
    prefix: 'PUR-',
    format: 'PUR-{カテゴリ}-{連番3桁}',
    example: 'PUR-MTR-001',
    startNumber: 1,
    categories: [
      { code: 'MTR', name: 'モーター' },
      { code: 'BRG', name: 'ベアリング' },
      { code: 'SNS', name: 'センサー' },
      { code: 'ELC', name: '電子部品' },
      { code: 'FST', name: 'ファスナー' },
      { code: 'ENC', name: 'エンコーダ' },
      { code: 'DRV', name: 'ドライバIC' },
      { code: 'PSU', name: '電源' },
      { code: 'CBL', name: 'ケーブル' },
      { code: 'BAT', name: 'バッテリー' },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'pnr-005',
    itemType: 'RawMaterial',
    itemTypeName: '原材料',
    prefix: 'RAW-',
    format: 'RAW-{材質}-{連番3桁}',
    example: 'RAW-ALM-001',
    startNumber: 1,
    categories: [
      { code: 'ALM', name: 'アルミ' },
      { code: 'SUS', name: 'ステンレス' },
      { code: 'STL', name: '鉄鋼' },
      { code: 'COP', name: '銅' },
      { code: 'PLA', name: '樹脂' },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

export function getPartNumberRuleById(id: string): PartNumberRule | undefined {
  return partNumberRules.find((r) => r.id === id);
}

export function getPartNumberRuleByItemType(
  itemType: ItemType
): PartNumberRule | undefined {
  return partNumberRules.find((r) => r.itemType === itemType);
}
