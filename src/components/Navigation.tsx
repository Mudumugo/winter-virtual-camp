import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-primary">TechTutor</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('camp-tracks')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Camp Tracks
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={handleLogin}
              variant="outline"
              size="sm"
            >
              Sign In
            </Button>
            <Button
              onClick={() => scrollToSection('registration')}
              size="sm"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('camp-tracks')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Camp Tracks
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                FAQ
              </button>
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => scrollToSection('registration')}
                  size="sm"
                  className="w-full"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;