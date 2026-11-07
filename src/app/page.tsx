"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary-200">
          Campus Food Platform
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">CampusBite</span>
        </h1>
        <p className="text-muted-foreground text-base">
          Primary brand color <span className="font-semibold text-primary">#c34e31</span> with DM Sans typography.
        </p>

        {/* Variants showcase */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs text-left space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Button Variants
            </h2>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes showcase */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Button Sizes
            </h2>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium (Default)</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Loading state showcase */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Loading State
            </h2>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Button
                variant="primary"
                isLoading={loading}
                loadingText="Placing Order..."
                onClick={toggleLoading}
              >
                Click to Test Loading
              </Button>
              <Button variant="secondary" isLoading>
                Loading
              </Button>
              <Button variant="outline" isLoading loadingText="Saving..." />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
