import Link from "next/link";
import { Announcement, Header } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight, Sparkles, Store, Utensils } from "@/lib/icons";

export const instant = true;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Announcement Bar */}
      <Announcement variant="subtle" />

      {/* Main Campus Navigation Header */}
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="max-w-4xl w-full mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              Live Campus Food Platform
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Fresh Campus Meals, <br />
              <span className="text-primary">Delivered Right to Your Dorm.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Skip long dining hall queues. Use your student meal plan balance for express counter pickup and live dorm hall drop-offs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/desigin-architure">
                <Button variant="primary" size="lg" rounded="xl" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Design Architecture System
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
                <Utensils className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-sm text-foreground">5 Campus Dining Stations</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Central Dining, Student Union Grill, Night Wok, Campus Cafe, and Green Salad Bar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-secondary-subtle text-secondary flex items-center justify-center">
                <Store className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-sm text-foreground">Express Counter Pickup</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Order ahead on mobile and grab your boxed meals with a quick barcode scan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-sm text-foreground">Student ID Smart Pay</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deduct directly from your semester dining credits or credit card with 5% campus rebate.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
