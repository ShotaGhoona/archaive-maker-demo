'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { DrawingListPanel } from '../ui-block/drawing-list-panel/ui/DrawingListPanel';
import { DrawingPreviewPanel } from '../ui-block/preview-panel/ui/DrawingPreviewPanel';
import { DrawingInfoPanel } from '../ui-block/info-panel/ui/DrawingInfoPanel';
import { SimilarDrawingsPanel } from '../ui-block/similar-panel/ui/SimilarDrawingsPanel';
import {
  getItemById,
  getLatestReleasedRev,
  getDrawingsByItemRev,
  getFacetInstancesByDrawing,
} from '@/shared/dummy-data/bom-v2';

type RightPanelType = 'none' | 'info' | 'similar';

/**
 * BOM Drawings Container
 *
 * 2〜3カラムレイアウト:
 * - 左: 図面リスト
 * - 中央: プレビュー
 * - 右: 図面情報 or 類似図面（排他的に表示）
 */
export function BomDrawingsContainer() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  // URLからdrawingIdを取得（オプショナルキャッチオール: string[] | undefined）
  const drawingIdFromUrl = params.drawingId
    ? (params.drawingId as string[])[0]
    : null;

  // 状態管理
  const [rightPanel, setRightPanel] = useState<RightPanelType>('info');
  const [zoom, setZoom] = useState(100);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // データ取得
  const { item, itemRev, drawings } = useMemo(() => {
    const item = getItemById(itemId);
    if (!item) {
      return { item: null, itemRev: null, drawings: [] };
    }

    const itemRev = getLatestReleasedRev(itemId);
    if (!itemRev) {
      return { item, itemRev: null, drawings: [] };
    }

    return {
      item,
      itemRev,
      drawings: getDrawingsByItemRev(itemRev.id),
    };
  }, [itemId]);

  // 選択中の図面（URLから取得）
  const selectedDrawing = useMemo(() => {
    if (!drawingIdFromUrl) return null;
    return drawings.find((d) => d.id === drawingIdFromUrl) ?? null;
  }, [drawings, drawingIdFromUrl]);

  // 選択中の図面のFacetInstance
  const selectedDrawingFacets = useMemo(() => {
    if (!drawingIdFromUrl) return [];
    return getFacetInstancesByDrawing(drawingIdFromUrl);
  }, [drawingIdFromUrl]);

  // 選択した図面が変わったらformDataをリセット
  useEffect(() => {
    if (selectedDrawing) {
      const merged: Record<string, unknown> = {
        drawingNumber: selectedDrawing.drawingNumber,
        title: selectedDrawing.title,
        drawingType: selectedDrawing.drawingType,
        sheetSize: selectedDrawing.sheetSize,
        sheetNumber: selectedDrawing.sheetNumber,
        totalSheets: selectedDrawing.totalSheets,
      };

      // FacetInstanceの値をマージ
      selectedDrawingFacets.forEach((fi) => {
        Object.entries(fi.values).forEach(([key, value]) => {
          merged[key] = value;
        });
      });

      setFormData(merged);
    } else {
      setFormData({});
    }
  }, [selectedDrawing, selectedDrawingFacets]);

  // ハンドラー
  const handleSelectDrawing = (drawingId: string) => {
    router.replace(`/bom/${itemId}/drawings/${drawingId}`);
  };

  const handleAddDrawing = () => {
    // TODO: 図面追加
    alert('図面を追加（未実装）');
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
    setRightPanel((prev) => (prev === 'info' ? 'none' : 'info'));
  };

  const handleToggleSimilar = () => {
    setRightPanel((prev) => (prev === 'similar' ? 'none' : 'similar'));
  };

  const handleCloseRightPanel = () => {
    setRightPanel('none');
  };

  const handleSelectSimilarDrawing = (drawingId: string) => {
    // TODO: 類似図面を選択
    alert(`類似図面を選択: ${drawingId}（未実装）`);
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
      {/* 左: 図面リスト */}
      <DrawingListPanel
        drawings={drawings}
        selectedDrawingId={drawingIdFromUrl}
        onSelectDrawing={handleSelectDrawing}
        onAddDrawing={handleAddDrawing}
      />

      {/* 中央: プレビュー */}
      <DrawingPreviewPanel
        drawing={selectedDrawing}
        zoom={zoom}
        showInfo={rightPanel === 'info'}
        showSimilar={rightPanel === 'similar'}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotate={handleRotate}
        onToggleInfo={handleToggleInfo}
        onToggleSimilar={handleToggleSimilar}
      />

      {/* 右: パネル（排他的に表示） */}
      {rightPanel === 'similar' && (
        <SimilarDrawingsPanel
          onClose={handleCloseRightPanel}
          onSelectDrawing={handleSelectSimilarDrawing}
        />
      )}

      {rightPanel === 'info' && selectedDrawing && (
        <DrawingInfoPanel
          drawing={selectedDrawing}
          facetInstances={selectedDrawingFacets}
          formData={formData}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onClose={handleCloseRightPanel}
        />
      )}
    </div>
  );
}
