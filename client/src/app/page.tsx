"use client";
import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import './styles/style.css'
export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    transcript: string;
    fullSummary: string;
    executiveSummary: string;
    keyPoints: string[];
    actionItems: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles(Array.from(e.target.files));
      }
    },
    []
  );

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      setError("Please select at least one audio file.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/process-audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setProgress(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }
          },
        }
      );
      setResult(response.data);
    } catch (error: any) {
      console.error("Upload error:", error);
      setError("An error occurred while processing the audio.");
    } finally {
      setUploading(false);
    }
  }, [files]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl shadow-2xl rounded-2xl border-none">
      
        <CardHeader className="text-center">
        <img
    src="/img/logo.png"
    alt="App Logo"
    className="mx-auto h-16 w-16 object-contain"
    />
          <CardTitle className="text-3xl first-title font-bold text-blue-800">
            AI-Powered Audio Note Summarizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="audio-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload audio files (.mp3, .wav, .m4a)
          </label>
          <Input
            id="audio-upload"
            type="file"
            accept=".mp3,.wav,.m4a"
            multiple
            onChange={handleFileChange}
            className="file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
          />
        </div>

          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-submit w-full   py-2 px-4 rounded-lg shadow-md"
          >
            {uploading ? "Uploading..." : "Upload and Process"}
          </Button>
          {uploading && <Progress value={progress} className="h-3" />}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Tabs defaultValue="transcript" className="pt-4 flex items-center justify-center">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-blue-100  rounded-xl">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="fullSummary">Full Summary</TabsTrigger>
                <TabsTrigger value="executiveSummary">Executive Summary</TabsTrigger>
                <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
                <TabsTrigger value="actionItems">Action Items</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript" className="pt-4">
                <p className="whitespace-pre-line leading-relaxed text-gray-800">
                  {result.transcript}
                </p>
              </TabsContent>
              <TabsContent value="fullSummary" className="pt-4">
                <p className="whitespace-pre-line leading-relaxed text-gray-800">
                  {result.fullSummary}
                </p>
              </TabsContent>
              <TabsContent value="executiveSummary" className="pt-4">
                <p className="whitespace-pre-line leading-relaxed text-gray-800">
                  {result.executiveSummary}
                </p>
              </TabsContent>
              <TabsContent value="keyPoints" className="pt-4">
                <p className="whitespace-pre-line leading-relaxed text-gray-800">
                  {result.keyPoints}
                </p>
              </TabsContent>
              <TabsContent value="actionItems" className="pt-4">
                <p className="whitespace-pre-line leading-relaxed text-gray-800">
                  {result.actionItems}
                </p>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
