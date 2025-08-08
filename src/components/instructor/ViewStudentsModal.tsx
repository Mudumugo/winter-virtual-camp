import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Users,
  Calendar,
  Filter
} from "lucide-react";

// Mock students data for a specific camp
const getCampStudents = (campId: number) => {
  const allStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      age: 15,
      enrollmentDate: "2024-08-01",
      progress: 85,
      attendance: 95,
      skillLevel: "Advanced",
      status: "active",
      lastActive: "2 hours ago",
      sessionsAttended: 8,
      totalSessions: 10,
      assignments: { completed: 12, total: 15 },
      parentContact: "mom.johnson@email.com",
      notes: "Excellent problem-solving skills, always helps other students",
      campId: 1
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com", 
      age: 14,
      enrollmentDate: "2024-08-01",
      progress: 70,
      attendance: 88,
      skillLevel: "Intermediate",
      status: "active",
      lastActive: "1 day ago",
      sessionsAttended: 7,
      totalSessions: 10,
      assignments: { completed: 8, total: 15 },
      parentContact: "dad.chen@email.com",
      notes: "Great attention to detail, needs encouragement with complex concepts",
      campId: 1
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      age: 16,
      enrollmentDate: "2024-08-01",
      progress: 92,
      attendance: 100,
      skillLevel: "Advanced",
      status: "active", 
      lastActive: "30 minutes ago",
      sessionsAttended: 10,
      totalSessions: 10,
      assignments: { completed: 14, total: 15 },
      parentContact: "mom.davis@email.com",
      notes: "Natural talent for web design, very creative",
      campId: 1
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      age: 13,
      enrollmentDate: "2024-08-01",
      progress: 45,
      attendance: 75,
      skillLevel: "Beginner",
      status: "needs-attention",
      lastActive: "3 days ago",
      sessionsAttended: 5,
      totalSessions: 10,
      assignments: { completed: 5, total: 15 },
      parentContact: "parent.rodriguez@email.com",
      notes: "Struggling with CSS concepts, needs extra support",
      campId: 1
    },
    {
      id: 5,
      name: "Zoe Williams", 
      email: "zoe.w@email.com",
      age: 15,
      enrollmentDate: "2024-08-01",
      progress: 88,
      attendance: 92,
      skillLevel: "Advanced",
      status: "active",
      lastActive: "1 hour ago",
      sessionsAttended: 9,
      totalSessions: 10,
      assignments: { completed: 13, total: 15 },
      parentContact: "dad.williams@email.com",
      notes: "Quick learner, always asks thoughtful questions",
      campId: 1
    }
  ];

  return allStudents.filter(student => student.campId === campId);
};

interface ViewStudentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  camp: {
    id: number;
    name: string;
    students: number;
    maxCapacity: number;
    startDate: string;
    endDate: string;
  } | null;
}

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

export function ViewStudentsModal({ open, onOpenChange, camp }: ViewStudentsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const students = camp ? getCampStudents(camp.id) : [];
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const avgProgress = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)
    : 0;
  
  const avgAttendance = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
    : 0;

  const needsAttention = students.filter(s => s.status === "needs-attention").length;

  const exportStudentList = () => {
    const csvContent = [
      ['Name', 'Email', 'Age', 'Progress', 'Attendance', 'Status', 'Last Active'],
      ...students.map(student => [
        student.name,
        student.email,
        student.age.toString(),
        `${student.progress}%`,
        `${student.attendance}%`,
        student.status,
        student.lastActive
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${camp?.name.replace(/\s+/g, '_')}_students.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!camp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Students in {camp.name}</DialogTitle>
          <DialogDescription>
            Manage and track student progress for this camp
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-6">
          {/* Camp Overview Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Enrolled</p>
                    <p className="text-2xl font-bold text-foreground">{students.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                    <p className="text-2xl font-bold text-accent">{avgProgress}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-2xl font-bold text-foreground">{avgAttendance}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-primary" />
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

          {/* Filters and Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-4 items-center flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
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

                <Button onClick={exportStudentList} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-card transition-shadow">
                  <CardHeader className="pb-3">
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
                    {/* Skill Level */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Skill Level</span>
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

                    {/* Assignments */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Assignments</span>
                        <span className="font-medium">{student.assignments.completed}/{student.assignments.total}</span>
                      </div>
                      <Progress 
                        value={(student.assignments.completed / student.assignments.total) * 100} 
                        className="h-2" 
                      />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="text-muted-foreground">Attendance</p>
                        <p className="font-medium text-foreground">{student.attendance}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sessions</p>
                        <p className="font-medium text-foreground">{student.sessionsAttended}/{student.totalSessions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Active</p>
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
                        View Profile
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
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search criteria or filters."
                      : "No students are enrolled in this camp yet."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}