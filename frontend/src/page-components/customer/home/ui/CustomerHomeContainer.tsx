'use client';

import { Users } from 'lucide-react';

import { SearchBar } from '@/widgets/common/filter/search-bar/ui/SearchBar';
import { FilterChipsBar } from '@/widgets/common/filter/filter-chips';

import { CustomerTablePanel } from '../ui-block/table-view/ui/CustomerTablePanel';
import { CustomerColumnSettings } from '../ui-block/column-settings/ui/CustomerColumnSettings';
import { CustomerCsvExport } from '../ui-block/csv-export/ui/CustomerCsvExport';
import { CreateCustomerSheet } from '../ui-block/create-customer/ui/CreateCustomerSheet';
import { useCustomerFilter } from '../ui-block/filter/lib/use-customer-filter';
import { customerFilterFields } from '../ui-block/filter/config/filter-config';

export function CustomerHomeContainer() {
  const {
    simpleFilterValues,
    setSimpleFilterValues,
    searchQuery,
    setSearchQuery,
  } = useCustomerFilter();

  return (
    <div className='flex min-h-0 flex-1 flex-col gap-4'>
      {/* ヘッダー */}
      <div className='flex items-center gap-3'>
        {/* 左: タイトル */}
        <div className='flex items-center gap-2'>
          <Users className='h-5 w-5 text-slate-700' />
          <h1 className='text-lg font-semibold text-slate-900'>顧客管理</h1>
        </div>

        {/* 右: ツール群 */}
        <div className='ml-auto flex items-center gap-3'>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='顧客コード、会社名で検索...'
            expandedWidth='w-80'
          />
          <CustomerColumnSettings />
          <CustomerCsvExport />
          <CreateCustomerSheet />
        </div>
      </div>

      {/* フィルターチップス */}
      <FilterChipsBar
        fields={customerFilterFields}
        values={simpleFilterValues}
        onValuesChange={setSimpleFilterValues}
      />

      {/* コンテンツエリア */}
      <div className='flex min-h-0 flex-1 flex-col'>
        <CustomerTablePanel />
      </div>
    </div>
  );
}
