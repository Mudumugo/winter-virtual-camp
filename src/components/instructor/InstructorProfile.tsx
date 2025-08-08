import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Star,
  BookOpen,
  Users,
  Clock
} from "lucide-react";

// Mock instructor profile data
const instructorProfile = {
  id: 1,
  name: "John Smith",
  email: "john.smith@techtutor.com",
  phone: "+1 (555) 123-4567",
  bio: "Passionate software engineer with 8+ years of experience in web development and education. I love teaching young minds the fundamentals of programming and watching them build amazing projects.",
  location: "San Francisco, CA",
  joinDate: "2022-03-15",
  avatar: "/placeholder-instructor.jpg",
  specialties: ["Python", "JavaScript", "Web Development", "Game Development"],
  certifications: ["Certified Python Developer", "React Developer", "Unity Certified Associate"],
  education: "Bachelor's in Computer Science - Stanford University",
  experience: "8 years",
  teachingExperience: "3 years",
  rating: 4.9,
  totalStudents: 147,
  totalCamps: 12,
  totalHours: 240
};

const performanceStats = [
  {
    title: "Student Satisfaction",
    value: 96,
    description: "Average rating from student feedback"
  },
  {
    title: "Completion Rate",
    value: 94,
    description: "Students who complete their camps"
  },
  {
    title: "Attendance Rate",
    value: 88,
    description: "Average student attendance in sessions"
  },
  {
    title: "Response Time",
    value: 92,
    description: "Quick response to messages (within 2 hours)"
  }
];

const recentAchievements = [
  {
    title: "Top Instructor",
    description: "Highest rated instructor for Q2 2024",
    date: "2024-07-01",
    icon: <Award className="h-5 w-5 text-primary" />
  },
  {
    title: "100 Students Milestone",
    description: "Successfully taught 100+ students",
    date: "2024-06-15",
    icon: <Users className="h-5 w-5 text-accent" />
  },
  {
    title: "Perfect Attendance",
    description: "3 months with 100% session attendance",
    date: "2024-05-01",
    icon: <Calendar className="h-5 w-5 text-secondary" />
  }
];

export function InstructorProfile() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and teaching preferences
          </p>
        </div>
        
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={instructorProfile.avatar} alt={instructorProfile.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {instructorProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{instructorProfile.name}</h3>
                <p className="text-muted-foreground">Senior Programming Instructor</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="text-sm font-medium">{instructorProfile.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({instructorProfile.totalStudents} students)
                  </span>
                </div>
              </div>
            </div>

            {/* Basic Info Form */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={instructorProfile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={instructorProfile.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={instructorProfile.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={instructorProfile.location} />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={instructorProfile.bio}
                rows={4}
                placeholder="Tell students and parents about yourself..."
              />
            </div>

            {/* Specialties */}
            <div className="space-y-2">
              <Label>Specialties</Label>
              <div className="flex flex-wrap gap-2">
                {instructorProfile.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary">
                    {specialty}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Education & Experience */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input id="education" value={instructorProfile.education} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input id="experience" value={`${instructorProfile.teachingExperience} years`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Achievements */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Students</span>
                </div>
                <span className="font-medium">{instructorProfile.totalStudents}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Camps Taught</span>
                </div>
                <span className="font-medium">{instructorProfile.totalCamps}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Teaching Hours</span>
                </div>
                <span className="font-medium">{instructorProfile.totalHours}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Member Since</span>
                </div>
                <span className="font-medium">
                  {new Date(instructorProfile.joinDate).getFullYear()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  {achievement.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {instructorProfile.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{cert}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3">
                Add Certification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Overview</CardTitle>
          <CardDescription>
            Your teaching performance metrics and student feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {performanceStats.map((stat) => (
              <div key={stat.title} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{stat.title}</span>
                  <span className="text-lg font-bold text-primary">{stat.value}%</span>
                </div>
                <Progress value={stat.value} className="h-2" />
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}