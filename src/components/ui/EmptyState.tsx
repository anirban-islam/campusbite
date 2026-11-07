"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Types & Styling Maps
   ========================================================================== */

export type EmptyStateVariant = "default" | "subtle" | "card" | "dashed";
export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  rounded?: EmptyStateRounded;
}

const variantStyles: Record<EmptyStateVariant, string> = {
  default: "bg-transparent text-foreground",
  subtle: "bg-primary-subtle/25 text-foreground border border-primary-200/40",
  card: "bg-card text-card-foreground border border-border shadow-xs",
  dashed: "bg-card/50 text-card-foreground border-2 border-dashed border-border/80 hover:border-primary-300 transition-colors",
};

const roundedStyles: Record<EmptyStateRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-[32px]",
};

const sizeStyles: Record<
  EmptyStateSize,
  {
    container: string;
    iconWrapper: string;
    icon: string;
    title: string;
    desc: string;
    spacing: string;
  }
> = {
  sm: {
    container: "p-6",
    iconWrapper: "h-11 w-11",
    icon: "w-5 h-5",
    title: "text-sm font-bold",
    desc: "text-xs max-w-xs",
    spacing: "space-y-3",
  },
  md: {
    container: "p-8 sm:p-10",
    iconWrapper: "h-14 w-14",
    icon: "w-7 h-7",
    title: "text-base sm:text-lg font-bold",
    desc: "text-xs sm:text-sm max-w-sm",
    spacing: "space-y-4",
  },
  lg: {
    container: "p-12 sm:p-16",
    iconWrapper: "h-20 w-20",
    icon: "w-10 h-10",
    title: "text-xl sm:text-2xl font-bold",
    desc: "text-sm sm:text-base max-w-md",
    spacing: "space-y-5",
  },
};

/* ==========================================================================
   1. EmptyState Main Component
   ========================================================================== */

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      badge,
      title,
      description,
      action,
      secondaryAction,
      variant = "default",
      size = "md",
      rounded = "2xl",
      children,
      ...props
    },
    ref
  ) => {
    const currentSize = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col items-center justify-center text-center",
          variantStyles[variant],
          roundedStyles[rounded],
          currentSize.container,
          currentSize.spacing,
          className
        )}
        {...props}
      >
        {/* Top Badge (Optional) */}
        {badge && <div className="mb-1">{badge}</div>}

        {/* Icon Circle */}
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground",
              "group-hover:bg-primary-subtle group-hover:text-primary transition-colors",
              "shadow-2xs",
              currentSize.iconWrapper
            )}
          >
            <span
              className={cn(
                "inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full",
                currentSize.icon
              )}
            >
              {icon}
            </span>
          </div>
        )}

        {/* Text Container: Title & Description */}
        {(title || description) && (
          <div className="space-y-1.5 flex flex-col items-center">
            {title && (
              <h3 className={cn("tracking-tight text-foreground leading-snug", currentSize.title)}>
                {title}
              </h3>
            )}
            {description && (
              <p className={cn("text-muted-foreground leading-relaxed", currentSize.desc)}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Child slot if using compound style */}
        {children}

        {/* Action Buttons */}
        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

/* ==========================================================================
   2. Compound Sub-components
   ========================================================================== */

export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function EmptyStateIcon({
  className,
  size = "md",
  children,
  ...props
}: EmptyStateIconProps) {
  const currentSize = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground shadow-2xs",
        currentSize.iconWrapper,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full",
          currentSize.icon
        )}
      >
        {children}
      </span>
    </div>
  );
}

EmptyStateIcon.displayName = "EmptyStateIcon";

export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
}

export function EmptyStateTitle({
  className,
  size = "md",
  ...props
}: EmptyStateTitleProps) {
  const currentSize = sizeStyles[size];

  return (
    <h3
      className={cn(
        "tracking-tight text-foreground leading-snug",
        currentSize.title,
        className
      )}
      {...props}
    />
  );
}

EmptyStateTitle.displayName = "EmptyStateTitle";

export interface EmptyStateDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

export function EmptyStateDescription({
  className,
  size = "md",
  ...props
}: EmptyStateDescriptionProps) {
  const currentSize = sizeStyles[size];

  return (
    <p
      className={cn(
        "text-muted-foreground leading-relaxed",
        currentSize.desc,
        className
      )}
      {...props}
    />
  );
}

EmptyStateDescription.displayName = "EmptyStateDescription";

export interface EmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyStateActions({ className, ...props }: EmptyStateActionsProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-2.5 pt-2", className)}
      {...props}
    />
  );
}

EmptyStateActions.displayName = "EmptyStateActions";

export default EmptyState;
