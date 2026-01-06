/**
 * タスクのダミーデータ
 * BOMノードと紐付いたタスク管理用
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

/** ダミー対象オブジェクト（BOMノードへの参照） */
export const dummyTargetObjects: TaskTargetObject[] = [
  // 製品
  { nodeId: 'DIR-1000', nodeName: '産業用ロボットアーム ARM-1000', nodeType: 'product' },
  // Assy
  { nodeId: 'DIR-1001', nodeName: 'ベースユニットAssy ASSY-1000', nodeType: 'assy' },
  { nodeId: 'DIR-1002', nodeName: '駆動システムSubAssy ASSY-1100', nodeType: 'assy' },
  { nodeId: 'DIR-1003', nodeName: 'モーター制御部ASSY-1110', nodeType: 'assy' },
  { nodeId: 'DIR-1004', nodeName: 'パワー基板モジュール MODULE-1111', nodeType: 'assy' },
  { nodeId: 'DIR-1005', nodeName: '信号処理部 MODULE-1112', nodeType: 'assy' },
  { nodeId: 'DIR-1006', nodeName: 'センサー入力部 MODULE-1113', nodeType: 'assy' },
  { nodeId: 'DIR-1007', nodeName: '減速機構ASSY-1120', nodeType: 'assy' },
  // Parts
  { nodeId: 'LEAF-1', nodeName: '制御IC IC-1111A', nodeType: 'parts' },
  { nodeId: 'LEAF-2', nodeName: 'コンデンサ CAP-1111B', nodeType: 'parts' },
  { nodeId: 'LEAF-3', nodeName: '抵抗 RES-1111C', nodeType: 'parts' },
  { nodeId: 'LEAF-4', nodeName: 'コイル COIL-1111D', nodeType: 'parts' },
  { nodeId: 'LEAF-5', nodeName: 'DSP DSP-1112A', nodeType: 'parts' },
  { nodeId: 'LEAF-6', nodeName: 'メモリ MEM-1112B', nodeType: 'parts' },
  { nodeId: 'LEAF-10', nodeName: 'ギアA GEAR-1121A', nodeType: 'parts' },
  { nodeId: 'LEAF-11', nodeName: 'ギアB GEAR-1121B', nodeType: 'parts' },
  { nodeId: 'LEAF-12', nodeName: 'シャフト SHAFT-1121C', nodeType: 'parts' },
];

export const dummyTasks: Task[] = [
  // === 未着手タスク ===
  {
    id: 'task-1',
    title: '制御IC図面修正',
    description: '公差を±0.005mmから±0.008mmに緩和する図面修正を行う',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-25',
    createdAt: '2025-01-15T10:30:00Z',
    targetObject: dummyTargetObjects[8], // LEAF-1
    sourceComment: {
      threadId: 'thread-1',
      commentId: 'comment-1-1',
      content: '制御ICの公差が厳しすぎます。現在の設備では±0.005mmは難しいので、±0.01mmに緩和できないか検討をお願いします。',
      authorName: '鈴木健二',
    },
    canvasPosition: { x: 150, y: 200 },
  },
  {
    id: 'task-2',
    title: 'コンデンサ代替品選定',
    description: 'コンデンサの代替品を3社以上から見積り取得し、比較表を作成する',
    status: 'todo',
    priority: 'high',
    assignee: dummyUsers[2],
    dueDate: '2025-01-31',
    createdAt: '2025-01-17T10:30:00Z',
    targetObject: dummyTargetObjects[9], // LEAF-2
    sourceComment: {
      threadId: 'thread-5',
      commentId: 'comment-5-1',
      content: 'コンデンサがEOL予定です。代替品の選定をお願いします。納期は来月末まで。',
      authorName: '田中一郎',
    },
    canvasPosition: { x: 700, y: 450 },
  },
  {
    id: 'task-3',
    title: '駆動システム軽量化検討',
    description: '駆動システムの重量を2.8kgから2.5kg以下に削減する方法を検討',
    status: 'todo',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-02-05',
    createdAt: '2025-01-16T11:00:00Z',
    targetObject: dummyTargetObjects[2], // DIR-1002
    canvasPosition: { x: 600, y: 150 },
  },
  {
    id: 'task-4',
    title: 'ギア硬度変更の影響調査',
    description: 'ギアの硬度変更による性能への影響をシミュレーション',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-02-10',
    createdAt: '2025-01-21T08:00:00Z',
    targetObject: dummyTargetObjects[14], // LEAF-10
    canvasPosition: { x: 350, y: 150 },
  },
  {
    id: 'task-5',
    title: '減速機構組立コスト試算',
    description: '新工程導入のコスト効果を比較',
    status: 'todo',
    priority: 'low',
    assignee: dummyUsers[4],
    dueDate: '2025-02-15',
    createdAt: '2025-01-21T13:00:00Z',
    targetObject: dummyTargetObjects[7], // DIR-1007
    canvasPosition: { x: 720, y: 280 },
  },

  // === 進行中タスク ===
  {
    id: 'task-6',
    title: 'パワー基板材料強度計算',
    description: '材料変更に伴う強度計算と報告書作成',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-24',
    createdAt: '2025-01-16T14:45:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
    targetObject: dummyTargetObjects[4], // DIR-1004
    canvasPosition: { x: 250, y: 500 },
  },
  {
    id: 'task-7',
    title: 'シャフト表面処理変更対応',
    description: '表面処理変更後の仕上げ寸法確認と図面修正',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-26',
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-22T14:00:00Z',
    targetObject: dummyTargetObjects[16], // LEAF-12
    canvasPosition: { x: 400, y: 300 },
  },
  {
    id: 'task-8',
    title: 'DSP再プログラミング',
    description: '不具合対応の再プログラミングを実施',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[4],
    dueDate: '2025-01-23',
    createdAt: '2025-01-17T16:00:00Z',
    updatedAt: '2025-01-19T10:00:00Z',
    targetObject: dummyTargetObjects[12], // LEAF-5
    canvasPosition: { x: 180, y: 350 },
  },
  {
    id: 'task-9',
    title: '信号処理部10万サイクル耐久試験',
    description: '客先要求の追加耐久試験データ取得',
    status: 'in_progress',
    priority: 'high',
    assignee: dummyUsers[1],
    dueDate: '2025-02-03',
    createdAt: '2025-01-19T11:00:00Z',
    updatedAt: '2025-01-20T08:00:00Z',
    targetObject: dummyTargetObjects[5], // DIR-1005
    canvasPosition: { x: 220, y: 180 },
  },

  // === 完了タスク ===
  {
    id: 'task-10',
    title: 'メモリ型番更新',
    description: 'メモリの型番更新対応',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2025-01-10',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T11:30:00Z',
    targetObject: dummyTargetObjects[13], // LEAF-6
    canvasPosition: { x: 400, y: 350 },
  },
  {
    id: 'task-11',
    title: 'モーター制御部製作図面再出力',
    description: 'CAD図面との不一致を解消し製作図面を再出力',
    status: 'done',
    priority: 'high',
    assignee: dummyUsers[0],
    dueDate: '2025-01-08',
    createdAt: '2025-01-08T14:00:00Z',
    updatedAt: '2025-01-08T15:00:00Z',
    targetObject: dummyTargetObjects[3], // DIR-1003
    canvasPosition: { x: 800, y: 300 },
  },
  {
    id: 'task-12',
    title: 'ベースユニット組立手順書作成',
    description: '新人教育用の組立手順書を作成しドキュメントタブにアップロード',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[4],
    dueDate: '2024-12-22',
    createdAt: '2024-12-20T09:00:00Z',
    updatedAt: '2024-12-22T15:00:00Z',
    targetObject: dummyTargetObjects[1], // DIR-1001
    canvasPosition: { x: 300, y: 350 },
  },
  {
    id: 'task-13',
    title: '製品番号採番変換',
    description: '全部品の部品番号を新ルールに変換し対照表を作成',
    status: 'done',
    priority: 'medium',
    assignee: dummyUsers[0],
    dueDate: '2024-12-12',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-12T17:00:00Z',
    targetObject: dummyTargetObjects[0], // DIR-1000
    canvasPosition: { x: 520, y: 280 },
  },
];

/**
 * 特定のBOMノードに紐づくタスクを取得
 */
export function getTasksByNodeId(nodeId: string): Task[] {
  return dummyTasks.filter((task) => task.targetObject.nodeId === nodeId);
}

/**
 * 特定のBOMノードに紐づく未完了タスク数を取得
 */
export function getIncompleteTaskCountByNodeId(nodeId: string): number {
  return dummyTasks.filter(
    (task) => task.targetObject.nodeId === nodeId && task.status !== 'done'
  ).length;
}
