import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Users, Clock, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { CampDetailsModal } from "./CampDetailsModal";
import { AddCampModal } from "./AddCampModal";
import { EditCampModal } from "./EditCampModal";

const camps = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript and React",
    instructor: "Sarah Mitchell",
    startDate: "2024-07-15",
    endDate: "2024-07-26",
    duration: "2 weeks",
    capacity: 25,
    enrolled: 22,
    status: "Upcoming",
    schedule: "Mon-Fri, 9AM-3PM",
    location: "Virtual",
    category: "Programming",
    ageGroup: "13-17"
  },
  {
    id: 2,
    name: "Digital Literacy Bootcamp",
    description: "Master essential computer skills for school and beyond",
    instructor: "Jennifer Park",
    startDate: "2024-07-08",
    endDate: "2024-07-19",
    duration: "2 weeks",
    capacity: 20,
    enrolled: 18,
    status: "Active",
    schedule: "Mon-Fri, 10AM-11:30AM",
    location: "Virtual",
    category: "Computer Skills",
    ageGroup: "9-12"
  },
  {
    id: 3,
    name: "Touch Typing Champions",
    description: "Become a keyboard ninja with speed and accuracy",
    instructor: "Michael Torres",
    startDate: "2024-06-24",
    endDate: "2024-07-05",
    duration: "2 weeks",
    capacity: 15,
    enrolled: 15,
    status: "Completed",
    schedule: "Mon-Fri, 2PM-3PM",
    location: "Virtual",
    category: "Typing",
    ageGroup: "9-12"
  },
  {
    id: 4,
    name: "Cyber Safety Heroes",
    description: "Become a digital safety superhero",
    instructor: "Dr. Lisa Chen",
    startDate: "2024-07-22",
    endDate: "2024-07-26",
    duration: "1 week",
    capacity: 12,
    enrolled: 8,
    status: "Upcoming",
    schedule: "Mon-Fri, 11AM-12PM",
    location: "Virtual",
    category: "Digital Safety",
    ageGroup: "6-8"
  },
  {
    id: 5,
    name: "Digital Balance Masters",
    description: "Find the perfect balance between tech and life",
    instructor: "Amanda Rodriguez",
    startDate: "2024-07-29",
    endDate: "2024-08-02",
    duration: "1 week",
    capacity: 18,
    enrolled: 12,
    status: "Upcoming",
    schedule: "Mon-Fri, 3PM-4:30PM",
    location: "Virtual",
    category: "Screen Wellness",
    ageGroup: "9-12"
  },
  {
    id: 6,
    name: "Speed Typing Pro",
    description: "Achieve professional typing speeds with perfect technique",
    instructor: "Robert Kim",
    startDate: "2024-08-05",
    endDate: "2024-08-16",
    duration: "2 weeks",
    capacity: 16,
    enrolled: 9,
    status: "Upcoming",
    schedule: "Mon-Fri, 1PM-2:30PM",
    location: "Virtual",
    category: "Typing",
    ageGroup: "13-17"
  },
  {
    id: 7,
    name: "Computer Basics for Beginners",
    description: "Learn to use computers safely and confidently",
    instructor: "Maria Santos",
    startDate: "2024-08-12",
    endDate: "2024-08-16",
    duration: "1 week",
    capacity: 14,
    enrolled: 6,
    status: "Upcoming",
    schedule: "Mon-Fri, 10AM-11AM",
    location: "Virtual",
    category: "Computer Skills",
    ageGroup: "6-8"
  },
  {
    id: 8,
    name: "Digital Ethics & Privacy Masters",
    description: "Navigate the complex world of digital privacy and ethics",
    instructor: "Dr. James Wilson",
    startDate: "2024-08-19",
    endDate: "2024-09-06",
    duration: "3 weeks",
    capacity: 20,
    enrolled: 14,
    status: "Upcoming",
    schedule: "Mon-Fri, 2PM-4PM",
    location: "Virtual",
    category: "Digital Safety",
    ageGroup: "13-17"
  }
];

export function CampManagement() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [selectedCamp, setSelectedCamp] = useState<typeof camps[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddCampOpen, setIsAddCampOpen] = useState(false);
  const [isEditCampOpen, setIsEditCampOpen] = useState(false);
  const [campsList, setCampsList] = useState(camps);
  
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

  const filteredCamps = campsList.filter(camp => {
    const categoryMatch = categoryFilter === "all" || camp.category === categoryFilter;
    const ageMatch = ageFilter === "all" || camp.ageGroup === ageFilter;
    return categoryMatch && ageMatch;
  });

  const categories = ["all", "Programming", "Computer Skills", "Typing", "Digital Safety", "Screen Wellness"];
  const ageGroups = ["all", "6-8", "9-12", "13-17"];

  const handleViewDetails = (camp: typeof camps[0]) => {
    console.log("View Details clicked for camp:", camp.name);
    console.log("Setting selectedCamp:", camp);
    console.log("Setting isDetailsOpen to true");
    setSelectedCamp(camp);
    setIsDetailsOpen(true);
  };

  const handleCampAdded = (newCamp: any) => {
    setCampsList(prev => [...prev, newCamp]);
  };

  const handleEditCamp = (camp: typeof camps[0]) => {
    console.log("Edit Camp clicked for camp:", camp.name);
    setSelectedCamp(camp);
    setIsEditCampOpen(true);
  };

  const handleCampUpdated = (updatedCamp: typeof camps[0]) => {
    setCampsList(prev => prev.map(camp => 
      camp.id === updatedCamp.id ? updatedCamp : camp
    ));
    // Update selected camp if it's the one being edited
    if (selectedCamp?.id === updatedCamp.id) {
      setSelectedCamp(updatedCamp);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Camp Management</h1>
          <p className="text-muted-foreground">Organize and schedule summer camps</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
          onClick={() => setIsAddCampOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Camp
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ageFilter} onValueChange={setAgeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select age group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            {ageGroups.slice(1).map((age) => (
              <SelectItem key={age} value={age}>Ages {age}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">{campsList.length}</div>
            <p className="text-sm text-muted-foreground">Total Camps</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{campsList.filter(c => c.status === "Active").length}</div>
            <p className="text-sm text-muted-foreground">Active Camps</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{campsList.filter(c => c.status === "Upcoming").length}</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{campsList.filter(c => c.status === "Completed").length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Camps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCamps.map((camp) => (
          <Card key={camp.id} className="border-border bg-card hover:shadow-card transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-card-foreground">{camp.name}</CardTitle>
                  <CardDescription>{camp.description}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getCategoryColor(camp.category)} variant="outline">
                      {camp.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Ages {camp.ageGroup}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(camp.status)}>
                  {camp.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Instructor & Capacity */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Instructor:</span>
                  <span className="text-sm font-medium text-card-foreground">{camp.instructor}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Enrollment:</span>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">
                      {camp.enrolled}/{camp.capacity}
                    </span>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">
                      {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{camp.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{camp.location}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="text-card-foreground">{Math.round((camp.enrolled / camp.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${(camp.enrolled / camp.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(camp)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditCamp(camp)}
                  >
                    Edit Camp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CampDetailsModal 
        camp={selectedCamp}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <AddCampModal 
        isOpen={isAddCampOpen}
        onClose={() => setIsAddCampOpen(false)}
        onCampAdded={handleCampAdded}
      />

      <EditCampModal 
        camp={selectedCamp}
        isOpen={isEditCampOpen}
        onClose={() => setIsEditCampOpen(false)}
        onSave={handleCampUpdated}
      />
    </div>
  );
}