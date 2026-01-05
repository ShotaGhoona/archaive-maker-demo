'use client';

import { ExternalLink } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/ui/button';
import { Badge } from '@/shared/ui/shadcn/ui/badge';
import {
  FloatingModal,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalTitle,
  FloatingModalDescription,
} from '@/shared/ui/shadcn/ui/floating-modal';

// ハードコーディングされた関連Product情報
const RELATED_PRODUCTS = [
  {
    id: 'prod-001',
    name: '産業用ロボットアーム RA-500',
    type: 'product' as const,
    customer: '株式会社テクノファクトリー',
    relation: 'このAssyを使用',
  },
  {
    id: 'prod-002',
    name: '自動搬送装置 AGV-200',
    type: 'product' as const,
    customer: '株式会社テクノファクトリー',
    relation: 'このAssyを使用',
  },
  {
    id: 'prod-003',
    name: '精密加工機 PM-100',
    type: 'product' as const,
    customer: '大和精密工業株式会社',
    relation: 'このAssyを使用',
  },
];

interface RelatedProductsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RelatedProductsModal({
  open,
  onOpenChange,
}: RelatedProductsModalProps) {
  return (
    <FloatingModal
      open={open}
      onOpenChange={onOpenChange}
      mode="stack"
      onBack={() => onOpenChange(false)}
    >
      <FloatingModalContent height="auto" showBackButton>
        <FloatingModalHeader>
          <FloatingModalTitle>関連Product</FloatingModalTitle>
          <FloatingModalDescription>
            このノードを使用しているProduct一覧
          </FloatingModalDescription>
        </FloatingModalHeader>
        <FloatingModalBody>
          <div className="space-y-3">
            {RELATED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border p-4 bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        Product
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.relation}
                      </span>
                    </div>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {product.customer}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FloatingModalBody>
      </FloatingModalContent>
    </FloatingModal>
  );
}

export { RELATED_PRODUCTS };
