import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Award, 
  AlertTriangle,
  CheckCircle,
  UserCheck,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Star,
  Target,
  Zap
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "247",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    description: "from last month",
    color: "text-blue-600"
  },
  {
    title: "Active Camps",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: Calendar,
    description: "camps running",
    color: "text-green-600"
  },
  {
    title: "Revenue",
    value: "$24,680",
    change: "+18%",
    changeType: "positive",
    icon: DollarSign,
    description: "this month",
    color: "text-emerald-600"
  },
  {
    title: "Completion Rate",
    value: "94%",
    change: "+3%",
    changeType: "positive",
    icon: Award,
    description: "student completion",
    color: "text-purple-600"
  },
  {
    title: "Instructors",
    value: "12",
    change: "+1",
    changeType: "positive",
    icon: UserCheck,
    description: "active instructors",
    color: "text-orange-600"
  },
  {
    title: "Sessions Today",
    value: "15",
    change: "On schedule",
    changeType: "neutral",
    icon: Activity,
    description: "live sessions",
    color: "text-cyan-600"
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
    description: "student feedback",
    color: "text-yellow-600"
  },
  {
    title: "Support Tickets",
    value: "3",
    change: "-2",
    changeType: "positive",
    icon: MessageSquare,
    description: "open tickets",
    color: "text-red-600"
  }
];

const recentActivity = [
  { 
    student: "Emma Johnson", 
    action: "Completed Web Development Camp", 
    time: "2 hours ago",
    type: "completion",
    avatar: "EJ"
  },
  { 
    student: "Liam Chen", 
    action: "Enrolled in Python Basics", 
    time: "4 hours ago",
    type: "enrollment",
    avatar: "LC"
  },
  { 
    student: "Sophia Davis", 
    action: "Submitted Final Project", 
    time: "6 hours ago",
    type: "submission",
    avatar: "SD"
  },
  { 
    student: "Noah Wilson", 
    action: "Started Game Development", 
    time: "1 day ago",
    type: "start",
    avatar: "NW"
  },
  { 
    student: "Ava Martinez", 
    action: "Achieved 100% attendance", 
    time: "1 day ago",
    type: "achievement",
    avatar: "AM"
  }
];

const upcomingCamps = [
  { 
    name: "Advanced JavaScript", 
    startDate: "July 15", 
    students: 24, 
    instructor: "Sarah Mitchell",
    capacity: 30,
    status: "Open"
  },
  { 
    name: "Mobile App Development", 
    startDate: "July 22", 
    students: 18, 
    instructor: "Mike Rodriguez",
    capacity: 25,
    status: "Open"
  },
  { 
    name: "AI & Machine Learning", 
    startDate: "July 29", 
    students: 15, 
    instructor: "Dr. Emily Watson",
    capacity: 20,
    status: "Open"
  }
];

const quickActions = [
  { title: "Add New Camp", icon: Calendar, action: "create-camp", href: "/dashboard/camps" },
  { title: "Invite Instructor", icon: UserCheck, action: "invite-instructor" },
  { title: "Send Announcement", icon: MessageSquare, action: "send-announcement" },
  { title: "Generate Report", icon: Target, action: "generate-report" }
];

const alerts = [
  {
    type: "warning",
    message: "2 instructors need to complete training",
    action: "Review Training",
    icon: AlertTriangle
  },
  {
    type: "info",
    message: "New feature: Video recordings available",
    action: "Learn More",
    icon: Zap
  },
  {
    type: "success",
    message: "All systems operational",
    action: "View Status",
    icon: CheckCircle
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "completion": return CheckCircle;
    case "enrollment": return Users;
    case "submission": return BookOpen;
    case "start": return Activity;
    case "achievement": return Award;
    default: return Activity;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "completion": return "text-green-600";
    case "enrollment": return "text-blue-600";
    case "submission": return "text-purple-600";
    case "start": return "text-orange-600";
    case "achievement": return "text-yellow-600";
    default: return "text-gray-600";
  }
};

const getAlertStyle = (type: string) => {
  switch (type) {
    case "warning": return "border-orange-200 bg-orange-50 text-orange-800";
    case "info": return "border-blue-200 bg-blue-50 text-blue-800";
    case "success": return "border-green-200 bg-green-50 text-green-800";
    default: return "border-gray-200 bg-gray-50 text-gray-800";
  }
};

export function DashboardOverview() {
  const navigate = useNavigate();

  const handleQuickAction = (action: string, href?: string) => {
    if (href) {
      navigate(href);
    } else {
      // Handle other actions
      console.log("Quick action:", action);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your tech camp platform</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button 
              key={action.action} 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => handleQuickAction(action.action, action.href)}
            >
              <action.icon className="h-4 w-4" />
              {action.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="grid gap-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getAlertStyle(alert.type)} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <alert.icon className="h-5 w-5" />
              <span className="font-medium">{alert.message}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-inherit hover:bg-white/20">
              {alert.action}
            </Button>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-muted/50`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground mb-1">{stat.value}</div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.changeType === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                  {stat.changeType === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Recent Activity */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest student activities and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{activity.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{activity.student}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${getActivityColor(activity.type)}`} />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Camps */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Camps
            </CardTitle>
            <CardDescription>Starting soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCamps.map((camp, index) => {
                const enrollmentPercentage = Math.round((camp.students / camp.capacity) * 100);
                return (
                  <div key={index} className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-card-foreground text-sm">{camp.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {camp.startDate}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Enrollment</span>
                        <span>{camp.students}/{camp.capacity}</span>
                      </div>
                      <Progress value={enrollmentPercentage} className="h-1.5" />
                      <div className="text-xs text-muted-foreground">
                        Instructor: {camp.instructor}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                Manage All Camps
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Student Satisfaction</span>
                <div className="flex items-center gap-2">
                  <Progress value={96} className="w-20 h-2" />
                  <span className="text-sm font-medium">96%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Instructor Utilization</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Camp Capacity</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue Target</span>
                <div className="flex items-center gap-2">
                  <Progress value={72} className="w-20 h-2" />
                  <span className="text-sm font-medium">72%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Active and upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Python Basics - Live</p>
                  <p className="text-xs text-muted-foreground">9:00 AM - 10:30 AM</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">Live</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded bg-blue-50 border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Web Development</p>
                  <p className="text-xs text-muted-foreground">11:00 AM - 12:30 PM</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded bg-orange-50 border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mobile App Development</p>
                  <p className="text-xs text-muted-foreground">2:00 PM - 3:30 PM</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}