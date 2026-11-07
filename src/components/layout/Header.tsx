"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CartDrawer, type CartItem } from "./CartDrawer";
import {
  Logo,
  Button,
  Badge,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  RadioGroup,
  toast,
} from "@/components/ui";
import {
  ShoppingCart,
  LocationPinIcon,
  Search,
  ChevronDown,
  Menu,
  CreditCard,
  User,
  Pizza,
  Coffee,
  Flame,
  Check,
  ArrowRight,
  Store,
  Bike,
  Sparkles,
  CartIcon,
} from "@/lib/icons";


export interface HeaderProps {
  className?: string;
  activeNav?: string;
}

export function Header({ className, activeNav = "dining" }: HeaderProps) {
  // Fulfillment & Location State
  const [fulfillmentType, setFulfillmentType] = useState<string>("delivery");
  const [selectedDorm, setSelectedDorm] = useState<string>(
    "West Residence Hall",
  );
  const [roomNumber, setRoomNumber] = useState<string>("Room 304");
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);

  // Cart Drawer State & Items
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "item-1",
      name: "Artisan Pepperoni Flatbread",
      station: "Central Dining Hall • Counter #2",
      price: 8.5,
      quantity: 1,
      icon: <Pizza className="w-5 h-5 text-primary" />,
    },
    {
      id: "item-2",
      name: "Iced Caramel Cold Brew",
      station: "Campus Cafe Kiosk",
      price: 4.2,
      quantity: 2,
      icon: <Coffee className="w-5 h-5 text-secondary" />,
    },
  ]);

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Calculations
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const studentDiscount = cartSubtotal > 15 ? 2.5 : 0;
  const deliveryFee = 0.0; // Free dorm delivery with student code
  const totalCharge = Math.max(0, cartSubtotal - studentDiscount + deliveryFee);

  // Cart Actions
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const nextQty = item.quantity + delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from tray", { rounded: "sm" });
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.info("Food tray cleared", { rounded: "sm" });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    toast.success("Order Placed Successfully! (#CB-9142)", {
      description: `Charged ৳${totalCharge.toFixed(2)} to Campus Smart Pay. Delivered to ${selectedDorm}, ${roomNumber}.`,
      rounded: "sm",
      action: {
        label: "Track Order",
        onClick: () => {
          toast.info(
            "Courier #4 is picking up your tray at Central Dining Hall.",
            {
              rounded: "sm",
            },
          );
        },
      },
    });
  };

  const handleSaveLocation = () => {
    setIsLocationModalOpen(false);
    toast.info("Campus Drop-off Location Updated", {
      description: `${fulfillmentType === "delivery" ? "Dorm Delivery" : "Counter Pickup"} • ${selectedDorm}, ${roomNumber}`,
      rounded: "sm",
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    toast.brand(`Searching for "${searchQuery}"`, {
      description: "Browsing menus across 5 active campus dining stations.",
      rounded: "sm",
    });
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-card/95 backdrop-blur-md shadow-2xs transition-all",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border/70">
          <div className="flex items-center justify-between h-16 sm:h-18 py-1 sm:py-1.5 gap-3 sm:gap-6">
            {/* =============================================================
               1. Left: Brand Logo (Icon Only) + Deliver To Selector
               ============================================================= */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              {/* Mobile Hamburger Menu Toggle (rounded-sm) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation"
                className="lg:hidden p-2 -ml-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo Component (Brand Icon Only) */}
              <div className="flex items-center">
                <Logo
                  variant="icon"
                  size="lg"
                  asLink={true}
                  className="hover:opacity-95 transition-opacity"
                />
              </div>

              {/* Location / Dorm Drop-off Selector (rounded-sm) */}
              <div className="hidden md:flex items-center pl-1 sm:pl-2">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-sm border border-border bg-card hover:bg-muted/60",
                    "hover:border-primary/50 text-left transition-all duration-150 cursor-pointer shadow-2xs group",
                  )}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-primary-subtle text-primary flex items-center justify-center shrink-0">
                    <LocationPinIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider leading-none">
                      {fulfillmentType === "delivery"
                        ? "Deliver To"
                        : "Pickup Station"}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-foreground truncate mt-0.5">
                      <span className="truncate max-w-[130px] lg:max-w-[170px]">
                        {selectedDorm}
                      </span>
                      <span className="text-muted-foreground font-semibold">
                        • {roomNumber}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </button>
              </div>
            </div>

            {/* =============================================================
               2. Middle: Global Campus Food Search Bar (md size & rounded-sm)
               ============================================================= */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex flex-1 max-w-lg mx-3"
            >
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search dining halls, burgers, pizza, bowls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  variant="filled"
                  inputSize="md"
                  rounded="sm"
                  className="bg-muted/40 hover:bg-muted/70 focus:bg-card text-sm font-medium transition-all"
                />
              </div>
            </form>

            {/* =============================================================
               3. Right: User Profile FIRST, then Cart Icon (Balanced Size & Gap)
               ============================================================= */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* User Profile Avatar / Sign In (Compact & rounded-sm) */}
              <button
                type="button"
                onClick={() =>
                  toast.info("Logged in as Alex Rivera", {
                    description: "Student ID: #CB-20491 • Dorm Hall West",
                    rounded: "sm",
                  })
                }
                aria-label="Student Account"
                className={cn(
                  "h-9 w-9 sm:h-9.5 sm:w-9.5 rounded-sm border border-border bg-card flex items-center justify-center shrink-0",
                  "text-foreground hover:bg-muted hover:border-primary/50 transition-all cursor-pointer shadow-2xs group",
                )}
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-foreground group-hover:text-primary transition-colors" />
              </button>

              {/* Shopping Food Tray Cart Button (Compact & rounded-sm, Shopping Cart Icon) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Campus food cart with ${cartItemCount} items`}
                className={cn(
                  "relative h-9 w-9 sm:h-9.5 sm:w-9.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
                  "flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs",
                )}
              >
                <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-foreground" />

                {/* Badge Count on Cart (rounded-sm) */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-sm bg-foreground text-background text-[10px] font-black shadow-xs border border-card">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Secondary Row: Location Pill + Search Bar (md size, rounded-sm) */}
          <div className="lg:hidden pb-3.5 pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-sm border border-border bg-card text-xs sm:text-sm font-bold text-foreground truncate max-w-[150px] shrink-0"
            >
              <LocationPinIcon className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{selectedDorm}</span>
            </button>
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search food & menus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                variant="filled"
                inputSize="md"
                rounded="sm"
                className="bg-muted/40 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* =============================================================
           Desktop Quick Category Bar (Prominent Font Size, rounded-sm)
           ============================================================= */}
        <nav
          aria-label="Campus Menu Categories"
          className="hidden md:flex bg-card/60 backdrop-blur-xs px-4 sm:px-6 lg:px-8 py-2"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {[
                {
                  id: "dining",
                  label: "Dining Halls",
                  icon: <Store className="w-4 h-4" />,
                },
                {
                  id: "specials",
                  label: "Daily Specials",
                  icon: <Flame className="w-4 h-4 text-primary" />,
                  badge: "Hot",
                },
                {
                  id: "late-night",
                  label: "Late Night (until 2 AM)",
                  icon: <Sparkles className="w-4 h-4 text-secondary" />,
                },
                {
                  id: "combos",
                  label: "Student Combos",
                  icon: <Pizza className="w-4 h-4" />,
                },
                {
                  id: "cafes",
                  label: "Coffee & Bakery",
                  icon: <Coffee className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    toast.info(`Switched view to ${tab.label}`, {
                      description:
                        "Loading live counter menus and queue times.",
                      rounded: "sm",
                    })
                  }
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-sm sm:text-[15px] font-bold transition-all cursor-pointer select-none",
                    activeNav === tab.id
                      ? "bg-primary-subtle text-primary border border-primary-200/60 shadow-2xs font-extrabold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      variant="popular"
                      size="sm"
                      rounded="sm"
                      className="ml-1 py-0 px-1.5 text-[11px] font-bold"
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* =================================================================
         5. Campus Location & Drop-off Dialog Modal (rounded-sm)
         ================================================================= */}
      <Dialog
        open={isLocationModalOpen}
        onOpenChange={setIsLocationModalOpen}
        size="md"
        rounded="sm"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Campus Fulfillment & Drop-off</DialogTitle>
            <DialogDescription>
              Choose your residential hall for room delivery or counter pickup
              at dining stations.
            </DialogDescription>
          </DialogHeader>

          <DialogBody className="space-y-5">
            {/* Fulfillment Mode Radio Cards (rounded-sm) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Fulfillment Method
              </label>
              <RadioGroup
                value={fulfillmentType}
                onChange={setFulfillmentType}
                variant="card"
                size="sm"
                rounded="sm"
                options={[
                  {
                    value: "delivery",
                    label: "Dorm Hall Delivery",
                    description:
                      "Courier drops meal at your residential hall lobby or room entrance.",
                    icon: <Bike className="w-4 h-4 text-primary" />,
                    badge: (
                      <Badge variant="available" size="sm" rounded="sm">
                        Free over ৳15
                      </Badge>
                    ),
                  },
                  {
                    value: "pickup",
                    label: "Express Counter Pickup",
                    description:
                      "Skip the cafeteria queue. Pick up directly at Dining Counter #2.",
                    icon: <Store className="w-4 h-4 text-secondary" />,
                    badge: (
                      <Badge variant="popular" size="sm" rounded="sm">
                        Ready in 10m
                      </Badge>
                    ),
                  },
                ]}
              />
            </div>

            {/* Building Selection (rounded-sm) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Campus Residence / Building
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "West Residence Hall",
                  "East Quad Commons",
                  "North Tower Hall",
                  "Student Center Plaza",
                ].map((bldg) => (
                  <button
                    key={bldg}
                    type="button"
                    onClick={() => setSelectedDorm(bldg)}
                    className={cn(
                      "p-3 rounded-sm border text-left text-sm font-semibold transition-all cursor-pointer",
                      selectedDorm === bldg
                        ? "bg-primary-subtle text-primary border-primary shadow-2xs font-bold"
                        : "bg-card border-border text-foreground hover:bg-muted",
                    )}
                  >
                    {bldg}
                  </button>
                ))}
              </div>
            </div>

            {/* Room / Instructions Input (rounded-sm) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Room / Floor / Notes
              </label>
              <Input
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. Room 304, 3rd Floor East Wing"
                rounded="sm"
                inputSize="sm"
                className="text-sm font-medium"
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              rounded="sm"
              onClick={() => setIsLocationModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              rounded="sm"
              onClick={handleSaveLocation}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Confirm Drop-off Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* =================================================================
         6. Component-Based Campus Cart Tray Drawer
         ================================================================= */}
      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        dormLocation={selectedDorm}
        roomNumber={roomNumber}
        fulfillmentType={fulfillmentType}
      />

      {/* =================================================================
         7. Mobile Navigation Drawer (Slide-in Left, rounded-sm)
         ================================================================= */}
      <Drawer
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        direction="left"
        size="sm"
        rounded="sm"
      >
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-center gap-2">
              <Logo variant="icon" size="md" asLink={false} />
            </div>
          </DrawerHeader>

          <DrawerBody className="space-y-5">
            {/* Student ID Card (rounded-sm) */}
            <div className="p-3.5 rounded-sm bg-primary-subtle/30 border border-primary-200/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">
                  Student Account
                </span>
                <Badge variant="available" size="sm" rounded="sm">
                  Active
                </Badge>
              </div>
              <div>
                <h4 className="font-bold text-base text-foreground">
                  Alex Rivera
                </h4>
                <p className="text-xs text-muted-foreground font-mono">
                  ID: #CB-20491 • West Residence Hall
                </p>
              </div>
            </div>

            {/* Navigation Links (rounded-sm) */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 block mb-1">
                Explore Dining
              </span>
              {[
                { label: "Dining Halls", icon: <Store className="w-4 h-4" /> },
                {
                  label: "Daily Specials",
                  icon: <Flame className="w-4 h-4 text-primary" />,
                  badge: "Hot",
                },
                {
                  label: "Late Night Menu",
                  icon: <Sparkles className="w-4 h-4 text-secondary" />,
                },
                {
                  label: "Campus Cafes & Bakeries",
                  icon: <Coffee className="w-4 h-4" />,
                },
                {
                  label: "My Orders & Receipts",
                  icon: <CreditCard className="w-4 h-4" />,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    toast.info(`Viewing ${item.label}`, { rounded: "sm" });
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-sm text-sm font-bold text-foreground hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="popular" size="sm" rounded="sm">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Current Drop-off Building (rounded-sm) */}
            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 block">
                Fulfillment Target
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-sm border border-border bg-card hover:bg-muted text-left text-sm font-bold"
              >
                <div className="flex items-center gap-2 truncate">
                  <LocationPinIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">
                    {selectedDorm} ({roomNumber})
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              size="sm"
              rounded="sm"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close Menu
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
