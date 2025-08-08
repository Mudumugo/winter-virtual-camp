import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  Users,
  Plus,
  Paperclip,
  Star,
  Archive
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for student messages
const conversations = [
  {
    id: 1,
    type: "instructor",
    participant: {
      name: "Ms. Sarah Johnson",
      avatar: "/placeholder-instructor.jpg",
      role: "Instructor",
      camp: "Web Development Basics"
    },
    lastMessage: "Great work on your portfolio project! I have some feedback for you.",
    timestamp: "2024-08-07 14:30",
    unread: 2,
    status: "active"
  },
  {
    id: 2,
    type: "instructor",
    participant: {
      name: "Mr. David Chen",
      avatar: "/placeholder-instructor.jpg",
      role: "Instructor",
      camp: "Python for Beginners"
    },
    lastMessage: "Don't forget about tomorrow's assignment deadline.",
    timestamp: "2024-08-07 10:15",
    unread: 0,
    status: "active"
  },
  {
    id: 3,
    type: "group",
    participant: {
      name: "Web Dev Team Alpha",
      avatar: "/placeholder-group.jpg",
      role: "Study Group",
      members: 5,
      camp: "Web Development Basics"
    },
    lastMessage: "Let's meet up for the group project discussion tomorrow!",
    timestamp: "2024-08-06 16:45",
    unread: 1,
    status: "active"
  },
  {
    id: 4,
    type: "support",
    participant: {
      name: "TechTutor Support",
      avatar: "/placeholder-support.jpg",
      role: "Support Team",
      camp: "General"
    },
    lastMessage: "Your technical issue has been resolved. Let us know if you need anything else!",
    timestamp: "2024-08-05 11:20",
    unread: 0,
    status: "resolved"
  }
];

const messages = [
  {
    id: 1,
    conversationId: 1,
    sender: "Ms. Sarah Johnson",
    senderType: "instructor",
    content: "Hi Alex! I reviewed your portfolio project and I'm really impressed with the design choices you made. The color scheme and layout work beautifully together.",
    timestamp: "2024-08-07 14:25",
    type: "text"
  },
  {
    id: 2,
    conversationId: 1,
    sender: "Alex Smith",
    senderType: "student",
    content: "Thank you so much! I spent a lot of time working on the design. I'm glad you like it.",
    timestamp: "2024-08-07 14:27",
    type: "text"
  },
  {
    id: 3,
    conversationId: 1,
    sender: "Ms. Sarah Johnson",
    senderType: "instructor",
    content: "One suggestion: consider adding some animation to the navigation menu. It would make the user experience even better. I can share some resources if you're interested!",
    timestamp: "2024-08-07 14:30",
    type: "text"
  }
];

const announcements = [
  {
    id: 1,
    title: "Weekend Workshop: Advanced CSS Techniques",
    content: "Join us this Saturday for an optional workshop on advanced CSS techniques including Grid, Flexbox mastery, and modern design patterns.",
    sender: "Ms. Sarah Johnson",
    camp: "Web Development Basics",
    timestamp: "2024-08-07 09:00",
    priority: "normal"
  },
  {
    id: 2,
    title: "Assignment Extension Available",
    content: "Due to technical difficulties yesterday, we're extending the Python calculator assignment deadline by 2 days. New due date: August 14th.",
    sender: "Mr. David Chen",
    camp: "Python for Beginners",
    timestamp: "2024-08-06 16:30",
    priority: "important"
  }
];

export function StudentMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation.id);
  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Communicate with instructors, classmates, and support
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold text-foreground">{conversations.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
                <p className="text-2xl font-bold text-accent">{unreadCount}</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">{unreadCount}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Instructor Chats</p>
                <p className="text-2xl font-bold text-foreground">
                  {conversations.filter(c => c.type === "instructor").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Group Chats</p>
                <p className="text-2xl font-bold text-secondary">
                  {conversations.filter(c => c.type === "group").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Conversations List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-accent/20 border border-accent/30"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground truncate">
                            {conversation.participant.name}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {conversation.participant.role} • {conversation.participant.camp}
                        </p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(conversation.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConversation.participant.avatar} />
                      <AvatarFallback>
                        {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConversation.participant.name}</CardTitle>
                      <CardDescription>
                        {selectedConversation.participant.role} • {selectedConversation.participant.camp}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderType === "student" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderType === "student"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.senderType === "student"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <Separator />

                {/* Message Input */}
                <div className="p-4 flex-shrink-0">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Important updates from your instructors and camps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{announcement.title}</h4>
                    <Badge variant={announcement.priority === "important" ? "destructive" : "secondary"}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{announcement.sender}</span>
                    <span>•</span>
                    <span>{announcement.camp}</span>
                    <span>•</span>
                    <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}