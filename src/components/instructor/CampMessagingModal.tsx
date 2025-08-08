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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send,
  Users,
  MessageSquare,
  Bell,
  Calendar,
  Clock,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock students data for messaging
const getCampStudentsForMessaging = (campId: number) => {
  const allStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      parentName: "Mrs. Johnson",
      parentEmail: "mom.johnson@email.com",
      campId: 1
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      parentName: "Mr. Chen",
      parentEmail: "dad.chen@email.com",
      campId: 1
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      parentName: "Mrs. Davis",
      parentEmail: "mom.davis@email.com",
      campId: 1
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      parentName: "Mrs. Rodriguez",
      parentEmail: "parent.rodriguez@email.com",
      campId: 1
    },
    {
      id: 5,
      name: "Zoe Williams", 
      email: "zoe.w@email.com",
      parentName: "Mr. Williams",
      parentEmail: "dad.williams@email.com",
      campId: 1
    }
  ];

  return allStudents.filter(student => student.campId === campId);
};

const messageTemplates = [
  {
    id: 1,
    title: "Welcome Message",
    subject: "Welcome to {campName}!",
    content: "Welcome to {campName}! We're excited to have {studentName} join us for this amazing learning journey. The camp will begin on {startDate} at {time}. Please make sure your child has access to a computer and stable internet connection.\n\nLooking forward to a great camp experience!\n\nBest regards,\n{instructorName}"
  },
  {
    id: 2,
    title: "Session Reminder",
    subject: "Reminder: {campName} session tomorrow",
    content: "This is a friendly reminder that {studentName} has a {campName} session tomorrow at {time}.\n\nPlease ensure they're ready 5-10 minutes before the session starts.\n\nSee you soon!\n{instructorName}"
  },
  {
    id: 3,
    title: "Progress Update",
    subject: "{studentName}'s Progress in {campName}",
    content: "I wanted to share some exciting news about {studentName}'s progress in {campName}!\n\n{studentName} has been doing excellent work and has completed {progress}% of the course material. They've shown great improvement in {skills}.\n\nKeep up the great work!\n\nBest regards,\n{instructorName}"
  },
  {
    id: 4,
    title: "Assignment Reminder",
    subject: "Assignment due for {campName}",
    content: "Hi! Just a quick reminder that {studentName} has an assignment due for {campName} on {dueDate}.\n\nIf you have any questions or need help, please don't hesitate to reach out.\n\nThanks!\n{instructorName}"
  }
];

interface CampMessagingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  camp: {
    id: number;
    name: string;
    students: number;
    startDate: string;
    schedule: string;
  } | null;
}

export function CampMessagingModal({ open, onOpenChange, camp }: CampMessagingModalProps) {
  const [activeTab, setActiveTab] = useState("compose");
  const [messageType, setMessageType] = useState<"announcement" | "individual">("announcement");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [recipients, setRecipients] = useState<"students" | "parents" | "both">("parents");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"normal" | "high" | "urgent">("normal");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();

  const students = camp ? getCampStudentsForMessaging(camp.id) : [];

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(s => s.id));
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === parseInt(templateId));
    if (template && camp) {
      setSelectedTemplate(templateId);
      setSubject(template.subject.replace('{campName}', camp.name));
      setMessage(template.content
        .replace(/{campName}/g, camp.name)
        .replace(/{startDate}/g, new Date(camp.startDate).toLocaleDateString())
        .replace(/{time}/g, camp.schedule)
        .replace(/{instructorName}/g, 'John Smith')
      );
    }
  };

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message fields.",
        variant: "destructive"
      });
      return;
    }

    if (messageType === "individual" && selectedStudents.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one student.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending message
    const recipientCount = messageType === "announcement" 
      ? students.length 
      : selectedStudents.length;

    toast({
      title: "Message Sent!",
      description: `Your message was sent to ${recipientCount} ${recipientCount === 1 ? 'recipient' : 'recipients'}.`,
    });

    // Reset form
    setSubject("");
    setMessage("");
    setSelectedStudents([]);
    setSelectedTemplate("");
    onOpenChange(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-secondary";
      case "urgent":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4" />;
      case "urgent":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  if (!camp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Message Students - {camp.name}
          </DialogTitle>
          <DialogDescription>
            Send messages to students and parents in this camp
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose Message</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="flex-1 overflow-hidden flex flex-col space-y-6">
            {/* Message Type Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Message Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant={messageType === "announcement" ? "default" : "outline"}
                    onClick={() => setMessageType("announcement")}
                    className="flex-1"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Camp Announcement
                  </Button>
                  <Button
                    variant={messageType === "individual" ? "default" : "outline"}
                    onClick={() => setMessageType("individual")}
                    className="flex-1"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Individual Message
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {messageType === "announcement" 
                    ? "Send a message to all students and parents in this camp"
                    : "Send a message to specific students and their parents"
                  }
                </p>
              </CardContent>
            </Card>

            {/* Recipients Selection */}
            {messageType === "individual" && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Select Recipients
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedStudents.length === students.length ? "Deselect All" : "Select All"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 max-h-48 overflow-y-auto">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => handleStudentToggle(student.id)}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder-student-${student.id}.jpg`} alt={student.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Parent: {student.parentName} ({student.parentEmail})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Message Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Message Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Send To</label>
                    <Select value={recipients} onValueChange={(value: "students" | "parents" | "both") => setRecipients(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parents">Parents Only</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                        <SelectItem value="both">Both Students & Parents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={priority} onValueChange={(value: "normal" | "high" | "urgent") => setPriority(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Message Composition */}
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>Compose Message</span>
                  {priority !== "normal" && (
                    <Badge variant="outline" className={getPriorityColor(priority)}>
                      {getPriorityIcon(priority)}
                      <span className="ml-1 capitalize">{priority}</span>
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="Enter message subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[150px] resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {messageType === "announcement" 
                      ? `Sending to all ${students.length} ${recipients === "both" ? "students & parents" : recipients}`
                      : `Sending to ${selectedStudents.length} selected ${recipients === "both" ? "students & parents" : recipients}`
                    }
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 overflow-y-auto space-y-4">
            <div className="grid gap-4">
              {messageTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-card transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleTemplateSelect(template.id.toString());
                          setActiveTab("compose");
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Subject:</p>
                        <p className="text-sm font-medium">{template.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preview:</p>
                        <p className="text-sm text-foreground line-clamp-3">
                          {template.content.slice(0, 150)}...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}