import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Circle,
  Target,
  Package,
  FileText,
  Star,
  Download,
  Play,
  Edit3,
} from "lucide-react";
import { useState } from "react";

interface LessonSession {
  id: string;
  sessionNumber: number;
  title: string;
  date: string;
  duration: string;
  status: "completed" | "upcoming" | "in-progress";
  objectives: string[];
  materials: string[];
  outline: {
    activity: string;
    duration: string;
    description: string;
  }[];
  assignments: string[];
  assessmentCriteria: string[];
  resources: {
    title: string;
    url: string;
    type: "video" | "document" | "website" | "tool";
  }[];
  instructorNotes?: string;
}

interface Camp {
  id: number;
  name: string;
  category: string;
  totalSessions: number;
  completedSessions: number;
}

interface LessonPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  camp: Camp | null;
}

const mockLessonPlans: Record<number, LessonSession[]> = {
  1: [
    {
      id: "s1",
      sessionNumber: 1,
      title: "Introduction to Python & Setup",
      date: "2024-08-12",
      duration: "2 hours",
      status: "completed",
      objectives: [
        "Understand what programming is and why Python is popular",
        "Set up Python development environment",
        "Write your first 'Hello World' program",
        "Learn basic Python syntax and structure"
      ],
      materials: [
        "Computer with internet access",
        "Python 3.9+ installed",
        "VS Code or preferred IDE",
        "Camp workbook (pages 1-10)"
      ],
      outline: [
        {
          activity: "Welcome & Introductions",
          duration: "15 min",
          description: "Welcome students, introduce instructors, icebreaker activity"
        },
        {
          activity: "What is Programming?",
          duration: "20 min",
          description: "Interactive presentation about programming concepts and Python's role"
        },
        {
          activity: "Environment Setup",
          duration: "30 min",
          description: "Guide students through Python and IDE installation"
        },
        {
          activity: "First Python Program",
          duration: "45 min",
          description: "Write and run Hello World, explore basic syntax"
        },
        {
          activity: "Practice Exercises",
          duration: "25 min",
          description: "Simple print statements and variable assignments"
        },
        {
          activity: "Wrap-up & Next Session Preview",
          duration: "5 min",
          description: "Review what we learned, preview next session"
        }
      ],
      assignments: [
        "Complete setup verification worksheet",
        "Write 3 different Hello World variations",
        "Read Chapter 1 of camp workbook"
      ],
      assessmentCriteria: [
        "Successfully runs Python on their computer",
        "Can write and execute a simple print statement",
        "Demonstrates understanding of basic Python syntax"
      ],
      resources: [
        {
          title: "Python Official Documentation",
          url: "https://docs.python.org/3/",
          type: "website"
        },
        {
          title: "VS Code Python Setup Guide",
          url: "https://code.visualstudio.com/docs/python/python-tutorial",
          type: "document"
        },
        {
          title: "Introduction to Programming Video",
          url: "https://example.com/intro-video",
          type: "video"
        }
      ],
      instructorNotes: "Session went well. Most students completed setup successfully. Sarah needed extra help with VS Code installation - follow up next session."
    },
    {
      id: "s2",
      sessionNumber: 2,
      title: "Variables, Data Types & Input",
      date: "2024-08-14",
      duration: "2 hours",
      status: "upcoming",
      objectives: [
        "Understand different data types in Python",
        "Learn to create and use variables",
        "Get user input and display output",
        "Practice with numbers, strings, and booleans"
      ],
      materials: [
        "Python environment from Session 1",
        "Camp workbook (pages 11-25)",
        "Data types reference sheet",
        "Practice exercise files"
      ],
      outline: [
        {
          activity: "Review & Questions",
          duration: "10 min",
          description: "Quick review of Session 1, address any questions"
        },
        {
          activity: "Understanding Variables",
          duration: "25 min",
          description: "What are variables, naming conventions, assignment"
        },
        {
          activity: "Data Types Exploration",
          duration: "35 min",
          description: "Strings, integers, floats, booleans - hands-on examples"
        },
        {
          activity: "Input and Output",
          duration: "30 min",
          description: "Using input() function, formatting output"
        },
        {
          activity: "Mini Project: Personal Info Collector",
          duration: "35 min",
          description: "Create a program that collects and displays user information"
        },
        {
          activity: "Sharing & Reflection",
          duration: "5 min",
          description: "Students share their programs, reflect on learning"
        }
      ],
      assignments: [
        "Complete variables practice worksheet",
        "Create a 'About Me' program using different data types",
        "Watch recommended video on data types"
      ],
      assessmentCriteria: [
        "Can create variables with appropriate names",
        "Understands difference between data types",
        "Successfully uses input() and print() functions"
      ],
      resources: [
        {
          title: "Python Data Types Guide",
          url: "https://example.com/data-types",
          type: "document"
        },
        {
          title: "Variables Best Practices",
          url: "https://example.com/variables-video",
          type: "video"
        }
      ]
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in-progress":
      return "bg-blue-500";
    case "upcoming":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case "video":
      return Play;
    case "document":
      return FileText;
    case "website":
      return BookOpen;
    case "tool":
      return Package;
    default:
      return FileText;
  }
};

export function LessonPlanModal({ open, onOpenChange, camp }: LessonPlanModalProps) {
  const [selectedSession, setSelectedSession] = useState<LessonSession | null>(null);
  const [instructorNotes, setInstructorNotes] = useState("");

  const lessonPlans = camp ? mockLessonPlans[camp.id] || [] : [];
  const progressPercentage = camp ? (camp.completedSessions / camp.totalSessions) * 100 : 0;

  const handleSessionSelect = (session: LessonSession) => {
    setSelectedSession(session);
    setInstructorNotes(session.instructorNotes || "");
  };

  const handleSaveNotes = () => {
    if (selectedSession) {
      // In a real app, save to backend
      console.log("Saving notes for session", selectedSession.id, instructorNotes);
    }
  };

  const handleMarkComplete = (sessionId: string) => {
    // In a real app, update backend
    console.log("Marking session complete:", sessionId);
  };

  if (!camp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Lesson Plans - {camp.name}
          </DialogTitle>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <Progress value={progressPercentage} className="w-32" />
              <span className="text-sm font-medium">
                {camp.completedSessions}/{camp.totalSessions} sessions
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </DialogHeader>

        <div className="flex gap-6 h-[70vh]">
          {/* Sessions List */}
          <div className="w-1/3">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Sessions
            </h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {lessonPlans.map((session) => (
                  <Card
                    key={session.id}
                    className={`cursor-pointer transition-colors hover:bg-accent ${
                      selectedSession?.id === session.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">Session {session.sessionNumber}</Badge>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`} />
                          </div>
                          <h4 className="font-medium text-sm">{session.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                        {session.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Session Details */}
          <div className="flex-1">
            {selectedSession ? (
              <ScrollArea className="h-full">
                <div className="space-y-6">
                  {/* Session Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedSession.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{selectedSession.date}</span>
                        <span>•</span>
                        <span>{selectedSession.duration}</span>
                        <span>•</span>
                        <Badge 
                          variant={selectedSession.status === "completed" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {selectedSession.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedSession.status !== "completed" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleMarkComplete(selectedSession.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="outline">Lesson Outline</TabsTrigger>
                      <TabsTrigger value="materials">Materials</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* Learning Objectives */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Target className="h-4 w-4" />
                            Learning Objectives
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedSession.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Circle className="h-4 w-4 mt-0.5 text-primary" />
                                <span className="text-sm">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Assignments */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <FileText className="h-4 w-4" />
                            Assignments & Homework
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedSession.assignments.map((assignment, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Checkbox id={`assignment-${index}`} />
                                <label htmlFor={`assignment-${index}`} className="text-sm">
                                  {assignment}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Assessment Criteria */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Star className="h-4 w-4" />
                            Assessment Criteria
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedSession.assessmentCriteria.map((criteria, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                <span className="text-sm">{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="outline" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Session Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedSession.outline.map((item, index) => (
                              <div key={index} className="flex gap-4 p-3 rounded-lg bg-accent/50">
                                <div className="text-sm font-medium text-primary min-w-[60px]">
                                  {item.duration}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{item.activity}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="materials" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Package className="h-4 w-4" />
                            Required Materials
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            {selectedSession.materials.map((material, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded border">
                                <Checkbox id={`material-${index}`} />
                                <label htmlFor={`material-${index}`} className="text-sm">
                                  {material}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="resources" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Additional Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedSession.resources.map((resource, index) => {
                              const IconComponent = getResourceIcon(resource.type);
                              return (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{resource.title}</h4>
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {resource.type}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      Open
                                    </a>
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Edit3 className="h-4 w-4" />
                            Instructor Notes
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Textarea
                            placeholder="Add your session notes, observations, and reminders here..."
                            value={instructorNotes}
                            onChange={(e) => setInstructorNotes(e.target.value)}
                            className="min-h-[200px]"
                          />
                          <div className="flex justify-end">
                            <Button onClick={handleSaveNotes}>
                              Save Notes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a session to view lesson plan details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}