import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar, 
  Clock, 
  Star,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  Download,
  Play
} from "lucide-react";

// Mock data for student assignments
const assignments = [
  {
    id: 1,
    title: "Build a Personal Portfolio Website",
    description: "Create a responsive personal portfolio using HTML, CSS, and JavaScript",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    assignedDate: "2024-08-05",
    dueDate: "2024-08-10",
    status: "in-progress",
    progress: 75,
    points: 100,
    difficulty: "intermediate",
    type: "project",
    requirements: [
      "Responsive design that works on mobile and desktop",
      "At least 3 sections: About, Projects, Contact",
      "Interactive navigation menu",
      "Professional styling with CSS"
    ],
    submissionFormat: "GitHub repository link",
    resources: ["Portfolio Examples", "CSS Grid Guide", "JavaScript DOM Tutorial"]
  },
  {
    id: 2,
    title: "Create a Calculator App",
    description: "Build a functional calculator using Python with a graphical interface",
    camp: "Python for Beginners",
    instructor: "Mr. David Chen",
    assignedDate: "2024-08-06",
    dueDate: "2024-08-12",
    status: "not-started",
    progress: 0,
    points: 80,
    difficulty: "beginner",
    type: "project",
    requirements: [
      "Basic arithmetic operations (+, -, *, /)",
      "Clear and equals functionality",
      "Error handling for invalid operations",
      "User-friendly interface"
    ],
    submissionFormat: "Python file (.py)",
    resources: ["Tkinter Tutorial", "Python Functions Guide", "Calculator Logic Examples"]
  },
  {
    id: 3,
    title: "CSS Animation Challenge",
    description: "Create engaging animations using CSS keyframes and transitions",
    camp: "Web Development Basics",
    instructor: "Ms. Sarah Johnson",
    assignedDate: "2024-08-01",
    dueDate: "2024-08-05",
    status: "completed",
    progress: 100,
    points: 60,
    difficulty: "beginner",
    type: "exercise",
    grade: 95,
    feedback: "Excellent work! Your animations are smooth and creative. Great use of timing functions.",
    submissionDate: "2024-08-04",
    submissionFormat: "CodePen link",
    resources: ["CSS Animation Guide", "Keyframes Tutorial"]
  },
  {
    id: 4,
    title: "Python Data Analysis",
    description: "Analyze a dataset using Python pandas and create visualizations",
    camp: "Python for Beginners",
    instructor: "Mr. David Chen",
    assignedDate: "2024-08-08",
    dueDate: "2024-08-15",
    status: "upcoming",
    progress: 0,
    points: 120,
    difficulty: "advanced",
    type: "project",
    requirements: [
      "Load and clean the provided dataset",
      "Perform statistical analysis",
      "Create at least 3 different visualizations",
      "Write a summary report of findings"
    ],
    submissionFormat: "Jupyter notebook (.ipynb)",
    resources: ["Pandas Documentation", "Matplotlib Tutorial", "Sample Datasets"]
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-accent text-accent-foreground";
    case "in-progress":
      return "bg-secondary text-secondary-foreground";
    case "not-started":
      return "bg-muted text-muted-foreground";
    case "upcoming":
      return "bg-primary/10 text-primary border-primary/20";
    case "overdue":
      return "bg-destructive text-destructive-foreground";
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

function getDaysUntilDue(dueDate: string) {
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function StudentAssignments() {
  const [selectedTab, setSelectedTab] = useState("current");

  const currentAssignments = assignments.filter(a => 
    a.status === "in-progress" || a.status === "not-started"
  );
  const completedAssignments = assignments.filter(a => a.status === "completed");
  const upcomingAssignments = assignments.filter(a => a.status === "upcoming");

  const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);
  const earnedPoints = completedAssignments.reduce((sum, a) => 
    sum + (a.grade ? Math.round((a.grade / 100) * a.points) : 0), 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Assignments</h1>
        <p className="text-muted-foreground mt-2">
          Track your assignments, submissions, and grades
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-2xl font-bold text-primary">{currentAssignments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-accent">{completedAssignments.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
                <p className="text-2xl font-bold text-foreground">{earnedPoints}/{totalPoints}</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-2xl font-bold text-secondary">
                  {completedAssignments.length > 0
                    ? Math.round(completedAssignments.reduce((sum, a) => sum + (a.grade || 0), 0) / completedAssignments.length)
                    : 0}%
                </p>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-6">
            {currentAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6">
            {upcomingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-6">
            {completedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: any }) {
  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
  
  return (
    <Card className="hover:shadow-card transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <CardDescription className="mt-1">
              {assignment.description}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(assignment.status)} variant="secondary">
              {assignment.status.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
              {assignment.difficulty}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{assignment.camp}</span>
          <span>•</span>
          <span>{assignment.instructor}</span>
          <span>•</span>
          <span>{assignment.points} points</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        {assignment.status === "in-progress" && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{assignment.progress}%</span>
            </div>
            <Progress value={assignment.progress} className="h-2" />
          </div>
        )}

        {/* Grade */}
        {assignment.status === "completed" && assignment.grade && (
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Grade: {assignment.grade}%</p>
                <p className="text-sm text-muted-foreground">
                  Points earned: {Math.round((assignment.grade / 100) * assignment.points)}/{assignment.points}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(assignment.grade / 20)
                        ? "fill-current text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            {assignment.feedback && (
              <p className="text-sm text-muted-foreground mt-2">{assignment.feedback}</p>
            )}
          </div>
        )}

        {/* Due Date */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          {assignment.status !== "completed" && assignment.status !== "upcoming" && (
            <div className={`flex items-center gap-1 ${
              daysUntilDue < 3 ? "text-destructive" : "text-muted-foreground"
            }`}>
              <Clock className="h-4 w-4" />
              <span>
                {daysUntilDue < 0
                  ? `${Math.abs(daysUntilDue)} days overdue`
                  : daysUntilDue === 0
                  ? "Due today"
                  : `${daysUntilDue} days left`
                }
              </span>
            </div>
          )}
        </div>

        {/* Requirements */}
        {assignment.requirements && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {assignment.requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources */}
        {assignment.resources && assignment.resources.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Resources:</p>
            <div className="flex flex-wrap gap-2">
              {assignment.resources.map((resource: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                  <Download className="h-3 w-3 mr-1" />
                  {resource}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {assignment.status === "not-started" && (
            <Button size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Start Assignment
            </Button>
          )}
          
          {assignment.status === "in-progress" && (
            <>
              <Button size="sm" className="flex-1">
                Continue Working
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </>
          )}

          {assignment.status === "completed" && (
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Submission
            </Button>
          )}

          {assignment.status === "upcoming" && (
            <Button variant="secondary" size="sm" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Available {new Date(assignment.assignedDate).toLocaleDateString()}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}