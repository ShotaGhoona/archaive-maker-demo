'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseEditableTextOptions {
  value: string;
  onChange?: (value: string) => void;
}

interface UseEditableTextReturn {
  isEditing: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  startEditing: () => void;
  stopEditing: () => void;
  handleDoubleClick: (e: React.MouseEvent) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useEditableText({
  value,
  onChange,
}: UseEditableTextOptions): UseEditableTextReturn {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 編集開始
  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  // 編集終了
  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  // ダブルクリックで編集モード
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  // 編集モード時にフォーカス
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  // テキスト変更
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  // blur で編集終了
  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Escape で編集終了
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }, []);

  return {
    isEditing,
    textareaRef,
    startEditing,
    stopEditing,
    handleDoubleClick,
    handleTextChange,
    handleBlur,
    handleKeyDown,
  };
}
