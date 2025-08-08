import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 100vh)
      const shouldShow = window.scrollY > window.innerHeight;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
      <div className="flex gap-2">
        <Button 
          variant="hero" 
          size="lg" 
          className="flex-1 text-base font-semibold"
          onClick={handleScrollToRegistration}
        >
          Register Now - Save $20
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => window.open('tel:+1-555-TECH-CAMP', '_self')}
        >
          Call
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;