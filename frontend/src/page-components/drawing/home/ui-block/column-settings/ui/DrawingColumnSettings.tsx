'use client';

import { ColumnSettingsWidgets } from '@/widgets/common/column-settings/ui/ColumnSettingsWidgets';

import { TABLE_COLUMNS } from '../../table-view/config/table-columns';
import { FILTER_FIELDS } from '../../filter/config/filter-fields';

export function DrawingColumnSettings() {
  return (
    <ColumnSettingsWidgets
      columns={TABLE_COLUMNS}
      filterFields={FILTER_FIELDS}
    />
  );
}
