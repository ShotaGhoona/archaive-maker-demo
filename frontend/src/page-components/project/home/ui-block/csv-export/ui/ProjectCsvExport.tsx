'use client';

import { useMemo } from 'react';

import { CsvExportModalWidget } from '@/widgets/common/csv-export-dialog/ui/CsvExportModalWidget';

import { createProjectColumns } from '../../table-view/config/column-config';
import { dummyProjects } from '../../../dummy-data/projects';

export function ProjectCsvExport() {
  const columns = useMemo(
    () =>
      createProjectColumns(
        () => {}, // handleOpen placeholder
        () => {}, // handleDelete placeholder
      ),
    [],
  );

  return <CsvExportModalWidget columns={columns} data={dummyProjects} />;
}
