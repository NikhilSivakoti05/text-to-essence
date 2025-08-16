import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2 } from "lucide-react";

const PromptInput = ({ onPromptChange, onGenerate, isGenerating, prompt }) => {
  const presetPrompts = [
    "Summarize in bullet points for executives",
    "Highlight only action items and deadlines",
    "Extract key decisions and next steps",
    "Create a detailed meeting summary with attendees",
    "List all questions raised and answers provided",
    "Identify risks and opportunities mentioned"
  ];

  const handlePresetClick = (presetPrompt) => {
    onPromptChange(presetPrompt);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-ai-primary" />
          Custom Instructions
        </label>
        <Textarea
          placeholder="Enter your custom prompt... (e.g., 'Summarize in bullet points for executives')"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="min-h-[100px] bg-background/50 border-border focus:border-ai-primary focus:ring-ai-primary/20"
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {presetPrompts.map((preset, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-ai-primary/10 hover:border-ai-primary transition-colors"
              onClick={() => handlePresetClick(preset)}
            >
              {preset}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-gradient-ai hover:shadow-ai transition-all duration-300"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
            Generating Summary...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Summary
          </>
        )}
      </Button>
    </div>
  );
};

export default PromptInput;