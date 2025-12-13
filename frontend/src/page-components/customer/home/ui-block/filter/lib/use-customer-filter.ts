'use client';

import { useState, useCallback } from 'react';

import type {
  FilterValues,
  AdvancedFilterValues,
} from '@/widgets/common/filter/filter-sidebar/model/types';

import { customerFilterFields } from '../config/filter-config';

export interface UseCustomerFilterReturn {
  // 状態
  filterOpen: boolean;
  simpleFilterValues: FilterValues;
  advancedFilterValues: AdvancedFilterValues;
  searchQuery: string;

  // ハンドラ
  setFilterOpen: (open: boolean) => void;
  toggleFilter: () => void;
  setSimpleFilterValues: (values: FilterValues) => void;
  setAdvancedFilterValues: (values: AdvancedFilterValues) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export function useCustomerFilter(): UseCustomerFilterReturn {
  const [filterOpen, setFilterOpen] = useState(false);
  const [simpleFilterValues, setSimpleFilterValues] = useState<FilterValues>({});
  const [advancedFilterValues, setAdvancedFilterValues] = useState<AdvancedFilterValues>({
    conditions: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, []);

  const resetFilters = useCallback(() => {
    setSimpleFilterValues({});
    setAdvancedFilterValues({ conditions: [] });
    setSearchQuery('');
  }, []);

  return {
    filterOpen,
    simpleFilterValues,
    advancedFilterValues,
    searchQuery,
    setFilterOpen,
    toggleFilter,
    setSimpleFilterValues,
    setAdvancedFilterValues,
    setSearchQuery,
    resetFilters,
  };
}

export { customerFilterFields };
