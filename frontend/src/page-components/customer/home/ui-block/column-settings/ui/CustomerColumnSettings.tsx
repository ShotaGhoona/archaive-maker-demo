'use client';

import { useMemo } from 'react';

import { ColumnSettingsWidget } from '@/widgets/common/column-settings/ui/ColumnSettingsWidget';

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

  return <ColumnSettingsWidget columns={columns} filterFields={customerFilterFields} />;
}
