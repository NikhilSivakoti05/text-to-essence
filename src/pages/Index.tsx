import { useState } from "react";
import { Brain, FileText, Zap } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import PromptInput from "@/components/PromptInput";
import SummaryDisplay from "@/components/SummaryDisplay";
import EmailShare from "@/components/EmailShare";
import { generateSummary } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setSummary(""); // Clear previous summary
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setSummary("");
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !prompt.trim()) {
      toast({
        title: "Missing requirements",
        description: "Please upload a file and enter a prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateSummary(uploadedFile.content, prompt);
      setSummary(result);
      toast({
        title: "Summary generated!",
        description: "SCROLL DOWN",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSummaryChange = (newSummary) => {
    setSummary(newSummary);
  };

  const handleEmailShare = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-ai rounded-lg shadow-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Text to Essence</h1>
              <p className="text-sm text-muted-foreground">AI-powered text summarization and processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Features Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-ai-primary/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-ai-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Upload Text</h3>
              <p className="text-sm text-muted-foreground">Upload meeting notes, call transcripts, or any text file</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-ai-primary/20 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-ai-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Custom Prompts</h3>
              <p className="text-sm text-muted-foreground">Define exactly how you want your content processed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-ai-primary/20 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-ai-primary" />
              </div>
              <h3 className="font-semibold text-foreground">AI Processing</h3>
              <p className="text-sm text-muted-foreground">Get intelligent summaries and actionable insights</p>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Upload Your Text</h2>
            <FileUpload
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              onRemoveFile={handleRemoveFile}
            />
          </div>

          {/* Prompt Input Section */}
          {uploadedFile && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground">2. Set Your Instructions(Please wait atleast 30 seconds for response )</h2>
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <PromptInput
                  onPromptChange={setPrompt}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  prompt={prompt}
                />
              </div>
            </div>
          )}

          {/* Summary Display Section */}
          {summary && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. Your AI-Generated Summary</h2>
              <SummaryDisplay
                summary={summary}
                onSummaryChange={handleSummaryChange}
                onEmailShare={handleEmailShare}
              />
            </div>
          )}
        </div>
      </div>

      {/* Email Share Modal */}
      <EmailShare
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        summary={summary}
      />
    </div>
  );
};

export default Index;
