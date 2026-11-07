import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, Tag, Check } from "@/lib/icons";

export type BadgeVariant =
  | "popular"
  | "new"
  | "discount"
  | "available"
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "destructive";

export type BadgeSize = "sm" | "md" | "lg";
export type BadgeRounded = "none" | "sm" | "md" | "lg" | "full";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: BadgeRounded;
  dot?: boolean;
  pulse?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  // Food & Campus Specialized Variants
  popular:
    "bg-primary-subtle text-primary border border-primary-200/80 font-semibold shadow-xs",
  new:
    "bg-info-subtle text-info border border-info/30 font-semibold shadow-xs",
  discount:
    "bg-secondary-subtle text-secondary border border-secondary/30 font-semibold shadow-xs",
  available:
    "bg-success-subtle text-success border border-success/30 font-semibold shadow-xs",

  // Core System Variants
  primary:
    "bg-primary text-primary-foreground border border-transparent font-semibold shadow-xs",
  secondary:
    "bg-secondary text-secondary-foreground border border-transparent font-semibold shadow-xs",
  outline:
    "bg-card text-foreground border border-border font-medium shadow-2xs",
  subtle:
    "bg-muted text-muted-foreground border border-transparent font-medium",
  destructive:
    "bg-destructive-subtle text-destructive border border-destructive/20 font-semibold shadow-xs",
};

const defaultVariantIcons: Partial<Record<BadgeVariant, React.ReactNode>> = {
  popular: <Flame />,
  new: <Sparkles />,
  discount: <Tag />,
};

const sizeStyles: Record<
  BadgeSize,
  { badge: string; icon: string; dot: string }
> = {
  sm: {
    badge: "h-5 px-2 text-[10px] gap-1 leading-none",
    icon: "w-3 h-3 [&>svg]:w-3 [&>svg]:h-3 [&>svg]:shrink-0",
    dot: "w-1.5 h-1.5",
  },
  md: {
    badge: "h-6 px-2.5 text-xs gap-1.5 leading-none",
    icon: "w-3.5 h-3.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:shrink-0",
    dot: "w-2 h-2",
  },
  lg: {
    badge: "h-7 px-3 text-sm gap-2 leading-none",
    icon: "w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0",
    dot: "w-2.5 h-2.5",
  },
};

const roundedStyles: Record<BadgeRounded, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      dot,
      pulse,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const currentSize = sizeStyles[size];

    // Auto-configure dot and pulse for "available" status if not specified
    const showDot = dot !== undefined ? dot : variant === "available";
    const showPulse = pulse !== undefined ? pulse : variant === "available";

    // Auto-resolve left icon from variant if not explicitly provided or disabled
    const resolvedLeftIcon =
      leftIcon !== undefined
        ? leftIcon
        : defaultVariantIcons[variant];

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none tracking-normal leading-none transition-colors shrink-0",
          variantStyles[variant],
          currentSize.badge,
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {/* Optional Live Indicator Dot */}
        {showDot && (
          <span className="relative flex items-center justify-center shrink-0">
            {showPulse && (
              <span className={cn("absolute animate-ping rounded-full bg-current opacity-75", currentSize.dot)} />
            )}
            <span className={cn("relative rounded-full bg-current", currentSize.dot)} />
          </span>
        )}

        {/* Left Icon with guaranteed optical balance & proportion */}
        {resolvedLeftIcon && (
          <span className={cn("inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full", currentSize.icon)}>
            {resolvedLeftIcon}
          </span>
        )}

        {/* Badge Label with balanced vertical alignment */}
        {children && (
          <span className="leading-none flex items-center">{children}</span>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <span className={cn("inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full", currentSize.icon)}>
            {rightIcon}
          </span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

