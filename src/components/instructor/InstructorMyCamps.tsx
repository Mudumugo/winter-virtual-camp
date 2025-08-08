import { useState } from "react";
import { ViewStudentsModal } from "./ViewStudentsModal";
import { CampMessagingModal } from "./CampMessagingModal";
import { LessonPlanModal } from "./LessonPlanModal";
import { StartSessionModal } from "./StartSessionModal";
import { SessionControlPanel } from "./SessionControlPanel";
import { EndSessionModal } from "./EndSessionModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin,
  Play,
  MessageSquare,
  Settings,
  ExternalLink
} from "lucide-react";

// Mock data for instructor's assigned camps
const assignedCamps = [
  {
    id: 1,
    name: "Web Development Basics",
    description: "Learn HTML, CSS, and JavaScript fundamentals",
    category: "Web Development",
    ageGroup: "13-16",
    students: 12,
    maxCapacity: 15,
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    status: "active",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    progress: 60,
    nextSession: "2024-08-07 10:00",
    meetingLink: "https://zoom.us/j/123456789",
    totalSessions: 10,
    completedSessions: 6
  },
  {
    id: 2,
    name: "Python for Beginners",
    description: "Introduction to programming with Python",
    category: "Programming",
    ageGroup: "14-17",
    students: 8,
    maxCapacity: 12,
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    status: "active",
    schedule: "Tue, Thu - 2:00 PM",
    progress: 70,
    nextSession: "2024-08-08 14:00",
    meetingLink: "https://zoom.us/j/987654321",
    totalSessions: 8,
    completedSessions: 5
  },
  {
    id: 3,
    name: "Game Development with Unity",
    description: "Create 2D games using Unity engine",
    category: "Game Development",
    ageGroup: "15-18",
    students: 15,
    maxCapacity: 15,
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    status: "active",
    schedule: "Mon, Wed, Fri - 4:30 PM",
    progress: 50,
    nextSession: "2024-08-07 16:30",
    meetingLink: "https://zoom.us/j/456789123",
    totalSessions: 10,
    completedSessions: 5
  },
  {
    id: 4,
    name: "Mobile App Development",
    description: "Build mobile apps with React Native",
    category: "Mobile Development",
    ageGroup: "16-18",
    students: 0,
    maxCapacity: 12,
    startDate: "2024-08-19",
    endDate: "2024-08-30",
    status: "upcoming",
    schedule: "Tue, Thu - 3:00 PM",
    progress: 0,
    nextSession: "2024-08-19 15:00",
    meetingLink: "https://zoom.us/j/789123456",
    totalSessions: 8,
    completedSessions: 0
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
    case "Game Development":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "Mobile Development":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function InstructorMyCamps() {
  const [selectedCamp, setSelectedCamp] = useState<typeof assignedCamps[0] | null>(null);
  const [viewStudentsOpen, setViewStudentsOpen] = useState(false);
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [lessonPlanOpen, setLessonPlanOpen] = useState(false);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [sessionControlOpen, setSessionControlOpen] = useState(false);
  const [endSessionOpen, setEndSessionOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<typeof assignedCamps[0] | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);

  const activeCamps = assignedCamps.filter(camp => camp.status === "active");
  const upcomingCamps = assignedCamps.filter(camp => camp.status === "upcoming");
  const totalStudents = assignedCamps.reduce((sum, camp) => sum + camp.students, 0);

  const handleStartSession = (camp: typeof assignedCamps[0]) => {
    setSelectedCamp(camp);
    setStartSessionOpen(true);
  };

  const handleSessionStarted = () => {
    if (selectedCamp) {
      setActiveSession(selectedCamp);
      setSessionControlOpen(true);
      setSessionStartTime(Date.now());
    }
  };

  const handleEndSession = () => {
    if (activeSession) {
      setSessionControlOpen(false);
      setEndSessionOpen(true);
    }
  };

  const handleSessionEnded = (sessionData: any) => {
    console.log('Session completed:', sessionData);
    setActiveSession(null);
    setSessionStartTime(0);
    setEndSessionOpen(false);
  };

  const getSessionDuration = () => {
    if (!sessionStartTime) return 0;
    return Math.floor((Date.now() - sessionStartTime) / 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Camps</h1>
        <p className="text-muted-foreground mt-2">
          Manage your assigned camps and track student progress
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Camps</p>
                <p className="text-2xl font-bold text-foreground">{assignedCamps.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
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
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
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
              <Clock className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camps Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {assignedCamps.map((camp) => (
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
              {/* Enrollment Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Enrollment</span>
                  <span className="font-medium">
                    {camp.students}/{camp.maxCapacity} students
                  </span>
                </div>
                <Progress 
                  value={(camp.students / camp.maxCapacity) * 100} 
                  className="h-2"
                />
              </div>

              {/* Camp Progress */}
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
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Next Session</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(camp.nextSession).toLocaleDateString()} at {new Date(camp.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {camp.status === "active" && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleStartSession(camp)}
                    disabled={activeSession?.id === camp.id}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {activeSession?.id === camp.id ? 'Session Active' : 'Start Session'}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCamp(camp);
                    setViewStudentsOpen(true);
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Students
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedCamp(camp);
                    setMessagingOpen(true);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>

                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Links */}
              {camp.status === "active" && (
                <div className="flex gap-2 text-xs">
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Meeting Link
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-primary"
                    onClick={() => {
                      setSelectedCamp(camp);
                      setLessonPlanOpen(true);
                    }}
                  >
                    Lesson Plan
                  </Button>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    Resources
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Students Modal */}
      <ViewStudentsModal
        open={viewStudentsOpen}
        onOpenChange={setViewStudentsOpen}
        camp={selectedCamp}
      />

      {/* Camp Messaging Modal */}
      <CampMessagingModal
        open={messagingOpen}
        onOpenChange={setMessagingOpen}
        camp={selectedCamp}
      />

      {/* Lesson Plan Modal */}
      <LessonPlanModal
        open={lessonPlanOpen}
        onOpenChange={setLessonPlanOpen}
        camp={selectedCamp}
      />

      {/* Start Session Modal */}
      <StartSessionModal
        open={startSessionOpen}
        onOpenChange={setStartSessionOpen}
        camp={selectedCamp}
        onStartSession={handleSessionStarted}
      />

      {/* Session Control Panel */}
      <SessionControlPanel
        isOpen={sessionControlOpen}
        onClose={() => setSessionControlOpen(false)}
        onEndSession={handleEndSession}
        camp={activeSession}
      />

      {/* End Session Modal */}
      <EndSessionModal
        open={endSessionOpen}
        onOpenChange={setEndSessionOpen}
        camp={activeSession}
        sessionDuration={getSessionDuration()}
        onConfirmEnd={handleSessionEnded}
      />
    </div>
  );
}