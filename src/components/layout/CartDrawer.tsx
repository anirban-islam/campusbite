"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  Button,
  Badge,
  Input,
  Checkbox,
  EmptyState,
  toast,
} from "@/components/ui";
import {
  ShoppingCart,
  Trash,
  Plus,
  Minus,
  Sparkles,
  Tag,
  Check,
  ArrowRight,
  Bike,
  Store,
} from "@/lib/icons";

export interface CartItem {
  id: string;
  name: string;
  station: string;
  price: number;
  quantity: number;
  icon?: React.ReactNode;
  notes?: string;
}

export interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  onCheckout: () => void;
  dormLocation?: string;
  roomNumber?: string;
  fulfillmentType?: string;
}

export function CartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  dormLocation = "West Residence Hall",
  roomNumber = "Room 304",
  fulfillmentType = "delivery",
}: CartDrawerProps) {
  // Coupon State
  const [couponCode, setCouponCode] = useState<string>("CAMPUS15");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("CAMPUS15");
  const [includeCutlery, setIncludeCutlery] = useState<boolean>(true);

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const freeDeliveryThreshold = 15.0;
  const deliveryFee = 0.0;
  const discountAmount = appliedCoupon ? (subtotal > 15 ? 2.5 : 1.0) : 0.0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100),
  );

  const handleApplyCoupon = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "CAMPUS15") {
      setAppliedCoupon("CAMPUS15");
      toast.success("Promo code CAMPUS15 applied!", {
        description: "Enjoyed ৳2.50 student discount + Free Dorm Delivery.",
        rounded: "sm",
      });
    } else {
      toast.error("Invalid Promo Code", {
        description: "Try code CAMPUS15 for exclusive dorm delivery rebate.",
        rounded: "sm",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setCouponCode("");
    toast.info("Promo code removed", { rounded: "sm" });
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      size="md"
      rounded="sm"
    >
      <DrawerContent className="flex flex-col h-full max-h-screen bg-card overflow-hidden">
        {/* =================================================================
           1. Drawer Header: Title, Item Count & Fulfillment Info (pr-12 avoids Close X)
           ================================================================= */}
        <DrawerHeader className="border-b border-border/70 pb-3.5 pr-12 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <DrawerTitle className="flex items-center gap-2 text-base sm:text-lg font-bold text-foreground">
              <span className="p-1.5 rounded-sm bg-primary-subtle text-primary inline-flex items-center justify-center shrink-0">
                <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </span>
              <span>Your Food Tray</span>
            </DrawerTitle>

            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="popular" size="sm" rounded="sm">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
              {items.length > 0 && onClearCart && (
                <button
                  type="button"
                  onClick={onClearCart}
                  title="Clear food tray"
                  className="text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors cursor-pointer select-none px-1.5 py-0.5 rounded-sm hover:bg-destructive-subtle/50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Fulfillment Location Pill */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground bg-muted/40 p-2 rounded-sm border border-border/60">
            <div className="flex items-center gap-1.5 truncate">
              {fulfillmentType === "delivery" ? (
                <Bike className="w-3.5 h-3.5 text-primary shrink-0" />
              ) : (
                <Store className="w-3.5 h-3.5 text-secondary shrink-0" />
              )}
              <span className="font-semibold text-foreground truncate">
                {fulfillmentType === "delivery"
                  ? "Dorm Drop-off:"
                  : "Counter Pickup:"}
              </span>
              <span className="truncate">
                {dormLocation} • {roomNumber}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 shrink-0 uppercase tracking-wider pl-1.5">
              Est. 12m
            </span>
          </div>

          <DrawerDescription className="sr-only">
            Review food tray items, add campus promo codes, and complete
            checkout with student smart pay.
          </DrawerDescription>
        </DrawerHeader>

        {/* =================================================================
           2. Drawer Body: Empty State OR Items List + Perks
           ================================================================= */}
        <DrawerBody className="flex-1 min-h-0 space-y-4 py-4 px-4 sm:px-6 overflow-y-auto">
          {items.length === 0 ? (
            <div className="py-8">
              <EmptyState
                icon={<ShoppingCart className="w-7 h-7 text-primary" />}
                title="Your food tray is empty"
                description="Add freshly prepared meals from central dining, late-night wraps, or iced cold brews to start your order."
                variant="dashed"
                size="sm"
                rounded="sm"
                action={
                  <Button
                    variant="primary"
                    size="sm"
                    rounded="sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Explore Campus Menus
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Free Delivery Threshold Tracker */}
              <div className="p-3 rounded-sm bg-primary-subtle/35 border border-primary-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-foreground truncate pr-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="font-bold text-primary">
                        Free Dorm Delivery Unlocked!
                      </span>
                    ) : (
                      <span className="truncate">
                        Add{" "}
                        <strong className="text-primary font-mono">
                          ৳{amountToFreeDelivery.toFixed(2)}
                        </strong>{" "}
                        more for Free Delivery
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-primary font-bold shrink-0">
                    {progressPercent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-primary-100 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-sm border border-border bg-card hover:border-primary/40 transition-colors shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="h-9 w-9 rounded-sm bg-primary-subtle/60 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          {item.icon ?? <ShoppingCart className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-foreground leading-tight truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                            {item.station}
                          </p>
                          <span className="text-xs font-mono font-bold text-primary mt-1 inline-block">
                            ৳{item.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-sm font-mono font-extrabold text-foreground shrink-0">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls & Delete Action */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-xs text-muted-foreground font-medium">
                        Quantity
                      </span>

                      <div className="inline-flex items-center gap-1.5 bg-muted/50 p-1 rounded-sm border border-border shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity === 1 && onRemoveItem) {
                              onRemoveItem(item.id);
                            } else {
                              onUpdateQuantity(item.id, -1);
                            }
                          }}
                          aria-label={
                            item.quantity === 1
                              ? "Remove item"
                              : "Decrease quantity"
                          }
                          className={cn(
                            "h-6 w-6 rounded-sm bg-card hover:bg-muted flex items-center justify-center text-xs font-bold transition-colors cursor-pointer",
                            item.quantity === 1
                              ? "text-destructive hover:bg-destructive-subtle"
                              : "text-foreground",
                          )}
                        >
                          {item.quantity === 1 ? (
                            <Trash className="w-3.5 h-3.5 text-destructive" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <span className="text-xs font-mono font-bold px-2 min-w-[20px] text-center select-none">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="h-6 w-6 rounded-sm bg-card hover:bg-muted flex items-center justify-center text-xs font-bold text-foreground transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Eco Cutlery & Napkins Toggle */}
              <div className="p-3 rounded-sm bg-muted/30 border border-border/60">
                <Checkbox
                  size="sm"
                  rounded="sm"
                  checked={includeCutlery}
                  onChange={(e) => setIncludeCutlery(e.target.checked)}
                  label="Include eco-cutlery and napkins"
                  description="Support green campus dining with compostable utensils."
                />
              </div>

              {/* Promo Code Input Box */}
              <div className="p-3 rounded-sm bg-card border border-border space-y-2">
                <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    Student Voucher Code
                  </span>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-destructive hover:underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-primary-subtle text-primary border border-primary-200 text-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="font-mono font-bold text-primary">
                        {appliedCoupon}
                      </span>
                      <span className="text-muted-foreground text-[11px] hidden xs:inline">
                        applied
                      </span>
                    </span>
                    <Badge variant="available" size="sm" rounded="sm">
                      -৳{discountAmount.toFixed(2)} OFF
                    </Badge>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. CAMPUS15"
                      inputSize="sm"
                      rounded="sm"
                      className="font-mono uppercase text-xs"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      rounded="sm"
                      className="shrink-0"
                    >
                      Apply
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </DrawerBody>

        {/* =================================================================
           3. Drawer Footer: Price Breakdown & Smart Pay Checkout Button
           (!flex !flex-col !items-stretch overrides default sm:flex-row)
           ================================================================= */}
        {items.length > 0 && (
          <DrawerFooter className="!flex !flex-col !items-stretch !justify-start w-full border-t border-border/80 px-4 py-3.5 sm:px-6 sm:py-4 bg-card/98 gap-3 shrink-0 !space-y-0">
            {/* Cost Summary Breakdown */}
            <div className="space-y-2 text-xs sm:text-sm w-full">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold text-foreground">
                  ৳{subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span className="truncate pr-2">
                    Student Discount ({appliedCoupon})
                  </span>
                  <span className="font-mono font-bold shrink-0">
                    -৳{discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Dorm Hall Drop-off Fee</span>
                <span className="font-mono text-emerald-600 font-bold uppercase">
                  {subtotal >= freeDeliveryThreshold ? "FREE" : "৳1.50"}
                </span>
              </div>

              <div className="pt-2 border-t border-border flex items-baseline justify-between w-full">
                <div>
                  <span className="text-sm font-bold text-foreground block">
                    Total Amount
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Includes all campus subsidies
                  </span>
                </div>
                <span className="text-xl font-mono font-black text-primary">
                  ৳{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Smart Pay Checkout Button */}
            <Button
              variant="primary"
              size="md"
              rounded="sm"
              className="w-full !flex justify-between items-center px-4 py-2.5 text-sm font-bold shadow-xs cursor-pointer"
              onClick={onCheckout}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              <span>Pay with Campus Smart Pay</span>
              <span className="font-mono font-extrabold text-base">
                ৳{total.toFixed(2)}
              </span>
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
