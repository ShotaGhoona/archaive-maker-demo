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
} from '@/shared/dummy-data/document/documents';
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
        <aside className='flex h-full w-14 flex-col border-r border-slate-200/60 bg-white/40 backdrop-blur-xl'>
          <nav className='flex-1 overflow-y-auto p-2'>
            {/* 帳票種別管理ボタン */}
            <div className='mb-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DocumentTypeManageDialog
                      trigger={
                        <button className='flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-slate-300/60 text-slate-400 transition-all duration-200 hover:border-slate-400 hover:bg-white/60 hover:text-slate-600'>
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
                          'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                          selectedTypeId === type.id
                            ? 'bg-white/70 text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:bg-white/60 hover:text-slate-700',
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
    <aside className='flex h-full w-64 flex-col border-r border-slate-200/60 bg-white/40 backdrop-blur-xl'>
      {/* 帳票種別管理ボタン */}
      <div className='border-b border-slate-200/60 px-2 py-4'>
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
