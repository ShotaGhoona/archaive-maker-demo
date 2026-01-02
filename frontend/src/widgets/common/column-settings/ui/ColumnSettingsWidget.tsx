'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/shadcn/ui/tabs';
import {
  Settings2,
  X,
  Check,
  Columns3,
  SlidersHorizontal,
  Filter,
  RotateCcw,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ColumnVisibilityTab } from './tabs/ColumnVisibilityTab';
import { ColumnManagementTab } from './tabs/ColumnManagementTab';
import { FilterVisibilityTab } from './tabs/FilterVisibilityTab';
import { useColumnVisibility } from '../lib/use-column-visibility';
import { useColumnManagement } from '../lib/use-column-management';
import { useFilterVisibility } from '../lib/use-filter-visibility';
import type {
  ColumnInput,
  FilterInput,
  SettingsTab,
  ColumnType,
} from '../model/types';

interface ColumnSettingsWidgetProps {
  columns: ColumnInput[];
  filterFields?: FilterInput[];
}

/**
 * テーブル設定モーダル
 * - テーブル表示設定：列の表示/非表示と順序
 * - テーブル設定：カラムの追加・編集
 * - フィルター表示設定：フィルターの表示/非表示と順序
 */
export function ColumnSettingsWidget({
  columns,
  filterFields = [],
}: ColumnSettingsWidgetProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('visibility');

  // カラム入力を正規化
  const targetColumns = useMemo(
    () =>
      columns
        .filter((col) => col.columnType !== 'actions' && col.label)
        .map((col) => ({
          key: String(col.key),
          label: col.label || '',
          columnType: (col.columnType || 'text') as ColumnType,
        })),
    [columns],
  );

  // 初期カラム定義
  const initialDefinitions = useMemo(
    () =>
      targetColumns.map((c) => ({
        key: c.key,
        label: c.label,
        columnType: c.columnType,
        isCustom: false,
      })),
    [targetColumns],
  );

  // 各タブのフック
  const columnVisibility = useColumnVisibility({
    initialVisibleKeys: targetColumns.map((c) => c.key),
  });

  const columnManagement = useColumnManagement({
    initialDefinitions,
  });

  const filterVisibility = useFilterVisibility({
    filterFields,
  });

  // ダイアログを開いたときに初期化
  useEffect(() => {
    if (open) {
      columnVisibility.initialize();
      columnManagement.initialize();
      filterVisibility.initialize();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // カラム追加（表示リストにも追加）
  const handleAddColumn = (
    column: Parameters<typeof columnManagement.addColumn>[0],
  ) => {
    const key = columnManagement.addColumn(column);
    columnVisibility.addToVisible(key);
  };

  // カラム削除（表示/非表示リストからも削除）
  const handleDeleteColumn = (key: string) => {
    columnManagement.deleteColumn(key);
    columnVisibility.removeKey(key);
  };

  // 適用
  const handleSave = () => {
    // TODO: API呼び出し
    console.log('[ColumnSettings] 適用:', {
      columnVisibleKeys: columnVisibility.visibleKeys,
      columnHiddenKeys: columnVisibility.hiddenKeys,
      columnDefinitions: columnManagement.definitions,
      filterVisibleKeys: filterVisibility.visibleKeys,
      filterHiddenKeys: filterVisibility.hiddenKeys,
    });
    alert('設定を適用しました（未実装）');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='xl'>
          <Settings2 className='size-5' />
          テーブル設定
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-[85vh] max-h-[900px] flex-col gap-0 p-0 sm:max-w-6xl' showCloseButton={false}>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as SettingsTab)}
          className='flex min-h-0 flex-1 flex-col gap-0'
        >
          <div className='shrink-0 border-b border-slate-200/40'>
            <TabsList className='h-auto w-full justify-start gap-0 rounded-none border-0 bg-transparent p-0'>
              <TabsTrigger
                value='visibility'
                className='flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-base data-[state=active]:border-b-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
              >
                <Columns3 className='size-5' />
                テーブル表示設定
              </TabsTrigger>
              <TabsTrigger
                value='management'
                className='flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-base data-[state=active]:border-b-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
              >
                <SlidersHorizontal className='size-5' />
                テーブル設定
              </TabsTrigger>
              <TabsTrigger
                value='filter'
                className='flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-base data-[state=active]:border-b-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
              >
                <Filter className='size-5' />
                フィルター表示設定
              </TabsTrigger>
            </TabsList>
          </div>

          <div className='min-h-0 flex-1 overflow-hidden p-6'>
            <TabsContent value='visibility' className='mt-0 h-full'>
              <ColumnVisibilityTab
                visibleKeys={columnVisibility.visibleKeys}
                hiddenKeys={columnVisibility.hiddenKeys}
                selectedKey={columnVisibility.selectedKey}
                getLabel={columnManagement.getLabel}
                onSelect={columnVisibility.setSelectedKey}
                onMoveUp={columnVisibility.moveUp}
                onMoveDown={columnVisibility.moveDown}
                onMoveToHidden={columnVisibility.moveToHidden}
                onMoveToVisible={columnVisibility.moveToVisible}
              />
            </TabsContent>

            <TabsContent value='management' className='mt-0 h-full'>
              <ColumnManagementTab
                columns={columnManagement.definitions}
                onAddColumn={handleAddColumn}
                onEditColumn={columnManagement.editColumn}
                onDeleteColumn={handleDeleteColumn}
              />
            </TabsContent>

            <TabsContent value='filter' className='mt-0 h-full'>
              <FilterVisibilityTab
                visibleKeys={filterVisibility.visibleKeys}
                hiddenKeys={filterVisibility.hiddenKeys}
                selectedKey={filterVisibility.selectedKey}
                getLabel={filterVisibility.getLabel}
                onSelect={filterVisibility.setSelectedKey}
                onMoveUp={filterVisibility.moveUp}
                onMoveDown={filterVisibility.moveDown}
                onMoveToHidden={filterVisibility.moveToHidden}
                onMoveToVisible={filterVisibility.moveToVisible}
              />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className='shrink-0 border-t border-slate-200/40 bg-white/50 px-6 py-4'>
          {/* アクションボタン（テーブル表示設定・フィルター表示設定で共通利用） */}
          {activeTab !== 'management' && (
            <div className='mr-auto flex gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={
                  activeTab === 'visibility'
                    ? columnVisibility.reset
                    : filterVisibility.reset
                }
              >
                <RotateCcw className='size-4' />
                リセット
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={
                  activeTab === 'visibility'
                    ? columnVisibility.hideAll
                    : filterVisibility.hideAll
                }
              >
                <EyeOff className='size-4' />
                全て非表示
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={
                  activeTab === 'visibility'
                    ? columnVisibility.showAll
                    : filterVisibility.showAll
                }
              >
                <Eye className='size-4' />
                全て表示
              </Button>
            </div>
          )}
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            <X className='size-4' />
            キャンセル
          </Button>
          <Button type='button' onClick={handleSave}>
            <Check className='size-4' />
            適用
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
