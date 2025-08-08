import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Download, 
  ExternalLink,
  Search,
  FileText,
  Video,
  Code,
  Presentation,
  FolderOpen,
  Plus
} from "lucide-react";

// Mock resources data
const resources = [
  {
    id: 1,
    title: "Python Fundamentals - Lesson Plans",
    description: "Complete lesson plans for 8-week Python course including exercises and assessments",
    type: "lesson-plan",
    category: "Python",
    format: "PDF",
    downloads: 156,
    size: "2.4 MB",
    lastUpdated: "2024-08-01",
    tags: ["beginner", "python", "lesson-plan"]
  },
  {
    id: 2,
    title: "Web Development Project Templates",
    description: "Starter templates for HTML, CSS, and JavaScript projects",
    type: "template",
    category: "Web Development",
    format: "ZIP",
    downloads: 203,
    size: "1.8 MB",
    lastUpdated: "2024-07-28",
    tags: ["html", "css", "javascript", "template"]
  },
  {
    id: 3,
    title: "Game Development Tutorial Videos",
    description: "Step-by-step Unity tutorials for creating 2D games",
    type: "video",
    category: "Game Development",
    format: "MP4",
    downloads: 89,
    size: "450 MB",
    lastUpdated: "2024-07-25",
    tags: ["unity", "gamedev", "tutorial", "video"]
  },
  {
    id: 4,
    title: "Code Review Checklist",
    description: "Comprehensive checklist for reviewing student code submissions",
    type: "checklist",
    category: "Assessment",
    format: "PDF",
    downloads: 124,
    size: "320 KB",
    lastUpdated: "2024-07-20",
    tags: ["code-review", "assessment", "checklist"]
  },
  {
    id: 5,
    title: "Interactive Coding Exercises",
    description: "Collection of hands-on programming challenges for different skill levels",
    type: "exercise",
    category: "Programming",
    format: "HTML",
    downloads: 167,
    size: "5.2 MB",
    lastUpdated: "2024-07-15",
    tags: ["exercises", "interactive", "coding"]
  },
  {
    id: 6,
    title: "Student Progress Tracking Sheets",
    description: "Excel templates for tracking individual student progress and achievements",
    type: "template",
    category: "Assessment",
    format: "XLSX",
    downloads: 98,
    size: "1.1 MB",
    lastUpdated: "2024-07-10",
    tags: ["progress", "tracking", "assessment"]
  }
];

const categories = [
  { name: "All Resources", count: resources.length },
  { name: "Python", count: resources.filter(r => r.category === "Python").length },
  { name: "Web Development", count: resources.filter(r => r.category === "Web Development").length },
  { name: "Game Development", count: resources.filter(r => r.category === "Game Development").length },
  { name: "Assessment", count: resources.filter(r => r.category === "Assessment").length },
  { name: "Programming", count: resources.filter(r => r.category === "Programming").length }
];

function getTypeIcon(type: string) {
  switch (type) {
    case "lesson-plan":
      return <Presentation className="h-5 w-5 text-primary" />;
    case "template":
      return <Code className="h-5 w-5 text-accent" />;
    case "video":
      return <Video className="h-5 w-5 text-secondary" />;
    case "checklist":
      return <FileText className="h-5 w-5 text-destructive" />;
    case "exercise":
      return <BookOpen className="h-5 w-5 text-muted-foreground" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "lesson-plan":
      return "bg-primary/10 text-primary border-primary/20";
    case "template":
      return "bg-accent/10 text-accent border-accent/20";
    case "video":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "checklist":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "exercise":
      return "bg-muted/50 text-muted-foreground border-muted";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function InstructorResources() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teaching Resources</h1>
          <p className="text-muted-foreground mt-2">
            Access lesson plans, templates, and teaching materials
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="w-full p-3 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(resource.type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className={getTypeColor(resource.type)}>
                      {resource.type.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline">
                      {resource.format}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Resource Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{resource.downloads} downloads</span>
                    <span>{resource.size}</span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
              <CardDescription>
                Frequently used resources and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Presentation className="h-5 w-5 text-primary" />
                  <span className="text-sm">Lesson Templates</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-sm">Code Examples</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm">Assessment Tools</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}