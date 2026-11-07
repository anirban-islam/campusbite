"use client";

import React, { forwardRef, useId, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "@/lib/icons";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxRounded = "none" | "sm" | "md" | "lg" | "full";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string | boolean;
  size?: CheckboxSize;
  rounded?: CheckboxRounded;
  indeterminate?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const sizeStyles: Record<
  CheckboxSize,
  { box: string; icon: string; label: string; desc: string; gap: string }
> = {
  sm: {
    box: "h-4 w-4",
    icon: "w-3 h-3 stroke-[2.5]",
    label: "text-xs",
    desc: "text-[11px]",
    gap: "gap-2",
  },
  md: {
    box: "h-5 w-5",
    icon: "w-3.5 h-3.5 stroke-[2.5]",
    label: "text-sm",
    desc: "text-xs",
    gap: "gap-2.5",
  },
  lg: {
    box: "h-6 w-6",
    icon: "w-4 h-4 stroke-[2.5]",
    label: "text-base",
    desc: "text-sm",
    gap: "gap-3",
  },
};

const roundedStyles: Record<CheckboxRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-sm",
  lg: "rounded-md",
  full: "rounded-full",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      description,
      error,
      size = "md",
      rounded = "md",
      indeterminate = false,
      checked,
      defaultChecked,
      disabled = false,
      className,
      containerClassName,
      labelClassName,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const internalInputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (node: HTMLInputElement | null) => {
      internalInputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    // Track checked state for uncontrolled vs controlled
    const [isChecked, setIsChecked] = React.useState<boolean>(
      checked !== undefined ? checked : Boolean(defaultChecked)
    );

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    useEffect(() => {
      if (internalInputRef.current) {
        internalInputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const hasError = Boolean(error);
    const currentSize = sizeStyles[size];
    const isCheckedOrIndeterminate = isChecked || indeterminate;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className={cn("inline-flex flex-col text-left", containerClassName)}>
        <label
          htmlFor={inputId}
          className={cn(
            "group inline-flex select-none cursor-pointer",
            description ? "items-start" : "items-center",
            currentSize.gap,
            disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
        >
          {/* Custom Styled Box Container */}
          <div className={cn("relative flex items-center justify-center shrink-0", description && "mt-0.5")}>
            {/* Native Screen-Reader Accessible Input */}
            <input
              ref={combinedRef}
              type="checkbox"
              id={inputId}
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              aria-invalid={hasError ? "true" : undefined}
              className="peer sr-only"
              {...props}
            />

            {/* Custom Checkbox Surface */}
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-150 border-2",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2",
                currentSize.box,
                roundedStyles[rounded],
                isCheckedOrIndeterminate
                  ? "bg-primary border-primary text-primary-foreground shadow-xs"
                  : "bg-card border-border hover:border-primary-300",
                hasError &&
                  (isCheckedOrIndeterminate
                    ? "bg-destructive border-destructive text-destructive-foreground"
                    : "border-destructive hover:border-destructive"),
                className
              )}
            >
              {indeterminate ? (
                <Minus className={cn("text-current animate-in zoom-in-50 duration-100", currentSize.icon)} />
              ) : isChecked ? (
                <Check className={cn("text-current animate-in zoom-in-50 duration-100", currentSize.icon)} />
              ) : null}
            </div>
          </div>

          {/* Label & Description Text */}
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span
                  className={cn(
                    "font-medium text-foreground transition-colors group-hover:text-foreground/90",
                    currentSize.label,
                    hasError && "text-destructive",
                    labelClassName
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span className={cn("text-muted-foreground mt-0.5", currentSize.desc)}>
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {/* Error message */}
        {hasError && typeof error === "string" && (
          <p className="text-xs text-destructive mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

