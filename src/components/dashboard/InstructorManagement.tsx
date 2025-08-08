import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Star, Calendar, Users, Mail, Phone } from "lucide-react";

const instructors = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.m@techtutor.com",
    phone: "(555) 123-4567",
    specialties: ["Web Development", "React", "JavaScript"],
    rating: 4.9,
    experience: "5+ years",
    currentCamps: 2,
    totalStudents: 45,
    status: "Active",
    avatar: "/avatars/sarah.jpg",
    bio: "Full-stack developer with expertise in modern web technologies"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    email: "mike.r@techtutor.com",
    phone: "(555) 234-5678",
    specialties: ["Python", "Data Science", "AI"],
    rating: 4.8,
    experience: "7+ years",
    currentCamps: 1,
    totalStudents: 32,
    status: "Active",
    avatar: "/avatars/mike.jpg",
    bio: "Data scientist passionate about teaching Python and machine learning"
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "alex.c@techtutor.com",
    phone: "(555) 345-6789",
    specialties: ["Unity", "Game Design", "C#"],
    rating: 4.7,
    experience: "4+ years",
    currentCamps: 0,
    totalStudents: 28,
    status: "Available",
    avatar: "/avatars/alex.jpg",
    bio: "Game developer with experience in Unity and mobile game development"
  },
  {
    id: 4,
    name: "Dr. Emily Watson",
    email: "emily.w@techtutor.com",
    phone: "(555) 456-7890",
    specialties: ["Robotics", "Arduino", "IoT"],
    rating: 4.9,
    experience: "10+ years",
    currentCamps: 1,
    totalStudents: 38,
    status: "Active",
    avatar: "/avatars/emily.jpg",
    bio: "Robotics engineer and professor with extensive teaching experience"
  }
];

export function InstructorManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Available": return "bg-primary text-primary-foreground";
      case "Unavailable": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Management</h1>
          <p className="text-muted-foreground">Manage teaching staff and assignments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">12</div>
            <p className="text-sm text-muted-foreground">Total Instructors</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">8</div>
            <p className="text-sm text-muted-foreground">Currently Teaching</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">4</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">4.8</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="border-border bg-card hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={instructor.avatar} alt={instructor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-card-foreground">{instructor.name}</CardTitle>
                      <CardDescription>{instructor.bio}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(instructor.status)}>
                      {instructor.status}
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{instructor.rating}</span>
                    <span className="text-sm text-muted-foreground">rating</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{instructor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{instructor.phone}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-medium text-card-foreground mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {instructor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-card-foreground">{instructor.experience}</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{instructor.currentCamps}</div>
                    <div className="text-xs text-muted-foreground">Current Camps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{instructor.totalStudents}</div>
                    <div className="text-xs text-muted-foreground">Total Students</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Assign Camp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}