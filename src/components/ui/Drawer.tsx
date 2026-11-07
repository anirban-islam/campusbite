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
   Types & Context
   ========================================================================== */

export type DrawerDirection = "right" | "left" | "bottom" | "top";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";
export type DrawerRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  direction: DrawerDirection;
  size: DrawerSize;
  rounded: DrawerRounded;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawer() {
  return useContext(DrawerContext);
}

function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer compound components must be used within a Drawer");
  }
  return context;
}

/* ==========================================================================
   Style Configurations
   ========================================================================== */

const sideSizeStyles: Record<"horizontal" | "vertical", Record<DrawerSize, string>> = {
  horizontal: {
    sm: "max-w-sm w-full",
    md: "max-w-md w-full",
    lg: "max-w-lg w-full",
    xl: "max-w-xl w-full",
    full: "max-w-full w-full",
  },
  vertical: {
    sm: "max-h-[40vh] h-auto",
    md: "max-h-[60vh] h-auto",
    lg: "max-h-[80vh] h-auto",
    xl: "max-h-[90vh] h-auto",
    full: "max-h-full h-full",
  },
};

const directionContainerStyles: Record<DrawerDirection, string> = {
  right: "fixed inset-y-0 right-0 z-50 flex flex-col animate-drawer-right",
  left: "fixed inset-y-0 left-0 z-50 flex flex-col animate-drawer-left",
  bottom: "fixed inset-x-0 bottom-0 z-50 flex flex-col animate-drawer-bottom",
  top: "fixed inset-x-0 top-0 z-50 flex flex-col animate-drawer-top",
};

const directionRoundedStyles: Record<
  DrawerDirection,
  Record<DrawerRounded, string>
> = {
  right: {
    none: "rounded-none",
    sm: "rounded-l-sm",
    md: "rounded-l-md",
    lg: "rounded-l-lg",
    xl: "rounded-l-xl",
    "2xl": "rounded-l-2xl",
    "3xl": "rounded-l-3xl",
    full: "rounded-l-[32px]",
  },
  left: {
    none: "rounded-none",
    sm: "rounded-r-sm",
    md: "rounded-r-md",
    lg: "rounded-r-lg",
    xl: "rounded-r-xl",
    "2xl": "rounded-r-2xl",
    "3xl": "rounded-r-3xl",
    full: "rounded-r-[32px]",
  },
  bottom: {
    none: "rounded-none",
    sm: "rounded-t-sm",
    md: "rounded-t-md",
    lg: "rounded-t-lg",
    xl: "rounded-t-xl",
    "2xl": "rounded-t-2xl",
    "3xl": "rounded-t-3xl",
    full: "rounded-t-[32px]",
  },
  top: {
    none: "rounded-none",
    sm: "rounded-b-sm",
    md: "rounded-b-md",
    lg: "rounded-b-lg",
    xl: "rounded-b-xl",
    "2xl": "rounded-b-2xl",
    "3xl": "rounded-b-3xl",
    full: "rounded-b-[32px]",
  },
};

const closeButtonRoundedStyles: Record<DrawerRounded, string> = {
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
   1. Drawer Root Component
   ========================================================================== */

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: DrawerDirection;
  size?: DrawerSize;
  rounded?: DrawerRounded;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

export function Drawer({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  direction = "right",
  size = "md",
  rounded = "2xl",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
}: DrawerProps) {
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
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
        direction,
        size,
        rounded,
        closeOnOverlayClick,
        closeOnEscape,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

/* ==========================================================================
   2. DrawerTrigger
   ========================================================================== */

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { setOpen } = useDrawerContext();

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

DrawerTrigger.displayName = "DrawerTrigger";

/* ==========================================================================
   3. DrawerPortal
   ========================================================================== */

export interface DrawerPortalProps {
  children: React.ReactNode;
}

export function DrawerPortal({ children }: DrawerPortalProps) {
  const { open } = useDrawerContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(children, document.body);
}

/* ==========================================================================
   4. DrawerOverlay (Backdrop)
   ========================================================================== */

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen, closeOnOverlayClick } = useDrawerContext();

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

DrawerOverlay.displayName = "DrawerOverlay";

/* ==========================================================================
   5. DrawerContent
   ========================================================================== */

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: DrawerDirection;
  size?: DrawerSize;
  rounded?: DrawerRounded;
  showCloseButton?: boolean;
  showHandle?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      className,
      children,
      direction: directionProp,
      size: sizeProp,
      rounded: roundedProp,
      showCloseButton = true,
      showHandle = true,
      ...props
    },
    ref
  ) => {
    const {
      open,
      setOpen,
      titleId,
      descriptionId,
      direction: contextDirection,
      size: contextSize,
      rounded: contextRounded,
      closeOnOverlayClick,
      closeOnEscape,
    } = useDrawerContext();

    const effectiveDirection = directionProp ?? contextDirection;
    const effectiveSize = sizeProp ?? contextSize;
    const effectiveRounded = roundedProp ?? contextRounded;

    const contentRef = useRef<HTMLDivElement>(null);
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

    const isVertical = effectiveDirection === "bottom" || effectiveDirection === "top";
    const sizeClass = isVertical
      ? sideSizeStyles.vertical[effectiveSize]
      : sideSizeStyles.horizontal[effectiveSize];

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <div
          ref={combinedRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            directionContainerStyles[effectiveDirection],
            sizeClass,
            directionRoundedStyles[effectiveDirection][effectiveRounded],
            "bg-card border-border/80 text-card-foreground shadow-2xl",
            "overflow-hidden focus:outline-none",
            effectiveDirection === "right" && "border-l",
            effectiveDirection === "left" && "border-r",
            effectiveDirection === "bottom" && "border-t",
            effectiveDirection === "top" && "border-b",
            className
          )}
          tabIndex={-1}
          {...props}
        >
          {/* Re-provide effective context values so nested buttons automatically inherit rounded */}
          <DrawerContext.Provider
            value={{
              open,
              setOpen,
              titleId,
              descriptionId,
              direction: effectiveDirection,
              size: effectiveSize,
              rounded: effectiveRounded,
              closeOnOverlayClick,
              closeOnEscape,
            }}
          >
            {/* Grab Handle Pill for bottom sheets */}
            {effectiveDirection === "bottom" && showHandle && (
              <div className="pt-3 pb-1 flex justify-center shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>
            )}

            {/* Close 'X' Button with matching rounded styling */}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close drawer"
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
          </DrawerContext.Provider>
        </div>
      </DrawerPortal>
    );
  }
);

DrawerContent.displayName = "DrawerContent";

/* ==========================================================================
   6. DrawerHeader
   ========================================================================== */

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 px-6 pt-5 pb-2 text-left shrink-0",
        className
      )}
      {...props}
    />
  );
}

DrawerHeader.displayName = "DrawerHeader";

/* ==========================================================================
   7. DrawerTitle
   ========================================================================== */

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDrawerContext();

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

DrawerTitle.displayName = "DrawerTitle";

/* ==========================================================================
   8. DrawerDescription
   ========================================================================== */

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDrawerContext();

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

DrawerDescription.displayName = "DrawerDescription";

/* ==========================================================================
   9. DrawerBody (Scrollable content area)
   ========================================================================== */

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerBody({ className, ...props }: DrawerBodyProps) {
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

DrawerBody.displayName = "DrawerBody";

/* ==========================================================================
   10. DrawerFooter
   ========================================================================== */

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
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

DrawerFooter.displayName = "DrawerFooter";

/* ==========================================================================
   11. DrawerClose
   ========================================================================== */

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ onClick, children, ...props }, ref) => {
    const { setOpen } = useDrawerContext();

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

DrawerClose.displayName = "DrawerClose";

export default Drawer;

