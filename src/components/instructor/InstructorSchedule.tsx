import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video,
  MapPin,
  Plus,
  Settings
} from "lucide-react";

// Mock schedule data
const scheduleData = [
  {
    id: 1,
    date: "2024-08-07",
    time: "10:00 AM",
    endTime: "12:00 PM",
    camp: "Web Development Basics",
    type: "live",
    students: 12,
    status: "upcoming",
    location: "Virtual - Zoom Room 1"
  },
  {
    id: 2,
    date: "2024-08-07",
    time: "2:00 PM",
    endTime: "3:30 PM",
    camp: "Python for Beginners",
    type: "live",
    students: 8,
    status: "upcoming",
    location: "Virtual - Zoom Room 2"
  },
  {
    id: 3,
    date: "2024-08-07",
    time: "4:30 PM",
    endTime: "6:30 PM",
    camp: "Game Development with Unity",
    type: "live",
    students: 15,
    status: "upcoming",
    location: "Virtual - Zoom Room 3"
  },
  {
    id: 4,
    date: "2024-08-08",
    time: "2:00 PM",
    endTime: "3:30 PM",
    camp: "Python for Beginners",
    type: "live",
    students: 8,
    status: "scheduled",
    location: "Virtual - Zoom Room 2"
  },
  {
    id: 5,
    date: "2024-08-09",
    time: "10:00 AM",
    endTime: "12:00 PM",
    camp: "Web Development Basics",
    type: "live",
    students: 12,
    status: "scheduled",
    location: "Virtual - Zoom Room 1"
  }
];

const availabilitySlots = [
  { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"] },
  { day: "Tuesday", slots: ["1:00 PM - 5:00 PM"] },
  { day: "Wednesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"] },
  { day: "Thursday", slots: ["1:00 PM - 5:00 PM"] },
  { day: "Friday", slots: ["9:00 AM - 12:00 PM", "4:00 PM - 6:00 PM"] },
  { day: "Saturday", slots: [] },
  { day: "Sunday", slots: [] }
];

function getStatusColor(status: string) {
  switch (status) {
    case "upcoming":
      return "bg-accent text-accent-foreground";
    case "in-progress":
      return "bg-primary text-primary-foreground";
    case "completed":
      return "bg-muted text-muted-foreground";
    case "scheduled":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function InstructorSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"schedule" | "availability">("schedule");

  const todaysSessions = scheduleData.filter(session => 
    session.date === new Date().toISOString().split('T')[0]
  );

  const selectedDateSessions = selectedDate 
    ? scheduleData.filter(session => 
        session.date === selectedDate.toISOString().split('T')[0]
      )
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground mt-2">
            Manage your teaching schedule and availability
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant={view === "schedule" ? "default" : "outline"} 
            onClick={() => setView("schedule")}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button 
            variant={view === "availability" ? "default" : "outline"} 
            onClick={() => setView("availability")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Availability
          </Button>
        </div>
      </div>

      {view === "schedule" ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
              <CardDescription>Select a date to view sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Today's Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Sessions</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString()} - {todaysSessions.length} sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysSessions.length > 0 ? (
                todaysSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{session.time} - {session.endTime}</span>
                      <Badge className={getStatusColor(session.status)} variant="secondary">
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground">{session.camp}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        {session.type}
                      </span>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      {session.status === "upcoming" ? "Start Session" : "View Details"}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No sessions scheduled for today
                </p>
              )}
            </CardContent>
          </Card>

          {/* Selected Date Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
              </CardTitle>
              <CardDescription>
                {selectedDateSessions.length} session(s) scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDateSessions.length > 0 ? (
                selectedDateSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{session.time} - {session.endTime}</span>
                      <Badge className={getStatusColor(session.status)} variant="secondary">
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground">{session.camp}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No sessions scheduled for this date
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Availability Management */
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Availability</CardTitle>
              <CardDescription>
                Set your available hours for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availabilitySlots.map((day) => (
                <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{day.day}</h3>
                    {day.slots.length > 0 ? (
                      <div className="mt-1">
                        {day.slots.map((slot, index) => (
                          <Badge key={index} variant="outline" className="mr-2 text-xs">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not available</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Off Requests</CardTitle>
              <CardDescription>
                Request time off or block specific dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Request Time Off
              </Button>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Vacation</p>
                      <p className="text-xs text-muted-foreground">Aug 20-25, 2024</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      Approved
                    </Badge>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Doctor Appointment</p>
                      <p className="text-xs text-muted-foreground">Aug 15, 2024 - 2:00 PM</p>
                    </div>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      Pending
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}