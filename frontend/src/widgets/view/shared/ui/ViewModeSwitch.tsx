"use client";

import { LayoutGrid, Table } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/shadcn/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/shadcn/ui/tooltip";
import type { ViewMode } from "../model/types";

interface ViewModeSwitchProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeSwitch({
  viewMode,
  onViewModeChange,
}: ViewModeSwitchProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(value) => {
          if (value) onViewModeChange(value as ViewMode);
        }}
        className="border rounded-md"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="table"
              aria-label="テーブル表示"
              className="px-2.5"
            >
              <Table className="size-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>テーブル表示</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="gallery"
              aria-label="ギャラリー表示"
              className="px-2.5"
            >
              <LayoutGrid className="size-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>ギャラリー表示</p>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  );
}
