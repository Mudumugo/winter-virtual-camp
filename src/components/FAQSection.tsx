import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What technology does my child need?",
      answer: "Just a computer or tablet with internet access. We'll provide all software and accounts needed. Our tech support team helps with setup before camp starts."
    },
    {
      question: "Are the camps really live with instructors?",
      answer: "Yes! Every camp includes live video sessions with certified instructors. Kids interact in real-time, ask questions, and get personalized help. We also provide recorded sessions for review."
    },
    {
      question: "What if my child is shy or struggles with technology?",
      answer: "Our instructors are trained to work with all personality types and skill levels. We use small group sizes (max 8 kids) and provide 1:1 support when needed. Many shy kids become our most confident creators!"
    },
    {
      question: "Can siblings join together or get a discount?",
      answer: "Absolutely! Siblings get 15% off their second camp registration. They can join the same age-appropriate camp or different ones - whatever works best for your family."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee, no questions asked. If your child isn't engaged or learning, we'll refund 100% of your payment."
    },
    {
      question: "How do I track my child's progress?",
      answer: "Parents get access to a real-time dashboard showing project progress, attendance, and instructor feedback. Weekly summary emails keep you updated on achievements and next steps."
    },
    {
      question: "Are there payment plans available?",
      answer: "Yes! We offer 3-month interest-free payment plans for all camps. Choose the payment plan option at checkout - no credit check required."
    },
    {
      question: "What happens if my child misses a session?",
      answer: "All sessions are recorded and available for 30 days. Plus, our instructors offer make-up sessions and 1:1 catch-up time to ensure no child falls behind."
    },
    {
      question: "Is this just screen time or real learning?",
      answer: "These are structured learning experiences with clear educational outcomes. Kids create real projects, solve problems, and build skills they'll use in school and beyond. It's active creation, not passive consumption."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Parent Questions Answered
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the answers you need to make the best decision for your child's summer learning.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional trust section */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            Still have questions? Our parent support team responds within 2 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Live chat support</span>
            <span>✓ Phone consultations available</span>
            <span>✓ Pre-camp setup assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;