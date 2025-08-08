import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Mic, 
  MicOff,
  VideoOff,
  Hand,
  MessageSquare,
  LogOut,
  Clock,
  Users,
  Minimize2
} from "lucide-react";

interface StudentSessionControlsProps {
  session: {
    id: number;
    camp: string;
    topic: string;
    instructor: string;
    startTime: Date;
  };
  onLeaveSession: () => void;
  onToggleMinimize: () => void;
  isMinimized: boolean;
}

export function StudentSessionControls({ 
  session, 
  onLeaveSession, 
  onToggleMinimize,
  isMinimized 
}: StudentSessionControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Calculate session duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-primary">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Session Active</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleMinimize}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{session.topic}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button 
              variant={isMuted ? "destructive" : "outline"} 
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button 
              variant={isVideoOff ? "destructive" : "outline"} 
              size="sm"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onLeaveSession}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 shadow-lg border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
            Session In Progress
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggleMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">{session.topic}</p>
          <p className="text-xs text-muted-foreground">{session.camp}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(sessionDuration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{session.instructor}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Session Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant={isMuted ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          
          <Button 
            variant={isVideoOff ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="flex items-center gap-2"
          >
            {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            {isVideoOff ? "Video On" : "Video Off"}
          </Button>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant={handRaised ? "default" : "outline"} 
            size="sm"
            onClick={() => setHandRaised(!handRaised)}
            className="flex items-center gap-2"
          >
            <Hand className="h-4 w-4" />
            {handRaised ? "Lower Hand" : "Raise Hand"}
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex gap-2 text-xs">
          {isMuted && <Badge variant="destructive">Muted</Badge>}
          {isVideoOff && <Badge variant="destructive">Video Off</Badge>}
          {handRaised && <Badge variant="default">Hand Raised</Badge>}
        </div>

        {/* Leave Session */}
        <Button 
          variant="destructive" 
          onClick={onLeaveSession}
          className="w-full flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Leave Session
        </Button>
      </CardContent>
    </Card>
  );
}