'use client';

import { useState, useCallback } from 'react';

import type { ProjectInfo } from '../ui-block/toggle-list/ui/card-components/InfoCard';
import type {
  ProductData,
  DocumentsData,
} from '../ui-block/toggle-list/ui/ToggleListSection';

const initialProjectInfo: ProjectInfo = {
  projectCode: '',
  projectName: '',
  customerName: '',
  startDate: '',
  endDate: '',
  budget: '',
  salesRep: '',
  projectManager: '',
  remarks: '',
};

const initialDocuments: DocumentsData = {
  estimates: [],
  deliveryNotes: [],
  purchaseOrders: [],
};

export interface UseProjectFormReturn {
  // 状態
  projectInfo: ProjectInfo;
  products: ProductData[];
  documents: DocumentsData;
  isSaving: boolean;

  // ハンドラ
  setProjectInfo: (value: ProjectInfo) => void;
  setProducts: (products: ProductData[]) => void;
  setDocuments: (documents: DocumentsData) => void;
  handleSave: () => void;
  resetForm: () => void;
}

export function useProjectForm(): UseProjectFormReturn {
  const [projectInfo, setProjectInfo] =
    useState<ProjectInfo>(initialProjectInfo);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [documents, setDocuments] = useState<DocumentsData>(initialDocuments);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaving(true);

    // TODO: API呼び出し
    console.log('保存データ:', {
      projectInfo,
      products,
      documents,
    });

    alert('案件を保存（未実装）');

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }, [projectInfo, products, documents]);

  const resetForm = useCallback(() => {
    setProjectInfo(initialProjectInfo);
    setProducts([]);
    setDocuments(initialDocuments);
  }, []);

  return {
    projectInfo,
    products,
    documents,
    isSaving,
    setProjectInfo,
    setProducts,
    setDocuments,
    handleSave,
    resetForm,
  };
}
