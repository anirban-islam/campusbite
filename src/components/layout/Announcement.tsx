"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge, Button, toast } from "@/components/ui";
import { Flame, Clock, X, Sparkles, Check, Copy } from "@/lib/icons";

export interface AnnouncementProps {
  variant?: "brand" | "subtle" | "minimal";
  dismissible?: boolean;
  className?: string;
}

export function Announcement({
  variant = "subtle",
  dismissible = true,
  className,
}: AnnouncementProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  if (!isVisible) return null;

  const promoCode = "CAMPUS150";

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(promoCode).catch(() => {});
    }
    setIsCopied(true);
    toast.success(`Promo code ${promoCode} copied!`, {
      description: "Enjoy Free Dorm Delivery on all cafeteria orders over ৳15.",
      rounded: "sm",
    });

    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <aside
      aria-label="Campus Dining Announcement"
      className={cn(
        "relative w-full text-sm sm:text-[15px] transition-all duration-200 z-50 select-none",
        variant === "brand"
          ? "bg-primary text-primary-foreground shadow-2xs"
          : variant === "subtle"
            ? "bg-primary-50 text-foreground"
            : "bg-muted/40 text-muted-foreground",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Left: Live Kitchen Status Badge (lg variant, no extra text) */}
        <div className="hidden md:flex items-center shrink-0">
          <Badge
            variant={variant === "brand" ? "primary" : "popular"}
            size="lg"
            dot
            pulse
            className={cn(
              variant === "brand" && "bg-white/15 text-white border-white/20",
            )}
          >
            Live Kitchen
          </Badge>
        </div>

        {/* Center: Main Announcement with BDT Taka Symbol (৳) & Copyable Promo Code */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-2.5 text-center min-w-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span
              className="shrink-0 inline-flex items-center justify-center text-primary"
              aria-hidden="true"
            >
              {variant === "brand" ? (
                <Sparkles className="w-4 h-4 text-secondary" />
              ) : (
                <Flame className="w-4.5 h-4.5 text-primary" />
              )}
            </span>

            <p className="font-semibold text-xs sm:text-sm md:text-[15px] leading-tight">
              <span className="hidden sm:inline font-bold">
                Late Night Study Fuel:{" "}
              </span>
              <span>Free Delivery on orders over ৳150 with code</span>
            </p>
          </div>

          {/* Interactive Click-to-Copy Coupon Badge (rounded-sm) */}
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label={`Copy coupon code ${promoCode}`}
            title="Click to copy promo code"
            className={cn(
              "inline-flex items-center gap-1.5 font-mono font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm text-xs sm:text-sm cursor-pointer transition-all active:scale-95 shadow-2xs shrink-0 select-none",
              variant === "brand"
                ? "bg-white/20 hover:bg-white/30 text-white border border-white/35"
                : "bg-primary-subtle text-primary border border-dashed border-primary-400 hover:bg-primary-100/90",
            )}
          >
            <span className="tracking-wide">{promoCode}</span>
            {isCopied ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-success">
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold opacity-85">
                <Copy className="w-3 h-3 opacity-70" />
                <span className="hidden xs:inline">Copy</span>
              </span>
            )}
          </button>
        </div>

        {/* Right: Serving Hours (Serving: 9 AM - 5 AM) & Dismiss Button */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div
            className={cn(
              "hidden lg:flex items-center gap-1.5 text-sm font-semibold",
              variant === "brand"
                ? "text-primary-foreground/95"
                : "text-muted-foreground",
            )}
          >
            <Clock className="w-4 h-4" />
            <span>Serving: 9 AM - 5 AM</span>
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss announcement banner"
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                variant === "brand"
                  ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Announcement;
