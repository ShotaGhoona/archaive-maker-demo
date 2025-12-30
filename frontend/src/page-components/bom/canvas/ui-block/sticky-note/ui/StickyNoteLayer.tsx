'use client';

import type { StickyNote } from '../model/types';
import { StickyNoteItem } from './StickyNoteItem';
import { StickyNotePlaceholder } from './components/StickyNotePlaceholder';

interface StickyNoteLayerProps {
  notes: StickyNote[];
  onUpdate: (id: string, updates: Partial<StickyNote>) => void;
  previewPosition: { x: number; y: number } | null;
}

export function StickyNoteLayer({ notes, onUpdate, previewPosition }: StickyNoteLayerProps) {
  return (
    <>
      {/* 配置済みの付箋 */}
      {notes.map((note) => (
        <StickyNoteItem key={note.id} note={note} onUpdate={onUpdate} />
      ))}

      {/* 配置プレビュー */}
      {previewPosition && (
        <StickyNotePlaceholder x={previewPosition.x} y={previewPosition.y} />
      )}
    </>
  );
}
