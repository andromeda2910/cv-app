"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, TrendingUp, Zap, Sparkles, Lightbulb, Award } from 'lucide-react';
import { generateAIReviewFromText, AIReviewResult, AISuggestion } from '@/utils/ai-review';

interface CVReviewPageProps {
  uploadedCVText: string;
  onBack: () => void;
}

interface ReviewScore {
  overall: number;
  completeness: number;
  formatting: number;
  atsOptimization: number;
}

export const CVReviewPage = ({ uploadedCVText, onBack }: CVReviewPageProps) => {
  const [scores, setScores] = React.useState<ReviewScore>({ overall: 0, completeness: 0, formatting: 0, atsOptimization: 0 });
  const [aiReview, setAiReview] = React.useState<AIReviewResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadReview = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate scores from raw uploaded text
        const calculated = calculateScoresFromText(uploadedCVText);
        setScores(calculated);

        // Generate AI review from the raw uploaded text
        const aiResult = await generateAIReviewFromText(uploadedCVText);
        setAiReview(aiResult);
      } catch (err) {
        setError("Failed to generate AI review. Using default suggestions.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReview();
  }, [uploadedCVText]);

  const calculateScoresFromText = (text: string): ReviewScore => {
    const t = text.toLowerCase();
    let completeness = 0;
    let atsOptimization = 0;
    const formatting = 70; // baseline for uploaded doc

    // Completeness
    if (/@\w/.test(text)) completeness += 20; // email
    if (/\+?\d[\d\s\-().]{7,}/.test(text)) completeness += 15; // phone
    if (/experience|work history|employment/i.test(text)) completeness += 20;
    if (/education|degree|university|college/i.test(text)) completeness += 15;
    if (/skills|technologies|tools/i.test(text)) completeness += 15;
    if (/summary|objective|profile/i.test(text)) completeness += 15;

    // ATS
    if (/@\w/.test(text)) atsOptimization += 25;
    if (/\+?\d[\d\s\-().]{7,}/.test(text)) atsOptimization += 15;
    if (/experience|work/i.test(t)) atsOptimization += 25;
    if (/skill/i.test(t)) atsOptimization += 20;
    if (/summary|objective/i.test(t) && text.length > 100) atsOptimization += 15;

    const overall = Math.round((completeness + formatting + atsOptimization) / 3);
    return { overall, completeness, formatting, atsOptimization };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50/30 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CV Review</h1>
          <p className="text-lg text-gray-600">
            {isLoading ? "AI is analyzing your CV..." : "Here's what we found in your CV and how to improve it."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100"
          >
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(scores.overall / 100) * 377} 377`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-gray-900">{scores.overall}%</span>
                  <span className="text-sm text-gray-500">Overall Score</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ScoreBar label="Completeness" score={scores.completeness} />
              <ScoreBar label="Formatting" score={scores.formatting} />
              <ScoreBar label="ATS Optimization" score={scores.atsOptimization} />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <StatCard
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              title="Sections Detected"
              value={`${countSectionsFromText(uploadedCVText)}/5`}
              color="emerald"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
              title="Experience Entries"
              value={countOccurrences(uploadedCVText, /\b(\d{4}\s*[-–]\s*(\d{4}|present))/gi)}
              color="blue"
            />
            <StatCard
              icon={<Zap className="w-6 h-6 text-amber-600" />}
              title="Keywords Found"
              value={countKeywords(uploadedCVText)}
              color="amber"
            />
          </motion.div>
        </div>

        {/* AI Insights Section */}
        {!isLoading && aiReview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-indigo-200 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">{aiReview.overallInsight}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-2xl p-6 border border-emerald-200">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {aiReview.strengthsHighlight.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvement Areas */}
              <div className="bg-white rounded-2xl p-6 border border-orange-200">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  Key Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {aiReview.improvementAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-orange-600 mt-1 shrink-0" />
                      <span className="text-sm text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            {isLoading ? "Generating AI Recommendations..." : "AI Recommendations"}
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-linear-to-r from-slate-100 to-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {aiReview?.suggestions.map((suggestion, idx) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className={`flex gap-4 p-5 rounded-xl border-2 transition-all ${suggestion.priority === "high"
                    ? "bg-red-50 border-red-200"
                    : suggestion.priority === "medium"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-blue-50 border-blue-200"
                    }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {suggestion.priority === "high" && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    {suggestion.priority === "medium" && (
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                    )}
                    {suggestion.priority === "low" && (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-bold text-gray-900">{suggestion.title}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${suggestion.priority === "high"
                          ? "bg-red-200 text-red-800"
                          : suggestion.priority === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-blue-200 text-blue-800"
                          }`}
                      >
                        {suggestion.priority === "high"
                          ? "High Impact"
                          : suggestion.priority === "medium"
                            ? "Medium Impact"
                            : "Low Impact"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <Button variant="outline" onClick={onBack} className="flex-1">
            Upload Different CV
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-900">{score}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-linear-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: any; color: string }) => {
  const bgColor = {
    emerald: 'bg-emerald-50 border-emerald-200',
    blue: 'bg-blue-50 border-blue-200',
    amber: 'bg-amber-50 border-amber-200',
  }[color] || 'bg-blue-50 border-blue-200';

  return (
    <div className={`${bgColor} border rounded-2xl p-6`}>
      <div className="flex items-start justify-between mb-2">{icon}</div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
};


const countSectionsFromText = (text: string): number => {
  let count = 0;
  if (/@\w/.test(text) || /phone|tel/i.test(text)) count++; // contact
  if (/experience|work history|employment/i.test(text)) count++;
  if (/education|degree|university|college/i.test(text)) count++;
  if (/skills|technologies|tools/i.test(text)) count++;
  if (/summary|objective|profile/i.test(text)) count++;
  return count;
};

const countOccurrences = (text: string, pattern: RegExp): number => {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
};

const countKeywords = (text: string): number => {
  const keywords = [
    'managed', 'led', 'developed', 'designed', 'implemented', 'improved',
    'increased', 'decreased', 'reduced', 'achieved', 'delivered', 'built',
    'created', 'launched', 'coordinated', 'analyzed', 'collaborated'
  ];
  return keywords.filter(kw => new RegExp(`\\b${kw}`, 'i').test(text)).length;
};
