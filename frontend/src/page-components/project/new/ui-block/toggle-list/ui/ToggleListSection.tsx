'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/shadcn/ui/collapsible';
import { cn } from '@/shared/ui/shadcn/lib/utils';

import { InfoCard, type ProjectInfo } from './card-components/InfoCard';
import { ProductCard } from './card-components/ProductCard';
import { DocumentCard } from './card-components/DocumentCard';
import { AddProductDialog } from './components/AddProductDialog';
import type { UploadedFile } from './components/UploadArea';

// 製品データ型
export interface ProductData {
  id: string;
  name: string;
  files: UploadedFile[];
}

// 帳票データ型
export interface DocumentsData {
  estimates: UploadedFile[]; // 見積書
  deliveryNotes: UploadedFile[]; // 納品書
  purchaseOrders: UploadedFile[]; // 発注書
}

interface ToggleListSectionProps {
  projectInfo: ProjectInfo;
  onProjectInfoChange: (value: ProjectInfo) => void;
  products: ProductData[];
  onProductsChange: (products: ProductData[]) => void;
  documents: DocumentsData;
  onDocumentsChange: (documents: DocumentsData) => void;
}

// トグルヘッダーコンポーネント
function ToggleHeader({
  isOpen,
  children,
  className,
  actions,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <CollapsibleTrigger className='flex items-center gap-2 py-2 text-left text-sm font-semibold text-foreground hover:text-primary'>
        {isOpen ? (
          <ChevronDown className='size-4 text-primary' />
        ) : (
          <ChevronRight className='size-4 text-primary' />
        )}
        {children}
      </CollapsibleTrigger>
      {actions}
    </div>
  );
}

export function ToggleListSection({
  projectInfo,
  onProjectInfoChange,
  products,
  onProductsChange,
  documents,
  onDocumentsChange,
}: ToggleListSectionProps) {
  // トグル状態
  const [infoOpen, setInfoOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(true);
  const [productToggles, setProductToggles] = useState<Record<string, boolean>>(
    {},
  );
  const [docToggles, setDocToggles] = useState({
    estimates: true,
    deliveryNotes: false,
    purchaseOrders: false,
  });

  // 製品追加ダイアログ
  const [addProductOpen, setAddProductOpen] = useState(false);

  // ファイルID生成
  const generateFileId = () => Math.random().toString(36).substring(2, 9);

  // 製品追加
  const handleAddProduct = (name: string) => {
    const newProduct: ProductData = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      files: [],
    };
    onProductsChange([...products, newProduct]);
    setProductToggles((prev) => ({ ...prev, [newProduct.id]: true }));
  };

  // 製品削除
  const handleRemoveProduct = (productId: string) => {
    onProductsChange(products.filter((p) => p.id !== productId));
    setProductToggles((prev) => {
      const newToggles = { ...prev };
      delete newToggles[productId];
      return newToggles;
    });
  };

  // 製品にファイル追加
  const handleProductFilesAdd = (productId: string, files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: generateFileId(),
      name: file.name,
      file,
    }));
    onProductsChange(
      products.map((p) =>
        p.id === productId ? { ...p, files: [...p.files, ...newFiles] } : p,
      ),
    );
  };

  // 製品からファイル削除
  const handleProductFileRemove = (productId: string, fileId: string) => {
    onProductsChange(
      products.map((p) =>
        p.id === productId
          ? { ...p, files: p.files.filter((f) => f.id !== fileId) }
          : p,
      ),
    );
  };

  // 帳票にファイル追加
  const handleDocumentFilesAdd = (
    docType: keyof DocumentsData,
    files: File[],
  ) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: generateFileId(),
      name: file.name,
      file,
    }));
    onDocumentsChange({
      ...documents,
      [docType]: [...documents[docType], ...newFiles],
    });
  };

  // 帳票からファイル削除
  const handleDocumentFileRemove = (
    docType: keyof DocumentsData,
    fileId: string,
  ) => {
    onDocumentsChange({
      ...documents,
      [docType]: documents[docType].filter((f) => f.id !== fileId),
    });
  };

  return (
    <div className='space-y-4 rounded-lg bg-white p-6 shadow-sm'>
      {/* 案件情報 */}
      <Collapsible open={infoOpen} onOpenChange={setInfoOpen}>
        <ToggleHeader isOpen={infoOpen}>案件情報</ToggleHeader>
        <CollapsibleContent className='pl-6 pt-2'>
          <InfoCard value={projectInfo} onChange={onProjectInfoChange} />
        </CollapsibleContent>
      </Collapsible>

      {/* 製品 */}
      <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
        <ToggleHeader isOpen={productsOpen}>製品</ToggleHeader>
        <CollapsibleContent className='space-y-3 pl-6 pt-2'>
          {/* 各製品トグル */}
          {products.map((product) => (
            <Collapsible
              key={product.id}
              open={productToggles[product.id] ?? false}
              onOpenChange={(open) =>
                setProductToggles((prev) => ({
                  ...prev,
                  [product.id]: open,
                }))
              }
            >
              <ToggleHeader
                isOpen={productToggles[product.id] ?? false}
                actions={
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <Trash2 className='size-4' />
                    削除
                  </Button>
                }
              >
                {product.name}
              </ToggleHeader>
              <CollapsibleContent className='pl-6 pt-2'>
                <ProductCard
                  files={product.files}
                  onFilesAdd={(files) =>
                    handleProductFilesAdd(product.id, files)
                  }
                  onFileRemove={(fileId) =>
                    handleProductFileRemove(product.id, fileId)
                  }
                />
              </CollapsibleContent>
            </Collapsible>
          ))}

          {/* 製品追加ボタン（常に表示） */}
          <button
            type='button'
            onClick={() => setAddProductOpen(true)}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 py-6 transition-colors',
              'hover:border-primary/50 hover:bg-primary/10',
            )}
          >
            <Plus className='size-5 text-primary/60' />
            <span className='text-primary/60'>製品を追加</span>
          </button>
        </CollapsibleContent>
      </Collapsible>

      {/* 帳票 */}
      <Collapsible open={documentsOpen} onOpenChange={setDocumentsOpen}>
        <ToggleHeader isOpen={documentsOpen}>帳票</ToggleHeader>
        <CollapsibleContent className='space-y-3 pl-6 pt-2'>
          {/* 見積書 */}
          <Collapsible
            open={docToggles.estimates}
            onOpenChange={(open) =>
              setDocToggles((prev) => ({ ...prev, estimates: open }))
            }
          >
            <ToggleHeader isOpen={docToggles.estimates}>見積書</ToggleHeader>
            <CollapsibleContent className='pl-6 pt-2'>
              <DocumentCard
                files={documents.estimates}
                onFilesAdd={(files) =>
                  handleDocumentFilesAdd('estimates', files)
                }
                onFileRemove={(fileId) =>
                  handleDocumentFileRemove('estimates', fileId)
                }
              />
            </CollapsibleContent>
          </Collapsible>

          {/* 納品書 */}
          <Collapsible
            open={docToggles.deliveryNotes}
            onOpenChange={(open) =>
              setDocToggles((prev) => ({ ...prev, deliveryNotes: open }))
            }
          >
            <ToggleHeader isOpen={docToggles.deliveryNotes}>
              納品書
            </ToggleHeader>
            <CollapsibleContent className='pl-6 pt-2'>
              <DocumentCard
                files={documents.deliveryNotes}
                onFilesAdd={(files) =>
                  handleDocumentFilesAdd('deliveryNotes', files)
                }
                onFileRemove={(fileId) =>
                  handleDocumentFileRemove('deliveryNotes', fileId)
                }
              />
            </CollapsibleContent>
          </Collapsible>

          {/* 発注書 */}
          <Collapsible
            open={docToggles.purchaseOrders}
            onOpenChange={(open) =>
              setDocToggles((prev) => ({ ...prev, purchaseOrders: open }))
            }
          >
            <ToggleHeader isOpen={docToggles.purchaseOrders}>
              発注書
            </ToggleHeader>
            <CollapsibleContent className='pl-6 pt-2'>
              <DocumentCard
                files={documents.purchaseOrders}
                onFilesAdd={(files) =>
                  handleDocumentFilesAdd('purchaseOrders', files)
                }
                onFileRemove={(fileId) =>
                  handleDocumentFileRemove('purchaseOrders', fileId)
                }
              />
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>

      {/* 製品追加ダイアログ */}
      <AddProductDialog
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
