import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  Mic, 
  Wifi, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  XCircle,
  Play,
  Settings
} from "lucide-react";

interface JoinSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    id: number;
    camp: string;
    topic: string;
    instructor: string;
    date: string;
    time: string;
    duration: number;
    meetingLink: string;
    materials: string[];
  };
  onJoinSession: () => void;
}

export function JoinSessionModal({ isOpen, onClose, session, onJoinSession }: JoinSessionModalProps) {
  const [techChecks, setTechChecks] = useState({
    camera: false,
    microphone: false,
    internet: false
  });
  const [isReady, setIsReady] = useState(false);

  const handleTechCheck = (type: keyof typeof techChecks) => {
    setTechChecks(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      setIsReady(Object.values(updated).every(Boolean));
      return updated;
    });
  };

  const handleJoinSession = () => {
    onJoinSession();
    onClose();
    // In a real app, this would open the meeting link
    window.open(session.meetingLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Join Session
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{session.topic}</CardTitle>
              <CardDescription>{session.camp}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{session.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time} ({session.duration} min)</span>
                </div>
              </div>
              
              {session.materials.length > 0 && (
                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Session Materials
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {session.materials.map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Technical Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Pre-Session Setup
              </CardTitle>
              <CardDescription>
                Make sure your device is ready for the session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">Test your video camera</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTechCheck('camera')}
                    className="flex items-center gap-2"
                  >
                    {techChecks.camera ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Tested
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                        Test
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Microphone</p>
                      <p className="text-sm text-muted-foreground">Test your audio input</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTechCheck('microphone')}
                    className="flex items-center gap-2"
                  >
                    {techChecks.microphone ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Tested
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                        Test
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Internet Connection</p>
                      <p className="text-sm text-muted-foreground">Check connection speed</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTechCheck('internet')}
                    className="flex items-center gap-2"
                  >
                    {techChecks.internet ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Good
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                        Test
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isReady && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Ready to join!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    All technical checks completed successfully.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleJoinSession}
              disabled={!isReady}
              className="flex-1 flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Join Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}