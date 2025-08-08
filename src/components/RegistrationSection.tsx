import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    childName: "",
    age: "",
    preferredCamp: "",
    format: "",
    newsletter: false
  });

  const steps = [
    "Age",
    "Preferred Camp",
    "Format",
    "Child Info",
    "Parent Info",
    "Newsletter",
    "Review"
  ];
  const [step, setStep] = useState(0);

  const isCurrentStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.age;
      case 1:
        return !!formData.preferredCamp;
      case 2:
        return !!formData.format;
      case 3:
        return formData.childName.trim().length > 0;
      case 4:
        return (
          formData.parentName.trim().length > 0 &&
          formData.email.trim().length > 0
        );
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (isCurrentStepValid() && step < steps.length - 1) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    // Here you would typically send to your backend or payment processor
    alert("Registration submitted! We'll contact you shortly.");
  };

  const camps = [
    "Junior Tech Explorers (Ages 6-8)",
    "Create Your Own Video Game (Ages 9-12)",
    "Digital Citizenship & Internet Superpowers (Ages 9-13)",
    "Cyber Sleuth Academy (Ages 11-16)",
    "Code Your First Website (Ages 13-17)",
    "Techpreneur Bootcamp (Ages 14-17)"
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-2">
            <Label htmlFor="age" className="text-foreground font-medium">
              Child's Age
            </Label>
            <Select value={formData.age || undefined} onValueChange={(value) => setFormData({ ...formData, age: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 6).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age} years old
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <Label htmlFor="preferredCamp" className="text-foreground font-medium">
              Preferred Camp
            </Label>
            <Select value={formData.preferredCamp || undefined} onValueChange={(value) => setFormData({ ...formData, preferredCamp: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose a camp" />
              </SelectTrigger>
              <SelectContent>
                {camps.map((camp) => (
                  <SelectItem key={camp} value={camp}>
                    {camp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <Label htmlFor="format" className="text-foreground font-medium">
              Preferred Format
            </Label>
            <Select value={formData.format || undefined} onValueChange={(value) => setFormData({ ...formData, format: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Live Online Sessions</SelectItem>
                <SelectItem value="self-paced">Self-Paced with Mentorship</SelectItem>
                <SelectItem value="hybrid">Hybrid (Live + Self-Paced)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-foreground font-medium">
              Child's Name
            </Label>
            <Input
              id="childName"
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              placeholder="Enter child's name"
              className="h-12"
            />
          </div>
        );
      case 4:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="parentName" className="text-foreground font-medium">
                Parent/Guardian Name
              </Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="Enter your full name"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="h-12"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
            />
            <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
              Yes, I'd like to receive updates about new camps and special offers
            </Label>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <div className="font-medium text-foreground">{formData.age || "-"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Preferred Camp:</span>
                <div className="font-medium text-foreground">{formData.preferredCamp || "-"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <div className="font-medium text-foreground">{formData.format || "-"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Child's Name:</span>
                <div className="font-medium text-foreground">{formData.childName || "-"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Parent/Guardian:</span>
                <div className="font-medium text-foreground">{formData.parentName || "-"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <div className="font-medium text-foreground">{formData.email || "-"}</div>
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Newsletter:</span>
                <div className="font-medium text-foreground">{formData.newsletter ? "Subscribed" : "No"}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Review your answers. You can go back to make changes before submitting.
            </p>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Register for Summer 2024
          </h2>
          <p className="text-xl text-muted-foreground">
            Secure your child's spot in our most popular tech camps.
          </p>
        </div>

        <Card variant="camp" className="shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">
              Summer Camp Registration
            </CardTitle>
            <p className="text-muted-foreground">
              Take this quick quiz to get started. We'll contact you within 24 hours.
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Step {step + 1} of {steps.length}</span>
                <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
              </div>
              <Progress value={((step + 1) / steps.length) * 100} />
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {steps.map((label, idx) => (
                  <span
                    key={label}
                    className={
                      "px-3 py-1 rounded-full text-xs border transition-colors " +
                      (idx <= step
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border")
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <form
              onSubmit={step === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next(); }}
              className="space-y-6"
            >
              {renderStep()}

              <div className="flex items-center justify-between gap-3 pt-2">
                {step > 0 ? (
                  <Button type="button" variant="secondary" onClick={back}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < steps.length - 1 ? (
                  <Button type="button" variant="hero" size="xl" className="ml-auto" disabled={!isCurrentStepValid()} onClick={next}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="hero" size="xl" className="ml-auto">
                    Submit Registration
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By registering, you agree to our Terms of Service and Privacy Policy. 
                Registration is risk-free with our 30-day money-back guarantee.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationSection;