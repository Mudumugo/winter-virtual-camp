import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Save,
  Trophy,
  Star,
  Target,
  BookOpen,
  Clock,
  Award,
  Camera,
  Settings
} from "lucide-react";

// Mock student data
const studentData = {
  id: 1,
  name: "Alex Smith",
  email: "alex.smith@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder-student.jpg",
  dateOfBirth: "2008-05-15",
  location: "San Francisco, CA",
  joinDate: "2024-07-01",
  bio: "Passionate about technology and eager to learn programming. I love creating websites and solving coding challenges!",
  interests: ["Web Development", "Python Programming", "Game Design", "AI/ML"],
  learningGoals: [
    "Build my first full-stack web application",
    "Learn Python for data science",
    "Create a mobile app",
    "Understand machine learning basics"
  ]
};

const enrolledCamps = [
  {
    name: "Web Development Basics",
    progress: 60,
    status: "active",
    instructor: "Ms. Sarah Johnson",
    startDate: "2024-08-05",
    grade: null
  },
  {
    name: "Python for Beginners",
    progress: 40,
    status: "active", 
    instructor: "Mr. David Chen",
    startDate: "2024-08-05",
    grade: null
  },
  {
    name: "Introduction to Programming",
    progress: 100,
    status: "completed",
    instructor: "Ms. Emily Rodriguez",
    startDate: "2024-07-01",
    grade: 92
  }
];

const achievements = [
  { name: "First Project Completed", icon: "🎯", date: "Aug 1", description: "Successfully completed your first coding project" },
  { name: "Perfect Attendance", icon: "⭐", date: "Aug 5", description: "Attended all sessions for two weeks straight" },
  { name: "Code Contributor", icon: "💻", date: "Aug 6", description: "Shared helpful code examples with classmates" },
  { name: "Quick Learner", icon: "🚀", date: "Aug 7", description: "Completed 5 lessons ahead of schedule" },
  { name: "Team Player", icon: "🤝", date: "Aug 8", description: "Helped classmates with their projects" },
  { name: "Creative Designer", icon: "🎨", date: "Aug 9", description: "Created an outstanding website design" }
];

const stats = {
  totalHours: 45,
  completedProjects: 8,
  averageGrade: 87,
  streakDays: 12,
  totalPoints: 850
};

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(studentData);

  const handleSave = () => {
    // Save changes logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(studentData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and track your learning progress
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={studentData.avatar} />
                <AvatarFallback className="text-2xl">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-xl">{studentData.name}</CardTitle>
            <CardDescription>Student • Member since {new Date(studentData.joinDate).toLocaleDateString()}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{studentData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{studentData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{studentData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Born {new Date(studentData.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="pt-4 border-t">
              <h4 className="font-medium text-foreground mb-3">Learning Stats</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="font-bold text-primary">{stats.totalHours}</p>
                  <p className="text-muted-foreground">Hours</p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="font-bold text-accent">{stats.completedProjects}</p>
                  <p className="text-muted-foreground">Projects</p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="font-bold text-secondary">{stats.averageGrade}%</p>
                  <p className="text-muted-foreground">Avg Grade</p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="font-bold text-primary">{stats.streakDays}</p>
                  <p className="text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editedData.bio}
                      onChange={(e) => setEditedData({...editedData, bio: e.target.value})}
                      className="min-h-[120px]"
                    />
                  ) : (
                    <p className="text-muted-foreground">{studentData.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {studentData.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                        {interest}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {studentData.learningGoals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5" />
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              {/* Current Camps */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Camps</CardTitle>
                  <CardDescription>Your enrolled camps and progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCamps.map((camp, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{camp.name}</h4>
                          <p className="text-sm text-muted-foreground">with {camp.instructor}</p>
                        </div>
                        <Badge variant={camp.status === "completed" ? "default" : "secondary"}>
                          {camp.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{camp.progress}%</span>
                        </div>
                        <Progress value={camp.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                        <span>Started {new Date(camp.startDate).toLocaleDateString()}</span>
                        {camp.grade && (
                          <span className="font-medium text-accent">Grade: {camp.grade}%</span>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Assignment Completion</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Session Attendance</span>
                          <span>96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Participation</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{stats.totalPoints} Points Earned</p>
                          <p className="text-sm text-muted-foreground">Across all camps</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium">{stats.totalHours} Hours Learned</p>
                          <p className="text-sm text-muted-foreground">Total study time</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="font-medium">{stats.streakDays} Day Streak</p>
                          <p className="text-sm text-muted-foreground">Current learning streak</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Achievements</CardTitle>
                  <CardDescription>Milestones and accomplishments in your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{achievement.name}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                        </div>
                        <Badge variant="outline" className="bg-accent/10 text-accent">
                          <Award className="h-3 w-3 mr-1" />
                          New
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input
                        value={isEditing ? editedData.name : studentData.name}
                        onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        value={isEditing ? editedData.email : studentData.email}
                        onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <Input
                        value={isEditing ? editedData.phone : studentData.phone}
                        onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Location</label>
                      <Input
                        value={isEditing ? editedData.location : studentData.location}
                        onChange={(e) => setEditedData({...editedData, location: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive email updates about your camps</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Privacy Settings</p>
                        <p className="text-sm text-muted-foreground">Control who can see your profile and activity</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}