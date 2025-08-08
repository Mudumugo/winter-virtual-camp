import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "My daughter built her own game and couldn't stop showing everyone. Best summer decision ever!",
      author: "Megan T.",
      location: "California",
      rating: 5,
      camp: "Video Game Creator"
    },
    {
      quote: "Loved the parent dashboard. Easy to track progress and see what my son was learning!",
      author: "Alex B.",
      location: "New York",
      rating: 5,
      camp: "Cyber Sleuth Academy"
    },
    {
      quote: "The instructors were amazing with my 7-year-old. Perfect introduction to coding!",
      author: "Sarah M.",
      location: "Texas",
      rating: 5,
      camp: "Junior Tech Explorers"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by families nationwide for quality tech education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              variant="testimonial" 
              className="h-full"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="border-t border-primary/20 pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                  <div className="text-xs text-primary font-medium mt-1">
                    {testimonial.camp} Graduate
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 items-center opacity-60">
          <div className="text-sm font-medium text-muted-foreground">Trusted by 500+ families</div>
          <div className="w-px h-8 bg-muted-foreground/30"></div>
          <div className="text-sm font-medium text-muted-foreground">Parent Choice Award</div>
          <div className="w-px h-8 bg-muted-foreground/30"></div>
          <div className="text-sm font-medium text-muted-foreground">COPPA Compliant</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;