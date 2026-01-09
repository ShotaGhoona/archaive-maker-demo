'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { DocumentListPanel } from '../ui-block/document-list-panel/ui/DocumentListPanel';
import { DocumentPreviewPanel } from '../ui-block/preview-panel/ui/DocumentPreviewPanel';
import { DocumentInfoPanel } from '../ui-block/info-panel/ui/DocumentInfoPanel';
import {
  getItemById,
  getLatestReleasedRev,
  getDocumentsByItemRev,
  getFacetInstancesByDocument,
} from '@/shared/dummy-data/bom-v2';

/**
 * BOM Documents Container
 *
 * 2〜3カラムレイアウト:
 * - 左: 帳票リスト
 * - 中央: プレビュー
 * - 右: 帳票情報（トグル表示）
 */
export function BomDocumentsContainer() {
  const params = useParams();
  const itemId = params.id as string;

  // 状態管理
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // データ取得
  const { item, itemRev, documents } = useMemo(() => {
    const item = getItemById(itemId);
    if (!item) {
      return { item: null, itemRev: null, documents: [] };
    }

    const itemRev = getLatestReleasedRev(itemId);
    if (!itemRev) {
      return { item, itemRev: null, documents: [] };
    }

    return {
      item,
      itemRev,
      documents: getDocumentsByItemRev(itemRev.id),
    };
  }, [itemId]);

  // 選択中の帳票
  const selectedDocument = useMemo(() => {
    if (!selectedDocumentId) return null;
    return documents.find((d) => d.id === selectedDocumentId) ?? null;
  }, [documents, selectedDocumentId]);

  // 選択中の帳票のFacetInstance
  const selectedDocumentFacets = useMemo(() => {
    if (!selectedDocumentId) return [];
    return getFacetInstancesByDocument(selectedDocumentId);
  }, [selectedDocumentId]);

  // 選択した帳票が変わったらformDataをリセット
  useEffect(() => {
    if (selectedDocument) {
      const merged: Record<string, unknown> = {
        documentNumber: selectedDocument.documentNumber,
        title: selectedDocument.title,
        issueDate: selectedDocument.issueDate,
        recipient: selectedDocument.recipient,
      };

      // FacetInstanceの値をマージ
      selectedDocumentFacets.forEach((fi) => {
        Object.entries(fi.values).forEach(([key, value]) => {
          merged[key] = value;
        });
      });

      setFormData(merged);
    } else {
      setFormData({});
    }
  }, [selectedDocument, selectedDocumentFacets]);

  // ハンドラー
  const handleSelectDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
  };

  const handleAddDocument = () => {
    // TODO: 帳票追加
    alert('帳票を追加（未実装）');
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    // TODO: 回転
    alert('回転（未実装）');
  };

  const handleToggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: 保存
    alert(`保存（未実装）\n${JSON.stringify(formData, null, 2)}`);
  };

  if (!item || !itemRev) {
    return (
      <div className='flex min-h-0 flex-1 items-center justify-center'>
        <p className='text-muted-foreground'>アイテムが見つかりません</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-0 flex-1 gap-4 p-4'>
      {/* 左: 帳票リスト */}
      <DocumentListPanel
        documents={documents}
        selectedDocumentId={selectedDocumentId}
        onSelectDocument={handleSelectDocument}
        onAddDocument={handleAddDocument}
      />

      {/* 中央: プレビュー */}
      <DocumentPreviewPanel
        document={selectedDocument}
        zoom={zoom}
        showInfo={showInfo}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotate={handleRotate}
        onToggleInfo={handleToggleInfo}
      />

      {/* 右: 帳票情報パネル */}
      {showInfo && selectedDocument && (
        <DocumentInfoPanel
          document={selectedDocument}
          facetInstances={selectedDocumentFacets}
          formData={formData}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onClose={handleCloseInfo}
        />
      )}
    </div>
  );
}
