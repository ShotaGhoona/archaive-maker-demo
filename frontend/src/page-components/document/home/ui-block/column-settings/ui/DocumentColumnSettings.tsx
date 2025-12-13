"use client";

import { useMemo } from "react";

import { ColumnSettingsWidgets } from "@/widgets/common/column-settings/ui/ColumnSettingsWidgets";

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

  return <ColumnSettingsWidgets columns={columns} filterFields={filterFields} />;
}
