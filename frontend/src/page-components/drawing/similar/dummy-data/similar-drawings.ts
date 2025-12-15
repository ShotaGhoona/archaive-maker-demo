export interface SimilarDrawing {
  id: string;
  drawingNumber: string;
  name: string;
  thumbnailUrl: string;
  similarity: number; // 類似度（0-100）
  productName: string;
  category: string;
  createdAt: string;
}

function getThumbnailUrl(seed: number): string {
  return `https://picsum.photos/seed/${seed}/400/300?grayscale`;
}

const categories = ['組立品', '部品', '筐体', '治具', '金型'];
const productNames = [
  'フレームアセンブリ',
  'ブラケットユニット',
  '制御盤筐体',
  'モーターマウント',
  'ギアボックス',
  'シャフトカバー',
  'ベースプレート',
  'サポートブラケット',
];

function generateSimilarDrawings(count: number): SimilarDrawing[] {
  const drawings: SimilarDrawing[] = [];

  for (let i = 0; i < count; i++) {
    const similarity = Math.max(
      50,
      100 - i * 3 - Math.floor(Math.random() * 5),
    );
    drawings.push({
      id: `similar-${i + 1}`,
      drawingNumber: `DWG-${2024}-${String(100 + i).padStart(3, '0')}`,
      name: `${productNames[i % productNames.length]} - 図面${i + 1}`,
      thumbnailUrl: getThumbnailUrl(200 + i),
      similarity,
      productName: productNames[i % productNames.length],
      category: categories[i % categories.length],
      createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    });
  }

  return drawings.sort((a, b) => b.similarity - a.similarity);
}

export const dummySimilarDrawings: SimilarDrawing[] =
  generateSimilarDrawings(24);
