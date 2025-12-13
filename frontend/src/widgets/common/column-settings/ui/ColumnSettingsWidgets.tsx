'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/shared/ui/shadcn/ui/dialog';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/ui/tabs';
import {
  Settings2,
  X,
  Check,
  Columns3,
  SlidersHorizontal,
  Filter,
} from 'lucide-react';
import { ColumnVisibilityTab } from './tabs/ColumnVisibilityTab';
import { ColumnManagementTab } from './tabs/ColumnManagementTab';
import { FilterVisibilityTab } from './tabs/FilterVisibilityTab';
import type { ColumnDefinition, ColumnType, SettingsTab } from '../model/types';

// table-viewのColumnConfigから必要な情報
interface ColumnInput {
  key: string;
  label?: string;
  columnType?: string;
}

// フィルターフィールドの入力
interface FilterInput {
  key: string;
  label: string;
  type?: string;
}

interface ColumnSettingsWidgetsProps {
  columns: ColumnInput[];
  filterFields?: FilterInput[];
}

/**
 * テーブル設定モーダル
 * - テーブル表示設定：列の表示/非表示と順序
 * - テーブル設定：カラムの追加・編集
 * - フィルター表示設定：フィルターの表示/非表示と順序
 */
export function ColumnSettingsWidgets({ columns, filterFields = [] }: ColumnSettingsWidgetsProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('visibility');

  // === テーブル表示設定 ===
  const targetColumns = useMemo(
    () =>
      columns
        .filter((col) => col.columnType !== 'actions' && col.label)
        .map((col) => ({
          key: String(col.key),
          label: col.label || '',
          columnType: (col.columnType || 'text') as ColumnType,
        })),
    [columns]
  );

  const [columnVisibleKeys, setColumnVisibleKeys] = useState<string[]>([]);
  const [columnHiddenKeys, setColumnHiddenKeys] = useState<string[]>([]);
  const [columnSelectedKey, setColumnSelectedKey] = useState<string | null>(null);

  // === テーブル設定（カラム管理）===
  const [columnDefinitions, setColumnDefinitions] = useState<ColumnDefinition[]>([]);

  // === フィルター表示設定 ===
  const [filterVisibleKeys, setFilterVisibleKeys] = useState<string[]>([]);
  const [filterHiddenKeys, setFilterHiddenKeys] = useState<string[]>([]);
  const [filterSelectedKey, setFilterSelectedKey] = useState<string | null>(null);

  // ダイアログを開いたときに初期化
  useEffect(() => {
    if (open) {
      // テーブル表示設定
      setColumnVisibleKeys(targetColumns.map((c) => c.key));
      setColumnHiddenKeys([]);
      setColumnSelectedKey(null);

      // テーブル設定
      setColumnDefinitions(
        targetColumns.map((c) => ({
          key: c.key,
          label: c.label,
          columnType: c.columnType,
          isCustom: false,
        }))
      );

      // フィルター表示設定
      setFilterVisibleKeys(filterFields.map((f) => f.key));
      setFilterHiddenKeys([]);
      setFilterSelectedKey(null);
    }
  }, [open, targetColumns, filterFields]);

  // === 共通ヘルパー ===
  const getColumnLabel = useCallback(
    (key: string) => columnDefinitions.find((c) => c.key === key)?.label || key,
    [columnDefinitions]
  );

  const getFilterLabel = useCallback(
    (key: string) => filterFields.find((f) => f.key === key)?.label || key,
    [filterFields]
  );

  // === テーブル表示設定の操作 ===
  const moveColumnToHidden = (key: string) => {
    setColumnVisibleKeys((prev) => prev.filter((k) => k !== key));
    setColumnHiddenKeys((prev) => [...prev, key]);
    setColumnSelectedKey(key);
  };

  const moveColumnToVisible = (key: string) => {
    setColumnHiddenKeys((prev) => prev.filter((k) => k !== key));
    setColumnVisibleKeys((prev) => [...prev, key]);
    setColumnSelectedKey(key);
  };

  const moveColumnUp = (keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setColumnVisibleKeys : setColumnHiddenKeys;
    const index = keys.indexOf(key);
    if (index <= 0) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveColumnDown = (keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setColumnVisibleKeys : setColumnHiddenKeys;
    const index = keys.indexOf(key);
    if (index < 0 || index >= keys.length - 1) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  // === テーブル設定の操作 ===
  const handleAddColumn = (column: ColumnDefinition) => {
    setColumnDefinitions((prev) => [...prev, column]);
    setColumnVisibleKeys((prev) => [...prev, column.key]);
  };

  const handleEditColumn = (key: string, column: ColumnDefinition) => {
    setColumnDefinitions((prev) =>
      prev.map((c) => (c.key === key ? column : c))
    );
  };

  const handleDeleteColumn = (key: string) => {
    setColumnDefinitions((prev) => prev.filter((c) => c.key !== key));
    setColumnVisibleKeys((prev) => prev.filter((k) => k !== key));
    setColumnHiddenKeys((prev) => prev.filter((k) => k !== key));
  };

  // === フィルター表示設定の操作 ===
  const moveFilterToHidden = (key: string) => {
    setFilterVisibleKeys((prev) => prev.filter((k) => k !== key));
    setFilterHiddenKeys((prev) => [...prev, key]);
    setFilterSelectedKey(key);
  };

  const moveFilterToVisible = (key: string) => {
    setFilterHiddenKeys((prev) => prev.filter((k) => k !== key));
    setFilterVisibleKeys((prev) => [...prev, key]);
    setFilterSelectedKey(key);
  };

  const moveFilterUp = (keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setFilterVisibleKeys : setFilterHiddenKeys;
    const index = keys.indexOf(key);
    if (index <= 0) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveFilterDown = (keys: string[], isVisible: boolean, key: string) => {
    const setKeys = isVisible ? setFilterVisibleKeys : setFilterHiddenKeys;
    const index = keys.indexOf(key);
    if (index < 0 || index >= keys.length - 1) return;
    setKeys((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  // === テーブル表示設定のリセット/全て非表示/全て表示 ===
  const handleColumnReset = () => {
    setColumnVisibleKeys(targetColumns.map((c) => c.key));
    setColumnHiddenKeys([]);
    setColumnSelectedKey(null);
  };

  const handleColumnHideAll = () => {
    setColumnHiddenKeys([...columnVisibleKeys, ...columnHiddenKeys]);
    setColumnVisibleKeys([]);
  };

  const handleColumnShowAll = () => {
    setColumnVisibleKeys([...columnHiddenKeys, ...columnVisibleKeys]);
    setColumnHiddenKeys([]);
  };

  // === フィルター表示設定のリセット/全て非表示/全て表示 ===
  const handleFilterReset = () => {
    setFilterVisibleKeys(filterFields.map((f) => f.key));
    setFilterHiddenKeys([]);
    setFilterSelectedKey(null);
  };

  const handleFilterHideAll = () => {
    setFilterHiddenKeys([...filterVisibleKeys, ...filterHiddenKeys]);
    setFilterVisibleKeys([]);
  };

  const handleFilterShowAll = () => {
    setFilterVisibleKeys([...filterHiddenKeys, ...filterVisibleKeys]);
    setFilterHiddenKeys([]);
  };

  // === 適用 ===
  const handleSave = () => {
    console.log('[ColumnSettings] 適用:', {
      columnVisibleKeys,
      columnHiddenKeys,
      columnDefinitions,
      filterVisibleKeys,
      filterHiddenKeys,
    });
    alert('設定を適用しました（未実装）');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xl" className="bg-card">
          <Settings2 className="size-5" />
          テーブル設定
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[85vh] max-h-[900px] flex-col gap-0 p-0 sm:max-w-6xl">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as SettingsTab)}
          className="flex min-h-0 flex-1 flex-col gap-0"
        >
          <div className="shrink-0 border-b">
            <TabsList className="h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="visibility"
                className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-lg font-medium data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Columns3 className="size-5" />
                テーブル表示設定
              </TabsTrigger>
              <TabsTrigger
                value="management"
                className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-lg font-medium data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <SlidersHorizontal className="size-5" />
                テーブル設定
              </TabsTrigger>
              <TabsTrigger
                value="filter"
                className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-4 text-lg font-medium data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Filter className="size-5" />
                フィルター表示設定
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-6">
            <TabsContent value="visibility" className="mt-0 h-full">
              <ColumnVisibilityTab
                visibleKeys={columnVisibleKeys}
                hiddenKeys={columnHiddenKeys}
                selectedKey={columnSelectedKey}
                getLabel={getColumnLabel}
                onSelect={setColumnSelectedKey}
                onMoveUp={moveColumnUp}
                onMoveDown={moveColumnDown}
                onMoveToHidden={moveColumnToHidden}
                onMoveToVisible={moveColumnToVisible}
                onReset={handleColumnReset}
                onHideAll={handleColumnHideAll}
                onShowAll={handleColumnShowAll}
              />
            </TabsContent>

            <TabsContent value="management" className="mt-0 h-full">
              <ColumnManagementTab
                columns={columnDefinitions}
                onAddColumn={handleAddColumn}
                onEditColumn={handleEditColumn}
                onDeleteColumn={handleDeleteColumn}
              />
            </TabsContent>

            <TabsContent value="filter" className="mt-0 h-full">
              <FilterVisibilityTab
                visibleKeys={filterVisibleKeys}
                hiddenKeys={filterHiddenKeys}
                selectedKey={filterSelectedKey}
                getLabel={getFilterLabel}
                onSelect={setFilterSelectedKey}
                onMoveUp={moveFilterUp}
                onMoveDown={moveFilterDown}
                onMoveToHidden={moveFilterToHidden}
                onMoveToVisible={moveFilterToVisible}
                onReset={handleFilterReset}
                onHideAll={handleFilterHideAll}
                onShowAll={handleFilterShowAll}
              />
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="shrink-0 border-t px-6 py-4 bg-background">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            <X className="size-4" />
            キャンセル
          </Button>
          <Button type="button" onClick={handleSave}>
            <Check className="size-4" />
            適用
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
