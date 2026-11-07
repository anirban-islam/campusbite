"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo, Button, Badge, Input, toast } from "@/components/ui";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CreditCard,
  Utensils,
  Store,
  Bike,
  Check,
} from "@/lib/icons";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address", {
        rounded: "sm",
      });
      return;
    }
    setIsSubscribed(true);
    toast.success("Subscribed successfully", {
      description: "We'll send menu updates and discounts to your inbox.",
      rounded: "sm",
    });
    setEmail("");
  };

  return (
    <footer
      className={cn(
        "w-full bg-card border-t border-border/80 text-foreground transition-colors",
        className,
      )}
    >
      {/* Upper Information Bar */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border/70">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-sm bg-primary-subtle text-primary flex items-center justify-center shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-foreground">
                  Dorm Delivery
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Free delivery on orders over ৳150
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-sm bg-secondary-subtle text-secondary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-foreground">
                  Late Hours
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Open daily from 9 AM to 5 AM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-sm bg-primary-subtle text-primary flex items-center justify-center shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-foreground">
                  Counter Pickup
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Pick up your order from counter
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-sm bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-[15px] font-bold text-foreground">
                  Student ID Card
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Pay with your student ID card
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Column 1: Brand & Details */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo variant="icon" size="lg" asLink={true} />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground leading-none">
                  Campus<span className="text-primary">Bite</span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1">
                  Campus Food Delivery
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-md">
              Order food from campus dining halls and cafes, and get it
              delivered to your room or ready for pickup.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <Badge variant="available" size="md" rounded="full" dot pulse>
                Kitchens Open (9 AM – 5 AM)
              </Badge>
            </div>

            <div className="pt-1 text-xs sm:text-sm text-muted-foreground space-y-1.5 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Student Center • 105</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>Support: +8801729652101</span>
              </div>
            </div>
          </div>

          {/* Column 2: Campus Locations */}
          <div className="space-y-2 lg:col-span-2">
            <h4 className="text-sm sm:text-[15px] font-bold text-foreground uppercase tracking-wider">
              Locations
            </h4>
            <ul className="space-y-1.5 text-sm sm:text-[15px] font-medium text-muted-foreground">
              {[
                "Admin Building",
                "Campus Building",
                "Playground",
                "Library Building",
                "Canteen",
                "Common Room",
              ].map((item) => (
                <li key={item} className="hover:text-primary transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help & Information */}
          <div className="space-y-2 lg:col-span-2">
            <h4 className="text-sm sm:text-[15px] font-bold text-foreground uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-1.5 text-sm sm:text-[15px] font-medium text-muted-foreground">
              {[
                "Dorm Delivery Areas",
                "Meal Plan Balance",
                "Order Pickup Guide",
                "Food & Allergen Info",
                "Group Orders",
                "Help & FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Discounts */}
          <div className="space-y-2 sm:col-span-2 lg:col-span-4">
            <h4 className="text-sm sm:text-[15px] font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Offers & Updates
            </h4>
            <p className="text-xs sm:text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              Sign up with your student email to get discounts and weekly menu
              updates.
            </p>

            {isSubscribed ? (
              <div className="p-2.5 rounded-sm bg-primary-subtle text-primary border border-primary-200 text-sm flex items-center gap-2">
                <Check className="w-4.5 h-4.5 text-success shrink-0" />
                <span className="font-semibold">
                  Thank you! You are now subscribed.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-0.5">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  inputSize="md"
                  rounded="sm"
                  className="bg-card text-sm font-medium"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rounded="sm"
                  className="w-full justify-center text-sm font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer: Copyright & Legal */}
      <div className="w-full bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
          <p>© 2026 CampusBite. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium">
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
