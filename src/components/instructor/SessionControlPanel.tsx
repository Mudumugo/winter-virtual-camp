import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  StopCircle, 
  Pause, 
  Play, 
  Clock, 
  Users, 
  MessageSquare,
  HelpCircle,
  Monitor,
  Mic,
  Video,
  Settings,
  FileText,
  X
} from "lucide-react";

interface SessionControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onEndSession: () => void;
  camp: any;
}

export function SessionControlPanel({ isOpen, onClose, onEndSession, camp }: SessionControlPanelProps) {
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !camp) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="shadow-lg border-2 border-accent/20">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="font-semibold text-foreground">Session Active</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Session Info */}
          <div className="space-y-3 mb-4">
            <div>
              <p className="font-medium text-foreground text-sm">{camp.name}</p>
              <p className="text-xs text-muted-foreground">Session {camp.completedSessions + 1} of {camp.totalSessions}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-lg font-bold text-accent">{formatTime(sessionTime)}</span>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                90 min planned
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{camp.students} students expected</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Session Controls */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsPaused(!isPaused)}
                className="flex-1"
              >
                {isPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onEndSession}
                className="flex-1"
              >
                <StopCircle className="h-4 w-4 mr-2" />
                End Session
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="justify-start h-8">
                <Users className="h-3 w-3 mr-2" />
                Attendance
              </Button>
              <Button variant="ghost" size="sm" className="justify-start h-8">
                <MessageSquare className="h-3 w-3 mr-2" />
                Chat
              </Button>
              <Button variant="ghost" size="sm" className="justify-start h-8">
                <FileText className="h-3 w-3 mr-2" />
                Lesson Plan
              </Button>
              <Button variant="ghost" size="sm" className="justify-start h-8">
                <HelpCircle className="h-3 w-3 mr-2" />
                Help
              </Button>
            </div>

            {/* Tech Controls */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Monitor className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Status */}
          {isPaused && (
            <div className="mt-3 p-2 bg-muted/50 rounded text-center">
              <p className="text-xs text-muted-foreground">Session paused</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}