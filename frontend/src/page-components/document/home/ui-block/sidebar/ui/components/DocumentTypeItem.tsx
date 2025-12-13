"use client";

import { ClipboardList } from "lucide-react";

import { Badge } from "@/shared/ui/shadcn/ui/badge";
import { cn } from "@/shared/ui/shadcn/lib/utils";

import type { DocumentType, DocumentCategory } from "../../../../dummy-data/documents";

// カテゴリラベル
const categoryLabels: Record<DocumentCategory, string> = {
  product: "製品",
  company: "会社",
};

// カテゴリカラー
const categoryColors: Record<DocumentCategory, string> = {
  product: "bg-blue-100 text-blue-700 border-blue-200",
  company: "bg-green-100 text-green-700 border-green-200",
};

interface DocumentTypeItemProps {
  type: DocumentType;
  isSelected: boolean;
  onSelect: () => void;
}

export function DocumentTypeItem({
  type,
  isSelected,
  onSelect,
}: DocumentTypeItemProps) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          isSelected
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <ClipboardList className="size-5 shrink-0" />
        <span className="flex-1 truncate text-left">{type.name}</span>
        <Badge
          variant="outline"
          className={cn("shrink-0 text-xs", categoryColors[type.category])}
        >
          {categoryLabels[type.category]}
        </Badge>
      </button>
    </li>
  );
}
