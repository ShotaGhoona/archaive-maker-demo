'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

import { cn } from '../lib/utils';

/* =============================================================================
 * Types
 * ========================================================================== */

/**
 * Modal display modes:
 * - replace: New card at edge, previous slides out (partially visible)
 * - stack: New card appears next to existing, both fully visible
 * - push: Previous card completely hidden (off-screen)
 */
type ModalMode = 'replace' | 'stack' | 'push';

/**
 * Side: which edge of the screen modals appear on
 */
type ModalSide = 'left' | 'right';

/**
 * Align: vertical alignment of modals
 */
type ModalAlign = 'start' | 'center' | 'end';

type ModalEntry = {
  id: string;
  mode: ModalMode;
  width: number;
};

/* =============================================================================
 * Constants
 * ========================================================================== */

const EDGE_GAP = 24; // Gap from screen edge
const CARD_GAP = 16; // Gap between cards
const REPLACE_VISIBLE_WIDTH = 80; // Visible portion in replace mode

const WIDTH_PRESETS = {
  sm: 320,
  md: 400,
  lg: 480,
  xl: 560,
} as const;

type WidthPreset = keyof typeof WIDTH_PRESETS;

/* =============================================================================
 * Provider Context
 * ========================================================================== */

type ModalPosition = {
  offset: number;
  translateX: number;
  isHidden: boolean;
  isPartial: boolean;
};

type FloatingModalProviderContextValue = {
  modals: ModalEntry[];
  side: ModalSide;
  align: ModalAlign;
  register: (id: string, mode: ModalMode, width: number) => void;
  unregister: (id: string) => void;
  updateWidth: (id: string, width: number) => void;
  getPosition: (id: string) => ModalPosition;
};

const FloatingModalProviderContext =
  React.createContext<FloatingModalProviderContextValue | null>(null);

function useFloatingModalProvider() {
  return React.useContext(FloatingModalProviderContext);
}

/**
 * FloatingModalProvider
 * Manages multiple floating modals and calculates their positions.
 */
type FloatingModalProviderProps = {
  children: React.ReactNode;
  /** Which side of the screen modals appear on. Default: 'right' */
  side?: ModalSide;
  /** Vertical alignment of modals. Default: 'center' */
  align?: ModalAlign;
};

function FloatingModalProvider({
  children,
  side = 'right',
  align = 'center',
}: FloatingModalProviderProps) {
  const [modals, setModals] = React.useState<ModalEntry[]>([]);

  const register = React.useCallback((id: string, mode: ModalMode, width: number) => {
    setModals((prev) => {
      if (prev.some((m) => m.id === id)) return prev;
      return [...prev, { id, mode, width }];
    });
  }, []);

  const unregister = React.useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateWidth = React.useCallback((id: string, width: number) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, width } : m))
    );
  }, []);

  /**
   * Calculate all modal positions at once.
   *
   * Position calculation is done in two passes:
   * 1. Calculate base offsets (where each modal "wants" to be)
   * 2. Apply translateX for modals being pushed out by replace/push modes
   *
   * This approach handles complex chains like: stack → replace → stack
   */
  const positions = React.useMemo(() => {
    if (modals.length === 0) return new Map<string, ModalPosition>();

    const positionMap = new Map<string, ModalPosition>();
    const baseOffsets: number[] = [];

    // First pass: calculate base offsets
    // Each modal's base offset depends on all previous modals
    for (let i = 0; i < modals.length; i++) {
      if (i === 0) {
        // First modal is at the edge
        baseOffsets[i] = EDGE_GAP;
      } else {
        const prevModal = modals[i - 1];
        const thisModal = modals[i];

        if (thisModal.mode === 'replace') {
          // Replace mode: position next to the visible portion (80px) of previous modal
          baseOffsets[i] = baseOffsets[i - 1] + REPLACE_VISIBLE_WIDTH + CARD_GAP;
        } else {
          // Stack mode (or default): position next to the full width of previous modal
          baseOffsets[i] = baseOffsets[i - 1] + prevModal.width + CARD_GAP;
        }
      }
    }

    // Second pass: determine translateX and visibility based on next modal's mode
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      const nextModal = modals[i + 1];

      let translateX = 0;
      let isHidden = false;
      let isPartial = false;

      if (nextModal) {
        if (nextModal.mode === 'push') {
          // Completely hidden - slide off screen
          const slideAmount = modal.width + EDGE_GAP * 2;
          translateX = side === 'right' ? slideAmount : -slideAmount;
          isHidden = true;
        } else if (nextModal.mode === 'replace') {
          // Partially visible - slide out so only REPLACE_VISIBLE_WIDTH shows
          const slideAmount = modal.width - REPLACE_VISIBLE_WIDTH + EDGE_GAP;
          translateX = side === 'right' ? slideAmount : -slideAmount;
          isPartial = true;
        }
        // stack mode: no translation needed
      }

      positionMap.set(modal.id, {
        offset: baseOffsets[i],
        translateX,
        isHidden,
        isPartial,
      });
    }

    return positionMap;
  }, [modals, side]);

  const getPosition = React.useCallback(
    (id: string): ModalPosition => {
      return positions.get(id) ?? { offset: EDGE_GAP, translateX: 0, isHidden: false, isPartial: false };
    },
    [positions]
  );

  const contextValue = React.useMemo(
    () => ({ modals, side, align, register, unregister, updateWidth, getPosition }),
    [modals, side, align, register, unregister, updateWidth, getPosition]
  );

  return (
    <FloatingModalProviderContext.Provider value={contextValue}>
      {children}
    </FloatingModalProviderContext.Provider>
  );
}

/* =============================================================================
 * Modal Context (individual modal state)
 * ========================================================================== */

type FloatingModalContextValue = {
  id: string;
  mode: ModalMode;
  position: ModalPosition;
  width: number;
  onBack?: () => void;
};

const FloatingModalContext = React.createContext<FloatingModalContextValue | null>(null);

function useFloatingModal() {
  const context = React.useContext(FloatingModalContext);
  if (!context) {
    throw new Error('useFloatingModal must be used within a FloatingModal');
  }
  return context;
}

/* =============================================================================
 * FloatingModal
 * ========================================================================== */

type FloatingModalProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  mode?: ModalMode;
  width?: WidthPreset | number;
  onBack?: () => void;
};

function FloatingModal({
  children,
  open,
  onOpenChange,
  mode = 'replace',
  width: widthProp = 'md',
  onBack,
  ...props
}: FloatingModalProps) {
  const id = React.useId();
  const provider = useFloatingModalProvider();

  const width = typeof widthProp === 'number' ? widthProp : WIDTH_PRESETS[widthProp];

  // Refs for stable callbacks
  const registerRef = React.useRef(provider?.register);
  const unregisterRef = React.useRef(provider?.unregister);

  React.useEffect(() => {
    registerRef.current = provider?.register;
    unregisterRef.current = provider?.unregister;
  }, [provider]);

  React.useEffect(() => {
    if (open) {
      registerRef.current?.(id, mode, width);
    } else {
      unregisterRef.current?.(id);
    }
    return () => {
      unregisterRef.current?.(id);
    };
  }, [open, id, mode, width]);

  const position = provider?.getPosition(id) ?? { offset: EDGE_GAP, translateX: 0, isHidden: false, isPartial: false };

  const contextValue = React.useMemo(
    () => ({ id, mode, position, width, onBack }),
    [id, mode, position, width, onBack]
  );

  return (
    <FloatingModalContext.Provider value={contextValue}>
      <DialogPrimitive.Root
        data-slot="floating-modal"
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    </FloatingModalContext.Provider>
  );
}

/* =============================================================================
 * FloatingModalTrigger
 * ========================================================================== */

function FloatingModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger data-slot="floating-modal-trigger" {...props} />
  );
}

/* =============================================================================
 * FloatingModalPortal
 * ========================================================================== */

function FloatingModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return (
    <DialogPrimitive.Portal data-slot="floating-modal-portal" {...props} />
  );
}

/* =============================================================================
 * FloatingModalClose
 * ========================================================================== */

function FloatingModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close data-slot="floating-modal-close" {...props} />
  );
}

/* =============================================================================
 * FloatingModalOverlay
 * ========================================================================== */

function FloatingModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const provider = useFloatingModalProvider();
  const { id } = useFloatingModal();

  // Show overlay only for standalone modal or first modal in stack
  const isStandalone = !provider;
  const isFirst = provider?.modals[0]?.id === id;

  if (!isStandalone && !isFirst) {
    return null;
  }

  return (
    <DialogPrimitive.Overlay
      data-slot="floating-modal-overlay"
      className={cn(
        'fixed inset-0 z-30 bg-black/40',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'duration-200',
        className
      )}
      {...props}
    />
  );
}

/* =============================================================================
 * FloatingModalContent
 * ========================================================================== */

type FloatingModalContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  showBackButton?: boolean;
  height?: 'auto' | 'full' | number;
};

function FloatingModalContent({
  className,
  children,
  showCloseButton = true,
  showBackButton,
  height = 'auto',
  ...props
}: FloatingModalContentProps) {
  const { position, width, onBack, mode } = useFloatingModal();
  const provider = useFloatingModalProvider();
  const { id } = useFloatingModal();

  const side = provider?.side ?? 'right';
  const align = provider?.align ?? 'center';

  const shouldShowBack = showBackButton ?? onBack !== undefined;

  // Calculate z-index based on position in stack
  const index = provider?.modals.findIndex((m) => m.id === id) ?? 0;
  const zIndex = 30 + index * 2;

  // Height styles
  const heightStyles: React.CSSProperties = {};
  if (height === 'full') {
    heightStyles.height = `calc(100vh - ${EDGE_GAP * 2}px)`;
  } else if (typeof height === 'number') {
    heightStyles.height = height;
  }

  // Position styles based on side and align
  const positionStyles: React.CSSProperties = {
    width,
    zIndex,
    ...heightStyles,
  };

  // Horizontal position (side)
  if (side === 'right') {
    positionStyles.right = position.offset;
  } else {
    positionStyles.left = position.offset;
  }

  // Vertical position (align)
  if (align === 'start') {
    positionStyles.top = EDGE_GAP;
  } else if (align === 'end') {
    positionStyles.bottom = EDGE_GAP;
  }
  // center is handled by CSS class

  // Build transform and CSS variables for animation
  // When align is center, we need to maintain translateY(-50%) during animation
  const animationVars: React.CSSProperties = {};
  if (align === 'center') {
    // Override Tailwind animate CSS variables to maintain Y position
    (animationVars as Record<string, string>)['--tw-enter-translate-y'] = '-50%';
    (animationVars as Record<string, string>)['--tw-exit-translate-y'] = '-50%';
  }

  const transformStyle = position.translateX !== 0
    ? `translateX(${position.translateX}px)${align === 'center' ? ' translateY(-50%)' : ''}`
    : align === 'center' ? 'translateY(-50%)' : undefined;

  // Back button icon based on side
  const BackIcon = side === 'right' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <FloatingModalPortal>
      <FloatingModalOverlay />
      <DialogPrimitive.Content
        data-slot="floating-modal-content"
        data-mode={mode}
        data-side={side}
        data-align={align}
        data-partial={position.isPartial}
        data-hidden={position.isHidden}
        className={cn(
          // Base styles
          'fixed',
          'flex flex-col',
          'bg-background rounded-xl border shadow-2xl',
          'outline-none',
          'max-h-[calc(100vh-48px)]',
          // Vertical alignment
          align === 'center' && 'top-1/2',
          // Animation - horizontal slide only
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:slide-out-to-right-4 data-[state=open]:slide-in-from-right-4',
          'duration-300 ease-out',
          // Partial/hidden state styling
          position.isPartial && 'pointer-events-none',
          position.isHidden && 'opacity-0 pointer-events-none',
          className
        )}
        style={{
          ...positionStyles,
          ...animationVars,
          transform: transformStyle,
          transition: 'transform 300ms ease-out, opacity 300ms ease-out',
        }}
        {...props}
      >
        {children}

        {/* Close button */}
        {showCloseButton && !position.isPartial && (
          <DialogPrimitive.Close
            data-slot="floating-modal-close"
            className={cn(
              'absolute top-3 rounded-full p-1.5',
              'text-muted-foreground hover:text-foreground',
              'hover:bg-muted transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              // Position based on side (close button on outer edge)
              side === 'right' ? 'right-3' : 'left-3'
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">閉じる</span>
          </DialogPrimitive.Close>
        )}

        {/* Back button */}
        {shouldShowBack && !position.isPartial && (
          <button
            type="button"
            data-slot="floating-modal-back"
            onClick={onBack}
            className={cn(
              'absolute top-3 rounded-full p-1.5',
              'text-muted-foreground hover:text-foreground',
              'hover:bg-muted transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              // Position based on side (back button on inner edge)
              side === 'right' ? 'left-3' : 'right-3'
            )}
          >
            <BackIcon className="size-4" />
            <span className="sr-only">戻る</span>
          </button>
        )}
      </DialogPrimitive.Content>
    </FloatingModalPortal>
  );
}

/* =============================================================================
 * FloatingModalHeader
 * ========================================================================== */

function FloatingModalHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="floating-modal-header"
      className={cn('px-6 pt-6 pb-4 shrink-0', className)}
      {...props}
    />
  );
}

/* =============================================================================
 * FloatingModalBody
 * ========================================================================== */

function FloatingModalBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="floating-modal-body"
      className={cn('flex-1 overflow-y-auto px-6 py-2', className)}
      {...props}
    />
  );
}

/* =============================================================================
 * FloatingModalFooter
 * ========================================================================== */

function FloatingModalFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="floating-modal-footer"
      className={cn('px-6 pt-4 pb-6 shrink-0', className)}
      {...props}
    />
  );
}

/* =============================================================================
 * FloatingModalTitle
 * ========================================================================== */

function FloatingModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="floating-modal-title"
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

/* =============================================================================
 * FloatingModalDescription
 * ========================================================================== */

function FloatingModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="floating-modal-description"
      className={cn('text-sm text-muted-foreground mt-1', className)}
      {...props}
    />
  );
}

/* =============================================================================
 * Exports
 * ========================================================================== */

// Alias for naming consistency
const FloatingModalRoot = FloatingModalProvider;

export {
  // Provider
  FloatingModalProvider,
  FloatingModalRoot,
  // Modal components
  FloatingModal,
  FloatingModalTrigger,
  FloatingModalPortal,
  FloatingModalOverlay,
  FloatingModalClose,
  FloatingModalContent,
  FloatingModalHeader,
  FloatingModalBody,
  FloatingModalFooter,
  FloatingModalTitle,
  FloatingModalDescription,
  // Hooks
  useFloatingModal,
  useFloatingModalProvider,
  // Constants (for customization)
  WIDTH_PRESETS,
  EDGE_GAP,
  CARD_GAP,
  REPLACE_VISIBLE_WIDTH,
};

export type {
  ModalMode,
  ModalSide,
  ModalAlign,
  WidthPreset,
  FloatingModalProps,
  FloatingModalContentProps,
  FloatingModalProviderProps,
};
