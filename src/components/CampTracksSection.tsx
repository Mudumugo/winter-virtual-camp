import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CampTracksSection = () => {
  const [selectedAge, setSelectedAge] = useState("9-12");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const campTracks = {
    "6-8": [
      {
        title: "Computer Basics for Beginners",
        description: "Learn to use computers safely and confidently!",
        activities: ["Mouse and keyboard skills", "File organization basics", "Simple software navigation", "Digital art creation"],
        duration: "1 week, 1 hour/day",
        price: "$89",
        category: "computer-skills",
        badge: "Foundation"
      },
      {
        title: "Keyboard Adventures",
        description: "Make typing fun with games and challenges!",
        activities: ["Finger placement basics", "Typing games and races", "Word building exercises", "Speed challenges"],
        duration: "1 week, 45 min/day",
        price: "$69",
        category: "typing",
        badge: "Skills"
      },
      {
        title: "Cyber Safety Heroes",
        description: "Become a digital safety superhero!",
        activities: ["Good vs. bad stranger awareness", "Password creation games", "Safe website identification", "Asking permission before sharing"],
        duration: "1 week, 1 hour/day",
        price: "$79",
        category: "safety",
        badge: "Safety"
      },
      {
        title: "Healthy Tech Habits",
        description: "Learn to balance screen time and play time!",
        activities: ["Screen time awareness activities", "Creating tech-free zones", "Physical activity breaks", "Family tech agreements"],
        duration: "1 week, 45 min/day",
        price: "$69",
        category: "wellness",
        badge: "Wellness"
      },
      {
        title: "Junior Tech Explorers",
        description: "Explore the digital world safely through play and discovery!",
        activities: ["Drag-and-drop coding with Scratch Jr.", "Create your own emoji", "Tech scavenger hunt", "Internet safety through storytelling"],
        duration: "2 weeks, 1 hour/day",
        price: "$149",
        category: "programming",
        badge: "Coding"
      }
    ],
    "9-12": [
      {
        title: "Digital Literacy Bootcamp",
        description: "Master essential computer skills for school and beyond!",
        activities: ["Advanced file management", "Research and presentation skills", "Basic spreadsheet functions", "Email etiquette and organization"],
        duration: "2 weeks, 1.5 hours/day",
        price: "$149",
        category: "computer-skills",
        badge: "Foundation"
      },
      {
        title: "Touch Typing Champions",
        description: "Become a keyboard ninja with speed and accuracy!",
        activities: ["Proper touch typing technique", "Speed building exercises", "Accuracy challenges", "Real-world typing projects"],
        duration: "2 weeks, 1 hour/day",
        price: "$99",
        category: "typing",
        badge: "Skills"
      },
      {
        title: "Internet Detective Academy",
        description: "Learn to navigate the web safely and smartly!",
        activities: ["Fact-checking techniques", "Identifying reliable sources", "Privacy settings mastery", "Digital footprint awareness"],
        duration: "2 weeks, 1.5 hours/day",
        price: "$139",
        category: "safety",
        badge: "Safety"
      },
      {
        title: "Digital Balance Masters",
        description: "Find the perfect balance between tech and life!",
        activities: ["Screen time tracking and analysis", "Creating productive tech habits", "Mindful technology use", "Alternative activity planning"],
        duration: "1 week, 1.5 hours/day",
        price: "$89",
        category: "wellness",
        badge: "Wellness"
      },
      {
        title: "Create Your Own Video Game",
        description: "Turn your ideas into playable games!",
        activities: ["Design characters and stories", "Animate your hero", "Add sound effects and scoring", "Share and play each other's games"],
        duration: "2 weeks, 1.5 hours/day",
        price: "$169",
        category: "programming",
        badge: "Coding"
      },
      {
        title: "Digital Citizenship & Internet Superpowers",
        description: "Be smart, safe, and kind online!",
        activities: ["Spotting scams and fake news", "Password creation and protection", "Positive social media use", "Creating digital posters about safety"],
        duration: "1 week, 2 hours/day",
        price: "$129",
        category: "safety",
        badge: "Safety"
      }
    ],
    "13-17": [
      {
        title: "Advanced Computer Operations",
        description: "Master professional computer skills and productivity tools!",
        activities: ["Advanced spreadsheet formulas", "Database management basics", "Professional presentation design", "Cloud collaboration tools"],
        duration: "3 weeks, 2 hours/day",
        price: "$219",
        category: "computer-skills",
        badge: "Foundation"
      },
      {
        title: "Speed Typing Pro",
        description: "Achieve professional typing speeds with perfect technique!",
        activities: ["Advanced typing techniques", "Speed competitions", "Professional formatting", "Ergonomics and injury prevention"],
        duration: "2 weeks, 1.5 hours/day",
        price: "$129",
        category: "typing",
        badge: "Skills"
      },
      {
        title: "Digital Ethics & Privacy Masters",
        description: "Navigate the complex world of digital privacy and ethics!",
        activities: ["Advanced privacy protection", "Ethical AI and technology use", "Digital rights understanding", "Creating privacy-focused projects"],
        duration: "3 weeks, 2 hours/day",
        price: "$199",
        category: "safety",
        badge: "Safety"
      },
      {
        title: "Tech-Life Integration",
        description: "Develop a healthy, productive relationship with technology!",
        activities: ["Personal tech audit and optimization", "Productivity system design", "Digital minimalism principles", "Future-ready tech skills planning"],
        duration: "2 weeks, 2 hours/day",
        price: "$149",
        category: "wellness",
        badge: "Wellness"
      },
      {
        title: "Cyber Sleuth Academy",
        description: "Can you outsmart the hackers?",
        activities: ["Solve cyber puzzles and mystery cases", "Identify phishing attempts", "Role-play as red vs. blue team", "Build a 'safe website' prototype"],
        duration: "3 weeks, 2 hours/day",
        price: "$249",
        category: "safety",
        badge: "Security"
      },
      {
        title: "Code Your First Website",
        description: "Own your corner of the internet.",
        activities: ["Build a personal portfolio or fan site", "Add images, animations, and styles", "Deploy on Netlify or GitHub Pages"],
        duration: "2 weeks, 2 hours/day",
        price: "$199",
        category: "programming",
        badge: "Coding"
      },
      {
        title: "Techpreneur Bootcamp",
        description: "Turn tech skills into money-making ideas!",
        activities: ["Intro to freelancing platforms", "Canva for business cards/logos", "AI tools for marketing", "Pitch your business idea"],
        duration: "2 weeks, 2 hours/day",
        price: "$229",
        category: "programming",
        badge: "Business"
      }
    ]
  };

  const categories = [
    { key: "all", label: "All Camps", color: "bg-muted" },
    { key: "computer-skills", label: "Computer Skills", color: "bg-blue-500" },
    { key: "typing", label: "Typing", color: "bg-green-500" },
    { key: "safety", label: "Digital Safety", color: "bg-orange-500" },
    { key: "wellness", label: "Screen Wellness", color: "bg-purple-500" },
    { key: "programming", label: "Programming", color: "bg-primary" }
  ];

  const ageGroups = [
    { key: "6-8", label: "Ages 6-8", subtitle: "K-2" },
    { key: "9-12", label: "Ages 9-12", subtitle: "Grades 3-6" },
    { key: "13-17", label: "Ages 13-17", subtitle: "Middle + High School" }
  ];

  return (
    <section id="camp-tracks" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Virtual Camp Tracks Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect virtual tech adventure for your child. All camps are delivered online with live instructors.
          </p>
        </div>

        {/* Age Group Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ageGroups.map((age) => (
            <Button
              key={age.key}
              variant={selectedAge === age.key ? "hero" : "outline"}
              size="lg"
              onClick={() => setSelectedAge(age.key)}
              className="flex flex-col items-center h-auto py-4 px-6"
            >
              <span className="font-bold text-lg">{age.label}</span>
              <span className="text-sm opacity-80">{age.subtitle}</span>
            </Button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.key)}
              className="rounded-full"
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${category.color}`}></span>
              {category.label}
            </Button>
          ))}
        </div>

        {/* Camp Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campTracks[selectedAge as keyof typeof campTracks]
            ?.filter(camp => selectedCategory === "all" || camp.category === selectedCategory)
            .map((camp, index) => (
            <Card key={index} variant="camp" className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {camp.badge}
                  </Badge>
                  <span className="text-2xl font-bold text-primary">{camp.price}</span>
                </div>
                <CardTitle className="text-xl mb-2">{camp.title}</CardTitle>
                <p className="text-muted-foreground italic">{camp.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2">
                    {camp.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Duration:</strong> {camp.duration}
                  </p>
                  <Button variant="camp" className="w-full">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampTracksSection;