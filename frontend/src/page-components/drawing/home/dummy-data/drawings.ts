// 図面データの型定義（ダミーデータ用、後で削除）
export interface DrawingItem {
  id: string;
  drawingNumber: string; // 図番
  name: string; // 図面名
  revision: string; // リビジョン
  status: {
    label: string;
    color: string;
  };
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
  remarks: string; // 備考
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
const approvers = ['部長 中村', '課長 木村', '主任 加藤', '係長 吉田', '-'];
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

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomFileSize(): string {
  const size = Math.random() * 10;
  if (size < 1) {
    return `${Math.floor(size * 1000)} KB`;
  }
  return `${size.toFixed(1)} MB`;
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateDrawings(count: number): DrawingItem[] {
  const drawings: DrawingItem[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 1; i <= count; i++) {
    const status = getRandomItem(statuses);
    const createdAt = getRandomDate(startDate, endDate);
    const updatedAt = getRandomDate(new Date(createdAt), endDate);
    const isApproved = status.label === '承認済';
    const approver = isApproved ? getRandomItem(approvers.filter(a => a !== '-')) : '-';
    const approvedAt = isApproved ? getRandomDate(new Date(updatedAt), endDate) : null;

    drawings.push({
      id: String(i),
      drawingNumber: `DWG-2024-${String(i).padStart(3, '0')}`,
      name: getRandomItem(drawingNames),
      revision: String.fromCharCode(65 + Math.floor(Math.random() * 5)), // A-E
      status,
      category: getRandomItem(categories),
      project: getRandomItem(projects),
      department: getRandomItem(departments),
      createdBy: getRandomItem(creators),
      createdAt,
      updatedBy: getRandomItem(creators),
      updatedAt,
      approvedBy: approver,
      approvedAt,
      fileFormat: getRandomItem(formats),
      fileSize: getRandomFileSize(),
      scale: getRandomItem(scales),
      sheetSize: getRandomItem(sheetSizes),
      material: getRandomItem(materials),
      remarks: getRandomItem(remarks),
    });
  }

  return drawings;
}

export const dummyDrawings: DrawingItem[] = generateDrawings(50);
