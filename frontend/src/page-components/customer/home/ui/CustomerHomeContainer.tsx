'use client';

import { CustomerTablePanel } from '../ui-block/table-view/ui/CustomerTablePanel';
import { CustomerFilterSidebar } from '../ui-block/filter/ui/CustomerFilterSidebar';
import { CustomerFilterButton } from '../ui-block/filter/ui/CustomerFilterButton';
import { CustomerSearchBar } from '../ui-block/filter/ui/CustomerSearchBar';
import { CustomerColumnSettings } from '../ui-block/column-settings/ui/CustomerColumnSettings';
import { CustomerCsvExport } from '../ui-block/csv-export/ui/CustomerCsvExport';
import { CreateCustomerSheet } from '../ui-block/create-customer/ui/CreateCustomerSheet';
import { useCustomerFilter } from '../ui-block/filter/lib/use-customer-filter';

export function CustomerHomeContainer() {
  const {
    filterOpen,
    setFilterOpen,
    toggleFilter,
    simpleFilterValues,
    setSimpleFilterValues,
    advancedFilterValues,
    setAdvancedFilterValues,
    searchQuery,
    setSearchQuery,
  } = useCustomerFilter();

  return (
    <div className="flex min-h-0 flex-1">
      {/* サイドバーフィルター */}
      <CustomerFilterSidebar
        open={filterOpen}
        onOpenChange={setFilterOpen}
        simpleValues={simpleFilterValues}
        onSimpleValuesChange={setSimpleFilterValues}
        advancedValues={advancedFilterValues}
        onAdvancedValuesChange={setAdvancedFilterValues}
      />

      {/* メインコンテンツ */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-6 pt-4">
        <div className="mb-4 flex items-center gap-4">
          <CustomerFilterButton open={filterOpen} onToggle={toggleFilter} />
          <CustomerSearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="ml-auto flex items-center gap-2">
            <CustomerColumnSettings />
            <CustomerCsvExport />
            <CreateCustomerSheet />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <CustomerTablePanel />
        </div>
      </div>
    </div>
  );
}
