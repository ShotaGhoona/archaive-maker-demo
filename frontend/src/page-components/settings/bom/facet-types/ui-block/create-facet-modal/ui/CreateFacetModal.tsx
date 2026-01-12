'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { FacetTypeModal } from '../../facet-type-modal/ui/FacetTypeModal';

export function CreateFacetModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 size-4" />
        新規作成
      </Button>
      <FacetTypeModal open={open} onOpenChange={setOpen} mode="create" />
    </>
  );
}
