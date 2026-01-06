/**
 * タスク関連の型定義
 * BOMノードと紐付いたタスク管理用
 */

import type { BomTreeNode } from '../bom/types';

/** タスクのステータス */
export type TaskStatus = 'todo' | 'in_progress' | 'done';

/** タスクの優先度 */
export type TaskPriority = 'high' | 'medium' | 'low';

/** タスクの対象ノードタイプ（BomTreeNode['type']と一致） */
export type TaskTargetNodeType = BomTreeNode['type'];

/** タスクの対象オブジェクト（BOMノードへの参照） */
export interface TaskTargetObject {
  /** BOMノードのID */
  nodeId: string;
  /** 表示名（BOMノードのnameと同期） */
  nodeName: string;
  /** ノードタイプ */
  nodeType: TaskTargetNodeType;
}

/** タスクの元コメント（コメントから生成された場合） */
export interface TaskSourceComment {
  threadId: string;
  commentId: string;
  content: string;
  authorName: string;
}

/** 担当者情報 */
export interface TaskAssignee {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
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
  /** 対象オブジェクト（BOMノード） - 必須 */
  targetObject: TaskTargetObject;
  /** 元コメント（コメントから生成された場合） */
  sourceComment?: TaskSourceComment;
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

/** ノードタイプラベル */
export const NODE_TYPE_LABELS: Record<TaskTargetNodeType, string> = {
  product: '製品',
  assy: 'Assy',
  parts: 'Parts',
};
