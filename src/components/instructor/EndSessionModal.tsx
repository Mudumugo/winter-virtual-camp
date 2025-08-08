import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare,
  Send,
  Calendar,
  Star,
  AlertTriangle
} from "lucide-react";

interface EndSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  camp: any;
  sessionDuration: number;
  onConfirmEnd: (data: any) => void;
}

export function EndSessionModal({ open, onOpenChange, camp, sessionDuration, onConfirmEnd }: EndSessionModalProps) {
  const [sessionNotes, setSessionNotes] = useState("");
  const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});
  const [followUpTasks, setFollowUpTasks] = useState({
    sendRecap: true,
    assignHomework: false,
    scheduleFollowUp: false
  });

  if (!camp) return null;

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const mockStudents = [
    { id: 1, name: "Alice Johnson", present: true },
    { id: 2, name: "Bob Smith", present: true },
    { id: 3, name: "Charlie Brown", present: false },
    { id: 4, name: "Diana Wilson", present: true },
    { id: 5, name: "Eva Martinez", present: true }
  ];

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: present }));
  };

  const handleConfirmEnd = () => {
    const sessionData = {
      duration: sessionDuration,
      notes: sessionNotes,
      attendance: attendanceData,
      followUpTasks,
      completedAt: new Date().toISOString()
    };
    onConfirmEnd(sessionData);
    onOpenChange(false);
  };

  const presentCount = mockStudents.filter(student => 
    attendanceData[student.id] !== undefined ? attendanceData[student.id] : student.present
  ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            End Session: {camp.name}
          </DialogTitle>
          <DialogDescription>
            Complete the session summary and plan follow-up actions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Session Summary</h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {formatDuration(sessionDuration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Attendance: {presentCount}/{mockStudents.length} students</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Session {camp.completedSessions + 1} of {camp.totalSessions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>Topic: Interactive Web Components</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Tracking */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Student Attendance</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {mockStudents.map((student) => {
                    const isPresent = attendanceData[student.id] !== undefined 
                      ? attendanceData[student.id] 
                      : student.present;
                    
                    return (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            isPresent ? 'bg-accent' : 'bg-muted-foreground'
                          }`} />
                          <span className="text-sm font-medium">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm">
                            <Checkbox 
                              checked={isPresent}
                              onCheckedChange={(checked) => 
                                handleAttendanceChange(student.id, checked as boolean)
                              }
                            />
                            Present
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Notes */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Session Notes</h3>
            <Textarea
              placeholder="Add notes about today's session - student progress, challenges, achievements, what worked well, areas for improvement..."
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Follow-up Actions */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Follow-up Actions</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <Checkbox 
                      checked={followUpTasks.sendRecap}
                      onCheckedChange={(checked) => 
                        setFollowUpTasks(prev => ({ ...prev, sendRecap: checked as boolean }))
                      }
                    />
                    <div>
                      <p className="text-sm font-medium">Send session recap to students</p>
                      <p className="text-xs text-muted-foreground">Summary of today's lesson and key takeaways</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <Checkbox 
                      checked={followUpTasks.assignHomework}
                      onCheckedChange={(checked) => 
                        setFollowUpTasks(prev => ({ ...prev, assignHomework: checked as boolean }))
                      }
                    />
                    <div>
                      <p className="text-sm font-medium">Assign homework/practice exercises</p>
                      <p className="text-xs text-muted-foreground">Send practice tasks for next session</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <Checkbox 
                      checked={followUpTasks.scheduleFollowUp}
                      onCheckedChange={(checked) => 
                        setFollowUpTasks(prev => ({ ...prev, scheduleFollowUp: checked as boolean }))
                      }
                    />
                    <div>
                      <p className="text-sm font-medium">Schedule individual follow-ups</p>
                      <p className="text-xs text-muted-foreground">For students who need extra help</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Notice */}
          {presentCount < mockStudents.length && (
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Absent students detected</p>
                <p>Consider reaching out to students who missed today's session.</p>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirmEnd} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}