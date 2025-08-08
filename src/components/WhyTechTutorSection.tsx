import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Award } from "lucide-react";

const WhyTechTutorSection = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "500+ Certified Educators",
      description: "Background-checked instructors with 5+ years experience guiding live, hands-on sessions with 4:1 student-teacher ratios."
    },
    {
      icon: <Shield className="w-12 h-12 text-accent" />,
      title: "Parent-Approved Safety",
      description: "COPPA compliant platform with 99.9% uptime, private classrooms, and real-time parent progress dashboards."
    },
    {
      icon: <Award className="w-12 h-12 text-secondary" />,
      title: "Proven Results",
      description: "94% of kids complete their camps and 89% continue with advanced courses. Digital certificates included."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why 15,000+ Parents Choose TechTutor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join families across all 50 states who trust us to deliver safe, engaging, and results-driven tech education.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="feature" 
              className="text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTechTutorSection;