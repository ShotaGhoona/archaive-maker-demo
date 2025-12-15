'use client';

import { ColumnSettingsWidget } from '@/widgets/common/column-settings/ui/ColumnSettingsWidget';

import { TABLE_COLUMNS } from '../../table-view/config/table-columns';
import { FILTER_FIELDS } from '../../filter/config/filter-fields';

export function DrawingColumnSettings() {
  return (
    <ColumnSettingsWidget
      columns={TABLE_COLUMNS}
      filterFields={FILTER_FIELDS}
    />
  );
}
