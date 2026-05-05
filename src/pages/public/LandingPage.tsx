import { Navbar } from "@/components/landing/Navbar";
import { HistoricalHero } from "@/components/landing/HistoricalHero";
import { EditorialStatement } from "@/components/landing/EditorialStatement";
import { VisualBreak } from "@/components/landing/VisualBreak";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { HorizontalExplorer } from "@/components/landing/HorizontalExplorer";
import { MenuExperience } from "@/components/landing/MenuExperience";
import { EditorialCTA } from "@/components/landing/EditorialCTA";
import { EditorialFooter } from "@/components/landing/EditorialFooter";

export function LandingPage() {
  return (
    <div className="relative bg-[#0B0B0B] overflow-x-hidden">
      <Navbar />
      <HistoricalHero />

      <EditorialStatement />
      <VisualBreak />
      <ProductShowcase />
      <HorizontalExplorer />
      <MenuExperience />
      <EditorialCTA />
      <EditorialFooter />
    </div>
  );
}

