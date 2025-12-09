import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ClubsSection } from "@/components/ClubsSection";
import { MatchCenter } from "@/components/MatchCenter";
import { NewsSection } from "@/components/NewsSection";
import { TransfersSection } from "@/components/TransfersSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClubsSection />
      <MatchCenter />
      <NewsSection />
      <TransfersSection />
      <Footer />
    </main>
  );
};

export default Index;
