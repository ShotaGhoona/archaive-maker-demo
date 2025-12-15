// ============================================
// DrawingPage ダミーデータ（開発用）
// ============================================

import type { DrawingPageDTO, DrawingPageListDTO } from '../model/dto';

// ============================================
// ダミーデータ生成用の定数
// ============================================

const drawingCategories = [
  { id: 1, name: '組立図' },
  { id: 2, name: '加工図' },
  { id: 3, name: '部品図' },
  { id: 4, name: 'レイアウト図' },
  { id: 5, name: '外観図' },
  { id: 6, name: '配線図' },
  { id: 7, name: '回路図' },
  { id: 8, name: '構造図' },
];

const customers = [
  { id: 1, name: '株式会社ABC製作所' },
  { id: 2, name: '山田工業株式会社' },
  { id: 3, name: 'テック・ソリューションズ' },
  { id: 4, name: '東京精密機器' },
  { id: 5, name: '大阪メカニクス' },
];

const employees = [
  { id: 1, name: '山田太郎' },
  { id: 2, name: '佐藤花子' },
  { id: 3, name: '田中一郎' },
  { id: 4, name: '鈴木次郎' },
  { id: 5, name: '高橋美咲' },
  { id: 6, name: '伊藤健太' },
  { id: 7, name: '渡辺真理' },
  { id: 8, name: '小林誠' },
];

const leafProducts = [
  { id: 1, name: 'メインフレーム', revision: 1 },
  { id: 2, name: 'ベースプレート', revision: 2 },
  { id: 3, name: 'サイドパネル', revision: 1 },
  { id: 4, name: 'モーターブラケット', revision: 3 },
  { id: 5, name: 'シャフト', revision: 1 },
  { id: 6, name: 'カバーアセンブリ', revision: 2 },
  { id: 7, name: 'ギアボックス', revision: 1 },
  { id: 8, name: 'ヒートシンク', revision: 4 },
  { id: 9, name: '筐体', revision: 1 },
  { id: 10, name: 'コネクタパネル', revision: 2 },
];

const fileExtensions = ['dwg', 'dxf', 'pdf', 'step', 'iges'];

const remarks = [
  null,
  '要確認事項あり',
  '客先承認待ち',
  '設計変更予定',
  '試作完了',
  '量産移行済',
  '暫定版',
  '最終版',
];

// ============================================
// ダミーデータ生成ロジック
// ============================================

// シード付き疑似乱数生成（決定的な値を生成）
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function getSeededItem<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function getSeededDate(seed: number, baseDate?: string): string {
  const start = new Date('2023-01-01').getTime();
  const end = new Date('2024-12-31').getTime();
  const base = baseDate ? new Date(baseDate).getTime() : start;
  const actualStart = Math.max(start, base);
  const timestamp = actualStart + seededRandom(seed) * (end - actualStart);
  return new Date(timestamp).toISOString();
}

// ULID風の文字列を生成
function generateUlid(seed: number): string {
  const chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let ulid = '';
  for (let i = 0; i < 26; i++) {
    ulid += chars[Math.floor(seededRandom(seed + i) * chars.length)];
  }
  return ulid;
}

// ダミーサムネイル画像URL
function getThumbnailUrl(id: number): string {
  return `https://picsum.photos/seed/${id}/400/300?grayscale`;
}

function generateDrawingPagesDTO(count: number): DrawingPageDTO[] {
  const pages: DrawingPageDTO[] = [];

  for (let i = 1; i <= count; i++) {
    const baseSeed = i * 1000;

    const category = getSeededItem(drawingCategories, baseSeed + 1);
    const customer = getSeededItem(customers, baseSeed + 2);
    const createdByEmployee = getSeededItem(employees, baseSeed + 3);
    const updatedByEmployee = getSeededItem(employees, baseSeed + 4);
    const leafProduct = getSeededItem(leafProducts, baseSeed + 5);
    const extension = getSeededItem(fileExtensions, baseSeed + 6);
    const remark = getSeededItem(remarks, baseSeed + 7);

    const createdAt = getSeededDate(baseSeed + 8);
    const updatedAt = getSeededDate(baseSeed + 9, createdAt);

    const drawingFileId = Math.floor(seededRandom(baseSeed + 10) * 100) + 1;
    const pageNumber = Math.floor(seededRandom(baseSeed + 11) * 5) + 1;

    pages.push({
      // 必須フィールド
      id: i,
      ulid: generateUlid(baseSeed),
      drawing_file_id: drawingFileId,
      drawing_number: `DWG-2024-${String(i).padStart(4, '0')}`,
      page_number: pageNumber,
      is_shown_similar_search: seededRandom(baseSeed + 12) > 0.3,
      created_by: createdByEmployee.id,
      updated_by: updatedByEmployee.id,
      created_at: createdAt,
      updated_at: updatedAt,

      // オプションフィールド
      external_drawing_number:
        seededRandom(baseSeed + 13) > 0.5
          ? `EXT-${String(i).padStart(3, '0')}`
          : null,
      s3_url: getThumbnailUrl(i),
      remarks: remark,
      drawing_category_id: category.id,
      drawing_category_name: category.name,
      seq_number: i,
      rotation_angle: [0, 90, 180, 270][
        Math.floor(seededRandom(baseSeed + 14) * 4)
      ],
      drawing_file_name: `${leafProduct.name}_${category.name}`,
      drawing_file_extension: extension,
      leaf_product_id: leafProduct.id,
      leaf_product_name: leafProduct.name,
      leaf_product_revision_number: leafProduct.revision,
      leaf_product_custom_item: null,
      customer_id: customer.id,
      customer_name: customer.name,
      created_by_name: createdByEmployee.name,
      updated_by_name: updatedByEmployee.name,
    });
  }

  return pages;
}

// ============================================
// エクスポート
// ============================================

/** ダミーデータ（50件） */
export const dummyDrawingPagesDTO: DrawingPageDTO[] = generateDrawingPagesDTO(50);

/**
 * ページネーション付きダミーレスポンスを生成
 */
export function getDummyDrawingPageListDTO(
  page: number = 1,
  perPage: number = 20
): DrawingPageListDTO {
  const startIndex = (page - 1) * perPage;
  const items = dummyDrawingPagesDTO.slice(startIndex, startIndex + perPage);

  return {
    items,
    total_count: dummyDrawingPagesDTO.length,
    page,
    per_page: perPage,
    has_more: startIndex + perPage < dummyDrawingPagesDTO.length,
  };
}
