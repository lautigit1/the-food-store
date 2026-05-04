import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { EditorialHero } from "./components/EditorialHero";
import { EditorialStatement } from "./components/EditorialStatement";
import { VisualBreak } from "./components/VisualBreak";
import { ProductShowcase } from "./components/ProductShowcase";
import { HorizontalExplorer } from "./components/HorizontalExplorer";
import { MenuExperience } from "./components/MenuExperience";
import { EditorialCTA } from "./components/EditorialCTA";
import { EditorialFooter } from "./components/EditorialFooter";
import { MinimalCursor } from "./components/MinimalCursor";

export default function App() {
  useEffect(() => {
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="relative bg-[#0B0B0B] overflow-x-hidden">
      <MinimalCursor />
      <Navbar />

      <EditorialHero />
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