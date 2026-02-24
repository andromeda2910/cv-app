"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface UploadCVPageProps {
  onUploadComplete: (rawText: string) => void;
  onBack: () => void;
}

export const UploadCVPage = ({ onUploadComplete, onBack }: UploadCVPageProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [fileName, setFileName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadedText, setUploadedText] = React.useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');

    // Accept PDF and text files
    if (!file.type.match('application/pdf|text/plain|text/.*')) {
      setError('Please upload a PDF or text file');
      return;
    }

    setFileName(file.name);
    setIsProcessing(true);

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        // PDF binary cannot be read as plain text reliably.
        // We pass the raw binary text attempt; the AI will do its best.
        // For better results, pdfjs-dist can be added in the future.
        text = await file.text();
      } else {
        text = await file.text();
      }
      setUploadedText(text);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      onUploadComplete(text);
    } catch {
      setError('Failed to read CV. Please make sure the file is readable.');
      setIsProcessing(false);
    }
  };

  const extractCVData = (text: string) => {
    // Basic extraction - in production use proper PDF parsing
    const lines = text.split('\n');

    // Try to extract name (usually first line or near top)
    const fullName = extractName(lines);

    // Try to extract email
    const emailMatch = text.match(/([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const email = emailMatch ? emailMatch[1] : '';

    // Try to extract phone
    const phoneMatch = text.match(/(\+?1?\s?)?(\d{3}[-.]?\d{3}[-.]?\d{4}|\(\d{3}\)\s?\d{3}[-.]?\d{4})/);
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Try to extract any job titles mentioned
    const jobTitle = extractJobTitle(text);

    return {
      fullName,
      email,
      phone,
      jobTitle,
      summary: extractSummary(text),
    };
  };

  const extractName = (lines: string[]) => {
    // Usually first non-empty line with capital letters
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed.length < 50 && trimmed.match(/[A-Z][a-z]+\s+[A-Z][a-z]+/)) {
        return trimmed;
      }
    }
    return '';
  };

  const extractJobTitle = (text: string) => {
    const titles = ['Manager', 'Engineer', 'Developer', 'Designer', 'Analyst', 'Specialist', 'Lead', 'Director', 'Senior', 'Junior'];
    for (const title of titles) {
      if (text.includes(title)) {
        const regex = new RegExp(`([A-Za-z\\s]*${title}[A-Za-z\\s]*)`, 'i');
        const match = text.match(regex);
        if (match) return match[0].trim().substring(0, 50);
      }
    }
    return '';
  };

  const extractSummary = (text: string) => {
    // Look for summary section
    const summaryMatch = text.match(/(?:summary|summary of qualifications|professional summary)([\s\S]*?)(?:experience|skills|education|$)/i);
    if (summaryMatch) {
      return summaryMatch[1].trim().substring(0, 300);
    }
    return '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your CV</h1>
            <p className="text-gray-600">Upload your existing CV to get started. We&apos;ll extract the information and you can edit it.</p>
          </div>

          {/* Upload Area */}
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${isDragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400'
              }`}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!isProcessing && !fileName ? (
              <>
                <Upload className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Drag and drop your CV here</p>
                <p className="text-sm text-gray-500">or click to browse (PDF, TXT, DOC, DOCX)</p>
              </>
            ) : isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Processing your CV...</p>
                <p className="text-sm text-gray-500 mt-1">Extracting information</p>
              </>
            ) : (
              <>
                <FileText className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900 mb-1">File uploaded</p>
                <p className="text-sm text-gray-500">{fileName}</p>
              </>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-900">
              💡 <strong>Tip:</strong> For best results, upload a well-formatted CV. We&apos;ll extract the key information automatically.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1"
            >
              Back
            </Button>
            {fileName && !isProcessing && (
              <Button
                onClick={() => onUploadComplete(uploadedText)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Continue to Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
