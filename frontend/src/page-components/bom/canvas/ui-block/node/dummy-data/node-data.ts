// ダミーデータ用の型定義（後でentityの型に置き換え）

export interface DrawingPage {
  id: string;
  pageNumber: number;
  drawingNumber: string;
  s3Url: string;
}

export interface Drawing {
  id: string;
  name: string;
  previewImageUrl: string;
  pages: DrawingPage[];
}

export interface DocumentVersion {
  id: string;
  version: number;
  name: string;
  previewImageUrl: string;
}

export interface Document {
  id: string;
  typeName: string;
  versions: DocumentVersion[];
}

export type CustomFieldType = 'text' | 'number' | 'boolean' | 'select';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomField {
  key: string;
  label: string;
  type: CustomFieldType;
  value: string | number | boolean;
  options?: SelectOption[]; // selectの場合のみ
}

export interface BomNode {
  id: string;
  type: 'directory' | 'leaf-product';
  name: string;
  directoryTypeName?: string; // Assy, SubAssy, Parts など
  customFields: CustomField[];
  documents: Document[];
  drawings: Drawing[];
}

// ダミーノードデータ
export const dummyNodes: BomNode[] = [
  {
    id: 'DIR-1000',
    type: 'directory',
    name: '産業用ロボットアーム ARM-1000',
    directoryTypeName: '製品',
    customFields: [
      { key: 'category', label: '製品分類', type: 'text', value: '産業機械' },
      { key: 'weight', label: '重量', type: 'number', value: 125.5 },
      { key: 'material', label: '主要材質', type: 'text', value: 'アルミニウム合金' },
      {
        key: 'safety',
        label: '安全規格',
        type: 'select',
        value: 'CE',
        options: [
          { value: 'CE', label: 'CE' },
          { value: 'UL', label: 'UL' },
          { value: 'JIS', label: 'JIS' },
        ],
      },
    ],
    documents: [
      {
        id: 'DOC-1000',
        typeName: '製品仕様書',
        versions: [
          {
            id: 'DOC-1000-V3',
            version: 3,
            name: '製品仕様書_v3.pdf',
            previewImageUrl:
              'https://lh3.googleusercontent.com/X-yoTp-i_RQnviliPQ4nQZnSzlyP_jeiwBjNXkDK33_LtxbeshxXXOh1zIF5NuaUg6E-E7hB_FoJj3HaBT3pDwCCB3Tu-um7hVxDYchcvOtrMVz6c-fUrWufRw',
          },
        ],
      },
      {
        id: 'DOC-1001',
        typeName: '安全基準書',
        versions: [
          {
            id: 'DOC-1001-V1',
            version: 1,
            name: '安全基準書_v1.pdf',
            previewImageUrl:
              'https://lh3.googleusercontent.com/X-yoTp-i_RQnviliPQ4nQZnSzlyP_jeiwBjNXkDK33_LtxbeshxXXOh1zIF5NuaUg6E-E7hB_FoJj3HaBT3pDwCCB3Tu-um7hVxDYchcvOtrMVz6c-fUrWufRw',
          },
        ],
      },
    ],
    drawings: [],
  },
  {
    id: 'DIR-1001',
    type: 'directory',
    name: 'ベースユニットAssy ASSY-1000',
    directoryTypeName: 'Assy',
    customFields: [
      { key: 'assemblyTime', label: '組立工数', type: 'number', value: 180 },
      { key: 'department', label: '組立担当部門', type: 'text', value: '第1製造部' },
      { key: 'painted', label: '塗装仕上げ', type: 'boolean', value: true },
    ],
    documents: [
      {
        id: 'DOC-1003',
        typeName: '組立手順書',
        versions: [
          {
            id: 'DOC-1003-V1',
            version: 1,
            name: '組立手順書_v1.pdf',
            previewImageUrl:
              'https://lh3.googleusercontent.com/X-yoTp-i_RQnviliPQ4nQZnSzlyP_jeiwBjNXkDK33_LtxbeshxXXOh1zIF5NuaUg6E-E7hB_FoJj3HaBT3pDwCCB3Tu-um7hVxDYchcvOtrMVz6c-fUrWufRw',
          },
        ],
      },
    ],
    drawings: [],
  },
  {
    id: 'LEAF-1',
    type: 'leaf-product',
    name: '制御IC IC-1111A',
    directoryTypeName: 'Parts',
    customFields: [
      { key: 'material', label: '材質', type: 'text', value: 'シリコン' },
      { key: 'treatment', label: '表面処理', type: 'text', value: 'なし' },
      {
        key: 'supplier',
        label: '調達先',
        type: 'select',
        value: 'サプライヤー',
        options: [
          { value: 'サプライヤー', label: 'サプライヤー' },
          { value: '内製', label: '内製' },
        ],
      },
      { key: 'unitPrice', label: '単価', type: 'number', value: 850 },
    ],
    documents: [],
    drawings: [
      {
        id: 'LEAF-1-DRW1',
        name: '制御IC_図面1',
        previewImageUrl:
          'https://lunar-creation.com/wp-content/uploads/2021/03/c446b604980d5731c8c35e2ab536abdb-scaled-e1638518469848.jpg',
        pages: [
          {
            id: 'LEAF-1-DRW1-P1',
            pageNumber: 1,
            drawingNumber: 'DWG-LEAF-1-DRW1-1',
            s3Url:
              'https://lunar-creation.com/wp-content/uploads/2021/03/c446b604980d5731c8c35e2ab536abdb-scaled-e1638518469848.jpg',
          },
        ],
      },
      {
        id: 'LEAF-1-DRW2',
        name: '制御IC_図面2',
        previewImageUrl:
          'https://jp.meviy.misumi-ec.com/info/ja/wp-content/uploads/2022/04/y1-1.jpg',
        pages: [
          {
            id: 'LEAF-1-DRW2-P1',
            pageNumber: 1,
            drawingNumber: 'DWG-LEAF-1-DRW2-1',
            s3Url:
              'https://jp.meviy.misumi-ec.com/info/ja/wp-content/uploads/2022/04/y1-1.jpg',
          },
        ],
      },
    ],
  },
];
