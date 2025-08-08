import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Users, 
  TrendingUp, 
  MessageSquare,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  Filter
} from "lucide-react";

// Mock student data across instructor's camps
const students = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    camp: "Web Development Basics",
    age: 15,
    progress: 85,
    attendance: 95,
    skillLevel: "Advanced",
    status: "active",
    lastActive: "2 hours ago",
    projects: 3,
    completedTasks: 12,
    totalTasks: 15,
    parentContact: "mom.johnson@email.com",
    notes: "Excellent problem-solving skills, always helps other students"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com", 
    camp: "Python for Beginners",
    age: 14,
    progress: 70,
    attendance: 88,
    skillLevel: "Intermediate",
    status: "active",
    lastActive: "1 day ago",
    projects: 2,
    completedTasks: 8,
    totalTasks: 12,
    parentContact: "dad.chen@email.com",
    notes: "Great attention to detail, needs encouragement with complex concepts"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    camp: "Game Development with Unity",
    age: 16,
    progress: 92,
    attendance: 100,
    skillLevel: "Advanced",
    status: "active", 
    lastActive: "30 minutes ago",
    projects: 4,
    completedTasks: 18,
    totalTasks: 20,
    parentContact: "mom.davis@email.com",
    notes: "Natural talent for game design, very creative"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.r@email.com",
    camp: "Web Development Basics",
    age: 13,
    progress: 45,
    attendance: 75,
    skillLevel: "Beginner",
    status: "needs-attention",
    lastActive: "3 days ago",
    projects: 1,
    completedTasks: 5,
    totalTasks: 15,
    parentContact: "parent.rodriguez@email.com",
    notes: "Struggling with CSS concepts, needs extra support"
  },
  {
    id: 5,
    name: "Zoe Williams", 
    email: "zoe.w@email.com",
    camp: "Python for Beginners",
    age: 15,
    progress: 88,
    attendance: 92,
    skillLevel: "Advanced",
    status: "active",
    lastActive: "1 hour ago",
    projects: 3,
    completedTasks: 10,
    totalTasks: 12,
    parentContact: "dad.williams@email.com",
    notes: "Quick learner, always asks thoughtful questions"
  }
];

function getSkillLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-secondary text-secondary-foreground";
    case "Intermediate":
      return "bg-accent text-accent-foreground";
    case "Advanced":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground";
    case "needs-attention":
      return "bg-destructive text-destructive-foreground";
    case "completed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function InstructorStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campFilter, setCampFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCamp = campFilter === "all" || student.camp === campFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesCamp && matchesStatus;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === "active").length;
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);
  const needsAttention = students.filter(s => s.status === "needs-attention").length;

  const uniqueCamps = [...new Set(students.map(s => s.camp))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Students</h1>
        <p className="text-muted-foreground mt-2">
          Track student progress and manage your classroom
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
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
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-accent">{activeStudents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold text-destructive">{needsAttention}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={campFilter} onValueChange={setCampFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by camp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Camps</SelectItem>
                {uniqueCamps.map(camp => (
                  <SelectItem key={camp} value={camp}>{camp}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="needs-attention">Needs Attention</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-student-${student.id}.jpg`} alt={student.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>Age {student.age} • {student.email}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)} variant="secondary">
                  {student.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Camp and Skill Level */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-primary border-primary/20">
                  {student.camp}
                </Badge>
                <Badge className={getSkillLevelColor(student.skillLevel)} variant="secondary">
                  {student.skillLevel}
                </Badge>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span className="font-medium">{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2" />
              </div>

              {/* Task Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">{student.completedTasks}/{student.totalTasks}</span>
                </div>
                <Progress 
                  value={(student.completedTasks / student.totalTasks) * 100} 
                  className="h-2" 
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="font-medium text-foreground">{student.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="font-medium text-foreground">{student.projects}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="font-medium text-foreground text-xs">{student.lastActive}</p>
                </div>
              </div>

              {/* Notes */}
              {student.notes && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground">{student.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Parent
                </Button>
                <Button variant="outline" size="sm">
                  View Progress
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}