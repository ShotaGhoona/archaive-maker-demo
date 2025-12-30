'use client';

import { useState, useCallback } from 'react';
import type { StickyNote } from '../model/types';
import type { CanvasColor } from '@/shared/canvas/constant/color';
import {
  STICKY_NOTE_WIDTH,
  STICKY_NOTE_HEIGHT,
  type StickyNoteFontSize,
} from '@/shared/canvas/constant/size';

const DEFAULT_STICKY_COLOR: CanvasColor = 'yellow';
const DEFAULT_FONT_SIZE: StickyNoteFontSize = 'medium';

export function useStickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);

  const addNote = useCallback((x: number, y: number) => {
    const newNote: StickyNote = {
      id: `sticky-${Date.now()}`,
      x: x - STICKY_NOTE_WIDTH / 2,
      y: y - STICKY_NOTE_HEIGHT / 2,
      width: STICKY_NOTE_WIDTH,
      height: STICKY_NOTE_HEIGHT,
      content: '',
      color: DEFAULT_STICKY_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
    };
    setNotes((prev) => [...prev, newNote]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<StickyNote>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}
