import React, { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";

export type TextareaVariant = "outline" | "filled" | "subtle";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  rounded?: TextareaRounded;
  resize?: TextareaResize;
  showCount?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const variantStyles: Record<TextareaVariant, string> = {
  outline:
    "border border-border bg-card hover:border-primary-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
  filled:
    "border border-transparent bg-muted/60 hover:border-border focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
  subtle:
    "border border-primary-100 bg-primary-subtle/30 hover:border-primary-200 focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
};

const sizeStyles: Record<TextareaSize, string> = {
  sm: "text-xs px-2.5 py-2 min-h-[72px]",
  md: "text-sm px-3.5 py-2.5 min-h-[96px]",
  lg: "text-base px-4 py-3 min-h-[128px]",
};

const roundedStyles: Record<TextareaRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

const resizeStyles: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      error,
      variant = "outline",
      textareaSize = "md",
      rounded = "lg",
      resize = "vertical",
      showCount = false,
      maxLength,
      disabled = false,
      required = false,
      className,
      containerClassName,
      labelClassName,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = Boolean(error);

    // Track character count
    const [charCount, setCharCount] = useState<number>(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={cn("w-full space-y-1.5 text-left", containerClassName)}>
        {/* Label Header */}
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                "block text-xs font-semibold text-foreground tracking-wide select-none",
                disabled && "opacity-60 cursor-not-allowed",
                labelClassName
              )}
            >
              {label}
              {required && <span className="ml-1 text-primary">*</span>}
            </label>
          )}

          {/* Character counter (top-right if requested) */}
          {showCount && maxLength && (
            <span
              className={cn(
                "text-[11px] font-mono",
                charCount >= maxLength
                  ? "text-destructive font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        {/* Textarea Surface */}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError ? "true" : undefined}
          className={cn(
            "w-full text-foreground placeholder:text-muted-foreground",
            "transition-all duration-150 outline-none select-text scrollbar-thin",
            "disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed",
            variantStyles[variant],
            sizeStyles[textareaSize],
            roundedStyles[rounded],
            resizeStyles[resize],
            hasError &&
              "border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />

        {/* Footer: Error, Helper Text & Counter */}
        <div className="flex items-center justify-between gap-2">
          {hasError && typeof error === "string" ? (
            <p className="text-xs text-destructive flex items-center gap-1 font-medium">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          ) : (
            <span />
          )}

          {/* Character counter if no maxLength specified */}
          {showCount && !maxLength && (
            <span className="text-[11px] font-mono text-muted-foreground shrink-0 ml-auto">
              {charCount} characters
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

