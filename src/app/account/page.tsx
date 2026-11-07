"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header, Footer, Announcement } from "@/components/layout";
import { Button, Badge, toast } from "@/components/ui";
import {
  User,
  CreditCard,
  Utensils,
  MapPin,
  Clock,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Store,
} from "@/lib/icons";
import type { SessionUser } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Logged out", { rounded: "sm" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Announcement variant="subtle" />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-sm bg-card border border-border/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-sm bg-primary-subtle text-primary border border-primary-200/60 flex items-center justify-center shrink-0">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">
                  {user ? `${user.firstName} ${user.lastName}` : "Campus Member"}
                </h1>
                <Badge variant="available" size="sm" rounded="sm">
                  {user?.affiliationType || "Campus Member"}
                </Badge>
                {user?.department?.code && (
                  <Badge variant="primary" size="sm" rounded="sm">
                    Dept: {user.department.code}
                  </Badge>
                )}
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">
                {user?.email || "Signed in with Campus ID"}
                {user?.studentId && ` • Student ID: ${user.studentId}`}
                {user?.employeeId && ` • Faculty/Employee ID: ${user.employeeId}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="primary"
                size="sm"
                rounded="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="font-bold cursor-pointer"
              >
                Browse Menus
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              rounded="sm"
              onClick={handleLogout}
              className="font-semibold cursor-pointer"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Account Details & Meal Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Campus Meal Plan */}
          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Smart Pay Balance
              </span>
              <div className="h-8 w-8 rounded-sm bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-foreground">৳240.00</div>
            <p className="text-xs text-muted-foreground">
              Semester dining funds • 5% discount on cafeteria meals
            </p>
          </div>

          {/* Card 2: Dorm / Drop-off Room */}
          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Saved Drop-off
              </span>
              <div className="h-8 w-8 rounded-sm bg-primary-subtle text-primary flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-bold text-foreground">
              West Residence Hall
            </div>
            <p className="text-xs text-muted-foreground">
              Room 304 • Free late-night delivery unlocked
            </p>
          </div>

          {/* Card 3: Preferred Dining Station */}
          <div className="p-5 rounded-sm bg-card border border-border/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Favorite Station
              </span>
              <div className="h-8 w-8 rounded-sm bg-secondary-subtle text-secondary flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-bold text-foreground">
              Central Dining Hall
            </div>
            <p className="text-xs text-muted-foreground">
              Building B, Counter #2 • Open 9 AM – 5 AM
            </p>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-card border border-border/80 rounded-sm shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">
              Recent Food Orders
            </h3>
            <span className="text-xs text-muted-foreground">
              Showing last 3 orders
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {[
              {
                id: "#CB-9041",
                date: "Today at 11:42 PM",
                items: "Artisan Pepperoni Flatbread (x1), Iced Caramel Cold Brew (x2)",
                status: "Delivered to Room 304",
                amount: "৳14.40",
              },
              {
                id: "#CB-8849",
                date: "Yesterday at 1:15 PM",
                items: "Campus Lunch Combo #2 (Chicken Bowl + Drink)",
                status: "Picked up at Counter",
                amount: "৳8.50",
              },
              {
                id: "#CB-8712",
                date: "Nov 5 at 10:20 PM",
                items: "Late Night Study Flatbread + Extra Cheese",
                status: "Delivered to West Hall",
                amount: "৳9.00",
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
                    <span className="text-xs text-muted-foreground">
                      • {order.date}
                    </span>
                    <Badge variant="available" size="sm" rounded="sm">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground font-medium">
                    {order.items}
                  </p>
                </div>
                <span className="font-bold text-foreground shrink-0 sm:text-right">
                  {order.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

