/**
 * タスク関連の型定義（v2）
 * ItemRevと紐付いたタスク管理用
 */

import type { ItemType } from '../types';

/** タスクのステータス */
export type TaskStatus = 'todo' | 'in_progress' | 'done';

/** タスクの優先度 */
export type TaskPriority = 'high' | 'medium' | 'low';

/** タスクの対象オブジェクト（ItemRevへの参照） */
export interface TaskTargetObject {
  /** ItemRevのID */
  itemRevId: string;
  /** ItemのID */
  itemId: string;
  /** 表示名（Item.nameと同期） */
  itemName: string;
  /** 品番（Item.partNumber） */
  partNumber: string;
  /** アイテムタイプ */
  itemType: ItemType;
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
  /** 対象オブジェクト（ItemRev） - 任意 */
  targetObject?: TaskTargetObject;
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

/** ItemTypeラベル */
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  Product: '製品',
  Assembly: 'Assy',
  Part: '製造部品',
  Purchased: '購入品',
  RawMaterial: '原材料',
};
