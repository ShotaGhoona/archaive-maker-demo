'use client';

import { useMemo } from 'react';

import { ColumnSettingsWidgets } from '@/widgets/common/column-settings/ui/ColumnSettingsWidgets';

import { createCustomerColumns } from '../../table-view/config/column-config';
import { customerFilterFields } from '../../filter/config/filter-config';

export function CustomerColumnSettings() {
  const columns = useMemo(
    () =>
      createCustomerColumns(
        () => {}, // handleOpen placeholder
        () => {} // handleDelete placeholder
      ),
    []
  );

  return <ColumnSettingsWidgets columns={columns} filterFields={customerFilterFields} />;
}
