'use client';

import { useMemo } from 'react';

import { ColumnSettingsWidgets } from '@/widgets/common/column-settings/ui/ColumnSettingsWidgets';

import { createDrawingColumns } from '../../table-view/config/column-config';
import { drawingFilterFields } from '../../filter/config/filter-config';

export function DrawingColumnSettings() {
  const columns = useMemo(
    () =>
      createDrawingColumns(
        () => {}, // handleOpen placeholder
        () => {} // handleDelete placeholder
      ),
    []
  );

  return <ColumnSettingsWidgets columns={columns} filterFields={drawingFilterFields} />;
}
