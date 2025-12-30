'use client';

import { StickyNote, MessageSquare, Plus } from 'lucide-react';

import { cn } from '@/shared/ui/shadcn/lib/utils';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/shared/ui/shadcn/ui/button-group';

export type CanvasToolType = 'sticky' | 'comment' | 'node' | null;

interface ToolConfig {
  type: Exclude<CanvasToolType, null>;
  label: string;
  icon: React.ReactNode;
}

const TOOLS: ToolConfig[] = [
  { type: 'sticky', label: '付箋', icon: <StickyNote className="h-4 w-4" /> },
  { type: 'comment', label: 'コメント', icon: <MessageSquare className="h-4 w-4" /> },
  { type: 'node', label: '新規Node', icon: <Plus className="h-4 w-4" /> },
];

interface CanvasToolbarProps {
  className?: string;
  selectedTool?: CanvasToolType;
  onToolChange?: (tool: CanvasToolType) => void;
}

export function CanvasToolbar({
  className,
  selectedTool = null,
  onToolChange,
}: CanvasToolbarProps) {
  const handleToolSelect = (tool: Exclude<CanvasToolType, null>) => {
    // 同じツールをクリックしたら解除
    const newTool = selectedTool === tool ? null : tool;
    onToolChange?.(newTool);
  };

  return (
    <div className={cn('absolute', className)}>
      <ButtonGroup className="rounded-lg border bg-white/95 shadow-lg backdrop-blur-sm">
        {TOOLS.map((tool, index) => (
          <div key={tool.type} className="flex items-stretch">
            {index > 0 && <ButtonGroupSeparator />}
            <Button
              variant={selectedTool === tool.type ? 'default' : 'ghost'}
              className="h-10 gap-2 px-4"
              onClick={() => handleToolSelect(tool.type)}
            >
              {tool.icon}
              <span className="text-sm">{tool.label}</span>
            </Button>
          </div>
        ))}
      </ButtonGroup>
    </div>
  );
}
