import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Monitor, 
  Mic, 
  Video, 
  Wifi, 
  ExternalLink,
  Play,
  AlertCircle,
  FileText,
  Headphones
} from "lucide-react";

interface StartSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  camp: any;
  onStartSession: () => void;
}

export function StartSessionModal({ open, onOpenChange, camp, onStartSession }: StartSessionModalProps) {
  const [checkedItems, setCheckedItems] = useState({
    materials: false,
    equipment: false,
    connection: false,
    lessonPlan: false
  });

  if (!camp) return null;

  const handleCheckItem = (item: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecks = Object.keys(checkedItems).length;

  const handleStartSession = () => {
    onStartSession();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Start Session: {camp.name}
          </DialogTitle>
          <DialogDescription>
            Complete the pre-session checklist to ensure everything is ready for your class
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Session Details</h3>
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  Session {camp.completedSessions + 1} of {camp.totalSessions}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Duration: 90 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Expected Students: {camp.students}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Topic: Interactive Web Components</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ExternalLink className="h-4 w-4" />
                    <Button variant="link" className="h-auto p-0 text-primary text-sm">
                      Open Meeting Room
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pre-Session Checklist */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Pre-Session Checklist</h3>
              <div className="flex items-center gap-2">
                <Progress value={(checkedCount / totalChecks) * 100} className="w-24 h-2" />
                <span className="text-sm text-muted-foreground">{checkedCount}/{totalChecks}</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Materials Check */}
              <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => handleCheckItem('materials')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      checkedItems.materials 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-muted-foreground'
                    }`}>
                      {checkedItems.materials && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Teaching Materials Ready</p>
                      <p className="text-sm text-muted-foreground">Lesson slides, code examples, activity sheets</p>
                    </div>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              {/* Equipment Check */}
              <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => handleCheckItem('equipment')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      checkedItems.equipment 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-muted-foreground'
                    }`}>
                      {checkedItems.equipment && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Equipment Check</p>
                      <p className="text-sm text-muted-foreground">Camera, microphone, screen sharing ready</p>
                    </div>
                    <div className="flex gap-1">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <Mic className="h-4 w-4 text-muted-foreground" />
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Check */}
              <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => handleCheckItem('connection')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      checkedItems.connection 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-muted-foreground'
                    }`}>
                      {checkedItems.connection && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Internet Connection</p>
                      <p className="text-sm text-muted-foreground">Stable connection for video calls and screen sharing</p>
                    </div>
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Plan Review */}
              <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => handleCheckItem('lessonPlan')}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      checkedItems.lessonPlan 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-muted-foreground'
                    }`}>
                      {checkedItems.lessonPlan && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Lesson Plan Reviewed</p>
                      <p className="text-sm text-muted-foreground">Objectives, activities, and timing confirmed</p>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-primary text-sm">
                      View Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Student List
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Lesson Plan
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Monitor className="h-4 w-4 mr-2" />
                Screen Share
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Headphones className="h-4 w-4 mr-2" />
                Tech Support
              </Button>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleStartSession}
              disabled={!allChecked}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {allChecked ? 'Start Session' : `Complete Checklist (${checkedCount}/${totalChecks})`}
            </Button>
          </div>

          {/* Help */}
          {!allChecked && (
            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p>Complete all checklist items to start your session. This ensures the best experience for your students.</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}