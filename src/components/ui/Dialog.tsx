"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useId,
  forwardRef,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "@/lib/icons";

/* ==========================================================================
   Context & Types
   ========================================================================== */

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
export type DialogRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  size: DialogSize;
  rounded: DialogRounded;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  return useContext(DialogContext);
}

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within a Dialog");
  }
  return context;
}

const sizeStyles: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] sm:max-w-6xl",
};

const roundedStyles: Record<DialogRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-[32px]",
};

const closeButtonRoundedStyles: Record<DialogRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-sm",
  lg: "rounded-md",
  xl: "rounded-lg",
  "2xl": "rounded-lg",
  "3xl": "rounded-xl",
  full: "rounded-full",
};

/* ==========================================================================
   1. Dialog Root Component
   ========================================================================== */

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DialogSize;
  rounded?: DialogRounded;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  rounded = "2xl",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const titleId = useId();
  const descriptionId = useId();

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
        size,
        rounded,
        closeOnOverlayClick,
        closeOnEscape,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

/* ==========================================================================
   2. DialogTrigger
   ========================================================================== */

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="dialog"
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) {
            setOpen(true);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

/* ==========================================================================
   3. DialogPortal
   ========================================================================== */

export interface DialogPortalProps {
  children: React.ReactNode;
}

export function DialogPortal({ children }: DialogPortalProps) {
  const { open } = useDialogContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(children, document.body);
}

/* ==========================================================================
   4. DialogOverlay (Backdrop)
   ========================================================================== */

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen, closeOnOverlayClick } = useDialogContext();

    return (
      <div
        ref={ref}
        aria-hidden="true"
        onClick={(e) => {
          onClick?.(e);
          if (closeOnOverlayClick && !e.defaultPrevented) {
            setOpen(false);
          }
        }}
        className={cn(
          "fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] animate-dialog-fade transition-opacity duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

/* ==========================================================================
   5. DialogContent
   ========================================================================== */

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: DialogSize;
  rounded?: DialogRounded;
  showCloseButton?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      size: sizeProp,
      rounded: roundedProp,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const {
      open,
      setOpen,
      titleId,
      descriptionId,
      size: contextSize,
      rounded: contextRounded,
      closeOnOverlayClick,
      closeOnEscape,
    } = useDialogContext();
    const contentRef = useRef<HTMLDivElement>(null);

    const effectiveSize = sizeProp ?? contextSize;
    const effectiveRounded = roundedProp ?? contextRounded;

    // Combine refs
    const combinedRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    // Smooth body scroll lock without layout jitter
    useEffect(() => {
      if (!open) return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    // Handle Escape Key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          setOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, closeOnEscape, setOpen]);

    return (
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden pointer-events-none">
          <div
            ref={combinedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={cn(
              "relative w-full bg-card border border-border/80 text-card-foreground shadow-2xl pointer-events-auto",
              "animate-dialog-zoom",
              "focus:outline-none flex flex-col max-h-[90vh] overflow-hidden",
              sizeStyles[effectiveSize],
              roundedStyles[effectiveRounded],
              className
            )}
            tabIndex={-1}
            {...props}
          >
            <DialogContext.Provider
              value={{
                open,
                setOpen,
                titleId,
                descriptionId,
                size: effectiveSize,
                rounded: effectiveRounded,
                closeOnOverlayClick,
                closeOnEscape,
              }}
            >
              {/* Close 'X' Button with matching rounded corners */}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close dialog"
                  className={cn(
                    "absolute right-4 top-4 p-1.5 text-muted-foreground",
                    closeButtonRoundedStyles[effectiveRounded],
                    "hover:bg-muted hover:text-foreground active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    "transition-all duration-150 cursor-pointer select-none z-10"
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {children}
            </DialogContext.Provider>
          </div>
        </div>
      </DialogPortal>
    );
  }
);

DialogContent.displayName = "DialogContent";

/* ==========================================================================
   6. DialogHeader
   ========================================================================== */

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 px-6 pt-6 pb-2 text-left shrink-0",
        className
      )}
      {...props}
    />
  );
}

DialogHeader.displayName = "DialogHeader";

/* ==========================================================================
   7. DialogTitle
   ========================================================================== */

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialogContext();

    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn(
          "text-lg sm:text-xl font-bold tracking-tight text-foreground leading-snug",
          className
        )}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = "DialogTitle";

/* ==========================================================================
   8. DialogDescription
   ========================================================================== */

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialogContext();

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
        {...props}
      />
    );
  }
);

DialogDescription.displayName = "DialogDescription";

/* ==========================================================================
   9. DialogBody (Scrollable content area)
   ========================================================================== */

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn(
        "px-6 py-3 text-sm overflow-y-auto flex-1 min-h-0 text-foreground scrollbar-thin",
        className
      )}
      {...props}
    />
  );
}

DialogBody.displayName = "DialogBody";

/* ==========================================================================
   10. DialogFooter
   ========================================================================== */

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-2.5 px-6 pb-6 pt-3 shrink-0 bg-muted/20 border-t border-border/50",
        className
      )}
      {...props}
    />
  );
}

DialogFooter.displayName = "DialogFooter";

/* ==========================================================================
   11. DialogClose
   ========================================================================== */

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, children, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) {
            setOpen(false);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogClose.displayName = "DialogClose";

export default Dialog;

