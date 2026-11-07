"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Types & Styling Maps
   ========================================================================== */

export type SkeletonRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: SkeletonRounded;
  animation?: SkeletonAnimation;
}

const roundedStyles: Record<SkeletonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const animationStyles: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  shimmer: "animate-shimmer",
  none: "",
};

/* ==========================================================================
   1. Core Primitive Skeleton Component
   ========================================================================== */

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      rounded = "md",
      animation = "pulse",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "bg-muted/70 shrink-0",
          roundedStyles[rounded],
          animationStyles[animation],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/* ==========================================================================
   2. SkeletonText (Multi-line paragraph preset)
   ========================================================================== */

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  gap?: string;
  rounded?: SkeletonRounded;
  animation?: SkeletonAnimation;
  lastLineWidth?: string;
}

export function SkeletonText({
  lines = 3,
  gap = "gap-2",
  rounded = "md",
  animation = "pulse",
  lastLineWidth = "w-3/5",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col w-full", gap, className)} aria-hidden="true" {...props}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        return (
          <Skeleton
            key={index}
            rounded={rounded}
            animation={animation}
            className={cn("h-3.5 w-full", isLast && lines > 1 && lastLineWidth)}
          />
        );
      })}
    </div>
  );
}

SkeletonText.displayName = "SkeletonText";

/* ==========================================================================
   3. SkeletonAvatar (Circle or rounded image placeholder)
   ========================================================================== */

export type SkeletonAvatarSize = "sm" | "md" | "lg" | "xl";

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonAvatarSize;
  rounded?: SkeletonRounded;
  animation?: SkeletonAnimation;
}

const avatarSizes: Record<SkeletonAvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function SkeletonAvatar({
  size = "md",
  rounded = "full",
  animation = "pulse",
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      rounded={rounded}
      animation={animation}
      className={cn(avatarSizes[size], className)}
      {...props}
    />
  );
}

SkeletonAvatar.displayName = "SkeletonAvatar";

/* ==========================================================================
   4. SkeletonButton (Button size placeholder)
   ========================================================================== */

export interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  rounded?: SkeletonRounded;
  animation?: SkeletonAnimation;
}

const buttonSizes: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 w-24",
  md: "h-10 w-32",
  lg: "h-12 w-40",
};

export function SkeletonButton({
  size = "md",
  rounded = "lg",
  animation = "pulse",
  className,
  ...props
}: SkeletonButtonProps) {
  return (
    <Skeleton
      rounded={rounded}
      animation={animation}
      className={cn(buttonSizes[size], className)}
      {...props}
    />
  );
}

SkeletonButton.displayName = "SkeletonButton";

/* ==========================================================================
   5. SkeletonFoodCard (Full food & dish ordering card skeleton)
   ========================================================================== */

export interface SkeletonFoodCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: SkeletonAnimation;
  rounded?: SkeletonRounded;
}

export function SkeletonFoodCard({
  animation = "shimmer",
  rounded = "2xl",
  className,
  ...props
}: SkeletonFoodCardProps) {
  // Gracefully adapt all inner placeholders to the selected rounded style
  const innerRounded: SkeletonRounded =
    rounded === "none"
      ? "none"
      : rounded === "sm"
      ? "sm"
      : rounded === "md"
      ? "md"
      : rounded === "lg"
      ? "lg"
      : rounded === "full"
      ? "full"
      : "xl";

  const buttonRounded: SkeletonRounded =
    rounded === "full" ? "full" : innerRounded;

  return (
    <div
      className={cn(
        "p-5 border border-border/80 bg-card shadow-xs flex flex-col justify-between space-y-4",
        roundedStyles[rounded],
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {/* Top Image or Hero Thumbnail placeholder */}
      <Skeleton
        rounded={innerRounded}
        animation={animation}
        className="w-full h-36 bg-muted/80"
      />

      {/* Dish Name & Category */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton rounded={innerRounded} animation={animation} className="h-4 w-28" />
          <Skeleton rounded={innerRounded} animation={animation} className="h-5 w-16" />
        </div>
        <Skeleton rounded={innerRounded} animation={animation} className="h-3 w-4/5" />
      </div>

      {/* Price & Add to Cart button */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <Skeleton rounded={innerRounded} animation={animation} className="h-5 w-14" />
        <Skeleton rounded={buttonRounded} animation={animation} className="h-9 w-24" />
      </div>
    </div>
  );
}

SkeletonFoodCard.displayName = "SkeletonFoodCard";

export default Skeleton;

