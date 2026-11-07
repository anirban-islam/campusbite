"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoSize = "sm" | "md" | "lg" | "xl";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LogoSize;
  asLink?: boolean;
  href?: string;
  priority?: boolean;
  alt?: string;
}

const sizeStyles: Record<LogoSize, { container: string; height: number; width: number }> = {
  sm: {
    container: "h-9 sm:h-10",
    height: 40,
    width: 60,
  },
  md: {
    container: "h-11 sm:h-12",
    height: 48,
    width: 72,
  },
  lg: {
    container: "h-14 sm:h-16",
    height: 64,
    width: 96,
  },
  xl: {
    container: "h-20 sm:h-24",
    height: 96,
    width: 144,
  },
};

export function Logo({
  size = "md",
  asLink = true,
  href = "/",
  priority = true,
  alt = "CampusBite Logo",
  className,
  ...props
}: LogoProps) {
  const currentSize = sizeStyles[size];

  const content = (
    <div
      className={cn(
        "relative inline-flex items-center select-none shrink-0 transition-transform duration-150 active:scale-98",
        currentSize.container,
        className
      )}
      {...props}
    >
      <Image
        src="/Logo.png"
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className="h-full w-auto object-contain max-h-full"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-xl group"
        aria-label="CampusBite Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;

