import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Standard",
      price: "$149",
      originalPrice: "$169",
      popular: false,
      description: "Perfect for first-time campers",
      features: [
        "2-week camp access",
        "Live instructor sessions", 
        "Digital certificate",
        "Basic parent dashboard",
        "Email support"
      ]
    },
    {
      name: "Premium",
      price: "$199",
      originalPrice: "$219", 
      popular: true,
      description: "Most popular choice",
      features: [
        "Everything in Standard",
        "1:1 tutor help sessions",
        "Mailed workbook & materials",
        "Advanced parent dashboard",
        "Priority support",
        "Bonus coding challenges"
      ]
    },
    {
      name: "Boxed Experience",
      price: "$249",
      originalPrice: "$269",
      popular: false,
      description: "Ultimate summer camp experience",
      features: [
        "Everything in Premium",
        "Physical summer camp box",
        "TechTutor t-shirt & stickers",
        "Achievement badge chart",
        "Printed portfolio",
        "Video call with instructor"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Flexible pricing options to fit every family's needs and budget.
          </p>
          
          {/* Limited time offer */}
          <div className="inline-flex items-center bg-gradient-hero text-white px-6 py-3 rounded-full font-medium animate-glow">
            <Star className="w-5 h-5 mr-2" />
            Limited Time: $20 OFF for early signups!
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              variant={plan.popular ? "camp" : "default"}
              className={`relative h-full flex flex-col ${plan.popular ? 'scale-105 border-primary shadow-glow' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-hero text-white px-4 py-1 text-sm font-bold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">/camp</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                    <Badge variant="destructive" className="text-xs">Save $20</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Button 
                    variant={plan.popular ? "hero" : "default"} 
                    size="lg" 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee - prominent */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            🛡️ 30-Day Money-Back Guarantee
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            Not completely satisfied? Get 100% of your money back, no questions asked.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Secure payment processing</span>
            <span>✓ Instant access after signup</span>
            <span>✓ Flexible payment plans available</span>
            <span>✓ Sibling discounts: 15% off 2nd child</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;