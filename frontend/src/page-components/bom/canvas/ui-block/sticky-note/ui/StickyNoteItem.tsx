'use client';

import { useState, useEffect, useCallback } from 'react';

import type { StickyNote } from '../model/types';
import { useDrag } from '../lib/use-drag';
import { useResize } from '../lib/use-resize';
import { useEditableText } from '../lib/use-editable-text';
import { StickyNoteToolbar } from './components/StickyNoteToolbar';
import { cn } from '@/shared/ui/shadcn/lib/utils';
import { CANVAS_COLORS } from '@/shared/canvas/constant/color';
import { STICKY_NOTE_FONT_SIZES } from '@/shared/canvas/constant/size';

interface StickyNoteItemProps {
  note: StickyNote;
  onUpdate: (id: string, updates: Partial<StickyNote>) => void;
}

export function StickyNoteItem({ note, onUpdate }: StickyNoteItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const backgroundColor = CANVAS_COLORS[note.color].code;
  const fontSizeValue = STICKY_NOTE_FONT_SIZES[note.fontSize].size;

  // 編集フック
  const {
    isEditing,
    textareaRef,
    handleDoubleClick,
    handleTextChange,
    handleBlur,
    handleKeyDown,
  } = useEditableText({
    value: note.content,
    onChange: (content) => onUpdate(note.id, { content }),
  });

  // リサイズフック
  const { isResizing, handleResizeMouseDown } = useResize({
    initialWidth: note.width,
    initialHeight: note.height,
    onResize: (width, height) => onUpdate(note.id, { width, height }),
  });

  // ドラッグフック
  const { isDragging, handleDragMouseDown } = useDrag({
    initialX: note.x,
    initialY: note.y,
    disabled: isEditing || isResizing,
    onDrag: (x, y) => onUpdate(note.id, { x, y }),
  });

  // クリックで選択
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  }, []);

  // 外側クリックで選択解除
  useEffect(() => {
    if (!isSelected) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 自分自身またはツールバー内のクリックは無視
      if (target.closest(`[data-sticky-id="${note.id}"]`)) {
        return;
      }
      setIsSelected(false);
    };

    // 次のイベントループで登録（現在のクリックイベントを無視するため）
    const timeoutId = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isSelected, note.id]);

  // カーソル決定
  const getCursor = () => {
    if (isDragging) return 'grabbing';
    if (isEditing) return 'text';
    return 'grab';
  };

  return (
    <div
      data-sticky
      data-sticky-id={note.id}
      className={cn(
        'absolute shadow-md',
        isSelected && 'outline outline-2 outline-offset-1 outline-primary',
      )}
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        backgroundColor,
        cursor: getCursor(),
      }}
      onMouseDown={handleDragMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {/* 選択時の編集バー */}
      {isSelected && !isEditing && (
        <StickyNoteToolbar
          color={note.color}
          fontSize={note.fontSize}
          onColorChange={(color) => onUpdate(note.id, { color })}
          onFontSizeChange={(fontSize) => onUpdate(note.id, { fontSize })}
        />
      )}

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={note.content}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className='h-full w-full resize-none border-none bg-transparent p-3 outline-none'
          style={{ fontSize: fontSizeValue }}
          placeholder='テキストを入力...'
        />
      ) : (
        <div className='h-full w-full overflow-hidden p-3'>
          <p
            className='whitespace-pre-wrap leading-relaxed'
            style={{ fontSize: fontSizeValue }}
          >
            {note.content || (
              <span className='text-gray-400'>ダブルクリックで編集</span>
            )}
          </p>
        </div>
      )}

      {/* リサイズハンドル */}
      <div
        className='absolute bottom-0 right-0 h-4 w-4 cursor-se-resize'
        onMouseDown={handleResizeMouseDown}
      >
        <svg
          className='absolute bottom-1 right-1 h-2 w-2 text-gray-400'
          viewBox='0 0 6 6'
          fill='currentColor'
        >
          <circle cx='5' cy='1' r='0.8' />
          <circle cx='5' cy='5' r='0.8' />
          <circle cx='1' cy='5' r='0.8' />
        </svg>
      </div>
    </div>
  );
}
