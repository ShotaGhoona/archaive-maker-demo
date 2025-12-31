'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/ui/tabs';
import { GlassmorphismDemo } from './components/glassmorphism-demo';
import { BentoGridDemo } from './components/bento-grid-demo';
import { CommandPaletteDemo } from './components/command-palette-demo';
import { FloatingPanelDemo } from './components/floating-panel-demo';

export default function DesignTrendsPage() {
  const [activeTab, setActiveTab] = useState('glassmorphism');

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <h1 className="text-lg font-semibold">2025 Design Trends</h1>
          <div className="ml-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="glassmorphism">A. Glassmorphism</TabsTrigger>
                <TabsTrigger value="bento">B. Bento Grid</TabsTrigger>
                <TabsTrigger value="command">C. Command Central</TabsTrigger>
                <TabsTrigger value="floating">D. Floating Panel</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {activeTab === 'glassmorphism' && <GlassmorphismDemo />}
        {activeTab === 'bento' && <BentoGridDemo />}
        {activeTab === 'command' && <CommandPaletteDemo />}
        {activeTab === 'floating' && <FloatingPanelDemo />}
      </div>
    </div>
  );
}
