import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { useDialog, DialogRounded } from "./Dialog";

export type InputVariant = "outline" | "filled" | "subtle";
export type InputSize = "sm" | "md" | "lg";
export type InputRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  success?: boolean;
  inputSize?: InputSize;
  variant?: InputVariant;
  rounded?: InputRounded;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const variantStyles: Record<InputVariant, string> = {
  outline:
    "border border-border bg-card hover:border-primary-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
  filled:
    "border border-transparent bg-muted/60 hover:border-border focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
  subtle:
    "border border-primary-100 bg-primary-subtle/30 hover:border-primary-200 focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20",
};

const sizeStyles: Record<InputSize, { input: string; leftPadding: string; rightPadding: string; iconSize: string }> = {
  sm: {
    input: "h-8 text-xs px-2.5",
    leftPadding: "pl-8",
    rightPadding: "pr-8",
    iconSize: "w-3.5 h-3.5 left-2.5",
  },
  md: {
    input: "h-10 text-sm px-3.5",
    leftPadding: "pl-10",
    rightPadding: "pr-10",
    iconSize: "w-4 h-4 left-3.5",
  },
  lg: {
    input: "h-12 text-base px-4",
    leftPadding: "pl-11",
    rightPadding: "pr-11",
    iconSize: "w-5 h-5 left-3.5",
  },
};

const roundedStyles: Record<InputRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const dialogRoundedToInputRounded: Record<DialogRounded, InputRounded> = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "lg",
  "3xl": "xl",
  full: "full",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      error,
      success,
      variant = "outline",
      inputSize = "md",
      rounded,
      leftIcon,
      rightIcon,
      disabled,
      required,
      className,
      containerClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const dialog = useDialog();
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);
    const sizeConfig = sizeStyles[inputSize];

    const inheritedRounded = dialog?.rounded
      ? dialogRoundedToInputRounded[dialog.rounded]
      : undefined;

    const resolvedRounded =
      roundedStyles[rounded ?? inheritedRounded ?? "lg"];

    return (
      <div className={cn("w-full space-y-1.5 text-left", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
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

        <div className="relative flex items-center">
          {leftIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none transition-colors [&>svg]:w-full [&>svg]:h-full [&>svg]:shrink-0",
                inputSize === "sm" ? "left-2.5 w-3.5 h-3.5" : inputSize === "lg" ? "left-3.5 w-5 h-5" : "left-3 w-4 h-4"
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? "true" : undefined}
            className={cn(
              "w-full text-foreground placeholder:text-muted-foreground",
              "transition-all duration-150 outline-none select-text",
              "disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed",
              variantStyles[variant],
              resolvedRounded,
              sizeConfig.input,
              Boolean(leftIcon) && sizeConfig.leftPadding,
              Boolean(rightIcon || hasError || success) && sizeConfig.rightPadding,
              hasError &&
                "border-destructive hover:border-destructive focus:border-destructive focus:ring-destructive/20",
              success && !hasError &&
                "border-success hover:border-success focus:border-success focus:ring-success/20",
              className
            )}
            {...props}
          />

          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
              inputSize === "sm" ? "right-2.5" : inputSize === "lg" ? "right-3.5" : "right-3"
            )}
          >
            {hasError ? (
              <svg
                className="w-4 h-4 text-destructive"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : success ? (
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : rightIcon ? (
              <div
                className={cn(
                  "text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:shrink-0",
                  inputSize === "sm" ? "w-3.5 h-3.5" : inputSize === "lg" ? "w-5 h-5" : "w-4 h-4"
                )}
              >
                {rightIcon}
              </div>
            ) : null}
          </div>
        </div>

        {/* Error or Helper Message */}
        {hasError && typeof error === "string" ? (
          <p className="text-xs text-destructive flex items-center gap-1 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
