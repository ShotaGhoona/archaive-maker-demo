/**
 * タスク一覧ページ用ダミーデータ
 * 中小企業の製造業（精密機械部品メーカー）を想定
 */

/** タスクのステータス */
export type TaskStatus = 'todo' | 'in_progress' | 'done';

/** タスクの優先度 */
export type TaskPriority = 'high' | 'medium' | 'low';

/** 担当者情報 */
export interface TaskAssignee {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
}

/** タスク */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: TaskAssignee;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
  /** キャンバス上の座標（キャンバスへのジャンプ用） */
  canvasPosition?: {
    x: number;
    y: number;
  };
}

/** ステータスラベル */
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未着手',
  in_progress: '進行中',
  done: '完了',
};

/** 優先度ラベル */
export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

/** ダミーユーザー（中小製造業の従業員） */
const users: TaskAssignee[] = [
  {
    id: 'user-1',
    name: '山田太郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yamada',
    role: '設計課長',
  },
  {
    id: 'user-2',
    name: '佐藤花子',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
    role: '品質管理',
  },
  {
    id: 'user-3',
    name: '田中一郎',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
    role: '購買担当',
  },
  {
    id: 'user-4',
    name: '鈴木健二',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
    role: '製造部主任',
  },
  {
    id: 'user-5',
    name: '高橋美咲',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=takahashi',
    role: '生産技術',
  },
];

export const dummyTasks: Task[] = [
  // === 未着手タスク ===
  {
    id: 'task-1',
    title: 'ベアリングハウジング図面修正',
    description: '公差を±0.005mmから±0.008mmに緩和する図面修正を行う',
    status: 'todo',
    priority: 'high',
    assignee: users[0],
    dueDate: '2025-01-25',
    createdAt: '2025-01-15T10:30:00Z',
    canvasPosition: { x: 150, y: 200 },
  },
  {
    id: 'task-2',
    title: 'Oリング代替品選定',
    description: 'P-20 Oリングの代替品を3社以上から見積り取得し、比較表を作成する',
    status: 'todo',
    priority: 'high',
    assignee: users[2],
    dueDate: '2025-01-31',
    createdAt: '2025-01-17T10:30:00Z',
    canvasPosition: { x: 700, y: 450 },
  },
  {
    id: 'task-3',
    title: '軽量化検討レポート作成',
    description: 'サブアセンブリの重量を2.8kgから2.5kg以下に削減する方法を検討',
    status: 'todo',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2025-02-05',
    createdAt: '2025-01-16T11:00:00Z',
    canvasPosition: { x: 600, y: 150 },
  },
  {
    id: 'task-4',
    title: '防振ゴム硬度変更の影響調査',
    description: 'ショアA60からショアA70への変更による振動特性への影響をシミュレーション',
    status: 'todo',
    priority: 'low',
    assignee: users[4],
    dueDate: '2025-02-10',
    createdAt: '2025-01-21T08:00:00Z',
    canvasPosition: { x: 350, y: 150 },
  },
  {
    id: 'task-5',
    title: 'トルクスボルト導入コスト試算',
    description: 'ドライバーセット購入費用と年間組立工数削減効果を比較',
    status: 'todo',
    priority: 'low',
    assignee: users[4],
    dueDate: '2025-02-15',
    createdAt: '2025-01-21T13:00:00Z',
    canvasPosition: { x: 720, y: 280 },
  },
  {
    id: 'task-6',
    title: 'プーリー溝形状変更図面作成',
    description: 'M形からA形への溝形状変更に伴う図面修正',
    status: 'todo',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2025-01-28',
    createdAt: '2025-01-22T09:30:00Z',
    canvasPosition: { x: 280, y: 480 },
  },

  // === 進行中タスク ===
  {
    id: 'task-7',
    title: 'SUS303材料強度計算',
    description: 'SUS304からSUS303への変更に伴う強度計算と報告書作成',
    status: 'in_progress',
    priority: 'high',
    assignee: users[0],
    dueDate: '2025-01-24',
    createdAt: '2025-01-16T14:45:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
    canvasPosition: { x: 250, y: 500 },
  },
  {
    id: 'task-8',
    title: '無電解ニッケルめっき膜厚変更対応',
    description: '膜厚15μm変更後の仕上げ寸法確認と図面修正',
    status: 'in_progress',
    priority: 'high',
    assignee: users[0],
    dueDate: '2025-01-26',
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-22T14:00:00Z',
    canvasPosition: { x: 400, y: 300 },
  },
  {
    id: 'task-9',
    title: '再熱処理手配',
    description: '硬度不良ロットの再熱処理を外注先と調整',
    status: 'in_progress',
    priority: 'high',
    assignee: users[4],
    dueDate: '2025-01-23',
    createdAt: '2025-01-17T16:00:00Z',
    updatedAt: '2025-01-19T10:00:00Z',
    canvasPosition: { x: 180, y: 350 },
  },
  {
    id: 'task-10',
    title: 'ねじ穴位置修正',
    description: 'M6ボルト頭とリブの干渉を解消するためねじ穴を5mm外側に移動',
    status: 'in_progress',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2025-01-25',
    createdAt: '2025-01-18T13:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
    canvasPosition: { x: 320, y: 420 },
  },
  {
    id: 'task-11',
    title: '10万サイクル耐久試験実施',
    description: '客先要求の追加耐久試験データ取得',
    status: 'in_progress',
    priority: 'high',
    assignee: users[1],
    dueDate: '2025-02-03',
    createdAt: '2025-01-19T11:00:00Z',
    updatedAt: '2025-01-20T08:00:00Z',
    canvasPosition: { x: 220, y: 180 },
  },
  {
    id: 'task-12',
    title: 'スプリングピン変更コスト算出',
    description: 'φ3→φ4変更に伴う穴加工工程追加のコスト影響を算出',
    status: 'in_progress',
    priority: 'medium',
    assignee: users[4],
    dueDate: '2025-01-27',
    createdAt: '2025-01-19T08:30:00Z',
    updatedAt: '2025-01-21T15:00:00Z',
    canvasPosition: { x: 650, y: 300 },
  },
  {
    id: 'task-13',
    title: 'ダイカスト金型点検依頼',
    description: '巣穴多発の原因調査と金型メンテナンス手配',
    status: 'in_progress',
    priority: 'medium',
    assignee: users[3],
    dueDate: '2025-01-29',
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
    canvasPosition: { x: 480, y: 380 },
  },

  // === 完了タスク ===
  {
    id: 'task-14',
    title: 'コネクタ型番更新',
    description: 'JST-XH-4からJST-XH-4Aへの型番更新',
    status: 'done',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2025-01-10',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T11:30:00Z',
    canvasPosition: { x: 400, y: 350 },
  },
  {
    id: 'task-15',
    title: '製作図面再出力',
    description: 'CAD図面との不一致を解消し製作図面を再出力',
    status: 'done',
    priority: 'high',
    assignee: users[0],
    dueDate: '2025-01-08',
    createdAt: '2025-01-08T14:00:00Z',
    updatedAt: '2025-01-08T15:00:00Z',
    canvasPosition: { x: 800, y: 300 },
  },
  {
    id: 'task-16',
    title: 'ボルト締付トルク値追記',
    description: 'M8:25N・m、M6:10N・mのトルク値を図面に追記',
    status: 'done',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2025-01-05',
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-01-05T10:30:00Z',
    canvasPosition: { x: 550, y: 400 },
  },
  {
    id: 'task-17',
    title: '表面粗さ指示修正',
    description: '摺動面の表面粗さをRa6.3からRa1.6に修正',
    status: 'done',
    priority: 'high',
    assignee: users[0],
    dueDate: '2025-01-03',
    createdAt: '2025-01-03T11:00:00Z',
    updatedAt: '2025-01-03T13:00:00Z',
    canvasPosition: { x: 200, y: 250 },
  },
  {
    id: 'task-18',
    title: '塗装色指定追加',
    description: '日塗工 N-50（グレー）を図面に追記',
    status: 'done',
    priority: 'low',
    assignee: users[0],
    dueDate: '2024-12-28',
    createdAt: '2024-12-28T10:00:00Z',
    updatedAt: '2024-12-28T11:00:00Z',
    canvasPosition: { x: 650, y: 180 },
  },
  {
    id: 'task-19',
    title: 'リニアガイド型番変更',
    description: '廃番品からTHK製SHS15への変更',
    status: 'done',
    priority: 'high',
    assignee: users[0],
    dueDate: '2024-12-25',
    createdAt: '2024-12-25T14:00:00Z',
    updatedAt: '2024-12-25T16:00:00Z',
    canvasPosition: { x: 420, y: 520 },
  },
  {
    id: 'task-20',
    title: '組立手順書作成',
    description: '新人教育用の組立手順書を作成しドキュメントタブにアップロード',
    status: 'done',
    priority: 'medium',
    assignee: users[4],
    dueDate: '2024-12-22',
    createdAt: '2024-12-20T09:00:00Z',
    updatedAt: '2024-12-22T15:00:00Z',
    canvasPosition: { x: 300, y: 350 },
  },
  {
    id: 'task-21',
    title: '溶接記号ISO規格対応',
    description: '溶接記号をISO 2553:2019準拠に修正',
    status: 'done',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2024-12-18',
    createdAt: '2024-12-18T11:00:00Z',
    updatedAt: '2024-12-18T14:00:00Z',
    canvasPosition: { x: 750, y: 420 },
  },
  {
    id: 'task-22',
    title: 'サーボモーター取付穴修正',
    description: 'メーカー独自寸法に合わせて取付穴位置を修正',
    status: 'done',
    priority: 'high',
    assignee: users[0],
    dueDate: '2024-12-15',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T13:00:00Z',
    canvasPosition: { x: 180, y: 450 },
  },
  {
    id: 'task-23',
    title: '部品番号採番変換',
    description: '全30点の部品番号を新ルールに変換し対照表を作成',
    status: 'done',
    priority: 'medium',
    assignee: users[0],
    dueDate: '2024-12-12',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-12T17:00:00Z',
    canvasPosition: { x: 520, y: 280 },
  },
  {
    id: 'task-24',
    title: '板金展開図修正',
    description: 'カバープレートの曲げ代計算を修正',
    status: 'done',
    priority: 'medium',
    assignee: users[4],
    dueDate: '2025-01-20',
    createdAt: '2025-01-18T09:00:00Z',
    updatedAt: '2025-01-19T17:00:00Z',
    canvasPosition: { x: 500, y: 200 },
  },
  {
    id: 'task-25',
    title: 'ワイヤーハーネス製造ロット確認',
    description: '図面と実物の長さ差異の原因を製造ロットから特定',
    status: 'done',
    priority: 'medium',
    assignee: users[3],
    dueDate: '2025-01-21',
    createdAt: '2025-01-20T14:30:00Z',
    updatedAt: '2025-01-21T10:00:00Z',
    canvasPosition: { x: 580, y: 520 },
  },
];
