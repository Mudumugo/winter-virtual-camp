import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Play,
  Video,
  MapPin,
  Bell,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JoinSessionModal } from "./JoinSessionModal";
import { StudentSessionControls } from "./StudentSessionControls";

// Mock data for student's schedule
const upcomingSessions = [
  {
    id: 1,
    camp: "Web Development Basics",
    topic: "Interactive Web Components",
    instructor: "Ms. Sarah Johnson",
    date: "2024-08-07",
    time: "10:00",
    duration: 90,
    status: "confirmed",
    meetingLink: "https://zoom.us/j/123456789",
    type: "live",
    materials: ["HTML Forms Guide", "CSS Animations Tutorial"]
  },
  {
    id: 2,
    camp: "Python for Beginners",
    topic: "Functions and Modules",
    instructor: "Mr. David Chen",
    date: "2024-08-08",
    time: "14:00",
    duration: 90,
    status: "confirmed",
    meetingLink: "https://zoom.us/j/987654321",
    type: "live",
    materials: ["Python Functions Cheatsheet", "Module Examples"]
  },
  {
    id: 3,
    camp: "Web Development Basics",
    topic: "JavaScript Events",
    instructor: "Ms. Sarah Johnson",
    date: "2024-08-09",
    time: "10:00",
    duration: 90,
    status: "scheduled",
    meetingLink: "https://zoom.us/j/123456789",
    type: "live",
    materials: ["Event Handling Guide"]
  },
  {
    id: 4,
    camp: "Python for Beginners",
    topic: "Working with Files",
    instructor: "Mr. David Chen",
    date: "2024-08-10",
    time: "14:00",
    duration: 90,
    status: "scheduled",
    meetingLink: "https://zoom.us/j/987654321",
    type: "live",
    materials: ["File I/O Examples", "Practice Exercises"]
  }
];

const todaySessions = upcomingSessions.filter(session => 
  new Date(session.date).toDateString() === new Date().toDateString()
);

const thisWeekSessions = upcomingSessions.filter(session => {
  const sessionDate = new Date(session.date);
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return sessionDate >= today && sessionDate <= weekFromNow;
});

function getStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-accent text-accent-foreground";
    case "scheduled":
      return "bg-secondary text-secondary-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatTime(timeString: string) {
  const time = new Date(`2024-01-01T${timeString}:00`);
  return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }
}

export function StudentSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [isSessionMinimized, setIsSessionMinimized] = useState(false);

  const handleJoinSession = (session: any) => {
    setSelectedSession(session);
    setShowJoinModal(true);
  };

  const handleStartSession = () => {
    setActiveSession({
      ...selectedSession,
      startTime: new Date()
    });
    setShowJoinModal(false);
  };

  const handleLeaveSession = () => {
    setActiveSession(null);
    setIsSessionMinimized(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your upcoming camp sessions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Sessions</p>
                <p className="text-2xl font-bold text-primary">{todaySessions.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-accent">{thisWeekSessions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Upcoming</p>
                <p className="text-2xl font-bold text-foreground">{upcomingSessions.length}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Select a date to view sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="lg:col-span-2">
          <Tabs value={selectedView} onValueChange={setSelectedView}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="upcoming">All Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Sessions</CardTitle>
                  <CardDescription>Your sessions for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {todaySessions.length === 0 ? (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No sessions scheduled for today</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todaySessions.map((session) => (
                        <SessionCard 
                          key={session.id} 
                          session={session} 
                          onJoinSession={handleJoinSession}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Sessions</CardTitle>
                  <CardDescription>Your sessions for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {thisWeekSessions.map((session) => (
                      <SessionCard 
                        key={session.id} 
                        session={session} 
                        onJoinSession={handleJoinSession}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Upcoming Sessions</CardTitle>
                  <CardDescription>All your scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <SessionCard 
                        key={session.id} 
                        session={session} 
                        onJoinSession={handleJoinSession}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Join Session Modal */}
      {showJoinModal && selectedSession && (
        <JoinSessionModal
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          session={selectedSession}
          onJoinSession={handleStartSession}
        />
      )}

      {/* Active Session Controls */}
      {activeSession && (
        <StudentSessionControls
          session={activeSession}
          onLeaveSession={handleLeaveSession}
          onToggleMinimize={() => setIsSessionMinimized(!isSessionMinimized)}
          isMinimized={isSessionMinimized}
        />
      )}
    </div>
  );
}

function SessionCard({ session, onJoinSession }: { session: any; onJoinSession: (session: any) => void }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-foreground">{session.topic}</h4>
          <p className="text-sm text-muted-foreground">{session.camp}</p>
        </div>
        <Badge className={getStatusColor(session.status)} variant="secondary">
          {session.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatTime(session.time)} ({session.duration} min)</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{session.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Live Session</span>
          </div>
        </div>
      </div>

      {/* Materials */}
      {session.materials && session.materials.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">Session Materials:</p>
          <div className="flex flex-wrap gap-1">
            {session.materials.map((material: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {material}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onJoinSession(session)}
        >
          <Play className="h-4 w-4 mr-2" />
          Join Session
        </Button>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}