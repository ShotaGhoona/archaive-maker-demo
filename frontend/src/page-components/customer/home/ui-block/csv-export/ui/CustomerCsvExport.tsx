'use client';

import { useMemo } from 'react';

import { CsvExportModalWidgets } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidgets';

import { createCustomerColumns } from '../../table-view/config/column-config';
import { dummyCustomers } from '../../../dummy-data/customers';

export function CustomerCsvExport() {
  const columns = useMemo(
    () =>
      createCustomerColumns(
        () => {}, // handleOpen placeholder
        () => {} // handleDelete placeholder
      ),
    []
  );

  return <CsvExportModalWidgets columns={columns} data={dummyCustomers} />;
}
