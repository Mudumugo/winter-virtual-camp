import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Users, 
  Play,
  MessageSquare,
  FileText,
  ExternalLink,
  Star,
  Target,
  BookOpen,
  Video
} from "lucide-react";

// Mock data for student's enrolled camps
const enrolledCamps = [
  {
    id: 1,
    name: "Web Development Basics",
    description: "Learn HTML, CSS, and JavaScript fundamentals",
    category: "Web Development",
    instructor: {
      name: "Ms. Sarah Johnson",
      avatar: "/placeholder-instructor.jpg",
      rating: 4.9
    },
    ageGroup: "13-16",
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    status: "active",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    progress: 60,
    nextSession: "2024-08-07 10:00",
    meetingLink: "https://zoom.us/j/123456789",
    totalSessions: 10,
    completedSessions: 6,
    currentTopic: "Interactive Web Components",
    classmates: 11
  },
  {
    id: 2,
    name: "Python for Beginners",
    description: "Introduction to programming with Python",
    category: "Programming",
    instructor: {
      name: "Mr. David Chen",
      avatar: "/placeholder-instructor.jpg",
      rating: 4.8
    },
    ageGroup: "14-17",
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    status: "active",
    schedule: "Tue, Thu - 2:00 PM",
    progress: 40,
    nextSession: "2024-08-08 14:00",
    meetingLink: "https://zoom.us/j/987654321",
    totalSessions: 8,
    completedSessions: 3,
    currentTopic: "Functions and Modules",
    classmates: 7
  },
  {
    id: 3,
    name: "Digital Art & Design",
    description: "Create stunning digital artwork using professional tools",
    category: "Creative Arts",
    instructor: {
      name: "Ms. Emily Rodriguez",
      avatar: "/placeholder-instructor.jpg",
      rating: 4.9
    },
    ageGroup: "12-16",
    startDate: "2024-08-19",
    endDate: "2024-08-30",
    status: "upcoming",
    schedule: "Mon, Wed, Fri - 3:00 PM",
    progress: 0,
    nextSession: "2024-08-19 15:00",
    meetingLink: "https://zoom.us/j/456789123",
    totalSessions: 8,
    completedSessions: 0,
    currentTopic: "Introduction to Digital Design",
    classmates: 0
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground";
    case "upcoming":
      return "bg-secondary text-secondary-foreground";
    case "completed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Web Development":
      return "bg-primary/10 text-primary border-primary/20";
    case "Programming":
      return "bg-accent/10 text-accent border-accent/20";
    case "Creative Arts":
      return "bg-secondary/10 text-secondary border-secondary/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function StudentMyCamps() {
  const [selectedCamp, setSelectedCamp] = useState<typeof enrolledCamps[0] | null>(null);

  const activeCamps = enrolledCamps.filter(camp => camp.status === "active");
  const upcomingCamps = enrolledCamps.filter(camp => camp.status === "upcoming");
  const completedCamps = enrolledCamps.filter(camp => camp.status === "completed");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Camps</h1>
        <p className="text-muted-foreground mt-2">
          Track your enrolled camps, progress, and upcoming sessions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
                <p className="text-2xl font-bold text-foreground">{enrolledCamps.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Camps</p>
                <p className="text-2xl font-bold text-accent">{activeCamps.length}</p>
              </div>
              <Play className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {enrolledCamps.reduce((sum, camp) => sum + camp.completedSessions, 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-secondary">{upcomingCamps.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camps Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {enrolledCamps.map((camp) => (
          <Card key={camp.id} className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{camp.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {camp.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(camp.status)} variant="secondary">
                  {camp.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className={getCategoryColor(camp.category)}>
                  {camp.category}
                </Badge>
                <Badge variant="outline">Ages {camp.ageGroup}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Instructor Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{camp.instructor.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-current text-accent" />
                    <span>{camp.instructor.rating}</span>
                    <span>•</span>
                    <span>{camp.classmates} classmates</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              {camp.status === "active" && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {camp.completedSessions}/{camp.totalSessions} sessions
                    </span>
                  </div>
                  <Progress value={camp.progress} className="h-2" />
                </div>
              )}

              {/* Current Topic */}
              {camp.status === "active" && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Current Topic</p>
                  <p className="text-sm text-muted-foreground">{camp.currentTopic}</p>
                </div>
              )}

              {/* Schedule Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {camp.schedule}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                </div>
              </div>

              {/* Next Session */}
              {camp.status === "active" && (
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium text-foreground mb-1">Next Session</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(camp.nextSession).toLocaleDateString()} at {new Date(camp.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {camp.status === "active" && (
                  <Button size="sm" className="flex-1">
                    <Video className="h-4 w-4 mr-2" />
                    Join Session
                  </Button>
                )}
                
                {camp.status === "upcoming" && (
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Starts {new Date(camp.startDate).toLocaleDateString()}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Materials
                </Button>
              </div>

              {/* Quick Links */}
              {camp.status === "active" && (
                <div className="flex gap-2 text-xs">
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Meeting Link
                  </Button>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    Lesson Notes
                  </Button>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    Assignments
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}