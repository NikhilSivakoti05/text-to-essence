import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailShare = ({ isOpen, onClose, summary }) => {
  const [recipients, setRecipients] = useState([""]);
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const addRecipient = () => {
    setRecipients([...recipients, ""]);
  };

  const removeRecipient = (index) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index, value) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  const handleSend = async () => {
    const validRecipients = recipients.filter(email => email.trim() && email.includes('@'));
    
    if (validRecipients.length === 0) {
      toast({
        title: "Invalid recipients",
        description: "Please enter at least one valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Email sent successfully",
        description: `Summary shared with ${validRecipients.length} recipient(s).`,
      });
      
      onClose();
      setRecipients([""]);
      setMessage("");
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* CHANGE 1: Smaller width on the main dialog content */}
      <DialogContent className="w-full sm:max-w-sm bg-gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Mail className="h-5 w-5 text-ai-primary" />
            Share Summary via Email
          </DialogTitle>
        </DialogHeader>
        
        {/* CHANGE 2: This div wraps the form and makes it scrollable */}
        <div className="space-y-4 pr-4 overflow-y-auto max-h-[75vh]">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Recipients</Label>
            {recipients.map((recipient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={recipient}
                  onChange={(e) => updateRecipient(index, e.target.value)}
                  className="bg-background/50 border-border focus:border-ai-primary"
                />
                {recipients.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipient(index)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addRecipient}
              className="w-full hover:bg-ai-primary/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background/50 border-border focus:border-ai-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Additional Message</Label>
            <Textarea
              placeholder="Add a personal message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/50 border-border focus:border-ai-primary"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Summary Preview</Label>
            <div className="max-h-40 overflow-y-auto p-3 bg-background/30 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {summary}
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="bg-gradient-ai hover:shadow-ai"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailShare;