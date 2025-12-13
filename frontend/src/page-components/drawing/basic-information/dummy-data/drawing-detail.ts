// 図面詳細データの型定義（ダミーデータ用、後で削除）
interface TagItem {
  label: string;
  color: string;
}

export interface DrawingDetailItem {
  id: string;
  drawingNumber: string; // 図番
  name: string; // 図面名
  revision: string; // リビジョン
  status: TagItem[]; // ステータス
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
  tags: TagItem[]; // タグ
  remarks: string; // 備考
  thumbnailUrl: string; // サムネイル画像URL
}

// IDに基づいてダミーデータを取得する関数
export function getDummyDrawingDetail(id: string): DrawingDetailItem {
  const numId = parseInt(id, 10) || 1;

  return {
    id,
    drawingNumber: `DWG-2024-${String(numId).padStart(3, '0')}`,
    name: 'メインフレーム組立図',
    revision: 'B',
    status: [{ label: '承認済', color: '#22c55e' }],
    category: '組立図',
    project: 'プロジェクトA',
    department: '設計1課',
    createdBy: '山田太郎',
    createdAt: '2024-03-15',
    updatedBy: '佐藤花子',
    updatedAt: '2024-06-20',
    approvedBy: '部長 中村',
    approvedAt: '2024-06-25',
    fileFormat: 'DWG',
    fileSize: '2.4 MB',
    scale: '1:10',
    sheetSize: 'A1',
    material: 'SS400',
    tags: [
      { label: '重要', color: '#ef4444' },
      { label: '量産', color: '#22c55e' },
    ],
    remarks: '量産移行済',
    thumbnailUrl: `https://picsum.photos/seed/${numId}/400/300?grayscale`,
  };
}
