"use client";

import { useMemo } from "react";

import { ColumnSettingsWidget } from '@/widgets/common/column-settings/ui/ColumnSettingsWidget';

import { getColumnsByTypeId } from "../../table-view/config/column-configs";
import { getFilterFieldsByTypeId } from "../../filter/config/filter-config";

interface DocumentColumnSettingsProps {
  selectedTypeId: string;
}

export function DocumentColumnSettings({
  selectedTypeId,
}: DocumentColumnSettingsProps) {
  const columns = useMemo(
    () =>
      getColumnsByTypeId(
        selectedTypeId,
        () => {}, // handleOpen placeholder
        () => {} // handleDelete placeholder
      ),
    [selectedTypeId]
  );

  const filterFields = useMemo(
    () => getFilterFieldsByTypeId(selectedTypeId),
    [selectedTypeId]
  );

  return <ColumnSettingsWidget columns={columns} filterFields={filterFields} />;
}
