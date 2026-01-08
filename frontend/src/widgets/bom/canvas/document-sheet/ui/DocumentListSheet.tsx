'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FileText, File } from 'lucide-react';

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
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import { NoData } from '@/shared/ui/components/empty-design/ui/NoData';
import { DocumentDetailModal } from './DocumentDetailModal';
import { getDocumentTypeById, type Document } from '@/shared/dummy-data/bom-v2';

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
                  const docType = getDocumentTypeById(doc.documentTypeId);
                  return (
                    <button
                      key={doc.id}
                      className="w-full rounded-lg border p-3 text-left transition-colors bg-card hover:bg-accent/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      {/* サムネイル */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-muted">
                        {doc.s3Path ? (
                          <Image
                            src={doc.s3Path}
                            alt={doc.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <File className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {/* 情報 */}
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {docType?.name ?? '帳票'}
                        </Badge>
                        <p className="truncate text-sm font-medium">
                          {doc.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.documentNumber}
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
