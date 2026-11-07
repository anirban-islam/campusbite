"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, ButtonVariant, ButtonRounded } from "./Button";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  CartIcon,
} from "@/lib/icons";

/* ==========================================================================
   Types & Options
   ========================================================================== */

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "brand";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface ToastAction {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
}

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  icon?: React.ReactNode;
  action?: ToastAction;
  duration?: number; // ms, 0 or Infinity for persistent
  closable?: boolean;
  rounded?: ToastRounded;
  showProgress?: boolean;
  onDismiss?: () => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  createdAt: number;
  exiting?: boolean;
}

/* ==========================================================================
   Style Configurations
   ========================================================================== */

const variantStyles: Record<
  ToastVariant,
  {
    container: string;
    iconWrapper: string;
    icon: string;
    progress: string;
    defaultIcon: React.ReactNode;
  }
> = {
  default: {
    container: "bg-card text-card-foreground border-border/80 shadow-lg",
    iconWrapper: "bg-muted text-foreground",
    icon: "text-muted-foreground",
    progress: "bg-muted-foreground/30",
    defaultIcon: <Info className="w-4 h-4" />,
  },
  success: {
    container: "bg-card text-card-foreground border-emerald-500/20 shadow-lg",
    iconWrapper: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
    icon: "text-emerald-600",
    progress: "bg-emerald-500",
    defaultIcon: <CheckCircle className="w-4 h-4" />,
  },
  error: {
    container: "bg-card text-card-foreground border-destructive/20 shadow-lg",
    iconWrapper: "bg-destructive-subtle text-destructive border border-destructive/20",
    icon: "text-destructive",
    progress: "bg-destructive",
    defaultIcon: <AlertCircle className="w-4 h-4" />,
  },
  warning: {
    container: "bg-card text-card-foreground border-amber-500/20 shadow-lg",
    iconWrapper: "bg-amber-50 text-amber-600 border border-amber-200/60",
    icon: "text-amber-600",
    progress: "bg-amber-500",
    defaultIcon: <AlertTriangle className="w-4 h-4" />,
  },
  info: {
    container: "bg-card text-card-foreground border-sky-500/20 shadow-lg",
    iconWrapper: "bg-sky-50 text-sky-600 border border-sky-200/60",
    icon: "text-sky-600",
    progress: "bg-sky-500",
    defaultIcon: <Info className="w-4 h-4" />,
  },
  brand: {
    container: "bg-card text-card-foreground border-primary/25 shadow-lg",
    iconWrapper: "bg-primary-subtle text-primary border border-primary-200/60",
    icon: "text-primary",
    progress: "bg-primary",
    defaultIcon: <CartIcon className="w-4 h-4" />,
  },
};

const roundedStyles: Record<ToastRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-[28px]",
};

const closeButtonRoundedStyles: Record<ToastRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-sm",
  lg: "rounded-md",
  xl: "rounded-lg",
  "2xl": "rounded-lg",
  "3xl": "rounded-xl",
  full: "rounded-full",
};

const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

/* ==========================================================================
   Store & Observer (Universal Imperative & Declarative Event Bus)
   ========================================================================== */

type ToastListener = (toasts: ToastData[]) => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners: Set<ToastListener> = new Set();
  private maxToasts: number = 5;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const copy = [...this.toasts];
    this.listeners.forEach((listener) => listener(copy));
  }

  add(toastData: Omit<ToastData, "id" | "createdAt"> & { id?: string }): string {
    const id = toastData.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newToast: ToastData = {
      ...toastData,
      id,
      createdAt: Date.now(),
      variant: toastData.variant || "default",
      duration: toastData.duration !== undefined ? toastData.duration : 4000,
      closable: toastData.closable !== undefined ? toastData.closable : true,
      showProgress: toastData.showProgress !== undefined ? toastData.showProgress : true,
    };

    // Remove existing with same id if any, or cap list
    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex > -1) {
      this.toasts[existingIndex] = newToast;
    } else {
      this.toasts = [newToast, ...this.toasts].slice(0, this.maxToasts);
    }

    this.notify();
    return id;
  }

  dismiss(id: string) {
    const target = this.toasts.find((t) => t.id === id);
    if (!target) return;

    // Trigger smooth exit animation
    this.toasts = this.toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t));
    this.notify();

    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
      target.onDismiss?.();
      this.notify();
    }, 180);
  }

  dismissAll() {
    this.toasts = this.toasts.map((t) => ({ ...t, exiting: true }));
    this.notify();

    setTimeout(() => {
      this.toasts = [];
      this.notify();
    }, 180);
  }
}

const toastStore = new ToastStore();

/* ==========================================================================
   Public `toast` Imperative API
   ========================================================================== */

export interface ToastFn {
  (title: React.ReactNode, options?: Omit<ToastOptions, "title">): string;
  default: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  success: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  error: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  warning: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  info: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  brand: (title: React.ReactNode, options?: Omit<ToastOptions, "title">) => string;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((err: unknown) => React.ReactNode);
    },
    options?: Omit<ToastOptions, "title" | "variant">
  ) => Promise<T>;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const toast: ToastFn = (title, options) => {
  return toastStore.add({ ...options, title });
};

toast.default = (title, options) => {
  return toastStore.add({ ...options, title, variant: "default" });
};

toast.success = (title, options) => {
  return toastStore.add({ ...options, title, variant: "success" });
};

toast.error = (title, options) => {
  return toastStore.add({ ...options, title, variant: "error" });
};

toast.warning = (title, options) => {
  return toastStore.add({ ...options, title, variant: "warning" });
};

toast.info = (title, options) => {
  return toastStore.add({ ...options, title, variant: "info" });
};

toast.brand = (title, options) => {
  return toastStore.add({ ...options, title, variant: "brand" });
};

toast.promise = async <T,>(
  promise: Promise<T>,
  msgs: {
    loading: React.ReactNode;
    success: React.ReactNode | ((data: T) => React.ReactNode);
    error: React.ReactNode | ((err: unknown) => React.ReactNode);
  },
  options?: Omit<ToastOptions, "title" | "variant">
): Promise<T> => {
  const id = toastStore.add({
    ...options,
    title: msgs.loading,
    variant: "default",
    duration: 0, // Keep open while pending
    closable: false,
    showProgress: false,
  });

  try {
    const data = await promise;
    const successTitle =
      typeof msgs.success === "function" ? msgs.success(data) : msgs.success;
    toastStore.add({
      ...options,
      id,
      title: successTitle,
      variant: "success",
      duration: options?.duration ?? 4000,
      closable: true,
      showProgress: true,
    });
    return data;
  } catch (err) {
    const errorTitle =
      typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
    toastStore.add({
      ...options,
      id,
      title: errorTitle,
      variant: "error",
      duration: options?.duration ?? 5000,
      closable: true,
      showProgress: true,
    });
    throw err;
  }
};

toast.dismiss = (id) => toastStore.dismiss(id);
toast.dismissAll = () => toastStore.dismissAll();

/* ==========================================================================
   Hook: `useToast`
   ========================================================================== */

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return {
    toasts,
    toast,
    dismiss: toast.dismiss,
    dismissAll: toast.dismissAll,
  };
}

/* ==========================================================================
   Individual Toast Item Component
   ========================================================================== */

interface ToastItemProps {
  toast: ToastData;
  position: ToastPosition;
  defaultRounded?: ToastRounded;
  onDismiss: (id: string) => void;
}

function ToastItem({
  toast: item,
  position,
  defaultRounded = "2xl",
  onDismiss,
}: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(item.duration || 4000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const variant = item.variant || "default";
  const styles = variantStyles[variant];
  const effectiveRounded = item.rounded || defaultRounded;
  const isTop = position.startsWith("top");

  // Timer logic with pause/resume support
  useEffect(() => {
    if (!item.duration || item.duration <= 0 || item.duration === Infinity) return;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss(item.id);
      }, remainingTime);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, remainingTime, item.duration, item.id, onDismiss]);

  const handleMouseEnter = () => {
    if (!item.duration || item.duration <= 0 || item.duration === Infinity) return;
    setIsPaused(true);
    const elapsed = Date.now() - startTimeRef.current;
    setRemainingTime((prev) => Math.max(0, prev - elapsed));
  };

  const handleMouseLeave = () => {
    if (!item.duration || item.duration <= 0 || item.duration === Infinity) return;
    setIsPaused(false);
  };

  const displayIcon = item.icon || styles.defaultIcon;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full sm:max-w-md border overflow-hidden transition-all duration-200 pointer-events-auto",
        styles.container,
        roundedStyles[effectiveRounded],
        item.exiting
          ? "animate-toast-exit"
          : isTop
          ? "animate-toast-top"
          : "animate-toast-bottom"
      )}
    >
      <div className="flex items-start gap-3 p-4 sm:p-4.5">
        {/* Leading Icon Badge */}
        {displayIcon && (
          <div
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-sm shrink-0 transition-colors shadow-2xs mt-0.5",
              styles.iconWrapper
            )}
          >
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0">
              {displayIcon}
            </span>
          </div>
        )}

        {/* Content Body: Title, Description, Action Button */}
        <div className="flex-1 min-w-0 pt-0.5">
          {item.title && (
            <h4 className="text-sm font-bold tracking-tight text-foreground leading-snug">
              {item.title}
            </h4>
          )}
          {item.description && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Action button if provided */}
          {item.action && (
            <div className="mt-2.5 pt-0.5">
              <Button
                size="sm"
                variant={item.action.variant || (variant === "brand" ? "primary" : "outline")}
                rounded={item.action.rounded || "sm"}
                onClick={(e) => {
                  item.action?.onClick(e);
                  onDismiss(item.id);
                }}
              >
                {item.action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Dismiss 'X' Button */}
        {item.closable && (
          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            aria-label="Dismiss notification"
            className={cn(
              "shrink-0 p-1 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all cursor-pointer",
              closeButtonRoundedStyles[effectiveRounded]
            )}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Progress Bar (Auto-dismiss timer indicator) */}
      {item.showProgress && item.duration && item.duration > 0 && item.duration !== Infinity && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/40 overflow-hidden">
          <div
            className={cn("h-full transition-all duration-100 ease-linear", styles.progress)}
            style={{
              width: "100%",
              animationName: "toastProgress",
              animationDuration: `${item.duration}ms`,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Toaster (Mounted Viewport Container)
   ========================================================================== */

export interface ToasterProps {
  position?: ToastPosition;
  rounded?: ToastRounded;
  maxToasts?: number;
}

export function Toaster({
  position = "bottom-right",
  rounded = "2xl",
  maxToasts = 5,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return toastStore.subscribe(setToasts);
  }, []);

  const handleDismiss = useCallback((id: string) => {
    toastStore.dismiss(id);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const visibleToasts = toasts.slice(0, maxToasts);
  if (visibleToasts.length === 0) return null;

  return createPortal(
    <div
      tabIndex={-1}
      aria-label="Notifications"
      className={cn(
        "fixed z-50 flex flex-col gap-2.5 max-w-[calc(100vw-2rem)] w-full sm:w-auto pointer-events-none",
        positionStyles[position]
      )}
    >
      {visibleToasts.map((item) => (
        <ToastItem
          key={item.id}
          toast={item}
          position={position}
          defaultRounded={rounded}
          onDismiss={handleDismiss}
        />
      ))}
    </div>,
    document.body
  );
}

/* ==========================================================================
   ToastProvider (Declarative Context Wrapper)
   ========================================================================== */

interface ToastContextValue {
  toast: ToastFn;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  rounded?: ToastRounded;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  rounded = "2xl",
  maxToasts = 5,
}: ToastProviderProps) {
  return (
    <ToastContext.Provider
      value={{
        toast,
        dismiss: toast.dismiss,
        dismissAll: toast.dismissAll,
      }}
    >
      {children}
      <Toaster position={position} rounded={rounded} maxToasts={maxToasts} />
    </ToastContext.Provider>
  );
}

/* ==========================================================================
   Declarative Standalone Components (Compound Style)
   ========================================================================== */

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  rounded?: ToastRounded;
  icon?: React.ReactNode;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", rounded = "2xl", icon, children, ...props }, ref) => {
    const styles = variantStyles[variant];
    const displayIcon = icon !== undefined ? icon : styles.defaultIcon;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full border overflow-hidden p-4 sm:p-4.5 flex items-start gap-3",
          styles.container,
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {displayIcon && (
          <div
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-sm shrink-0 transition-colors shadow-2xs mt-0.5",
              styles.iconWrapper
            )}
          >
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0">
              {displayIcon}
            </span>
          </div>
        )}
        {children}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export interface ToastIconProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ToastIcon({ className, children, ...props }: ToastIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-8 w-8 rounded-sm shrink-0 transition-colors shadow-2xs mt-0.5",
        className
      )}
      {...props}
    >
      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0">
        {children}
      </span>
    </div>
  );
}

ToastIcon.displayName = "ToastIcon";

export interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <h4
      className={cn("text-sm font-bold tracking-tight text-foreground leading-snug", className)}
      {...props}
    />
  );
}

ToastTitle.displayName = "ToastTitle";

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <p
      className={cn("mt-1 text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

ToastDescription.displayName = "ToastDescription";

export default Toast;
