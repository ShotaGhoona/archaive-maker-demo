/**
 * タスクのダミーデータ（v2）
 * ItemRevと紐付いたタスク管理用
 */

import type { Task, TaskAssignee, TaskTargetObject } from './types';

/** ダミー部署一覧 */
export const dummyDepartments = [
  '設計部',
  '品質管理部',
  '購買部',
  '製造部',
  '生産技術部',
] as const;

export type Department = (typeof dummyDepartments)[number];

/** ダミーユーザー（中小製造業の従業員） */
export const dummyUsers: TaskAssignee[] = [
  {
    id: 'user-1',
    name: '山田太郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada',
    department: '設計部',
  },
  {
    id: 'user-2',
    name: '佐藤花子',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
    department: '品質管理部',
  },
  {
    id: 'user-3',
    name: '田中一郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
    department: '購買部',
  },
  {
    id: 'user-4',
    name: '鈴木健二',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
    department: '製造部',
  },
  {
    id: 'user-5',
    name: '高橋美咲',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi',
    department: '生産技術部',
  },
];

/** ダミー対象オブジェクト（ItemRevへの参照） */
export const dummyTargetObjects: TaskTargetObject[] = [
  // ============================================
  // 製品（Product）
  // ============================================
  {
    itemRevId: 'REV-PRD-001-B',
    itemId: 'ITEM-PRD-001',
    itemName: '産業用ロボットアーム ARM-1000',
    partNumber: 'PRD-ARM-1000',
    itemType: 'Product',
  },
  {
    itemRevId: 'REV-PRD-002-A',
    itemId: 'ITEM-PRD-002',
    itemName: 'AGV（自動搬送車）AGV-2000',
    partNumber: 'PRD-AGV-2000',
    itemType: 'Product',
  },

  // ============================================
  // アセンブリ（Assembly）- ロボットアーム
  // ============================================
  {
    itemRevId: 'REV-ASY-001-A',
    itemId: 'ITEM-ASY-001',
    itemName: 'ベースユニット',
    partNumber: 'ASY-BASE-100',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-002-B',
    itemId: 'ITEM-ASY-002',
    itemName: '駆動システム',
    partNumber: 'ASY-DRV-110',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-003-A',
    itemId: 'ITEM-ASY-003',
    itemName: 'フレーム構造',
    partNumber: 'ASY-FRM-120',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-004-B',
    itemId: 'ITEM-ASY-004',
    itemName: '制御ボード',
    partNumber: 'ASY-CTL-130',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-005-A',
    itemId: 'ITEM-ASY-005',
    itemName: 'アームユニット',
    partNumber: 'ASY-ARM-200',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-006-A',
    itemId: 'ITEM-ASY-006',
    itemName: '第1関節',
    partNumber: 'ASY-J1-210',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-007-A',
    itemId: 'ITEM-ASY-007',
    itemName: '第2関節',
    partNumber: 'ASY-J2-220',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-008-A',
    itemId: 'ITEM-ASY-008',
    itemName: '第3関節',
    partNumber: 'ASY-J3-230',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-009-A',
    itemId: 'ITEM-ASY-009',
    itemName: 'リンク機構',
    partNumber: 'ASY-LNK-240',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-010-A',
    itemId: 'ITEM-ASY-010',
    itemName: 'エンドエフェクター',
    partNumber: 'ASY-END-300',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-011-A',
    itemId: 'ITEM-ASY-011',
    itemName: 'グリッパー機構',
    partNumber: 'ASY-GRP-310',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-012-A',
    itemId: 'ITEM-ASY-012',
    itemName: 'センサーユニット',
    partNumber: 'ASY-SNS-320',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-013-A',
    itemId: 'ITEM-ASY-013',
    itemName: '電源ユニット',
    partNumber: 'ASY-PWR-400',
    itemType: 'Assembly',
  },

  // ============================================
  // アセンブリ（Assembly）- AGV
  // ============================================
  {
    itemRevId: 'REV-ASY-014-A',
    itemId: 'ITEM-ASY-014',
    itemName: 'シャーシユニット',
    partNumber: 'ASY-CHS-500',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-015-A',
    itemId: 'ITEM-ASY-015',
    itemName: 'ホイールモジュール',
    partNumber: 'ASY-WHM-510',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-016-A',
    itemId: 'ITEM-ASY-016',
    itemName: 'ナビゲーションユニット',
    partNumber: 'ASY-NAV-600',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-017-A',
    itemId: 'ITEM-ASY-017',
    itemName: 'バッテリーユニット',
    partNumber: 'ASY-BAT-700',
    itemType: 'Assembly',
  },
  {
    itemRevId: 'REV-ASY-018-A',
    itemId: 'ITEM-ASY-018',
    itemName: '搬送台ユニット',
    partNumber: 'ASY-LDU-800',
    itemType: 'Assembly',
  },

  // ============================================
  // 製造部品（Part）
  // ============================================
  {
    itemRevId: 'REV-PRT-001-B',
    itemId: 'ITEM-PRT-001',
    itemName: '減速ギア RG-50',
    partNumber: 'PRT-GER-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-002-A',
    itemId: 'ITEM-PRT-002',
    itemName: 'ベースプレート',
    partNumber: 'PRT-PLT-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-003-A',
    itemId: 'ITEM-PRT-003',
    itemName: '支柱',
    partNumber: 'PRT-COL-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-004-A',
    itemId: 'ITEM-PRT-004',
    itemName: 'シャフト',
    partNumber: 'PRT-SFT-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-005-A',
    itemId: 'ITEM-PRT-005',
    itemName: 'アーム部材',
    partNumber: 'PRT-ARM-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-006-A',
    itemId: 'ITEM-PRT-006',
    itemName: 'ジョイント',
    partNumber: 'PRT-JNT-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-007-A',
    itemId: 'ITEM-PRT-007',
    itemName: 'フィンガー部品',
    partNumber: 'PRT-FNG-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-008-A',
    itemId: 'ITEM-PRT-008',
    itemName: 'ハウジング',
    partNumber: 'PRT-HSG-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-009-A',
    itemId: 'ITEM-PRT-009',
    itemName: 'カバー',
    partNumber: 'PRT-CVR-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-010-A',
    itemId: 'ITEM-PRT-010',
    itemName: '制御基板',
    partNumber: 'PRT-PCB-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-011-A',
    itemId: 'ITEM-PRT-011',
    itemName: '駆動ホイール',
    partNumber: 'PRT-WHL-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-012-A',
    itemId: 'ITEM-PRT-012',
    itemName: 'モーターブラケット',
    partNumber: 'PRT-MTB-001',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-013-A',
    itemId: 'ITEM-PRT-013',
    itemName: 'シャーシフレーム',
    partNumber: 'PRT-FRM-002',
    itemType: 'Part',
  },
  {
    itemRevId: 'REV-PRT-014-A',
    itemId: 'ITEM-PRT-014',
    itemName: 'プラットフォーム',
    partNumber: 'PRT-PLF-001',
    itemType: 'Part',
  },

  // ============================================
  // 購入品（Purchased）
  // ============================================
  {
    itemRevId: 'REV-PUR-001-A',
    itemId: 'ITEM-PUR-001',
    itemName: 'ACサーボモーター 200W',
    partNumber: 'PUR-MTR-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-002-A',
    itemId: 'ITEM-PUR-002',
    itemName: 'ACサーボモーター 400W',
    partNumber: 'PUR-MTR-002',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-004-A',
    itemId: 'ITEM-PUR-004',
    itemName: 'アブソリュートエンコーダ',
    partNumber: 'PUR-ENC-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-005-A',
    itemId: 'ITEM-PUR-005',
    itemName: '力覚センサー',
    partNumber: 'PUR-FSR-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-006-A',
    itemId: 'ITEM-PUR-006',
    itemName: '近接センサー',
    partNumber: 'PUR-PXS-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-007-A',
    itemId: 'ITEM-PUR-007',
    itemName: 'ベアリング',
    partNumber: 'PUR-BRG-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-011-A',
    itemId: 'ITEM-PUR-011',
    itemName: 'マイコン STM32',
    partNumber: 'PUR-CPU-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-012-A',
    itemId: 'ITEM-PUR-012',
    itemName: 'コンデンサ 100μF',
    partNumber: 'PUR-CAP-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-014-A',
    itemId: 'ITEM-PUR-014',
    itemName: 'モータードライバIC',
    partNumber: 'PUR-DRV-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-015-A',
    itemId: 'ITEM-PUR-015',
    itemName: '電動アクチュエータ',
    partNumber: 'PUR-ACT-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-016-A',
    itemId: 'ITEM-PUR-016',
    itemName: 'ケーブルハーネス',
    partNumber: 'PUR-CBL-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-018-A',
    itemId: 'ITEM-PUR-018',
    itemName: 'スイッチング電源',
    partNumber: 'PUR-PSU-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-019-A',
    itemId: 'ITEM-PUR-019',
    itemName: 'LiDARセンサー',
    partNumber: 'PUR-LDR-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-020-A',
    itemId: 'ITEM-PUR-020',
    itemName: 'カメラモジュール',
    partNumber: 'PUR-CAM-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-021-A',
    itemId: 'ITEM-PUR-021',
    itemName: 'リチウムイオンバッテリー',
    partNumber: 'PUR-BAT-001',
    itemType: 'Purchased',
  },
  {
    itemRevId: 'REV-PUR-022-A',
    itemId: 'ITEM-PUR-022',
    itemName: 'バッテリーマネジメントシステム',
    partNumber: 'PUR-BMS-001',
    itemType: 'Purchased',
  },

  // ============================================
  // 原材料（RawMaterial）
  // ============================================
  {
    itemRevId: 'REV-RAW-001-A',
    itemId: 'ITEM-RAW-001',
    itemName: 'アルミニウム合金板 A5052',
    partNumber: 'RAW-ALM-001',
    itemType: 'RawMaterial',
  },
  {
    itemRevId: 'REV-RAW-002-A',
    itemId: 'ITEM-RAW-002',
    itemName: 'ステンレス丸棒 SUS304',
    partNumber: 'RAW-SUS-001',
    itemType: 'RawMaterial',
  },
  {
    itemRevId: 'REV-RAW-003-A',
    itemId: 'ITEM-RAW-003',
    itemName: 'エンジニアリングプラスチック',
    partNumber: 'RAW-PLA-001',
    itemType: 'RawMaterial',
  },
];

export const dummyTasks: Task[] = [
  // ============================================
  // 未着手タスク（todo）
  // ============================================

  // --- 設計部タスク ---
  {
    id: 'task-v2-1',
    title: '減速ギア図面修正',
    description: '歯形精度向上に伴う図面修正を行う',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-25',
    createdAt: '2025-01-15T10:30:00Z',
    targetObject: dummyTargetObjects[20], // PRT-GER-001
    sourceComment: {
      threadId: 'thread-1',
      commentId: 'comment-1-1',
      content: '減速ギアの歯形精度を向上させるため、公差を見直してください。',
      authorName: '鈴木健二',
    },
    canvasPosition: { x: 150, y: 200 },
  },
  {
    id: 'task-v2-3',
    title: '駆動システム軽量化検討',
    description: '駆動システムの重量削減方法を検討。目標-15%',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-02-05',
    createdAt: '2025-01-16T11:00:00Z',
    targetObject: dummyTargetObjects[3], // ASY-DRV-110
    canvasPosition: { x: 600, y: 150 },
  },
  {
    id: 'task-v2-4',
    title: '減速ギア軽量化設計レビュー',
    description: 'Draft版(Rev.C)の軽量化設計についてレビューを実施',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-02-10',
    createdAt: '2025-01-21T08:00:00Z',
    targetObject: dummyTargetObjects[20], // PRT-GER-001
    canvasPosition: { x: 350, y: 150 },
  },
  {
    id: 'task-v2-14',
    title: 'アーム部材応力解析',
    description: 'FEMによる応力解析を実施し安全率を確認',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-28',
    createdAt: '2025-01-18T09:00:00Z',
    targetObject: dummyTargetObjects[24], // PRT-ARM-001
    canvasPosition: { x: 200, y: 280 },
  },
  {
    id: 'task-v2-15',
    title: 'ジョイント3Dモデル更新',
    description: '新規設計に合わせて3Dモデルを更新',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-02-03',
    createdAt: '2025-01-19T14:00:00Z',
    targetObject: dummyTargetObjects[25], // PRT-JNT-001
    canvasPosition: { x: 320, y: 420 },
  },
  {
    id: 'task-v2-16',
    title: 'フレーム構造設計変更対応',
    description: '客先仕様変更に伴うフレーム構造の再設計',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-30',
    createdAt: '2025-01-20T10:00:00Z',
    targetObject: dummyTargetObjects[4], // ASY-FRM-120
    sourceComment: {
      threadId: 'thread-10',
      commentId: 'comment-10-1',
      content: '客先から耐荷重15kgへの仕様変更依頼がありました。構造見直しをお願いします。',
      authorName: '高橋美咲',
    },
    canvasPosition: { x: 480, y: 180 },
  },
  {
    id: 'task-v2-17',
    title: 'センサーユニット配置検討',
    description: 'センサー配置の最適化設計',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-02-07',
    createdAt: '2025-01-21T11:00:00Z',
    targetObject: dummyTargetObjects[13], // ASY-SNS-320
    canvasPosition: { x: 550, y: 320 },
  },

  // --- 購買部タスク ---
  {
    id: 'task-v2-2',
    title: 'コンデンサ代替品選定',
    description: 'コンデンサの代替品を3社以上から見積り取得し、比較表を作成する',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[2],
    dueDate: '2025-01-31',
    createdAt: '2025-01-17T10:30:00Z',
    targetObject: dummyTargetObjects[41], // PUR-CAP-001
    sourceComment: {
      threadId: 'thread-5',
      commentId: 'comment-5-1',
      content: 'コンデンサがEOL予定です。代替品の選定をお願いします。納期は来月末まで。',
      authorName: '田中一郎',
    },
    canvasPosition: { x: 700, y: 450 },
  },
  {
    id: 'task-v2-18',
    title: 'ベアリング仕入先評価',
    description: '新規仕入先の品質・価格・納期を評価',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-02-05',
    createdAt: '2025-01-18T13:00:00Z',
    targetObject: dummyTargetObjects[39], // PUR-BRG-001
    canvasPosition: { x: 620, y: 380 },
  },
  {
    id: 'task-v2-19',
    title: 'モータードライバIC見積り依頼',
    description: '次ロット分の見積りを3社から取得',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[2],
    dueDate: '2025-02-12',
    createdAt: '2025-01-19T10:00:00Z',
    targetObject: dummyTargetObjects[42], // PUR-DRV-001
    canvasPosition: { x: 680, y: 520 },
  },
  {
    id: 'task-v2-20',
    title: 'LiDARセンサー納期交渉',
    description: '納期短縮のため仕入先と交渉を行う',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[2],
    dueDate: '2025-01-27',
    createdAt: '2025-01-20T09:00:00Z',
    targetObject: dummyTargetObjects[46], // PUR-LDR-001
    sourceComment: {
      threadId: 'thread-11',
      commentId: 'comment-11-1',
      content: 'AGV増産のため、LiDARセンサーの納期を2週間前倒しできないか交渉してください。',
      authorName: '鈴木健二',
    },
    canvasPosition: { x: 750, y: 280 },
  },
  {
    id: 'task-v2-21',
    title: 'バッテリーコストダウン検討',
    description: '代替バッテリーの選定によるコスト削減を検討',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-02-08',
    createdAt: '2025-01-21T14:00:00Z',
    targetObject: dummyTargetObjects[48], // PUR-BAT-001
    canvasPosition: { x: 820, y: 400 },
  },

  // --- 生産技術部タスク ---
  {
    id: 'task-v2-5',
    title: 'グリッパー機構組立コスト試算',
    description: '新工程導入のコスト効果を比較',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-02-15',
    createdAt: '2025-01-21T13:00:00Z',
    targetObject: dummyTargetObjects[12], // ASY-GRP-310
    canvasPosition: { x: 720, y: 280 },
  },
  {
    id: 'task-v2-22',
    title: 'ホイールモジュール組立工程設計',
    description: 'AGV用ホイールモジュールの組立工程を設計',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-29',
    createdAt: '2025-01-17T15:00:00Z',
    targetObject: dummyTargetObjects[16], // ASY-WHM-510
    canvasPosition: { x: 180, y: 450 },
  },
  {
    id: 'task-v2-23',
    title: 'ナビゲーションユニット検査治具設計',
    description: 'キャリブレーション用検査治具の設計',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[4],
    dueDate: '2025-02-06',
    createdAt: '2025-01-19T16:00:00Z',
    targetObject: dummyTargetObjects[17], // ASY-NAV-600
    canvasPosition: { x: 250, y: 580 },
  },
  {
    id: 'task-v2-24',
    title: '第2関節自動組立ライン検討',
    description: 'ロボットによる自動組立の可否検討',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-02-20',
    createdAt: '2025-01-22T09:00:00Z',
    targetObject: dummyTargetObjects[8], // ASY-J2-220
    canvasPosition: { x: 380, y: 520 },
  },

  // --- 品質管理部タスク ---
  {
    id: 'task-v2-25',
    title: '力覚センサー受入検査基準作成',
    description: '新規購入品の受入検査基準書を作成',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2025-01-26',
    createdAt: '2025-01-17T11:00:00Z',
    targetObject: dummyTargetObjects[37], // PUR-FSR-001
    canvasPosition: { x: 450, y: 480 },
  },
  {
    id: 'task-v2-26',
    title: 'カバー外観検査基準見直し',
    description: '顧客クレーム対応として検査基準を厳格化',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[1],
    dueDate: '2025-02-03',
    createdAt: '2025-01-20T14:00:00Z',
    targetObject: dummyTargetObjects[28], // PRT-CVR-001
    sourceComment: {
      threadId: 'thread-12',
      commentId: 'comment-12-1',
      content: '先月出荷分でカバーに微細な傷があるとクレームがありました。検査基準の見直しをお願いします。',
      authorName: '佐藤花子',
    },
    canvasPosition: { x: 520, y: 380 },
  },

  // --- 製造部タスク ---
  {
    id: 'task-v2-27',
    title: '電源ユニット組立不良対策',
    description: 'はんだ付け不良の原因調査と対策',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[3],
    dueDate: '2025-01-24',
    createdAt: '2025-01-18T08:00:00Z',
    targetObject: dummyTargetObjects[14], // ASY-PWR-400
    sourceComment: {
      threadId: 'thread-13',
      commentId: 'comment-13-1',
      content: '電源ユニットのはんだ付け不良が3件発生しています。原因調査をお願いします。',
      authorName: '鈴木健二',
    },
    canvasPosition: { x: 100, y: 380 },
  },
  {
    id: 'task-v2-28',
    title: 'シャーシフレーム溶接手順書作成',
    description: 'AGVシャーシフレームの溶接作業標準を作成',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[3],
    dueDate: '2025-02-01',
    createdAt: '2025-01-19T13:00:00Z',
    targetObject: dummyTargetObjects[32], // PRT-FRM-002
    canvasPosition: { x: 150, y: 520 },
  },

  // ============================================
  // 進行中タスク（in_progress）
  // ============================================

  // --- 設計部タスク ---
  {
    id: 'task-v2-6',
    title: '制御ボード材料強度計算',
    description: '材料変更に伴う強度計算と報告書作成',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-24',
    createdAt: '2025-01-16T14:45:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
    targetObject: dummyTargetObjects[5], // ASY-CTL-130
    canvasPosition: { x: 250, y: 500 },
  },
  {
    id: 'task-v2-7',
    title: 'シャフト表面処理変更対応',
    description: '表面処理変更後の仕上げ寸法確認と図面修正',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-26',
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-22T14:00:00Z',
    targetObject: dummyTargetObjects[23], // PRT-SFT-001
    canvasPosition: { x: 400, y: 300 },
  },
  {
    id: 'task-v2-29',
    title: 'ベースプレート設計見直し',
    description: '製造性向上のための設計変更',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-01-28',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-21T16:00:00Z',
    targetObject: dummyTargetObjects[21], // PRT-PLT-001
    canvasPosition: { x: 320, y: 250 },
  },
  {
    id: 'task-v2-30',
    title: '第3関節可動範囲拡大設計',
    description: '手首関節の可動範囲を±180°から±270°に拡大',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-30',
    createdAt: '2025-01-18T11:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
    targetObject: dummyTargetObjects[9], // ASY-J3-230
    canvasPosition: { x: 480, y: 420 },
  },

  // --- 生産技術部タスク ---
  {
    id: 'task-v2-8',
    title: 'マイコン再プログラミング',
    description: '不具合対応の再プログラミングを実施',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-23',
    createdAt: '2025-01-17T16:00:00Z',
    updatedAt: '2025-01-19T10:00:00Z',
    targetObject: dummyTargetObjects[40], // PUR-CPU-001
    canvasPosition: { x: 180, y: 350 },
  },
  {
    id: 'task-v2-31',
    title: 'バッテリーユニット充放電試験工程設計',
    description: '量産用の充放電試験工程を確立',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-25',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
    targetObject: dummyTargetObjects[18], // ASY-BAT-700
    canvasPosition: { x: 280, y: 600 },
  },
  {
    id: 'task-v2-32',
    title: 'リンク機構組立治具製作',
    description: '組立精度向上のための専用治具を製作',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[4],
    dueDate: '2025-01-29',
    createdAt: '2025-01-17T14:00:00Z',
    updatedAt: '2025-01-20T15:00:00Z',
    targetObject: dummyTargetObjects[10], // ASY-LNK-240
    canvasPosition: { x: 420, y: 550 },
  },

  // --- 品質管理部タスク ---
  {
    id: 'task-v2-9',
    title: '第1関節10万サイクル耐久試験',
    description: '客先要求の追加耐久試験データ取得',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2025-02-03',
    createdAt: '2025-01-19T11:00:00Z',
    updatedAt: '2025-01-20T08:00:00Z',
    targetObject: dummyTargetObjects[7], // ASY-J1-210
    canvasPosition: { x: 220, y: 180 },
  },
  {
    id: 'task-v2-33',
    title: 'エンドエフェクター精度検証',
    description: '繰り返し位置決め精度±0.05mmの検証',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2025-01-27',
    createdAt: '2025-01-18T13:00:00Z',
    updatedAt: '2025-01-22T09:00:00Z',
    targetObject: dummyTargetObjects[11], // ASY-END-300
    canvasPosition: { x: 350, y: 380 },
  },
  {
    id: 'task-v2-34',
    title: 'AGV走行精度試験',
    description: '直進性・旋回精度の検証試験を実施',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2025-01-28',
    createdAt: '2025-01-19T09:00:00Z',
    updatedAt: '2025-01-21T14:00:00Z',
    targetObject: dummyTargetObjects[1], // PRD-AGV-2000
    canvasPosition: { x: 580, y: 480 },
  },

  // --- 購買部タスク ---
  {
    id: 'task-v2-35',
    title: 'サーボモーター400W価格交渉',
    description: '年間契約更新に向けた価格交渉',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-01-31',
    createdAt: '2025-01-15T11:00:00Z',
    updatedAt: '2025-01-20T16:00:00Z',
    targetObject: dummyTargetObjects[35], // PUR-MTR-002
    canvasPosition: { x: 650, y: 300 },
  },
  {
    id: 'task-v2-36',
    title: 'BMS仕入先変更評価',
    description: '新規仕入先からのサンプル評価を実施',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-02-05',
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-01-22T11:00:00Z',
    targetObject: dummyTargetObjects[49], // PUR-BMS-001
    canvasPosition: { x: 720, y: 550 },
  },

  // --- 製造部タスク ---
  {
    id: 'task-v2-37',
    title: 'フィンガー部品加工条件最適化',
    description: '切削条件の見直しによる加工時間短縮',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[3],
    dueDate: '2025-01-26',
    createdAt: '2025-01-16T13:00:00Z',
    updatedAt: '2025-01-21T10:00:00Z',
    targetObject: dummyTargetObjects[26], // PRT-FNG-001
    canvasPosition: { x: 130, y: 280 },
  },
  {
    id: 'task-v2-38',
    title: '駆動ホイール成形条件調整',
    description: 'ウレタン成形の条件出しを実施',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[3],
    dueDate: '2025-01-24',
    createdAt: '2025-01-17T08:00:00Z',
    updatedAt: '2025-01-22T08:00:00Z',
    targetObject: dummyTargetObjects[30], // PRT-WHL-001
    canvasPosition: { x: 200, y: 420 },
  },

  // ============================================
  // 完了タスク（done）
  // ============================================

  // --- 設計部タスク ---
  {
    id: 'task-v2-10',
    title: 'サーボモーター型番更新',
    description: 'サーボモーターの型番更新対応',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-01-10',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T11:30:00Z',
    targetObject: dummyTargetObjects[34], // PUR-MTR-001
    canvasPosition: { x: 400, y: 350 },
  },
  {
    id: 'task-v2-11',
    title: '制御ボード製作図面再出力',
    description: 'CAD図面との不一致を解消し製作図面を再出力',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-08',
    createdAt: '2025-01-08T14:00:00Z',
    updatedAt: '2025-01-08T15:00:00Z',
    targetObject: dummyTargetObjects[5], // ASY-CTL-130
    canvasPosition: { x: 800, y: 300 },
  },
  {
    id: 'task-v2-13',
    title: '製品番号採番変換',
    description: '全部品の部品番号を新ルールに変換し対照表を作成',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2024-12-12',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-12T17:00:00Z',
    targetObject: dummyTargetObjects[0], // PRD-ARM-1000
    canvasPosition: { x: 520, y: 280 },
  },
  {
    id: 'task-v2-39',
    title: 'ハウジング図面承認',
    description: '製造部からの図面変更要求を反映し承認',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-01-05',
    createdAt: '2025-01-03T10:00:00Z',
    updatedAt: '2025-01-05T14:00:00Z',
    targetObject: dummyTargetObjects[27], // PRT-HSG-001
    canvasPosition: { x: 280, y: 180 },
  },
  {
    id: 'task-v2-40',
    title: '支柱寸法公差見直し',
    description: '組立性向上のため公差を緩和',
    status: 'done',
    priority: 'low',
    assignee: dummyUsers[0],
    dueDate: '2024-12-20',
    createdAt: '2024-12-18T09:00:00Z',
    updatedAt: '2024-12-20T11:00:00Z',
    targetObject: dummyTargetObjects[22], // PRT-COL-001
    canvasPosition: { x: 450, y: 220 },
  },

  // --- 生産技術部タスク ---
  {
    id: 'task-v2-12',
    title: 'ベースユニット組立手順書作成',
    description: '新人教育用の組立手順書を作成しドキュメントタブにアップロード',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[4],
    dueDate: '2024-12-22',
    createdAt: '2024-12-20T09:00:00Z',
    updatedAt: '2024-12-22T15:00:00Z',
    targetObject: dummyTargetObjects[2], // ASY-BASE-100
    canvasPosition: { x: 300, y: 350 },
  },
  {
    id: 'task-v2-41',
    title: 'アームユニット組立ライン立上げ',
    description: '新設ラインの稼働確認と初品検査',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-08',
    createdAt: '2025-01-05T08:00:00Z',
    updatedAt: '2025-01-08T16:00:00Z',
    targetObject: dummyTargetObjects[6], // ASY-ARM-200
    canvasPosition: { x: 380, y: 320 },
  },
  {
    id: 'task-v2-42',
    title: 'シャーシユニット組立工程確立',
    description: 'AGV量産に向けた組立工程を確立',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-12',
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-12T15:00:00Z',
    targetObject: dummyTargetObjects[15], // ASY-CHS-500
    canvasPosition: { x: 500, y: 400 },
  },

  // --- 品質管理部タスク ---
  {
    id: 'task-v2-43',
    title: 'エンコーダ受入検査実施',
    description: '新ロット100個の受入検査を完了',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[1],
    dueDate: '2025-01-10',
    createdAt: '2025-01-09T09:00:00Z',
    updatedAt: '2025-01-10T12:00:00Z',
    targetObject: dummyTargetObjects[36], // PUR-ENC-001
    canvasPosition: { x: 600, y: 250 },
  },
  {
    id: 'task-v2-44',
    title: '近接センサー特性評価',
    description: '温度特性・応答速度の評価完了',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[1],
    dueDate: '2025-01-06',
    createdAt: '2025-01-04T10:00:00Z',
    updatedAt: '2025-01-06T14:00:00Z',
    targetObject: dummyTargetObjects[38], // PUR-PXS-001
    canvasPosition: { x: 650, y: 180 },
  },
  {
    id: 'task-v2-45',
    title: '制御基板導通検査基準作成',
    description: '自動検査機用の検査プログラムを作成',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2024-12-28',
    createdAt: '2024-12-25T09:00:00Z',
    updatedAt: '2024-12-28T11:00:00Z',
    targetObject: dummyTargetObjects[29], // PRT-PCB-001
    canvasPosition: { x: 700, y: 350 },
  },

  // --- 購買部タスク ---
  {
    id: 'task-v2-46',
    title: 'ケーブルハーネス発注',
    description: '次ロット分500セットの発注完了',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-01-15',
    createdAt: '2025-01-12T11:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    targetObject: dummyTargetObjects[44], // PUR-CBL-001
    canvasPosition: { x: 750, y: 420 },
  },
  {
    id: 'task-v2-47',
    title: 'スイッチング電源単価交渉',
    description: '10%コストダウンに成功',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[2],
    dueDate: '2025-01-07',
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-01-07T16:00:00Z',
    targetObject: dummyTargetObjects[45], // PUR-PSU-001
    canvasPosition: { x: 800, y: 500 },
  },
  {
    id: 'task-v2-48',
    title: 'アルミ材料仕入先追加',
    description: '新規仕入先との取引契約締結',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2024-12-25',
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-25T15:00:00Z',
    targetObject: dummyTargetObjects[50], // RAW-ALM-001
    canvasPosition: { x: 850, y: 280 },
  },

  // --- 製造部タスク ---
  {
    id: 'task-v2-49',
    title: 'モーターブラケット初品加工',
    description: '新規部品の初品加工と寸法検査',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[3],
    dueDate: '2025-01-14',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-14T12:00:00Z',
    targetObject: dummyTargetObjects[31], // PRT-MTB-001
    canvasPosition: { x: 100, y: 480 },
  },
  {
    id: 'task-v2-50',
    title: 'プラットフォーム溶接完了',
    description: '搬送台プレートの溶接作業完了',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[3],
    dueDate: '2025-01-11',
    createdAt: '2025-01-09T13:00:00Z',
    updatedAt: '2025-01-11T15:00:00Z',
    targetObject: dummyTargetObjects[33], // PRT-PLF-001
    canvasPosition: { x: 180, y: 580 },
  },

  // ============================================
  // 対象オブジェクトなしのタスク
  // ============================================
  {
    id: 'task-v2-51',
    title: '月次進捗報告書作成',
    description: '1月度の設計進捗報告書を作成',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[0],
    dueDate: '2025-01-31',
    createdAt: '2025-01-20T16:00:00Z',
    canvasPosition: { x: 900, y: 150 },
  },
  {
    id: 'task-v2-52',
    title: '品質月報作成',
    description: '1月度の品質実績をまとめて報告',
    status: 'in_progress',
    priority: 'medium',
    assignee: dummyUsers[1],
    dueDate: '2025-02-03',
    createdAt: '2025-01-22T09:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
    canvasPosition: { x: 900, y: 250 },
  },
  {
    id: 'task-v2-53',
    title: '仕入先定期評価',
    description: '主要仕入先10社の四半期評価を実施',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[2],
    dueDate: '2025-02-10',
    createdAt: '2025-01-21T10:00:00Z',
    canvasPosition: { x: 900, y: 350 },
  },
  {
    id: 'task-v2-54',
    title: '5S活動推進',
    description: '製造現場の5S活動を推進し、改善提案を募集',
    status: 'in_progress',
    priority: 'low',
    assignee: dummyUsers[3],
    dueDate: '2025-02-28',
    createdAt: '2025-01-15T14:00:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
    canvasPosition: { x: 900, y: 450 },
  },
  {
    id: 'task-v2-55',
    title: '新人教育カリキュラム更新',
    description: '生産技術部門の新人教育内容を見直し',
    status: 'done',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-01-18',
    createdAt: '2025-01-10T11:00:00Z',
    updatedAt: '2025-01-18T16:00:00Z',
    canvasPosition: { x: 900, y: 550 },
  },
];

/**
 * 特定のItemRevに紐づくタスクを取得
 */
export function getTasksByItemRevId(itemRevId: string): Task[] {
  return dummyTasks.filter((task) => task.targetObject?.itemRevId === itemRevId);
}

/**
 * 特定のItemRevに紐づく未完了タスク数を取得
 */
export function getIncompleteTaskCountByItemRevId(itemRevId: string): number {
  return dummyTasks.filter(
    (task) => task.targetObject?.itemRevId === itemRevId && task.status !== 'done'
  ).length;
}

/**
 * 全タスクを取得
 */
export function getAllTasks(): Task[] {
  return dummyTasks;
}
