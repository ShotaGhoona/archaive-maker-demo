/**
 * コメントダミーデータ
 * 中小企業の製造業（精密機械部品メーカー）を想定
 */

import type { CommentThread, CommentThreadWithAuthors } from './types';
import { getUserById } from '../../user/users';

export const commentThreads: CommentThread[] = [
  // === 未解決スレッド ===
  {
    id: 'thread-1',
    resolved: false,
    createdAt: '2025-01-15T09:30:00Z',
    canvasPosition: { x: 150, y: 200 },
    comments: [
      {
        id: 'comment-1-1',
        content: 'ベアリングハウジングの公差が厳しすぎます。現在の設備では±0.005mmは難しいので、±0.01mmに緩和できないか検討をお願いします。',
        authorId: 'user-4',
        createdAt: '2025-01-15T09:30:00Z',
      },
      {
        id: 'comment-1-2',
        content: '客先の要求仕様を確認しました。±0.008mmまでは許容範囲とのことです。図面を修正しますか？',
        authorId: 'user-1',
        createdAt: '2025-01-15T10:15:00Z',
      },
      {
        id: 'comment-1-3',
        content: 'それなら対応可能です。図面修正をお願いします。',
        authorId: 'user-4',
        createdAt: '2025-01-15T10:30:00Z',
      },
    ],
  },
  {
    id: 'thread-2',
    resolved: false,
    createdAt: '2025-01-16T11:00:00Z',
    canvasPosition: { x: 600, y: 150 },
    comments: [
      {
        id: 'comment-2-1',
        content: 'サブアセンブリの総重量が設計上限の2.5kgを超えています（現状2.8kg）。軽量化の検討が必要です。',
        authorId: 'user-2',
        createdAt: '2025-01-16T11:00:00Z',
      },
    ],
  },
  {
    id: 'thread-3',
    resolved: false,
    createdAt: '2025-01-16T13:45:00Z',
    canvasPosition: { x: 250, y: 500 },
    comments: [
      {
        id: 'comment-3-1',
        content: 'モーターブラケットに使用しているSUS304が入手困難になっています。SUS303への変更は可能でしょうか？',
        authorId: 'user-3',
        createdAt: '2025-01-16T13:45:00Z',
      },
      {
        id: 'comment-3-2',
        content: '強度計算を確認します。SUS303は被削性は良いですが、耐食性がやや劣ります。使用環境を教えてください。',
        authorId: 'user-1',
        createdAt: '2025-01-16T14:30:00Z',
      },
      {
        id: 'comment-3-3',
        content: '屋内使用で、特に腐食環境ではありません。',
        authorId: 'user-3',
        createdAt: '2025-01-16T14:45:00Z',
      },
    ],
  },
  {
    id: 'thread-4',
    resolved: false,
    createdAt: '2025-01-17T08:00:00Z',
    canvasPosition: { x: 400, y: 300 },
    comments: [
      {
        id: 'comment-4-1',
        content: 'シャフトの表面処理について、無電解ニッケルめっきの膜厚を10μmから15μmに変更したいとの客先要望があります。',
        authorId: 'user-6',
        createdAt: '2025-01-17T08:00:00Z',
      },
      {
        id: 'comment-4-2',
        content: '寸法公差に影響します。めっき後の仕上げ寸法で図面を再確認してください。',
        authorId: 'user-1',
        createdAt: '2025-01-17T09:00:00Z',
      },
    ],
  },
  {
    id: 'thread-5',
    resolved: false,
    createdAt: '2025-01-17T10:30:00Z',
    canvasPosition: { x: 700, y: 450 },
    comments: [
      {
        id: 'comment-5-1',
        content: 'ギアボックスのOリング（P-20）がEOL予定です。代替品の選定をお願いします。納期は来月末まで。',
        authorId: 'user-3',
        createdAt: '2025-01-17T10:30:00Z',
      },
    ],
  },
  {
    id: 'thread-6',
    resolved: false,
    createdAt: '2025-01-17T14:00:00Z',
    canvasPosition: { x: 180, y: 350 },
    comments: [
      {
        id: 'comment-6-1',
        content: '熱処理後の硬度がHRC58-62の指定ですが、今回のロットはHRC56でした。再熱処理が必要です。',
        authorId: 'user-2',
        createdAt: '2025-01-17T14:00:00Z',
      },
      {
        id: 'comment-6-2',
        content: '熱処理業者に確認します。炉の温度管理に問題があったようです。',
        authorId: 'user-5',
        createdAt: '2025-01-17T14:30:00Z',
      },
      {
        id: 'comment-6-3',
        content: '再熱処理の費用は先方持ちで対応してもらえることになりました。',
        authorId: 'user-5',
        createdAt: '2025-01-17T16:00:00Z',
      },
    ],
  },
  {
    id: 'thread-7',
    resolved: false,
    createdAt: '2025-01-18T09:00:00Z',
    canvasPosition: { x: 500, y: 200 },
    comments: [
      {
        id: 'comment-7-1',
        content: 'カバープレートの板金展開図に修正が必要です。曲げ代の計算が間違っています。',
        authorId: 'user-5',
        createdAt: '2025-01-18T09:00:00Z',
      },
    ],
  },
  {
    id: 'thread-8',
    resolved: false,
    createdAt: '2025-01-18T11:30:00Z',
    canvasPosition: { x: 320, y: 420 },
    comments: [
      {
        id: 'comment-8-1',
        content: 'ねじ穴の位置が干渉しています。M6ボルト頭とリブが接触する可能性があります。',
        authorId: 'user-4',
        createdAt: '2025-01-18T11:30:00Z',
      },
      {
        id: 'comment-8-2',
        content: '3Dモデルで確認しました。確かに1.5mmほど干渉しています。ねじ穴を5mm外側に移動させます。',
        authorId: 'user-1',
        createdAt: '2025-01-18T13:00:00Z',
      },
    ],
  },
  {
    id: 'thread-9',
    resolved: false,
    createdAt: '2025-01-19T08:30:00Z',
    canvasPosition: { x: 650, y: 300 },
    comments: [
      {
        id: 'comment-9-1',
        content: 'スプリングピンの径がφ3からφ4に変更になった影響で、穴加工の工程が増えます。コストへの影響を確認中。',
        authorId: 'user-5',
        createdAt: '2025-01-19T08:30:00Z',
      },
    ],
  },
  {
    id: 'thread-10',
    resolved: false,
    createdAt: '2025-01-19T10:00:00Z',
    canvasPosition: { x: 220, y: 180 },
    comments: [
      {
        id: 'comment-10-1',
        content: '客先から追加の耐久試験データの提出を求められています。10万サイクルの試験結果が必要です。',
        authorId: 'user-6',
        createdAt: '2025-01-19T10:00:00Z',
      },
      {
        id: 'comment-10-2',
        content: '現在5万サイクルまでの試験データがあります。追加試験には約2週間かかります。',
        authorId: 'user-2',
        createdAt: '2025-01-19T11:00:00Z',
      },
    ],
  },
  // === 解決済みスレッド ===
  {
    id: 'thread-11',
    resolved: true,
    createdAt: '2025-01-10T10:00:00Z',
    canvasPosition: { x: 400, y: 350 },
    comments: [
      {
        id: 'comment-11-1',
        content: 'コネクタの型番が古いバージョン（JST-XH-4）になっています。最新版（JST-XH-4A）に更新をお願いします。',
        authorId: 'user-3',
        createdAt: '2025-01-10T10:00:00Z',
      },
      {
        id: 'comment-11-2',
        content: '更新しました。ピン配置は同じなので互換性に問題ありません。',
        authorId: 'user-1',
        createdAt: '2025-01-10T11:30:00Z',
      },
    ],
  },
  {
    id: 'thread-12',
    resolved: true,
    createdAt: '2025-01-08T14:00:00Z',
    canvasPosition: { x: 800, y: 300 },
    comments: [
      {
        id: 'comment-12-1',
        content: 'CAD図面と製作図面の寸法が一致していません。確認をお願いします。',
        authorId: 'user-2',
        createdAt: '2025-01-08T14:00:00Z',
      },
      {
        id: 'comment-12-2',
        content: '確認しました。CAD図面が最新です。製作図面を再出力しました。',
        authorId: 'user-1',
        createdAt: '2025-01-08T15:00:00Z',
      },
    ],
  },
  {
    id: 'thread-13',
    resolved: true,
    createdAt: '2025-01-05T09:00:00Z',
    canvasPosition: { x: 550, y: 400 },
    comments: [
      {
        id: 'comment-13-1',
        content: 'ボルトの締め付けトルク値が記載されていません。追記をお願いします。',
        authorId: 'user-4',
        createdAt: '2025-01-05T09:00:00Z',
      },
      {
        id: 'comment-13-2',
        content: 'M8ボルト：25N・m、M6ボルト：10N・mで追記しました。',
        authorId: 'user-1',
        createdAt: '2025-01-05T10:30:00Z',
      },
      {
        id: 'comment-13-3',
        content: '確認しました。ありがとうございます。',
        authorId: 'user-4',
        createdAt: '2025-01-05T11:00:00Z',
      },
    ],
  },
  {
    id: 'thread-14',
    resolved: true,
    createdAt: '2025-01-03T11:00:00Z',
    canvasPosition: { x: 200, y: 250 },
    comments: [
      {
        id: 'comment-14-1',
        content: '表面粗さの指示がRa6.3になっていますが、この部位はRa1.6が必要では？',
        authorId: 'user-5',
        createdAt: '2025-01-03T11:00:00Z',
      },
      {
        id: 'comment-14-2',
        content: 'ご指摘の通りです。摺動面なのでRa1.6に修正しました。',
        authorId: 'user-1',
        createdAt: '2025-01-03T13:00:00Z',
      },
    ],
  },
  {
    id: 'thread-15',
    resolved: true,
    createdAt: '2024-12-28T10:00:00Z',
    canvasPosition: { x: 650, y: 180 },
    comments: [
      {
        id: 'comment-15-1',
        content: '塗装色の指定がありません。マンセル値または日塗工番号を指定してください。',
        authorId: 'user-3',
        createdAt: '2024-12-28T10:00:00Z',
      },
      {
        id: 'comment-15-2',
        content: '日塗工 N-50（グレー）を指定しました。',
        authorId: 'user-1',
        createdAt: '2024-12-28T11:00:00Z',
      },
    ],
  },
];

/**
 * スレッドをIDで検索
 */
export function getCommentThreadById(id: string): CommentThread | undefined {
  return commentThreads.find((t) => t.id === id);
}

/**
 * スレッドに作者情報を付与
 */
export function enrichThreadWithAuthors(thread: CommentThread): CommentThreadWithAuthors {
  return {
    ...thread,
    comments: thread.comments.map((comment) => ({
      ...comment,
      author: getUserById(comment.authorId) ?? {
        id: comment.authorId,
        name: '不明なユーザー',
      },
    })),
  };
}

/**
 * 全スレッドに作者情報を付与
 */
export function getCommentThreadsWithAuthors(): CommentThreadWithAuthors[] {
  return commentThreads.map(enrichThreadWithAuthors);
}
