import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreVertical, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const students = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@email.com",
    phone: "(555) 123-4567",
    age: 14,
    camp: "Web Development",
    status: "Active",
    progress: 75,
    parentName: "Sarah Johnson"
  },
  {
    id: 2,
    name: "Liam Chen",
    email: "liam.c@email.com",
    phone: "(555) 234-5678",
    age: 13,
    camp: "Python Basics",
    status: "Active",
    progress: 60,
    parentName: "David Chen"
  },
  {
    id: 3,
    name: "Sophia Davis",
    email: "sophia.d@email.com",
    phone: "(555) 345-6789",
    age: 15,
    camp: "Game Development",
    status: "Completed",
    progress: 100,
    parentName: "Lisa Davis"
  },
  {
    id: 4,
    name: "Noah Wilson",
    email: "noah.w@email.com",
    phone: "(555) 456-7890",
    age: 12,
    camp: "Robotics",
    status: "Inactive",
    progress: 30,
    parentName: "Michael Wilson"
  }
];

export function StudentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage student enrollments and track progress</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">All Students</CardTitle>
          <CardDescription>Complete list of enrolled students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Student</TableHead>
                  <TableHead className="text-muted-foreground">Contact</TableHead>
                  <TableHead className="text-muted-foreground">Age</TableHead>
                  <TableHead className="text-muted-foreground">Camp</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Progress</TableHead>
                  <TableHead className="text-muted-foreground">Parent</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="border-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-card-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-card-foreground">{student.age}</TableCell>
                    <TableCell className="text-card-foreground">{student.camp}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === "Active" ? "default" : 
                                student.status === "Completed" ? "secondary" : "outline"}
                        className={
                          student.status === "Active" ? "bg-accent text-accent-foreground" :
                          student.status === "Completed" ? "bg-secondary text-secondary-foreground" :
                          "border-border text-muted-foreground"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{student.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-card-foreground">{student.parentName}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end"
                          className="bg-popover border border-border shadow-lg z-50"
                        >
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Contact Parent</DropdownMenuItem>
                          <DropdownMenuItem>View Progress</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}