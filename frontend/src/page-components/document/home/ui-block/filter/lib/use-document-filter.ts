"use client";

import { useState, useMemo, useCallback } from "react";

import type {
  FilterValues,
  AdvancedFilterValues,
  FilterFieldConfig,
} from "@/widgets/common/filter/filter-sidebar/model/types";

import {
  getFilterFieldsByTypeId,
  getSearchPlaceholderByTypeId,
} from "../config/filter-config";

export interface UseDocumentFilterReturn {
  // 状態
  filterOpen: boolean;
  simpleFilterValues: FilterValues;
  advancedFilterValues: AdvancedFilterValues;
  searchQuery: string;
  filterFields: FilterFieldConfig[];
  searchPlaceholder: string;

  // ハンドラ
  setFilterOpen: (open: boolean) => void;
  toggleFilter: () => void;
  setSimpleFilterValues: (values: FilterValues) => void;
  setAdvancedFilterValues: (values: AdvancedFilterValues) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export function useDocumentFilter(selectedTypeId: string): UseDocumentFilterReturn {
  const [filterOpen, setFilterOpen] = useState(false);
  const [simpleFilterValues, setSimpleFilterValues] = useState<FilterValues>({});
  const [advancedFilterValues, setAdvancedFilterValues] = useState<AdvancedFilterValues>({
    conditions: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filterFields = useMemo(
    () => getFilterFieldsByTypeId(selectedTypeId),
    [selectedTypeId]
  );

  const searchPlaceholder = useMemo(
    () => getSearchPlaceholderByTypeId(selectedTypeId),
    [selectedTypeId]
  );

  const toggleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, []);

  const resetFilters = useCallback(() => {
    setSimpleFilterValues({});
    setAdvancedFilterValues({ conditions: [] });
    setSearchQuery("");
  }, []);

  return {
    filterOpen,
    simpleFilterValues,
    advancedFilterValues,
    searchQuery,
    filterFields,
    searchPlaceholder,
    setFilterOpen,
    toggleFilter,
    setSimpleFilterValues,
    setAdvancedFilterValues,
    setSearchQuery,
    resetFilters,
  };
}
