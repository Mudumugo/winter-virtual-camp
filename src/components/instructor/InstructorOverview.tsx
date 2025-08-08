import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  BookOpen,
  MessageSquare,
  Video,
  CheckCircle
} from "lucide-react";

// Mock data for instructor stats
const stats = [
  {
    title: "Active Camps",
    value: "5",
    change: "+2 this week",
    icon: Calendar,
    description: "Currently teaching camps"
  },
  {
    title: "Total Students",
    value: "47",
    change: "+8 new enrollments",
    icon: Users,
    description: "Across all camps"
  },
  {
    title: "This Week Sessions",
    value: "12",
    change: "3 remaining",
    icon: Clock,
    description: "Scheduled sessions"
  },
  {
    title: "Completion Rate",
    value: "94%",
    change: "+5% from last month",
    icon: TrendingUp,
    description: "Student success rate"
  }
];

const todaySchedule = [
  {
    id: 1,
    time: "10:00 AM",
    camp: "Web Development Basics",
    students: 12,
    type: "live",
    duration: "2 hours"
  },
  {
    id: 2,
    time: "2:00 PM",
    camp: "Python for Beginners",
    students: 8,
    type: "live",
    duration: "1.5 hours"
  },
  {
    id: 3,
    time: "4:30 PM",
    camp: "Game Development with Unity",
    students: 15,
    type: "live",
    duration: "2 hours"
  }
];

const recentMessages = [
  {
    id: 1,
    from: "Sarah Johnson",
    subject: "Question about Python loops",
    time: "10 minutes ago",
    unread: true
  },
  {
    id: 2,
    from: "Mike Chen",
    subject: "Project submission",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    from: "Emma Davis",
    subject: "Schedule change request",
    time: "2 hours ago",
    unread: false
  }
];

export function InstructorOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your camps today, Tuesday, August 7th
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-accent font-medium">
                {stat.change}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your upcoming camp sessions for today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{session.time}</span>
                    <Badge variant="outline" className="text-xs">
                      <Video className="h-3 w-3 mr-1" />
                      {session.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground font-medium">{session.camp}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {session.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </span>
                  </div>
                </div>
                <Button size="sm" className="ml-4">
                  Start Session
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Recent Messages
            </CardTitle>
            <CardDescription>
              Latest messages from students and parents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{message.from}</span>
                    {message.unread && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground">{message.subject}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Messages
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm">Mark Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-sm">Send Announcement</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">View Student Progress</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm">Access Resources</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}