import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Save, Copy, Check, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SummaryDisplay = ({ summary, onSummaryChange, onEmailShare }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSummaryChange(editedSummary);
    setIsEditing(false);
    toast({
      title: "Summary updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!summary) return null;

  return (
    <Card className="bg-gradient-card border-border animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Generated Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="hover:bg-ai-primary/10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="hover:bg-ai-primary/10"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEmailShare}
              className="hover:bg-ai-primary/10"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[300px] bg-background/50 border-border focus:border-ai-primary focus:ring-ai-primary/20"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedSummary(summary);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-ai">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground bg-background/30 rounded-lg p-4 border border-border">
              {summary}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryDisplay;