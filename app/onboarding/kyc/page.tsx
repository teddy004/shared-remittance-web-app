"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KYCPage() {
  const [documentType, setDocumentType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelfieDragging, setIsSelfieDragging] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelfieFile(e.target.files[0]);
    }
  };

  const handleSelfieDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsSelfieDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelfieFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentType && uploadedFile && selfieFile) {
      router.push("/onboarding/verification-pending");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>
            Step 3 of 4 - Upload your identification document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger id="documentType" className="h-12">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">
                    Driver&apos;s License
                  </SelectItem>
                  <SelectItem value="national_id">National ID Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Liveness Selfie</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsSelfieDragging(true);
                }}
                onDragLeave={() => setIsSelfieDragging(false)}
                onDrop={handleSelfieDrop}
                className={cn(
                  "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                  isSelfieDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  selfieFile && "border-success bg-success/5"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleSelfieChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                {selfieFile ? (
                  <div className="flex flex-col items-center gap-3 p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{selfieFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selfieFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelfieFile(null);
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Capture selfie</p>
                      <p className="text-xs text-muted-foreground">
                        Click to open camera and take a photo
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>Support: JPG, PNG (Max 5MB)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Document</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  uploadedFile && "border-success bg-success/5"
                )}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Supports: JPG, PNG, PDF (Max 10MB)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-primary/5 p-4">
              <Shield className="h-5 w-5 shrink-0 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Your data is encrypted and secure
                </p>
                <p className="text-xs text-muted-foreground">
                  We use bank-level encryption to protect your personal
                  information. Your documents are stored securely and never
                  shared.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full"
              size="lg"
              disabled={!documentType || !uploadedFile || !selfieFile}
            >
              Submit for Verification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
