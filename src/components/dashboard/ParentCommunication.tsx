import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, MessageCircle, Bell, Calendar, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const messages = [
  {
    id: 1,
    parent: "Sarah Johnson",
    student: "Emma Johnson",
    subject: "Progress Update Request",
    preview: "Could you please provide an update on Emma's progress in the Web Development camp?",
    time: "2 hours ago",
    status: "unread",
    type: "inquiry"
  },
  {
    id: 2,
    parent: "David Chen",
    student: "Liam Chen",
    subject: "Schedule Change Request",
    preview: "We need to discuss a potential schedule change for next week...",
    time: "5 hours ago",
    status: "read",
    type: "request"
  },
  {
    id: 3,
    parent: "Lisa Davis",
    student: "Sophia Davis",
    subject: "Thank you!",
    preview: "Thank you for the excellent instruction. Sophia loves the game development camp!",
    time: "1 day ago",
    status: "read",
    type: "feedback"
  }
];

const announcements = [
  {
    id: 1,
    title: "Summer Camp Photo Day",
    content: "We'll be taking photos of all students during their projects this Friday. Photos will be shared in the parent portal.",
    date: "2024-07-10",
    recipients: "All Parents",
    status: "sent"
  },
  {
    id: 2,
    title: "Camp Completion Certificates",
    content: "Certificates will be available for download after each camp completion. Check your parent dashboard.",
    date: "2024-07-08",
    recipients: "All Parents",
    status: "sent"
  }
];

export function ParentCommunication() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Communication</h1>
          <p className="text-muted-foreground">Manage parent messages and announcements</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Send className="h-4 w-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-sm text-muted-foreground">Unread Messages</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">23</div>
            <p className="text-sm text-muted-foreground">Total Messages</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">3</div>
            <p className="text-sm text-muted-foreground">Announcements Sent</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">94%</div>
            <p className="text-sm text-muted-foreground">Read Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recent Messages
              </CardTitle>
              <CardDescription>Messages from parents and guardians</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      message.status === 'unread' 
                        ? 'border-primary/20 bg-primary/5' 
                        : 'border-border bg-muted/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-card-foreground">{message.parent}</h4>
                        <Badge variant="outline" className="text-xs">
                          {message.type}
                        </Badge>
                        {message.status === 'unread' && (
                          <Badge className="bg-destructive text-destructive-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm font-medium text-card-foreground mb-1">{message.subject}</p>
                    <p className="text-sm text-muted-foreground mb-2">{message.preview}</p>
                    <p className="text-xs text-muted-foreground">Student: {message.student}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Sent Announcements
              </CardTitle>
              <CardDescription>Previous announcements to parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 rounded-lg border border-border bg-muted/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-card-foreground">{announcement.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          {announcement.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Sent to: {announcement.recipients}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Compose Message
              </CardTitle>
              <CardDescription>Send announcements or reply to parent messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground">Recipients</label>
                  <select className="w-full mt-1 p-2 border border-border rounded-md bg-background text-foreground">
                    <option>All Parents</option>
                    <option>Web Development Camp Parents</option>
                    <option>Python Camp Parents</option>
                    <option>Game Development Camp Parents</option>
                    <option>Robotics Camp Parents</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-card-foreground">Subject</label>
                  <Input 
                    placeholder="Enter subject line..." 
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-card-foreground">Message</label>
                  <Textarea 
                    placeholder="Type your message here..." 
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}