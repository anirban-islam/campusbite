import Link from "next/link";
import { Announcement, Header, Footer } from "@/components/layout";
import { Heroslider } from "@/components/storefont/Heroslider";
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

      {/* Hero Storefront Slider */}
      <Heroslider />

      {/* Global Campus Footer */}
      <Footer />
    </div>
  );
}
