"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header, Footer, Announcement } from "@/components/layout";
import { Button, Badge, toast } from "@/components/ui";
import {
  Store,
  Utensils,
  CreditCard,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Check,
} from "@/lib/icons";
import type { SessionUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          // If customer tries to access dashboard, redirect to /account
          if (data.user.role === "customer") {
            router.push("/account");
          }
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Logged out", { rounded: "sm" });
    router.push("/login");
  };

  const isAdmin = user?.role === "admin";
  const isVendor = user?.role === "vendor";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Announcement variant="subtle" />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isAdmin ? "primary" : "popular"}
                size="md"
                rounded="sm"
                className="uppercase tracking-wider font-bold"
              >
                {isAdmin ? "Admin Portal" : "Vendor Counter Hub"}
              </Badge>
              <Badge variant="available" size="sm" rounded="sm" dot pulse>
                Live Kitchens
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Welcome, {user ? `${user.firstName} ${user.lastName}` : "Partner"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isAdmin
                ? "Full administrative control of campus dining stations, menus, and orders."
                : "Manage counter food trays, live preparation queues, and pickup orders."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              rounded="sm"
              onClick={handleLogout}
              className="font-semibold cursor-pointer"
            >
              Sign Out
            </Button>
            <Link href="/">
              <Button
                variant="primary"
                size="sm"
                rounded="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="font-bold cursor-pointer"
              >
                View Storefront
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Active Orders
              </span>
              <div className="h-8 w-8 rounded-sm bg-primary-subtle text-primary flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">18</div>
            <p className="text-xs text-muted-foreground">
              6 in prep • 12 out for dorm drop-off
            </p>
          </div>

          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Daily Revenue
              </span>
              <div className="h-8 w-8 rounded-sm bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">৳3,420</div>
            <p className="text-xs text-muted-foreground">
              +14% from yesterday
            </p>
          </div>

          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Dining Stations
              </span>
              <div className="h-8 w-8 rounded-sm bg-secondary-subtle text-secondary flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">5</div>
            <p className="text-xs text-muted-foreground">
              All 5 kitchens currently open
            </p>
          </div>

          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Average Prep Time
              </span>
              <div className="h-8 w-8 rounded-sm bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-foreground">11 min</div>
            <p className="text-xs text-muted-foreground">
              Within campus benchmark
            </p>
          </div>
        </div>

        {/* Live Counter Queue Table */}
        <div className="bg-card border border-border/80 rounded-sm shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Live Kitchen Prep Queue
              </h3>
              <p className="text-xs text-muted-foreground">
                Incoming student and faculty orders across stations
              </p>
            </div>
            <Badge variant="available" size="sm" rounded="sm">
              Live Feed
            </Badge>
          </div>

          <div className="divide-y divide-border/60">
            {[
              {
                id: "#CB-9041",
                customer: "Alex Rivera",
                item: "Artisan Pepperoni Flatbread (x1), Cold Brew (x2)",
                station: "Central Dining Hall • Counter #2",
                location: "West Residence Hall, Room 304",
                amount: "৳14.40",
                status: "In Kitchen",
              },
              {
                id: "#CB-9042",
                customer: "Sarah Khan",
                item: "Spicy Night Wok Rice Bowl (x1)",
                station: "Night Wok & Bowls",
                location: "North Residence Quad, Room 112",
                amount: "৳8.50",
                status: "Courier Picking Up",
              },
              {
                id: "#CB-9043",
                customer: "Prof. Hasan",
                item: "Grilled Chicken Salad, Fresh Orange Juice",
                station: "Campus Cafe Kiosk",
                location: "CSE Faculty Lounge • 4th Floor",
                amount: "৳12.20",
                status: "Ready for Pickup",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">
                      {order.id}
                    </span>
                    <span className="font-semibold text-foreground">
                      • {order.customer}
                    </span>
                    <Badge variant="popular" size="sm" rounded="sm">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground font-medium">
                    {order.item}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.station} → {order.location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-foreground block">
                    {order.amount}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Smart Pay Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

