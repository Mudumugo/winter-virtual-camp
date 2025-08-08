import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Library, 
  Search, 
  Download, 
  Eye,
  Star,
  BookOpen,
  Video,
  FileText,
  Link,
  Code,
  Image,
  Filter,
  Heart,
  Clock
} from "lucide-react";

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Complete HTML & CSS Guide",
    description: "Comprehensive guide covering all HTML elements and CSS properties with examples",
    type: "document",
    category: "Web Development",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    format: "PDF",
    size: "2.5 MB",
    downloads: 156,
    rating: 4.8,
    isFavorite: true,
    dateAdded: "2024-08-01",
    difficulty: "beginner",
    tags: ["HTML", "CSS", "Fundamentals", "Reference"]
  },
  {
    id: 2,
    title: "JavaScript DOM Manipulation Tutorial",
    description: "Interactive tutorial showing how to manipulate web page elements using JavaScript",
    type: "video",
    category: "Web Development",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    format: "MP4",
    duration: "45 min",
    views: 89,
    rating: 4.9,
    isFavorite: false,
    dateAdded: "2024-08-02",
    difficulty: "intermediate",
    tags: ["JavaScript", "DOM", "Interactive", "Tutorial"]
  },
  {
    id: 3,
    title: "Python Functions Cheat Sheet",
    description: "Quick reference for Python function syntax, built-in functions, and best practices",
    type: "document",
    category: "Programming",
    camp: "Python for Beginners",
    instructor: "Mr. David Chen",
    format: "PDF",
    size: "1.8 MB",
    downloads: 203,
    rating: 4.7,
    isFavorite: true,
    dateAdded: "2024-08-03",
    difficulty: "beginner",
    tags: ["Python", "Functions", "Reference", "Syntax"]
  },
  {
    id: 4,
    title: "Portfolio Design Examples",
    description: "Collection of 20 professional portfolio websites with analysis of design choices",
    type: "gallery",
    category: "Design",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    format: "Web Gallery",
    images: 20,
    views: 134,
    rating: 4.6,
    isFavorite: false,
    dateAdded: "2024-08-04",
    difficulty: "intermediate",
    tags: ["Portfolio", "Design", "Inspiration", "Examples"]
  },
  {
    id: 5,
    title: "Python Calculator Project Template",
    description: "Starter code and project structure for building a calculator application",
    type: "code",
    category: "Programming",
    camp: "Python for Beginners",
    instructor: "Mr. David Chen",
    format: "Python Files",
    size: "524 KB",
    downloads: 178,
    rating: 4.5,
    isFavorite: false,
    dateAdded: "2024-08-05",
    difficulty: "beginner",
    tags: ["Python", "Project", "Calculator", "Template"]
  },
  {
    id: 6,
    title: "CSS Animation Workshop Recording",
    description: "Full recording of the weekend workshop covering advanced CSS animations and transitions",
    type: "video",
    category: "Web Development",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    format: "MP4",
    duration: "2h 15min",
    views: 67,
    rating: 4.9,
    isFavorite: true,
    dateAdded: "2024-08-06",
    difficulty: "advanced",
    tags: ["CSS", "Animation", "Workshop", "Advanced"]
  }
];

const categories = ["All", "Web Development", "Programming", "Design"];
const types = ["All", "document", "video", "code", "gallery"];
const difficulties = ["All", "beginner", "intermediate", "advanced"];

function getTypeIcon(type: string) {
  switch (type) {
    case "document":
      return FileText;
    case "video":
      return Video;
    case "code":
      return Code;
    case "gallery":
      return Image;
    default:
      return FileText;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "document":
      return "bg-primary/10 text-primary border-primary/20";
    case "video":
      return "bg-accent/10 text-accent border-accent/20";
    case "code":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "gallery":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "beginner":
      return "bg-accent/10 text-accent border-accent/20";
    case "intermediate":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "advanced":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function StudentResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "All" || resource.difficulty === selectedDifficulty;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "favorites" && resource.isFavorite) ||
                      (selectedTab === "recent" && new Date(resource.dateAdded) > new Date("2024-08-05"));

    return matchesSearch && matchesCategory && matchesType && matchesDifficulty && matchesTab;
  });

  const favoriteResources = resources.filter(r => r.isFavorite);
  const recentResources = resources.filter(r => new Date(r.dateAdded) > new Date("2024-08-05"));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Resources</h1>
        <p className="text-muted-foreground mt-2">
          Access course materials, tutorials, and reference documents
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-2xl font-bold text-foreground">{resources.length}</p>
              </div>
              <Library className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold text-accent">{favoriteResources.length}</p>
              </div>
              <Heart className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold text-foreground">
                  {resources.filter(r => r.type === "video").length}
                </p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold text-secondary">{recentResources.length}</p>
              </div>
              <Clock className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Category:</span>
                <div className="flex gap-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Type:</span>
                <div className="flex gap-1">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Level:</span>
                <div className="flex gap-1">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ResourceGrid resources={filteredResources} />
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <ResourceGrid resources={filteredResources.filter(r => r.isFavorite)} />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <ResourceGrid resources={filteredResources.filter(r => new Date(r.dateAdded) > new Date("2024-08-05"))} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceGrid({ resources }: { resources: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => {
        const IconComponent = getTypeIcon(resource.type);
        
        return (
          <Card key={resource.id} className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className={getTypeColor(resource.type)}>
                    {resource.type}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className={`h-4 w-4 ${resource.isFavorite ? "fill-current text-accent" : ""}`} />
                </Button>
              </div>
              
              <div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="mt-1">
                  {resource.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{resource.camp}</span>
                <span>•</span>
                <span>{resource.instructor}</span>
              </div>

              {/* Resource Details */}
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Format: {resource.format}</div>
                  {resource.size && <div className="text-muted-foreground">Size: {resource.size}</div>}
                  {resource.duration && <div className="text-muted-foreground">Duration: {resource.duration}</div>}
                  {resource.images && <div className="text-muted-foreground">Images: {resource.images}</div>}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-accent" />
                    <span className="text-sm">{resource.rating}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {resource.downloads && `${resource.downloads} downloads`}
                    {resource.views && `${resource.views} views`}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {resource.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{resource.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Added {new Date(resource.dateAdded).toLocaleDateString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  {resource.type === "video" ? (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Watch
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}