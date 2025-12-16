'use client';

import { useMemo } from 'react';

import { ColumnSettingsWidget } from '@/widgets/common/column-settings/ui/ColumnSettingsWidget';

import { createProjectColumns } from '../../table-view/config/column-config';
import { projectFilterFields } from '../../filter/config/filter-config';

export function ProjectColumnSettings() {
  const columns = useMemo(
    () =>
      createProjectColumns(
        () => {}, // handleOpen placeholder
        () => {}, // handleDelete placeholder
      ),
    [],
  );

  return (
    <ColumnSettingsWidget
      columns={columns}
      filterFields={projectFilterFields}
    />
  );
}
