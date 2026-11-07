"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, Badge, type BadgeVariant, toast } from "@/components/ui";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  Bike,
  Sparkles,
  Store,
  CreditCard,
  Flame,
  Utensils,
  Pizza,
  Coffee,
  Check,
} from "@/lib/icons";

export interface HeroSlide {
  id: string;
  image: string;
  badge: {
    text: string;
    variant: BadgeVariant;
    icon?: React.ReactNode;
  };
  title: string;
  highlightText?: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  stats: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

const defaultSlides: HeroSlide[] = [
  {
    id: "dorm-delivery",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop",
    badge: {
      text: "Dorm Delivery Available",
      variant: "available",
      icon: <Bike className="w-3.5 h-3.5 text-emerald-400" />,
    },
    title: "Fresh Campus Meals Delivered",
    highlightText: "Right to Your Room",
    description:
      "Order hot meals from the Central Dining Hall and campus cafes. Free delivery on all orders over ৳150.",
    primaryCta: {
      text: "Order Food",
      href: "#menu",
    },
    secondaryCta: {
      text: "View Dining Halls",
      href: "#locations",
    },
    stats: [
      {
        label: "Avg. Delivery",
        value: "15-20 min",
        icon: <Clock className="w-4 h-4 text-primary" />,
      },
      {
        label: "Late Kitchens",
        value: "9 AM - 5 AM",
        icon: <Flame className="w-4 h-4 text-orange-400" />,
      },
    ],
  },
  {
    id: "student-card",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop",
    badge: {
      text: "Student ID Smart Pay",
      variant: "primary",
      icon: <CreditCard className="w-3.5 h-3.5" />,
    },
    title: "Pay Fast with Your",
    highlightText: "Campus Student Card",
    description:
      "Link your student ID for instant checkout. Deduct directly from your meal plan balance with zero extra charges.",
    primaryCta: {
      text: "Check Balance",
      href: "#balance",
    },
    secondaryCta: {
      text: "How It Works",
      href: "/desigin-architure",
    },
    stats: [
      {
        label: "Meal Plan Card",
        value: "Zero Extra Fees",
        icon: <CreditCard className="w-4 h-4 text-amber-400" />,
      },
      {
        label: "Locations",
        value: "5 Dining Stations",
        icon: <Store className="w-4 h-4 text-primary" />,
      },
    ],
  },
  {
    id: "daily-combos",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1920&auto=format&fit=crop",
    badge: {
      text: "Daily Lunch & Dinner Combos",
      variant: "popular",
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
    },
    title: "Delicious Student Combos",
    highlightText: "Starting from ৳80",
    description:
      "Fresh flatbreads, warm rice bowls, iced drinks, and sandwiches cooked daily at campus dining halls.",
    primaryCta: {
      text: "Browse Combos",
      href: "#specials",
    },
    secondaryCta: {
      text: "Pickup Counter",
      href: "#pickup",
    },
    stats: [
      {
        label: "Meal Combos",
        value: "From ৳80",
        icon: <Utensils className="w-4 h-4 text-primary" />,
      },
      {
        label: "Express Pickup",
        value: "Skip The Queue",
        icon: <Store className="w-4 h-4 text-emerald-400" />,
      },
    ],
  },
];

export interface HerosliderProps {
  className?: string;
  slides?: HeroSlide[];
  autoPlayInterval?: number;
}

export function Heroslider({
  className,
  slides = defaultSlides,
  autoPlayInterval = 5000,
}: HerosliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer with pause on hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval, totalSlides]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[currentIndex];

  return (
    <section
      aria-label="Campus Food Promotions and Highlights"
      className={cn("w-full py-4 sm:py-6", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slider Card Container: FIXED HEIGHT & NO BORDER */}
        <div className="group relative overflow-hidden rounded-sm bg-neutral-950 shadow-md h-[440px] sm:h-[480px] lg:h-[500px] flex items-center justify-center">
          {/* Background Images Layer with smooth cross-fade */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none",
                index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0",
              )}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className={cn(
                  "w-full h-full object-cover object-center transition-transform duration-7000 ease-out",
                  index === currentIndex ? "scale-105" : "scale-100",
                )}
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Balanced Center Dark Gradient Overlay for Maximum Legibility */}
              <div className="absolute inset-0 bg-neutral-950/75 sm:bg-neutral-950/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
            </div>
          ))}

          {/* Centered Content: Badge, Title, Description, CTA Button, Bottom Icon+Text */}
          <div className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5">
            {/* 1. Badge Text */}
            <div>
              <Badge
                variant={activeSlide.badge.variant}
                size="md"
                rounded="sm"
                className="inline-flex items-center gap-1.5 font-bold shadow-xs"
              >
                {activeSlide.badge.icon}
                <span>{activeSlide.badge.text}</span>
              </Badge>
            </div>

            {/* 2. Title */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-sm">
                {activeSlide.title}{" "}
                {activeSlide.highlightText && (
                  <span className="text-primary block sm:inline">
                    {activeSlide.highlightText}
                  </span>
                )}
              </h2>
            </div>

            {/* 3. Description */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed max-w-2xl drop-shadow-xs">
              {activeSlide.description}
            </p>

            {/* 4. CTA Button(s) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 sm:pt-2">
              <Button
                variant="primary"
                size="md"
                rounded="sm"
                onClick={() =>
                  toast.info(`Opened ${activeSlide.primaryCta.text}`, {
                    description: "Browsing live campus food stations.",
                    rounded: "sm",
                  })
                }
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold cursor-pointer shadow-md"
              >
                {activeSlide.primaryCta.text}
              </Button>

              {activeSlide.secondaryCta && (
                <button
                  type="button"
                  onClick={() =>
                    toast.info(`Opened ${activeSlide.secondaryCta?.text}`, {
                      rounded: "sm",
                    })
                  }
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/25 rounded-sm transition-all cursor-pointer backdrop-blur-xs"
                >
                  {activeSlide.secondaryCta.text}
                </button>
              )}
            </div>

            {/* 5. Bottom Icon + Text (Two Only) */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 sm:pt-4 border-t border-white/15 w-full">
              {activeSlide.stats.slice(0, 2).map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white">
                  <div className="h-7 w-7 rounded-sm bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white backdrop-blur-xs">
                    {stat.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    <span className="text-neutral-300 font-medium mr-1.5">
                      {stat.label}:
                    </span>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button (Visible Only On Hover) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-sm border border-white/20 bg-neutral-900/70 hover:bg-neutral-800/90 active:scale-95 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (Visible Only On Hover) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-sm border border-white/20 bg-neutral-900/70 hover:bg-neutral-800/90 active:scale-95 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Centered Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                className={cn(
                  "h-2 rounded-sm transition-all duration-300 cursor-pointer",
                  currentIndex === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Heroslider;
