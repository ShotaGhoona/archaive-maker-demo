// マルチセレクト用の型
interface TagItem {
  label: string;
  color: string;
}

// 図面データの型定義（ダミーデータ用、後で削除）
export interface DrawingItem {
  id: string;
  drawingNumber: string; // 図番
  name: string; // 図面名
  revision: string; // リビジョン
  status: TagItem[]; // ステータス（マルチセレクト）
  category: string; // カテゴリ
  project: string; // プロジェクト
  department: string; // 部署
  createdBy: string; // 作成者
  createdAt: string; // 作成日
  updatedBy: string; // 更新者
  updatedAt: string; // 更新日
  approvedBy: string; // 承認者
  approvedAt: string | null; // 承認日
  fileFormat: string; // ファイル形式
  fileSize: string; // ファイルサイズ
  scale: string; // 縮尺
  sheetSize: string; // 用紙サイズ
  material: string; // 材質
  tags: TagItem[]; // タグ（マルチセレクト）
  remarks: string; // 備考
  thumbnailUrl: string; // サムネイル画像URL
}

const statuses = [
  { label: '承認済', color: '#22c55e' },
  { label: 'レビュー中', color: '#f59e0b' },
  { label: '作成中', color: '#3b82f6' },
  { label: '却下', color: '#ef4444' },
  { label: '保留', color: '#6b7280' },
];

const categories = ['組立図', '加工図', '部品図', 'レイアウト図', '外観図', '配線図', '回路図', '構造図'];
const projects = ['プロジェクトA', 'プロジェクトB', 'プロジェクトC', 'プロジェクトD', '新製品開発', '改良案件'];
const departments = ['設計1課', '設計2課', '製造技術課', '品質管理課', '開発課'];
const creators = ['山田太郎', '佐藤花子', '田中一郎', '鈴木次郎', '高橋美咲', '伊藤健太', '渡辺真理', '小林誠'];
const approvers = ['部長 中村', '課長 木村', '主任 加藤', '係長 吉田'];
const formats = ['DWG', 'DXF', 'PDF', 'STEP', 'IGES'];
const scales = ['1:1', '1:2', '1:5', '1:10', '1:20', '1:50', '1:100'];
const sheetSizes = ['A0', 'A1', 'A2', 'A3', 'A4'];
const materials = ['SS400', 'SUS304', 'A5052', 'S45C', 'SUS316', 'C1100', 'ABS樹脂', 'POM', '-'];

const drawingNames = [
  'メインフレーム組立図',
  'ベースプレート加工図',
  'サイドパネル部品図',
  'モーターブラケット',
  '配線ダクトレイアウト',
  'シャフト加工図',
  'カバーアセンブリ',
  'ギアボックス分解図',
  'ヒートシンク詳細図',
  '筐体外観図',
  'コネクタパネル配置図',
  'フランジ加工図',
  'ベアリングハウジング',
  'モーターマウント',
  '制御盤レイアウト',
  'センサーブラケット',
  '冷却ファンユニット',
  'ケーブルトレイ配置図',
  '端子台取付図',
  'パイプサポート',
  'バルブマニホールド',
  'フィルターユニット',
  'タンク組立図',
  'ポンプベース',
  'インバータ取付図',
  'スイッチパネル',
  'ドアヒンジ詳細',
  'ロック機構図',
  'ハンドル部品図',
  'シール溝詳細',
  'Oリング取付図',
  'ガスケット形状図',
  'ボルトパターン図',
  '溶接指示図',
  '表面処理指示図',
  '塗装仕様図',
  'めっき仕様図',
  '熱処理指示図',
  '検査基準図',
  '寸法公差図',
];

const remarks = [
  '',
  '要確認事項あり',
  '客先承認待ち',
  '設計変更予定',
  '試作完了',
  '量産移行済',
  '廃止予定',
  '暫定版',
  '最終版',
  '改訂中',
];

// タグ用のデータ
const tags: TagItem[] = [
  { label: '重要', color: '#ef4444' },
  { label: '緊急', color: '#f97316' },
  { label: '新規', color: '#3b82f6' },
  { label: '改訂', color: '#8b5cf6' },
  { label: '試作', color: '#06b6d4' },
  { label: '量産', color: '#22c55e' },
  { label: '外注', color: '#ec4899' },
  { label: '内製', color: '#14b8a6' },
];

// シード付き疑似乱数生成（決定的な値を生成）
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function getSeededItem<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

// ランダムに複数アイテムを取得（マルチセレクト用）
function getSeededItems<T>(arr: T[], seed: number, maxCount: number = 3): T[] {
  const count = Math.floor(seededRandom(seed) * maxCount) + 1;
  const result: T[] = [];
  const used = new Set<number>();

  for (let i = 0; i < count && i < arr.length; i++) {
    let idx = Math.floor(seededRandom(seed + i * 100) * arr.length);
    while (used.has(idx)) {
      idx = (idx + 1) % arr.length;
    }
    used.add(idx);
    result.push(arr[idx]);
  }

  return result;
}

function getSeededFileSize(seed: number): string {
  const size = seededRandom(seed) * 10;
  if (size < 1) {
    return `${Math.floor(size * 1000)} KB`;
  }
  return `${size.toFixed(1)} MB`;
}

function getSeededDate(seed: number, baseDate: string): string {
  const start = new Date('2023-01-01').getTime();
  const end = new Date('2024-12-31').getTime();
  const base = baseDate ? new Date(baseDate).getTime() : start;
  const actualStart = Math.max(start, base);
  const timestamp = actualStart + seededRandom(seed) * (end - actualStart);
  return new Date(timestamp).toISOString().split('T')[0];
}

// ダミーサムネイル画像（picsum.photosを使用）
function getThumbnailUrl(id: number): string {
  return `https://picsum.photos/seed/${id}/400/300?grayscale`;
}

function generateDrawings(count: number): DrawingItem[] {
  const drawings: DrawingItem[] = [];

  for (let i = 1; i <= count; i++) {
    const baseSeed = i * 1000;
    const statusItem = getSeededItem(statuses, baseSeed + 1);
    const createdAt = getSeededDate(baseSeed + 2, '');
    const updatedAt = getSeededDate(baseSeed + 3, createdAt);
    const isApproved = statusItem.label === '承認済';
    const approver = isApproved ? getSeededItem(approvers, baseSeed + 4) : '';
    const approvedAt = isApproved ? getSeededDate(baseSeed + 5, updatedAt) : null;

    drawings.push({
      id: String(i),
      drawingNumber: `DWG-2024-${String(i).padStart(3, '0')}`,
      name: getSeededItem(drawingNames, baseSeed + 6),
      revision: String.fromCharCode(65 + Math.floor(seededRandom(baseSeed + 7) * 5)),
      status: [statusItem], // ステータスを配列に
      category: getSeededItem(categories, baseSeed + 8),
      project: getSeededItem(projects, baseSeed + 9),
      department: getSeededItem(departments, baseSeed + 10),
      createdBy: getSeededItem(creators, baseSeed + 11),
      createdAt,
      updatedBy: getSeededItem(creators, baseSeed + 12),
      updatedAt,
      approvedBy: approver,
      approvedAt,
      fileFormat: getSeededItem(formats, baseSeed + 13),
      fileSize: getSeededFileSize(baseSeed + 14),
      scale: getSeededItem(scales, baseSeed + 15),
      sheetSize: getSeededItem(sheetSizes, baseSeed + 16),
      material: getSeededItem(materials, baseSeed + 17),
      tags: getSeededItems(tags, baseSeed + 19, 3), // タグを複数取得
      remarks: getSeededItem(remarks, baseSeed + 18),
      thumbnailUrl: getThumbnailUrl(i),
    });
  }

  return drawings;
}

export const dummyDrawings: DrawingItem[] = generateDrawings(50);
