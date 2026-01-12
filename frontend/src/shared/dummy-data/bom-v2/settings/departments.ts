/**
 * 部署管理用ダミーデータ
 * 設定ページで使用する詳細な部署情報
 */

export interface Department {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

const now = '2024-01-01T00:00:00Z';

export const departments: Department[] = [
  {
    id: 'dept-001',
    name: '設計部',
    description: '製品設計・CAD作成を担当',
    memberCount: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'dept-002',
    name: '品質管理部',
    description: '品質検査・試験を担当',
    memberCount: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'dept-003',
    name: '購買部',
    description: '調達・仕入先管理を担当',
    memberCount: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'dept-004',
    name: '製造部',
    description: '組立・加工を担当',
    memberCount: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'dept-005',
    name: '生産技術部',
    description: '工程設計・治具開発を担当',
    memberCount: 3,
    createdAt: now,
    updatedAt: now,
  },
];

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}

export function getDepartmentByName(name: string): Department | undefined {
  return departments.find((d) => d.name === name);
}
