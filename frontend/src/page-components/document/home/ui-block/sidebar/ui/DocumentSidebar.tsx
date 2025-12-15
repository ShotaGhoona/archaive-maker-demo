'use client';

import { useState } from 'react';
import { ClipboardList, Settings } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/shadcn/ui/tooltip';
import { cn } from '@/shared/ui/shadcn/lib/utils';

import {
  documentTypes,
  type DocumentCategory,
} from '../../../dummy-data/documents';
import { DocumentTypeManageDialog } from './DocumentTypeManageDialog';
import { SidebarSearchFilter } from './components/SidebarSearchFilter';
import { DocumentTypeItem } from './components/DocumentTypeItem';

interface DocumentSidebarProps {
  selectedTypeId: string;
  onSelectType: (typeId: string) => void;
  collapsed?: boolean;
}

export function DocumentSidebar({
  selectedTypeId,
  onSelectType,
  collapsed = false,
}: DocumentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<
    DocumentCategory | 'all'
  >('all');

  // フィルタリング
  const filteredTypes = documentTypes.filter((type) => {
    const matchesSearch = type.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || type.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 縮小モード
  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <aside className='flex h-full w-14 flex-col border-r bg-card shadow-md'>
          <nav className='flex-1 overflow-y-auto p-2'>
            {/* 帳票種別管理ボタン */}
            <div className='mb-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DocumentTypeManageDialog
                      trigger={
                        <button className='flex h-10 w-10 items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600'>
                          <Settings className='size-5' />
                        </button>
                      }
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>帳票種別を管理</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <ul className='space-y-1'>
              {filteredTypes.map((type) => (
                <li key={type.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectType(type.id)}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                          selectedTypeId === type.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                        )}
                      >
                        <ClipboardList className='size-5' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                      <p>{type.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </TooltipProvider>
    );
  }

  return (
    <aside className='flex h-full w-64 flex-col border-r bg-card shadow-md'>
      {/* 帳票種別管理ボタン */}
      <div className='border-b px-2 py-4'>
        <DocumentTypeManageDialog />
      </div>
      <SidebarSearchFilter
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      <nav className='flex-1 overflow-y-auto p-2'>
        <ul className='space-y-1'>
          {filteredTypes.map((type) => (
            <DocumentTypeItem
              key={type.id}
              type={type}
              isSelected={selectedTypeId === type.id}
              onSelect={() => onSelectType(type.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
