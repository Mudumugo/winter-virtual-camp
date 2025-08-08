import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddCampModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampAdded?: (camp: any) => void;
}

const instructors = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@techtutor.com", specialties: ["Web Development", "JavaScript", "React"] },
  { id: 2, name: "Mike Rodriguez", email: "mike@techtutor.com", specialties: ["Mobile Development", "Python", "UI/UX"] },
  { id: 3, name: "Dr. Emily Watson", email: "emily@techtutor.com", specialties: ["AI/ML", "Data Science", "Python"] },
  { id: 4, name: "Jennifer Park", email: "jennifer@techtutor.com", specialties: ["Computer Skills", "Digital Literacy"] },
  { id: 5, name: "Michael Torres", email: "michael@techtutor.com", specialties: ["Typing", "Productivity Tools"] },
  { id: 6, name: "Dr. Lisa Chen", email: "lisa@techtutor.com", specialties: ["Cybersecurity", "Digital Safety"] },
  { id: 7, name: "Amanda Rodriguez", email: "amanda@techtutor.com", specialties: ["Screen Wellness", "Digital Balance"] },
  { id: 8, name: "Robert Kim", email: "robert@techtutor.com", specialties: ["Advanced Typing", "Office Suite"] }
];

const categories = [
  "Programming",
  "Computer Skills", 
  "Typing",
  "Digital Safety",
  "Screen Wellness",
  "Mobile Development",
  "AI/Machine Learning",
  "Game Development",
  "Cybersecurity",
  "Data Science"
];

const ageGroups = ["6-8", "9-12", "13-17"];

const timeSlots = [
  "9:00 AM - 10:30 AM",
  "10:00 AM - 11:30 AM", 
  "11:00 AM - 12:30 PM",
  "1:00 PM - 2:30 PM",
  "2:00 PM - 3:30 PM",
  "3:00 PM - 4:30 PM"
];

export function AddCampModal({ isOpen, onClose, onCampAdded }: AddCampModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    ageGroup: "",
    instructor: "",
    capacity: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    schedule: "",
    location: "Virtual",
    price: "",
    prerequisites: [] as string[],
    learningObjectives: [] as string[],
    materials: [] as string[]
  });

  const [currentPrerequisite, setCurrentPrerequisite] = useState("");
  const [currentObjective, setCurrentObjective] = useState("");
  const [currentMaterial, setCurrentMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: "prerequisites" | "learningObjectives" | "materials", value: string, setter: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setter("");
    }
  };

  const removeFromArray = (field: "prerequisites" | "learningObjectives" | "materials", index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      ageGroup: "",
      instructor: "",
      capacity: "",
      startDate: undefined,
      endDate: undefined,
      schedule: "",
      location: "Virtual",
      price: "",
      prerequisites: [],
      learningObjectives: [],
      materials: []
    });
    setCurrentPrerequisite("");
    setCurrentObjective("");
    setCurrentMaterial("");
  };

  const validateForm = () => {
    const required = ["name", "description", "category", "ageGroup", "instructor", "capacity", "schedule", "price"];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(", ")}`);
      return false;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select start and end dates");
      return false;
    }

    if (formData.startDate >= formData.endDate) {
      toast.error("End date must be after start date");
      return false;
    }

    if (parseInt(formData.capacity) < 1 || parseInt(formData.capacity) > 50) {
      toast.error("Capacity must be between 1 and 50 students");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedInstructor = instructors.find(i => i.id.toString() === formData.instructor);
      
      const newCamp = {
        id: Date.now(), // Generate temporary ID
        name: formData.name,
        description: formData.description,
        category: formData.category,
        ageGroup: formData.ageGroup,
        instructor: selectedInstructor?.name || "",
        instructorEmail: selectedInstructor?.email || "",
        capacity: parseInt(formData.capacity),
        enrolled: 0,
        startDate: format(formData.startDate!, "yyyy-MM-dd"),
        endDate: format(formData.endDate!, "yyyy-MM-dd"),
        schedule: formData.schedule,
        location: formData.location,
        price: parseFloat(formData.price),
        status: "Upcoming",
        prerequisites: formData.prerequisites,
        learningObjectives: formData.learningObjectives,
        materials: formData.materials,
        createdAt: new Date().toISOString()
      };

      onCampAdded?.(newCamp);
      toast.success("Camp created successfully!");
      resetForm();
      onClose();
      
    } catch (error) {
      toast.error("Failed to create camp. Please try again.");
      console.error("Error creating camp:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedInstructor = instructors.find(i => i.id.toString() === formData.instructor);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Camp</DialogTitle>
          <DialogDescription>
            Set up a new summer tech camp with detailed information and schedule
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Camp Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Web Development Bootcamp"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what students will learn and accomplish in this camp"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Age Group *</Label>
                  <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange("ageGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.map((age) => (
                        <SelectItem key={age} value={age}>Ages {age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                    placeholder="Maximum students"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="199.99"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Instructor Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Instructor Assignment</h3>
              
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Select value={formData.instructor} onValueChange={(value) => handleInputChange("instructor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id.toString()}>
                        <div className="flex flex-col">
                          <span>{instructor.name}</span>
                          <span className="text-xs text-muted-foreground">{instructor.email}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedInstructor && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Instructor Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedInstructor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule & Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Schedule & Location</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => handleInputChange("startDate", date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => handleInputChange("endDate", date)}
                        initialFocus
                        disabled={(date) => date < new Date() || (formData.startDate && date <= formData.startDate)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Time Schedule *</Label>
                  <Select value={formData.schedule} onValueChange={(value) => handleInputChange("schedule", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={`Mon-Fri, ${slot}`}>
                          Mon-Fri, {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Virtual">Virtual (Online)</SelectItem>
                      <SelectItem value="Hybrid">Hybrid (Online + In-Person)</SelectItem>
                      <SelectItem value="In-Person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Prerequisites</h3>
              
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Add Prerequisite</Label>
                <div className="flex gap-2">
                  <Input
                    id="prerequisites"
                    value={currentPrerequisite}
                    onChange={(e) => setCurrentPrerequisite(e.target.value)}
                    placeholder="e.g., Basic computer skills"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addToArray("prerequisites", currentPrerequisite, setCurrentPrerequisite);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray("prerequisites", currentPrerequisite, setCurrentPrerequisite)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.prerequisites.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {prereq}
                      <button
                        type="button"
                        onClick={() => removeFromArray("prerequisites", index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Learning Objectives */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Learning Objectives</h3>
              
              <div className="space-y-2">
                <Label htmlFor="objectives">Add Learning Objective</Label>
                <div className="flex gap-2">
                  <Input
                    id="objectives"
                    value={currentObjective}
                    onChange={(e) => setCurrentObjective(e.target.value)}
                    placeholder="e.g., Build responsive websites using HTML, CSS, and JavaScript"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addToArray("learningObjectives", currentObjective, setCurrentObjective);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray("learningObjectives", currentObjective, setCurrentObjective)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.learningObjectives.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.learningObjectives.map((objective, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {objective}
                      <button
                        type="button"
                        onClick={() => removeFromArray("learningObjectives", index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Materials & Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Materials & Resources</h3>
              
              <div className="space-y-2">
                <Label htmlFor="materials">Add Required Material</Label>
                <div className="flex gap-2">
                  <Input
                    id="materials"
                    value={currentMaterial}
                    onChange={(e) => setCurrentMaterial(e.target.value)}
                    placeholder="e.g., Computer with internet access"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addToArray("materials", currentMaterial, setCurrentMaterial);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray("materials", currentMaterial, setCurrentMaterial)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.materials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.materials.map((material, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {material}
                      <button
                        type="button"
                        onClick={() => removeFromArray("materials", index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </form>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              onClose();
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? "Creating..." : "Create Camp"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}