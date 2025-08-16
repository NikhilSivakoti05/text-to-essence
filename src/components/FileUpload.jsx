import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUpload = ({ onFileUpload, uploadedFile, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileUpload({
          name: file.name,
          content: e.target.result,
          size: file.size
        });
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a text file (.txt)");
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (uploadedFile) {
    return (
      <div className="bg-gradient-card border border-border rounded-xl p-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-ai-primary/20 rounded-lg">
              <File className="h-5 w-5 text-ai-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
          <p className="text-xs text-muted-foreground whitespace-pre-wrap">
            {uploadedFile.content.substring(0, 300)}
            {uploadedFile.content.length > 300 && "..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
        isDragging
          ? "border-ai-primary bg-ai-primary/10 shadow-glow"
          : "border-border hover:border-ai-primary/50 hover:bg-ai-primary/5"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 bg-ai-primary/20 rounded-xl flex items-center justify-center">
          <Upload className="h-6 w-6 text-ai-primary" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">Upload Text File</p>
          <p className="text-sm text-muted-foreground">
            Drag and drop your meeting notes or call transcript (.txt)
          </p>
        </div>
        <Button variant="outline" className="hover:bg-ai-primary/10">
          Choose File
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;