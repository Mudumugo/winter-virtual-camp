import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const handleSignUp = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCamps = () => {
    document.getElementById('camp-tracks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-lg animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-slideIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Turn Screen Time Into 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Skill Time
              </span>
              This Summer!
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 max-w-2xl">
              Join 15,000+ kids who've mastered coding, game design, cybersecurity & more with our live instructor camps. Ages 6–17.
            </p>
            
            {/* Urgency Banner */}
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
              <p className="text-white font-semibold text-center">
                🔥 Early Bird Special: Only 48 spots left for July camps! Register by June 15th to save $20
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl"
                onClick={handleSignUp}
                className="w-full sm:w-auto"
              >
                Sign Up Now
              </Button>
              <Button 
                variant="floating" 
                size="xl"
                onClick={handleViewCamps}
                className="w-full sm:w-auto"
              >
                View Camp Tracks
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span className="text-sm font-medium">500+ Certified Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span className="text-sm font-medium">98% Parent Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-slideIn max-w-md mx-auto lg:max-w-none" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Kids learning technology at TechTutor Summer Camp" 
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {/* Overlay badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-primary font-bold text-sm">Summer 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;