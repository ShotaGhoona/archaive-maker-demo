// マルチセレクト用の型
interface TagItem {
  label: string;
  color: string;
}

// サムネイル（書き込み済みバージョン）の型定義
export interface DrawingThumbnail {
  id: string;
  drawingId: string;
  name: string;
  thumbnailUrl: string;
  createdBy: string;
  createdAt: string;
  isOriginal: boolean; // オリジナル図面かどうか
}

// 図面の型定義
export interface DrawingItem {
  id: string;
  productId: string;
  drawingNumber: string;
  name: string;
  revision: string;
  status: TagItem[];
  fileFormat: string;
  fileSize: string;
  scale: string;
  sheetSize: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  thumbnails: DrawingThumbnail[];
}

// 製品の型定義
export interface ProductDetail {
  id: string;
  productNumber: string;
  name: string;
  revision: string;
  status: TagItem[];
  category: string;
  project: string;
  department: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  approvedBy: string;
  approvedAt: string | null;
  material: string;
  tags: TagItem[];
  remarks: string;
  drawings: DrawingItem[];
}

// ステータス定義
const productStatuses: TagItem[] = [
  { label: '承認済', color: '#22c55e' },
  { label: 'レビュー中', color: '#f59e0b' },
  { label: '作成中', color: '#3b82f6' },
];

const drawingStatuses: TagItem[] = [
  { label: '最新', color: '#22c55e' },
  { label: '旧版', color: '#6b7280' },
  { label: 'ドラフト', color: '#f59e0b' },
];

// タグ定義
const productTags: TagItem[] = [
  { label: '重要', color: '#ef4444' },
  { label: '新規', color: '#3b82f6' },
  { label: '改訂', color: '#8b5cf6' },
  { label: '量産', color: '#22c55e' },
];

// ダミーサムネイル画像
function getThumbnailUrl(seed: number): string {
  return `https://picsum.photos/seed/${seed}/800/600?grayscale`;
}

// ダミーサムネイル（書き込み済みバージョン）を生成
function generateThumbnails(
  drawingId: string,
  count: number,
): DrawingThumbnail[] {
  const creators = ['山田太郎', '佐藤花子', '田中一郎', '鈴木次郎'];
  const thumbnailNames = [
    'オリジナル',
    '寸法検討',
    '加工指示追記',
    '品質確認メモ',
    '設計レビュー',
  ];

  const thumbnails: DrawingThumbnail[] = [];
  for (let i = 0; i < count; i++) {
    thumbnails.push({
      id: `thumbnail-${drawingId}-${i + 1}`,
      drawingId,
      name: thumbnailNames[i % thumbnailNames.length],
      thumbnailUrl: getThumbnailUrl(
        parseInt(drawingId.split('-')[1] || '1') * 100 + i,
      ),
      createdBy: creators[i % creators.length],
      createdAt: `2024-${String(Math.floor(i / 2) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      isOriginal: i === 0,
    });
  }
  return thumbnails;
}

// ダミー図面を生成
function generateDrawings(productId: string, count: number): DrawingItem[] {
  const drawings: DrawingItem[] = [];
  const formats = ['DWG', 'PDF', 'DXF'];
  const scales = ['1:1', '1:2', '1:5', '1:10'];
  const sheetSizes = ['A1', 'A2', 'A3'];
  const creators = ['山田太郎', '佐藤花子', '田中一郎'];

  const drawingNames = [
    '組立図',
    '部品図',
    '詳細図',
    '外観図',
    '断面図',
    '分解図',
  ];

  for (let i = 0; i < count; i++) {
    const drawingId = `drawing-${productId}-${i + 1}`;
    const revision = String.fromCharCode(65 + i); // A, B, C...
    const isLatest = i === count - 1;

    drawings.push({
      id: drawingId,
      productId,
      drawingNumber: `DWG-${productId}-${String(i + 1).padStart(2, '0')}`,
      name: drawingNames[i % drawingNames.length],
      revision,
      status: isLatest ? [drawingStatuses[0]] : [drawingStatuses[1]],
      fileFormat: formats[i % formats.length],
      fileSize: `${(1 + i * 0.5).toFixed(1)} MB`,
      scale: scales[i % scales.length],
      sheetSize: sheetSizes[i % sheetSizes.length],
      createdBy: creators[i % creators.length],
      createdAt: `2024-${String(i + 1).padStart(2, '0')}-15`,
      updatedBy: creators[(i + 1) % creators.length],
      updatedAt: `2024-${String(i + 2).padStart(2, '0')}-01`,
      thumbnails: generateThumbnails(drawingId, 2 + (i % 3)),
    });
  }

  return drawings;
}

// ダミー製品データを生成
function generateProducts(): ProductDetail[] {
  const products: ProductDetail[] = [
    {
      id: '1',
      productNumber: 'PRD-2024-001',
      name: 'メインフレームアセンブリ',
      revision: 'C',
      status: [productStatuses[0]],
      category: '組立品',
      project: 'プロジェクトA',
      department: '設計1課',
      createdBy: '山田太郎',
      createdAt: '2024-01-15',
      updatedBy: '佐藤花子',
      updatedAt: '2024-06-20',
      approvedBy: '部長 中村',
      approvedAt: '2024-06-25',
      material: 'SS400',
      tags: [productTags[0], productTags[3]],
      remarks: '量産移行済み。次期改訂予定あり。',
      drawings: generateDrawings('1', 5),
    },
    {
      id: '2',
      productNumber: 'PRD-2024-002',
      name: 'モーターブラケットユニット',
      revision: 'B',
      status: [productStatuses[1]],
      category: '部品',
      project: 'プロジェクトB',
      department: '設計2課',
      createdBy: '田中一郎',
      createdAt: '2024-03-01',
      updatedBy: '田中一郎',
      updatedAt: '2024-07-10',
      approvedBy: '',
      approvedAt: null,
      material: 'A5052',
      tags: [productTags[1], productTags[2]],
      remarks: '客先承認待ち',
      drawings: generateDrawings('2', 3),
    },
    {
      id: '3',
      productNumber: 'PRD-2024-003',
      name: '制御盤筐体',
      revision: 'A',
      status: [productStatuses[2]],
      category: '筐体',
      project: 'プロジェクトC',
      department: '製造技術課',
      createdBy: '鈴木次郎',
      createdAt: '2024-05-20',
      updatedBy: '鈴木次郎',
      updatedAt: '2024-08-01',
      approvedBy: '',
      approvedAt: null,
      material: 'SUS304',
      tags: [productTags[1]],
      remarks: '設計中。仕様確定待ち。',
      drawings: generateDrawings('3', 2),
    },
  ];

  return products;
}

export const dummyProducts: ProductDetail[] = generateProducts();

// IDで製品を取得するヘルパー関数
export function getProductById(id: string): ProductDetail | undefined {
  return dummyProducts.find((p) => p.id === id);
}

// 製品の図面を取得するヘルパー関数
export function getProductDrawings(productId: string): DrawingItem[] {
  const product = getProductById(productId);
  return product?.drawings ?? [];
}

// 図面のサムネイルを取得するヘルパー関数
export function getDrawingThumbnails(
  productId: string,
  drawingId: string,
): DrawingThumbnail[] {
  const drawings = getProductDrawings(productId);
  const drawing = drawings.find((d) => d.id === drawingId);
  return drawing?.thumbnails ?? [];
}
