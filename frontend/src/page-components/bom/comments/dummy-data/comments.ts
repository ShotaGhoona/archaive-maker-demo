/**
 * コメント一覧ページ用ダミーデータ
 * 中小企業の製造業（精密機械部品メーカー）を想定
 */

/** コメントの作者情報 */
export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
}

/** 個別コメント */
export interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string;
  updatedAt?: string;
}

/** コメントスレッド */
export interface CommentThread {
  id: string;
  resolved: boolean;
  comments: Comment[];
  createdAt: string;
  /** キャンバス上の座標（キャンバスへのジャンプ用） */
  canvasPosition?: {
    x: number;
    y: number;
  };
}

/** ダミーユーザー（中小製造業の従業員） */
const users: CommentAuthor[] = [
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
  {
    id: 'user-6',
    name: '渡辺誠',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watanabe',
    department: '営業部',
  },
];

export const dummyCommentThreads: CommentThread[] = [
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
        author: users[3],
        createdAt: '2025-01-15T09:30:00Z',
      },
      {
        id: 'comment-1-2',
        content: '客先の要求仕様を確認しました。±0.008mmまでは許容範囲とのことです。図面を修正しますか？',
        author: users[0],
        createdAt: '2025-01-15T10:15:00Z',
      },
      {
        id: 'comment-1-3',
        content: 'それなら対応可能です。図面修正をお願いします。',
        author: users[3],
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
        author: users[1],
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
        author: users[2],
        createdAt: '2025-01-16T13:45:00Z',
      },
      {
        id: 'comment-3-2',
        content: '強度計算を確認します。SUS303は被削性は良いですが、耐食性がやや劣ります。使用環境を教えてください。',
        author: users[0],
        createdAt: '2025-01-16T14:30:00Z',
      },
      {
        id: 'comment-3-3',
        content: '屋内使用で、特に腐食環境ではありません。',
        author: users[2],
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
        author: users[5],
        createdAt: '2025-01-17T08:00:00Z',
      },
      {
        id: 'comment-4-2',
        content: '寸法公差に影響します。めっき後の仕上げ寸法で図面を再確認してください。',
        author: users[0],
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
        author: users[2],
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
        author: users[1],
        createdAt: '2025-01-17T14:00:00Z',
      },
      {
        id: 'comment-6-2',
        content: '熱処理業者に確認します。炉の温度管理に問題があったようです。',
        author: users[4],
        createdAt: '2025-01-17T14:30:00Z',
      },
      {
        id: 'comment-6-3',
        content: '再熱処理の費用は先方持ちで対応してもらえることになりました。',
        author: users[4],
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
        author: users[4],
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
        author: users[3],
        createdAt: '2025-01-18T11:30:00Z',
      },
      {
        id: 'comment-8-2',
        content: '3Dモデルで確認しました。確かに1.5mmほど干渉しています。ねじ穴を5mm外側に移動させます。',
        author: users[0],
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
        author: users[4],
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
        author: users[5],
        createdAt: '2025-01-19T10:00:00Z',
      },
      {
        id: 'comment-10-2',
        content: '現在5万サイクルまでの試験データがあります。追加試験には約2週間かかります。',
        author: users[1],
        createdAt: '2025-01-19T11:00:00Z',
      },
    ],
  },
  {
    id: 'thread-11',
    resolved: false,
    createdAt: '2025-01-20T09:00:00Z',
    canvasPosition: { x: 480, y: 380 },
    comments: [
      {
        id: 'comment-11-1',
        content: 'アルミダイカスト部品の巣穴が多発しています。金型のメンテナンスが必要かもしれません。',
        author: users[1],
        createdAt: '2025-01-20T09:00:00Z',
      },
    ],
  },
  {
    id: 'thread-12',
    resolved: false,
    createdAt: '2025-01-20T14:00:00Z',
    canvasPosition: { x: 580, y: 520 },
    comments: [
      {
        id: 'comment-12-1',
        content: 'ワイヤーハーネスの長さが図面と実物で50mm違います。どちらが正しいですか？',
        author: users[3],
        createdAt: '2025-01-20T14:00:00Z',
      },
      {
        id: 'comment-12-2',
        content: '図面が最新です。実物は旧版で作られた可能性があります。製造ロットを確認してください。',
        author: users[0],
        createdAt: '2025-01-20T14:30:00Z',
      },
    ],
  },
  {
    id: 'thread-13',
    resolved: false,
    createdAt: '2025-01-21T08:00:00Z',
    canvasPosition: { x: 350, y: 150 },
    comments: [
      {
        id: 'comment-13-1',
        content: '防振ゴムの硬度指定がショアA60ですが、ショアA70の方が振動吸収特性が良いとのメーカー推奨があります。',
        author: users[2],
        createdAt: '2025-01-21T08:00:00Z',
      },
    ],
  },
  {
    id: 'thread-14',
    resolved: false,
    createdAt: '2025-01-21T11:00:00Z',
    canvasPosition: { x: 720, y: 280 },
    comments: [
      {
        id: 'comment-14-1',
        content: '六角穴付きボルトをトルクスボルトに変更したいと思います。組立性が向上し、カムアウト防止になります。',
        author: users[4],
        createdAt: '2025-01-21T11:00:00Z',
      },
      {
        id: 'comment-14-2',
        content: '良い提案です。ただし、トルクスドライバーの追加購入が必要になります。コスト確認をお願いします。',
        author: users[0],
        createdAt: '2025-01-21T11:30:00Z',
      },
      {
        id: 'comment-14-3',
        content: 'T25サイズのドライバーセットで約8,000円です。年間の組立工数削減効果の方が大きいと思います。',
        author: users[4],
        createdAt: '2025-01-21T13:00:00Z',
      },
    ],
  },
  {
    id: 'thread-15',
    resolved: false,
    createdAt: '2025-01-22T09:30:00Z',
    canvasPosition: { x: 280, y: 480 },
    comments: [
      {
        id: 'comment-15-1',
        content: 'プーリーの溝形状がJIS規格と異なっています。M形からA形への変更が必要です。',
        author: users[1],
        createdAt: '2025-01-22T09:30:00Z',
      },
    ],
  },

  // === 解決済みスレッド ===
  {
    id: 'thread-16',
    resolved: true,
    createdAt: '2025-01-10T10:00:00Z',
    canvasPosition: { x: 400, y: 350 },
    comments: [
      {
        id: 'comment-16-1',
        content: 'コネクタの型番が古いバージョン（JST-XH-4）になっています。最新版（JST-XH-4A）に更新をお願いします。',
        author: users[2],
        createdAt: '2025-01-10T10:00:00Z',
      },
      {
        id: 'comment-16-2',
        content: '更新しました。ピン配置は同じなので互換性に問題ありません。',
        author: users[0],
        createdAt: '2025-01-10T11:30:00Z',
      },
    ],
  },
  {
    id: 'thread-17',
    resolved: true,
    createdAt: '2025-01-08T14:00:00Z',
    canvasPosition: { x: 800, y: 300 },
    comments: [
      {
        id: 'comment-17-1',
        content: 'CAD図面と製作図面の寸法が一致していません。確認をお願いします。',
        author: users[1],
        createdAt: '2025-01-08T14:00:00Z',
      },
      {
        id: 'comment-17-2',
        content: '確認しました。CAD図面が最新です。製作図面を再出力しました。',
        author: users[0],
        createdAt: '2025-01-08T15:00:00Z',
      },
    ],
  },
  {
    id: 'thread-18',
    resolved: true,
    createdAt: '2025-01-05T09:00:00Z',
    canvasPosition: { x: 550, y: 400 },
    comments: [
      {
        id: 'comment-18-1',
        content: 'ボルトの締め付けトルク値が記載されていません。追記をお願いします。',
        author: users[3],
        createdAt: '2025-01-05T09:00:00Z',
      },
      {
        id: 'comment-18-2',
        content: 'M8ボルト：25N・m、M6ボルト：10N・mで追記しました。',
        author: users[0],
        createdAt: '2025-01-05T10:30:00Z',
      },
      {
        id: 'comment-18-3',
        content: '確認しました。ありがとうございます。',
        author: users[3],
        createdAt: '2025-01-05T11:00:00Z',
      },
    ],
  },
  {
    id: 'thread-19',
    resolved: true,
    createdAt: '2025-01-03T11:00:00Z',
    canvasPosition: { x: 200, y: 250 },
    comments: [
      {
        id: 'comment-19-1',
        content: '表面粗さの指示がRa6.3になっていますが、この部位はRa1.6が必要では？',
        author: users[4],
        createdAt: '2025-01-03T11:00:00Z',
      },
      {
        id: 'comment-19-2',
        content: 'ご指摘の通りです。摺動面なのでRa1.6に修正しました。',
        author: users[0],
        createdAt: '2025-01-03T13:00:00Z',
      },
    ],
  },
  {
    id: 'thread-20',
    resolved: true,
    createdAt: '2024-12-28T10:00:00Z',
    canvasPosition: { x: 650, y: 180 },
    comments: [
      {
        id: 'comment-20-1',
        content: '塗装色の指定がありません。マンセル値または日塗工番号を指定してください。',
        author: users[2],
        createdAt: '2024-12-28T10:00:00Z',
      },
      {
        id: 'comment-20-2',
        content: '日塗工 N-50（グレー）を指定しました。',
        author: users[0],
        createdAt: '2024-12-28T11:00:00Z',
      },
    ],
  },
  {
    id: 'thread-21',
    resolved: true,
    createdAt: '2024-12-25T14:00:00Z',
    canvasPosition: { x: 420, y: 520 },
    comments: [
      {
        id: 'comment-21-1',
        content: 'リニアガイドの型番が廃番になっています。後継品への変更をお願いします。',
        author: users[2],
        createdAt: '2024-12-25T14:00:00Z',
      },
      {
        id: 'comment-21-2',
        content: 'THK製SHS15に変更しました。取付寸法は同一です。',
        author: users[0],
        createdAt: '2024-12-25T16:00:00Z',
      },
    ],
  },
  {
    id: 'thread-22',
    resolved: true,
    createdAt: '2024-12-20T09:00:00Z',
    canvasPosition: { x: 300, y: 350 },
    comments: [
      {
        id: 'comment-22-1',
        content: 'このアセンブリの組立手順書を作成してください。新人教育に使用します。',
        author: users[3],
        createdAt: '2024-12-20T09:00:00Z',
      },
      {
        id: 'comment-22-2',
        content: '作成しました。ドキュメントタブにアップロードしています。',
        author: users[4],
        createdAt: '2024-12-22T15:00:00Z',
      },
    ],
  },
  {
    id: 'thread-23',
    resolved: true,
    createdAt: '2024-12-18T11:00:00Z',
    canvasPosition: { x: 750, y: 420 },
    comments: [
      {
        id: 'comment-23-1',
        content: '溶接記号の表記が古いJIS規格になっています。最新のISO規格に合わせてください。',
        author: users[1],
        createdAt: '2024-12-18T11:00:00Z',
      },
      {
        id: 'comment-23-2',
        content: 'ISO 2553:2019に準拠した表記に修正しました。',
        author: users[0],
        createdAt: '2024-12-18T14:00:00Z',
      },
    ],
  },
  {
    id: 'thread-24',
    resolved: true,
    createdAt: '2024-12-15T10:00:00Z',
    canvasPosition: { x: 180, y: 450 },
    comments: [
      {
        id: 'comment-24-1',
        content: 'サーボモーターの取付穴がJIS規格と微妙にずれています。確認をお願いします。',
        author: users[4],
        createdAt: '2024-12-15T10:00:00Z',
      },
      {
        id: 'comment-24-2',
        content: 'メーカーカタログを確認しました。モーター側がメーカー独自寸法でした。図面を修正しました。',
        author: users[0],
        createdAt: '2024-12-15T13:00:00Z',
      },
    ],
  },
  {
    id: 'thread-25',
    resolved: true,
    createdAt: '2024-12-10T09:00:00Z',
    canvasPosition: { x: 520, y: 280 },
    comments: [
      {
        id: 'comment-25-1',
        content: '部品番号の採番ルールが変わりました。旧番号から新番号への変換をお願いします。',
        author: users[5],
        createdAt: '2024-12-10T09:00:00Z',
      },
      {
        id: 'comment-25-2',
        content: '全30点の部品番号を新ルールに変換しました。対照表も作成しています。',
        author: users[0],
        createdAt: '2024-12-12T17:00:00Z',
      },
    ],
  },
];
