import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Monitor, 
  Wifi, 
  BookOpen, 
  Award,
  Mail,
  Phone,
  Edit,
  UserPlus,
  Download,
  Link as LinkIcon
 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { EditCampModal } from "./EditCampModal";
import { AddStudentModal } from "./AddStudentModal";
import { SendAnnouncementModal } from "./SendAnnouncementModal";

interface Camp {
  id: number;
  name: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  duration: string;
  capacity: number;
  enrolled: number;
  status: string;
  schedule: string;
  location: string;
  category: string;
  ageGroup: string;
}

interface CampDetailsModalProps {
  camp: Camp | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CampDetailsModal({ camp, isOpen, onClose }: CampDetailsModalProps) {
  const { toast } = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [currentCamp, setCurrentCamp] = useState<Camp | null>(camp);

  // Update currentCamp when camp prop changes
  useEffect(() => {
    if (camp) {
      console.log("CampDetailsModal - Updating currentCamp to:", camp.name);
      setCurrentCamp(camp);
    }
  }, [camp]);

  console.log("CampDetailsModal - Props received:", { camp: camp?.name, isOpen, campExists: !!camp });

  if (!camp || !currentCamp) {
    console.log("CampDetailsModal - Returning null because camp is null or currentCamp is null");
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Upcoming": return "bg-primary text-primary-foreground";
      case "Completed": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Programming": return "bg-primary text-primary-foreground";
      case "Computer Skills": return "bg-blue-500 text-white";
      case "Typing": return "bg-green-500 text-white";
      case "Digital Safety": return "bg-orange-500 text-white";
      case "Screen Wellness": return "bg-purple-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const enrollmentPercentage = (camp.enrolled / camp.capacity) * 100;

  // Mock virtual camp data
  const virtualDetails = {
    meetingLink: "https://zoom.us/j/123456789",
    meetingId: "123 456 789",
    passcode: "TechCamp2024",
    platform: "Zoom",
    techRequirements: [
      "Computer or tablet with camera and microphone",
      "Stable internet connection (minimum 5 Mbps)",
      "Latest Chrome, Firefox, or Safari browser",
      "Headphones recommended for better audio"
    ],
    materials: [
      "Digital workbook (provided)",
      "Practice exercises and projects",
      "Certificates upon completion",
      "Resource links and tutorials"
    ],
    schedule: [
      { day: "Monday", time: "10:00 AM - 11:30 AM", topic: "Introduction & Setup" },
      { day: "Tuesday", time: "10:00 AM - 11:30 AM", topic: "Core Concepts" },
      { day: "Wednesday", time: "10:00 AM - 11:30 AM", topic: "Hands-on Practice" },
      { day: "Thursday", time: "10:00 AM - 11:30 AM", topic: "Project Work" },
      { day: "Friday", time: "10:00 AM - 11:30 AM", topic: "Presentation & Wrap-up" }
    ]
  };

  const enrolledStudents = [
    { id: 1, name: "Emma Johnson", email: "emma.j@email.com", joinDate: "2024-07-01" },
    { id: 2, name: "Liam Chen", email: "liam.c@email.com", joinDate: "2024-07-02" },
    { id: 3, name: "Sophia Martinez", email: "sophia.m@email.com", joinDate: "2024-07-03" },
    { id: 4, name: "Noah Williams", email: "noah.w@email.com", joinDate: "2024-07-04" },
    { id: 5, name: "Ava Brown", email: "ava.b@email.com", joinDate: "2024-07-05" }
  ].slice(0, currentCamp.enrolled);

  const handleEditCamp = (updatedCamp: Camp) => {
    setCurrentCamp(updatedCamp);
  };

  const handleAddStudent = (studentData: any) => {
    setCurrentCamp(prev => prev ? { ...prev, enrolled: prev.enrolled + 1 } : null);
  };

  const handleExportList = () => {
    const csvContent = [
      ["Name", "Email", "Join Date"],
      ...enrolledStudents.map(student => [student.name, student.email, student.joinDate])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCamp.name.replace(/\s+/g, '_')}_student_list.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export completed",
      description: "Student list has been downloaded as CSV file.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">{currentCamp.name}</DialogTitle>
              <p className="text-muted-foreground mt-1">{currentCamp.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getCategoryColor(currentCamp.category)}>
                {currentCamp.category}
              </Badge>
              <Badge className={getStatusColor(currentCamp.status)}>
                {currentCamp.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Camp Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Camp Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{currentCamp.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Schedule</p>
                      <p className="text-sm text-muted-foreground">{currentCamp.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Age Group</p>
                      <p className="text-sm text-muted-foreground">Ages {currentCamp.ageGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Instructor</p>
                      <p className="text-sm text-muted-foreground">{currentCamp.instructor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Meeting Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Virtual Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Platform</p>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{virtualDetails.platform}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Meeting ID</p>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-mono">{virtualDetails.meetingId}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Meeting Link</p>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono flex-1">{virtualDetails.meetingLink}</span>
                    <Button size="sm" variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Passcode</p>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{virtualDetails.passcode}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tech Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Technical Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {virtualDetails.techRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Daily Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {virtualDetails.schedule.map((day, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{day.day}</p>
                        <p className="text-sm text-muted-foreground">{day.time}</p>
                      </div>
                      <p className="text-sm">{day.topic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Enrollment & Actions */}
          <div className="space-y-6">
            {/* Enrollment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentCamp.enrolled}</div>
                  <div className="text-sm text-muted-foreground">of {currentCamp.capacity} students</div>
                </div>
                <Progress value={(currentCamp.enrolled / currentCamp.capacity) * 100} className="w-full" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round((currentCamp.enrolled / currentCamp.capacity) * 100)}% capacity
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => setEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Camp
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setAddStudentModalOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setAnnouncementModalOpen(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleExportList}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
              </CardContent>
            </Card>

            {/* Enrolled Students */}
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {enrolledStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {currentCamp.enrolled === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No students enrolled yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Materials & Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Materials Provided</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {virtualDetails.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      {material}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal Components */}
        <EditCampModal
          camp={currentCamp}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditCamp}
        />

        <AddStudentModal
          isOpen={addStudentModalOpen}
          onClose={() => setAddStudentModalOpen(false)}
          onAddStudent={handleAddStudent}
          campName={currentCamp.name}
        />

        <SendAnnouncementModal
          isOpen={announcementModalOpen}
          onClose={() => setAnnouncementModalOpen(false)}
          campName={currentCamp.name}
          enrolledCount={currentCamp.enrolled}
        />
      </DialogContent>
    </Dialog>
  );
}