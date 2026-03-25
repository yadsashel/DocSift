import { useState, useCallback } from "react";
import { Upload as UploadIcon, FileText, X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ 1. الرابط العالمي من الـ Environment Variables
const API_URL = import.meta.env.VITE_API_URL;

interface FileItem {
  name: string;
  size: string;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
}

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleUpload = async (file: File) => {
    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${(file.size / 1024).toFixed(0)} KB`;
    
    const newFile: FileItem = { name: file.name, size: sizeStr, status: "uploading", progress: 20 };
    setFiles(prev => [...prev, newFile]);

    try {
      const userId = localStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("file", file);
      if (userId) {
        formData.append("user_id", userId);
      }

      // ✅ 2. تحديث الرابط هنا لـ API_URL
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData, // المتصفح كيقاد الـ Headers أوتوماتيكياً للـ FormData
      });

      if (!response.ok) throw new Error("Upload failed");

      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "processing", progress: 100 } : f));
      
      const result = await response.json();
      console.log("Analysis Result Saved:", result);

      setTimeout(() => {
        setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "complete" } : f));
      }, 1500);

    } catch (error) {
      console.error("Upload Error:", error);
      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "error" } : f));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(f => handleUpload(f));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(f => handleUpload(f));
    }
  };

  const removeFile = (name: string) => setFiles(prev => prev.filter(f => f.name !== name));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold mb-1">Upload Contracts</h1>
        <p className="text-muted-foreground text-sm">Drag and drop your contracts for AI-powered analysis</p>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`glass-card rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center cursor-pointer ${isDragging ? "border-accent bg-accent/5 scale-[1.01]" : "border-border hover:border-accent/50"}`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" multiple accept=".pdf,.docx,.doc,.rtf,.txt" onChange={handleFileSelect} className="hidden" />
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
          <UploadIcon className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Drop your contracts here</h3>
        <p className="text-muted-foreground text-sm mb-4">or click to browse. Supports PDF, DOCX, DOC, RTF, TXT</p>
        <Button variant="outline" size="sm">Browse Files</Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Analysis Status</h3>
          {files.map((file, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <FileText className="h-5 w-5 text-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{file.size}</span>
                </div>
                {file.status === "uploading" && (
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full gradient-bg rounded-full transition-all duration-300" style={{ width: `${file.progress}%` }} />
                  </div>
                )}
                {file.status === "processing" && (
                  <div className="flex items-center gap-2 text-xs text-accent font-bold animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" /> AI IS ANALYZING RISKS...
                  </div>
                )}
                {file.status === "complete" && (
                  <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold">
                    <CheckCircle className="h-3 w-3" /> SECURELY SAVED TO VAULT
                  </div>
                )}
                {file.status === "error" && (
                  <div className="flex items-center gap-2 text-xs text-red-500 font-bold">
                    <AlertCircle className="h-3 w-3" /> UPLOAD ERROR
                  </div>
                )}
              </div>
              <button onClick={() => removeFile(file.name)} className="p-1 rounded-md hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPage;