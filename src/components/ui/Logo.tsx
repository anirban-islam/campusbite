"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoIcon from "../../../public/Logo-icon.png";
import logoFull from "../../../public/Logo.png";

export type LogoSize = "sm" | "md" | "lg" | "xl";
export type LogoVariant = "icon" | "full";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LogoVariant;
  size?: LogoSize;
  asLink?: boolean;
  href?: string;
  priority?: boolean;
  alt?: string;
}

const iconSizeStyles: Record<LogoSize, string> = {
  sm: "h-9 w-auto",
  md: "h-11 w-auto",
  lg: "h-12 sm:h-13 md:h-14 w-auto",
  xl: "h-16 sm:h-18 w-auto",
};

const fullSizeStyles: Record<LogoSize, string> = {
  sm: "h-8 sm:h-9 w-auto",
  md: "h-11 sm:h-12 w-auto",
  lg: "h-14 sm:h-16 w-auto",
  xl: "h-18 sm:h-20 w-auto",
};

export function Logo({
  variant = "icon",
  size = "lg",
  asLink = true,
  href = "/",
  priority = true,
  alt = "CampusBite Logo",
  className,
  ...props
}: LogoProps) {
  const containerClass = variant === "icon" ? iconSizeStyles[size] : fullSizeStyles[size];
  const imageSrc = variant === "icon" ? logoIcon : logoFull;

  const content = (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none shrink-0 transition-transform duration-150 active:scale-95",
        containerClass,
        className
      )}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={alt}
        priority={priority}
        unoptimized
        className="h-full w-auto object-contain max-h-full"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm group"
        aria-label="CampusBite Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
