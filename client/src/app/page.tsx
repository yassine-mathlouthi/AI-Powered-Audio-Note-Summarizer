"use client";
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

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

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }, []);

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
      const response = await axios.post("http://127.0.0.1:8000/api/process-audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        },
      });
      console.log(response)
      setResult(response.data);
      
    } catch (error: any) {
      console.error("Upload error:", error);
      setError("An error occurred while processing the audio.");
    } finally {
      setUploading(false);
    }
  }, [files]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Audio Note Summarizer</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept=".mp3,.wav,.m4a"
            multiple
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload and Process"}
          </Button>
          {uploading && <Progress value={progress} className="mt-4" />}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <Tabs defaultValue="transcript" className="mt-4">
              <TabsList>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="fullSummary">Full Summary</TabsTrigger>
                <TabsTrigger value="executiveSummary">Executive Summary</TabsTrigger>
                <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
                <TabsTrigger value="actionItems">Action Items</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript">
                <p>{result.transcript}</p>
              </TabsContent>
              <TabsContent value="fullSummary">
                <p>{result.fullSummary}</p>
              </TabsContent>
              <TabsContent value="executiveSummary">
                <p>{result.executiveSummary}</p>
              </TabsContent>
              <TabsContent value="keyPoints">
                <ul className="list-disc pl-5">
                  {result.keyPoints}
                </ul>
              </TabsContent>
              <TabsContent value="actionItems">
                <ul className="list-disc pl-5">
                  {result.actionItems}
                </ul>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}