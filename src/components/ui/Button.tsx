import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useDialog, DialogRounded } from "./Dialog";
import { useDrawer } from "./Drawer";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "subtle"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

export type ButtonRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm focus-visible:ring-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active shadow-sm focus-visible:ring-secondary",
  outline:
    "border border-border bg-card text-foreground hover:bg-muted hover:border-primary-300 active:bg-muted shadow-xs focus-visible:ring-primary",
  ghost:
    "text-foreground hover:bg-muted active:bg-muted focus-visible:ring-primary",
  subtle:
    "bg-primary-subtle text-primary hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active shadow-sm focus-visible:ring-destructive",
  link:
    "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal focus-visible:ring-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:shrink-0",
  md: "h-10 px-4 py-2 text-sm gap-2 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0",
  lg: "h-12 px-6 text-base gap-2.5 font-medium [&_svg]:w-5 [&_svg]:h-5 [&_svg]:shrink-0",
  icon: "h-10 w-10 p-0 justify-center [&_svg]:w-5 [&_svg]:h-5 [&_svg]:shrink-0",
  "icon-sm": "h-8 w-8 p-0 justify-center [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0",
};

const roundedStyles: Record<ButtonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const defaultRoundedBySize: Record<ButtonSize, ButtonRounded> = {
  sm: "md",
  md: "lg",
  lg: "xl",
  icon: "lg",
  "icon-sm": "md",
};

const dialogRoundedToButtonRounded: Record<DialogRounded, ButtonRounded> = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "lg",
  "3xl": "xl",
  full: "full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      rounded,
      isLoading = false,
      loadingText,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const dialog = useDialog();
    const drawer = useDrawer();
    const isIconOnly = size === "icon" || size === "icon-sm";
    const isDisabled = disabled || isLoading;

    // Automatically inherit rounded style from parent Dialog or Drawer
    const activeOverlayRounded = dialog?.rounded ?? drawer?.rounded;
    const inheritedRounded = activeOverlayRounded
      ? dialogRoundedToButtonRounded[activeOverlayRounded]
      : undefined;

    const resolvedRounded =
      roundedStyles[rounded ?? inheritedRounded ?? defaultRoundedBySize[size]];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          resolvedRounded,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className={cn(
                "animate-spin shrink-0 text-current",
                size === "sm" || size === "icon-sm" ? "h-3.5 w-3.5" : "h-4 w-4",
                loadingText || (!isIconOnly && children) ? "-ml-0.5" : ""
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText ? (
              <span>{loadingText}</span>
            ) : isIconOnly ? null : (
              <span>{children}</span>
            )}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

