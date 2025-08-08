import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Search,
  Filter,
  Star,
  Archive,
  MoreHorizontal,
  Clock,
  Users
} from "lucide-react";

// Mock messages data
const messages = [
  {
    id: 1,
    from: "Sarah Johnson",
    fromType: "parent",
    subject: "Question about Python homework",
    preview: "Hi Mr. Smith, Sarah is having trouble with the loops assignment...",
    content: "Hi Mr. Smith,\n\nSarah is having trouble with the loops assignment you gave yesterday. She understands the concept but is getting syntax errors. Could you provide some guidance?\n\nThanks,\nMrs. Johnson",
    timestamp: "2024-08-07T09:30:00Z",
    unread: true,
    priority: "normal",
    studentName: "Sarah Johnson",
    camp: "Python for Beginners"
  },
  {
    id: 2,
    from: "Mike Chen",
    fromType: "student",
    subject: "Project submission",
    preview: "Hi! I've completed my web development project and wanted to submit it...",
    content: "Hi Mr. Smith!\n\nI've completed my web development project and wanted to submit it for review. I added some extra features like animations. Hope you like it!\n\nBest,\nMike",
    timestamp: "2024-08-07T08:15:00Z",
    unread: true,
    priority: "normal",
    studentName: "Mike Chen",
    camp: "Web Development Basics"
  },
  {
    id: 3,
    from: "Emma Davis",
    fromType: "parent",
    subject: "Schedule change request",
    preview: "Hello, we need to discuss changing Emma's session time...",
    content: "Hello Mr. Smith,\n\nWe need to discuss changing Emma's session time due to a conflict with her other activities. Would it be possible to move her to a different time slot?\n\nBest regards,\nMr. Davis",
    timestamp: "2024-08-06T16:45:00Z",
    unread: false,
    priority: "high",
    studentName: "Emma Davis",
    camp: "Game Development with Unity"
  },
  {
    id: 4,
    from: "Alex Rodriguez",
    fromType: "parent",
    subject: "Progress update request",
    preview: "Could you provide an update on Alex's progress in the camp?",
    content: "Dear Mr. Smith,\n\nCould you provide an update on Alex's progress in the camp? We'd like to know how he's doing and if there are any areas where he needs extra help at home.\n\nThank you,\nMrs. Rodriguez",
    timestamp: "2024-08-06T14:20:00Z",
    unread: false,
    priority: "normal",
    studentName: "Alex Rodriguez",
    camp: "Web Development Basics"
  }
];

const quickReplies = [
  "Thank you for reaching out. I'll look into this and get back to you soon.",
  "Great work! I'm impressed with the effort put into this project.",
  "Let's schedule a quick call to discuss this further.",
  "I've attached some additional resources that might help.",
  "The assignment looks good overall. Here are a few suggestions for improvement:"
];

export function InstructorMessages() {
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(messages[0]);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => m.unread).length;

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle sending reply
      setReplyText("");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Communicate with students and parents
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {unreadCount} unread
          </Badge>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Inbox</CardTitle>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer border-b hover:bg-muted/50 transition-colors ${
                    selectedMessage?.id === message.id ? "bg-muted border-primary" : ""
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                            {message.from}
                          </p>
                          {message.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              message.fromType === "parent" 
                                ? "border-primary/30 text-primary" 
                                : "border-accent/30 text-accent"
                            }`}
                          >
                            {message.fromType}
                          </Badge>
                          {message.priority === "high" && (
                            <Star className="h-3 w-3 text-destructive" />
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm ${message.unread ? "font-medium text-foreground" : "text-muted-foreground"} mb-1`}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {message.preview}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {message.camp}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="lg:col-span-2">
          {selectedMessage ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder-${selectedMessage.fromType}.jpg`} alt={selectedMessage.from} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedMessage.from.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>From: {selectedMessage.from}</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedMessage.fromType}
                        </Badge>
                        <span>•</span>
                        <span>{formatTime(selectedMessage.timestamp)}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Message Content */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Student: {selectedMessage.studentName}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedMessage.camp}
                    </Badge>
                  </div>
                  <div className="whitespace-pre-wrap text-sm text-foreground">
                    {selectedMessage.content}
                  </div>
                </div>

                {/* Quick Replies */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Quick Replies</p>
                  <div className="grid gap-2">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto p-3"
                        onClick={() => setReplyText(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reply Section */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Reply</p>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Mark Important
                      </Button>
                    </div>
                    <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full text-center py-12">
              <div>
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Select a message</h3>
                <p className="text-muted-foreground">
                  Choose a message from the list to view its content
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}