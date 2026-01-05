'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
} from '@/shared/ui/shadcn/ui/floating-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { DocumentDetailModal } from './DocumentDetailModal';

import type { Document } from '@/shared/dummy-data/bom/types';

interface DocumentListSheetProps {
  documents: Document[];
}

export function DocumentListSheet({ documents }: DocumentListSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
    setModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedDocument(null);
    }
  };

  return (
    <>
      <FloatingModal open={sheetOpen} onOpenChange={setSheetOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <FloatingModalTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </FloatingModalTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>帳票一覧 ({documents.length})</p>
          </TooltipContent>
        </Tooltip>
        <FloatingModalContent height="full" onWheel={(e) => e.stopPropagation()}>
          <FloatingModalHeader>
            <FloatingModalTitle>帳票一覧</FloatingModalTitle>
          </FloatingModalHeader>
          <FloatingModalBody className="overflow-y-auto">
            {documents.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <NoData title="帳票がありません" size="sm" />
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => {
                const latestVersion = doc.versions[doc.versions.length - 1];
                return (
                  <button
                    key={doc.id}
                    className="w-full rounded-lg border p-3 text-left transition-colors bg-card"
                    onClick={() => handleDocumentClick(doc)}
                  >
                    {/* サムネイル */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-muted">
                      <Image
                        src={latestVersion.previewImageUrl}
                        alt={latestVersion.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* 情報 */}
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        {doc.typeName}
                      </p>
                      <p className="truncate text-sm font-medium">
                        {latestVersion.name}
                      </p>
                    </div>
                  </button>
                );
                })}
              </div>
            )}
          </FloatingModalBody>
        </FloatingModalContent>
      </FloatingModal>

      {/* 詳細モーダル */}
      {selectedDocument && (
        <DocumentDetailModal
          document={selectedDocument}
          open={modalOpen}
          onOpenChange={handleModalClose}
        />
      )}
    </>
  );
}
