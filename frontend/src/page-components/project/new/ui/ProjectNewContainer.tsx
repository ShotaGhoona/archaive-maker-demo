'use client';

import { ProjectNewHeader } from '../ui-block/header/ui/ProjectNewHeader';
import { ToggleListSection } from '../ui-block/toggle-list/ui/ToggleListSection';
import { useProjectForm } from '../lib/use-project-form';

export function ProjectNewContainer() {
  const {
    projectInfo,
    products,
    documents,
    isSaving,
    setProjectInfo,
    setProducts,
    setDocuments,
    handleSave,
  } = useProjectForm();

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <ProjectNewHeader onSave={handleSave} isSaving={isSaving} />
      <div className='flex-1 overflow-auto p-6'>
        <ToggleListSection
          projectInfo={projectInfo}
          onProjectInfoChange={setProjectInfo}
          products={products}
          onProductsChange={setProducts}
          documents={documents}
          onDocumentsChange={setDocuments}
        />
      </div>
    </div>
  );
}
