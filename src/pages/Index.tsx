import HeroSection from "@/components/HeroSection";
import WhyTechTutorSection from "@/components/WhyTechTutorSection";
import CampTracksSection from "@/components/CampTracksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import RegistrationSection from "@/components/RegistrationSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyTechTutorSection />
      <CampTracksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <RegistrationSection />
      <StickyMobileCTA />
      <Footer />
    </div>
  );
};

export default Index;
