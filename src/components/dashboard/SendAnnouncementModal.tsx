import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Users } from "lucide-react";

interface SendAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  campName: string;
  enrolledCount: number;
}

export function SendAnnouncementModal({ isOpen, onClose, campName, enrolledCount }: SendAnnouncementModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    sendToStudents: true,
    sendToParents: true,
    urgent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would integrate with your email service
    toast({
      title: "Announcement sent",
      description: `Your announcement has been sent to ${getRecipientCount()} recipients.`,
    });

    // Reset form
    setFormData({
      subject: '',
      message: '',
      sendToStudents: true,
      sendToParents: true,
      urgent: false
    });
    
    onClose();
  };

  const getRecipientCount = () => {
    let count = 0;
    if (formData.sendToStudents) count += enrolledCount;
    if (formData.sendToParents) count += enrolledCount;
    return count;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Announcement - {campName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Recipients</p>
                <p className="text-sm text-muted-foreground">
                  {getRecipientCount()} people will receive this announcement
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Send to:</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendToStudents"
                    checked={formData.sendToStudents}
                    onCheckedChange={(checked) => handleInputChange('sendToStudents', !!checked)}
                  />
                  <Label htmlFor="sendToStudents">Students ({enrolledCount})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendToParents"
                    checked={formData.sendToParents}
                    onCheckedChange={(checked) => handleInputChange('sendToParents', !!checked)}
                  />
                  <Label htmlFor="sendToParents">Parents/Guardians ({enrolledCount})</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Enter announcement subject"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Type your announcement message here..."
                rows={8}
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: Include important dates, meeting links, or preparation instructions.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={formData.urgent}
                onCheckedChange={(checked) => handleInputChange('urgent', !!checked)}
              />
              <Label htmlFor="urgent" className="flex items-center gap-2">
                Mark as urgent
                {formData.urgent && <Badge variant="destructive" className="text-xs">URGENT</Badge>}
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Quick Templates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    subject: 'Reminder: Camp Session Tomorrow',
                    message: `Hi everyone!\n\nThis is a friendly reminder that we have our ${campName} session tomorrow. Please make sure to:\n\n• Join the meeting 5 minutes early\n• Have your materials ready\n• Check your internet connection\n\nLooking forward to seeing everyone!\n\nBest regards,\nTechTutor Team`
                  }));
                }}
              >
                Session Reminder
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    subject: 'Welcome to ' + campName,
                    message: `Welcome to ${campName}!\n\nWe're excited to have you join us. Here's what you need to know:\n\n• Camp starts on [DATE] at [TIME]\n• Meeting link will be sent 24 hours before\n• All materials will be provided digitally\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nTechTutor Team`
                  }));
                }}
              >
                Welcome Message
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.sendToStudents && !formData.sendToParents}>
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}