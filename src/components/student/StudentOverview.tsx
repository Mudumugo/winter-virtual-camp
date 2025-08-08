import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JoinSessionModal } from "./JoinSessionModal";
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Clock,
  Users,
  Target,
  Play,
  MessageSquare,
  FileText,
  ChevronRight,
  Star,
  TrendingUp
} from "lucide-react";

// Mock data for student's camps and progress
const enrolledCamps = [
  {
    id: 1,
    name: "Web Development Basics",
    instructor: "Ms. Johnson",
    progress: 60,
    nextSession: "2024-08-07 10:00",
    totalSessions: 10,
    completedSessions: 6,
    status: "active"
  },
  {
    id: 2,
    name: "Python for Beginners",
    instructor: "Mr. Davis",
    progress: 40,
    nextSession: "2024-08-08 14:00",
    totalSessions: 8,
    completedSessions: 3,
    status: "active"
  }
];

const upcomingSessions = [
  {
    id: 1,
    camp: "Web Development Basics",
    date: "Today",
    time: "10:00 AM",
    duration: "90 min",
    topic: "Interactive Web Components",
    instructor: "Ms. Johnson"
  },
  {
    id: 2,
    camp: "Python for Beginners",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "90 min",
    topic: "Functions and Modules",
    instructor: "Mr. Davis"
  }
];

const recentAssignments = [
  {
    id: 1,
    title: "Build a Personal Portfolio",
    camp: "Web Development Basics",
    dueDate: "2024-08-10",
    status: "in-progress",
    progress: 75
  },
  {
    id: 2,
    title: "Create a Calculator App",
    camp: "Python for Beginners",
    dueDate: "2024-08-12",
    status: "not-started",
    progress: 0
  }
];

const achievements = [
  { name: "First Project Completed", icon: "🎯", date: "Aug 1" },
  { name: "5 Sessions Attended", icon: "📚", date: "Aug 5" },
  { name: "Perfect Attendance", icon: "⭐", date: "Aug 6" }
];

export function StudentOverview() {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  const totalSessions = enrolledCamps.reduce((sum, camp) => sum + camp.totalSessions, 0);
  const completedSessions = enrolledCamps.reduce((sum, camp) => sum + camp.completedSessions, 0);
  const overallProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const handleJoinSession = (session: any) => {
    setSelectedSession(session);
    setIsJoinModalOpen(true);
  };

  const handleActualJoinSession = () => {
    setIsJoinModalOpen(false);
    // Here you would typically redirect to the video call or show session controls
    console.log("Joining session:", selectedSession);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
        <p className="text-muted-foreground mt-2">
          Here's your learning progress and upcoming sessions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Camps</p>
                <p className="text-2xl font-bold text-primary">{enrolledCamps.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold text-accent">{overallProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedSessions}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-secondary">{achievements.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Camps */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Camps</CardTitle>
              <CardDescription>Your current enrolled camps and progress</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCamps.map((camp) => (
              <div key={camp.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{camp.name}</h4>
                    <p className="text-sm text-muted-foreground">with {camp.instructor}</p>
                  </div>
                  <Badge variant="outline" className="bg-accent/10 text-accent">
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{camp.completedSessions}/{camp.totalSessions} sessions</span>
                  </div>
                  <Progress value={camp.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm text-muted-foreground">
                    Next: {new Date(camp.nextSession).toLocaleDateString()} at {new Date(camp.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleJoinSession({
                      id: camp.id,
                      camp: camp.name,
                      topic: "Next Session",
                      instructor: camp.instructor,
                      time: new Date(camp.nextSession).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                      date: new Date(camp.nextSession).toLocaleDateString(),
                      duration: 90,
                      meetingLink: "https://meet.example.com/session-" + camp.id,
                      materials: ["Session slides", "Code examples", "Assignment details"]
                    })}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your next scheduled learning sessions</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View Schedule
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{session.topic}</h4>
                    <p className="text-sm text-muted-foreground">{session.camp}</p>
                  </div>
                  <Badge variant="outline">
                    {session.date}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {session.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {session.instructor}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex-1"
                    onClick={() => handleJoinSession({
                      ...session,
                      meetingLink: "https://meet.example.com/session-" + session.id,
                      materials: ["Session slides", "Code examples", "Assignment details"]
                    })}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Join Session
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Assignments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>Your current and upcoming assignments</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.camp}</p>
                  </div>
                  <Badge 
                    variant={assignment.status === 'in-progress' ? 'default' : 'secondary'}
                  >
                    {assignment.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </Badge>
                </div>
                
                {assignment.progress > 0 && (
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    {assignment.status === 'not-started' ? 'Start' : 'Continue'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">Earned on {achievement.date}</p>
                </div>
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  New
                </Badge>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline" size="sm">
                <Trophy className="h-4 w-4 mr-2" />
                View All Achievements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join Session Modal */}
      {selectedSession && (
        <JoinSessionModal 
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          session={selectedSession}
          onJoinSession={handleActualJoinSession}
        />
      )}
    </div>
  );
}