'use client';

import { useMemo } from 'react';

import { CsvExportModalWidget } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidget';

import { createCustomerColumns } from '../../table-view/config/column-config';
import { dummyCustomers } from '@/shared/dummy-data/customer/customers';

export function CustomerCsvExport() {
  const columns = useMemo(
    () =>
      createCustomerColumns(
        () => {}, // handleOpen placeholder
        () => {}, // handleDelete placeholder
      ),
    [],
  );

  return <CsvExportModalWidget columns={columns} data={dummyCustomers} />;
}
