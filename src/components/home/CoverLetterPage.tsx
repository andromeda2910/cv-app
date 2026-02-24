"use client";

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Send,
    Copy,
    Download,
    RefreshCcw,
    Edit3,
    ChevronLeft,
    Sparkles,
    Check,
    AlertCircle
} from 'lucide-react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';
import { Button } from '@/components/ui/Button';
import { generateCoverLetter } from '@/utils/ai-cover-letter';

interface CoverLetterPageProps {
    onBack: () => void;
}

export const CoverLetterPage = ({ onBack }: CoverLetterPageProps) => {
    const { t } = useTranslation();
    const { resumeData, setCoverLetterData } = useResumeStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const {
        position = '',
        company = '',
        jobDescription = '',
        tone = 'Professional',
        outputLanguage = 'English',
        generatedLetter = ''
    } = resumeData.coverLetterData || {};

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Cover_Letter_${company.replace(/\s+/g, '_')}`,
    });

    const handleGenerate = async () => {
        if (!position || !company) {
            setError(t.coverLetter.formTitle); // Ideally a more specific error
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const letter = await generateCoverLetter(resumeData, {
                position,
                company,
                jobDescription,
                tone,
                outputLanguage
            });
            setCoverLetterData({ generatedLetter: letter });
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || "Failed to generate cover letter");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        handlePrint();
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        {t.common.back}
                    </Button>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold text-gray-900">{t.coverLetter.title}</h1>
                        <p className="text-sm text-gray-500">{t.coverLetter.subtitle}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                            <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                                <Sparkles className="w-5 h-5" />
                                {t.coverLetter.formTitle}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-xs text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        {t.coverLetter.targetPosition} *
                                    </label>
                                    <input
                                        type="text"
                                        value={position}
                                        onChange={(e) => setCoverLetterData({ position: e.target.value })}
                                        placeholder={t.coverLetter.positionPlaceholder}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden text-sm text-gray-900 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        {t.coverLetter.companyName} *
                                    </label>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCoverLetterData({ company: e.target.value })}
                                        placeholder={t.coverLetter.companyPlaceholder}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden text-sm text-gray-900 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        {t.coverLetter.jobDescription}
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setCoverLetterData({ jobDescription: e.target.value })}
                                        placeholder={t.coverLetter.jdPlaceholder}
                                        rows={4}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-hidden text-sm text-gray-900 font-medium resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        {t.coverLetter.tone}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Professional', 'Confident', 'Formal', 'Friendly'].map((tName) => (
                                            <button
                                                key={tName}
                                                onClick={() => setCoverLetterData({ tone: tName })}
                                                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${tone === tName
                                                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-xs'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {t.coverLetter.tones[tName.toLowerCase() as keyof typeof t.coverLetter.tones]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                        {t.coverLetter.outputLanguage}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['English', 'Indonesian'].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setCoverLetterData({ outputLanguage: lang })}
                                                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${outputLanguage === lang
                                                    ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-xs'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {t.coverLetter.languages[lang.toLowerCase() as keyof typeof t.coverLetter.languages]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleGenerate}
                                disabled={isLoading || !position || !company}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <RefreshCcw className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        {generatedLetter ? t.coverLetter.regenerate : t.coverLetter.generate}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Output */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col relative overflow-hidden">
                            {/* Output Header */}
                            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t.coverLetter.outputTitle}</h3>
                                        {generatedLetter && (
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <Check className="w-3 h-3" /> {t.coverLetter.copied.replace('clipboard!', 'ready')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {generatedLetter && !isLoading && (
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            {t.coverLetter.edit}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={handleCopy}>
                                            {isCopied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {isCopied ? t.coverLetter.copied : t.coverLetter.copy}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={handleDownload}>
                                            <Download className="w-4 h-4 mr-2" />
                                            {t.coverLetter.download}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-8 overflow-y-auto">
                                {isLoading ? (
                                    <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                                            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
                                        </div>
                                        <p className="text-gray-500 font-medium animate-pulse">{t.coverLetter.generating}</p>
                                    </div>
                                ) : generatedLetter ? (
                                    <div className="max-w-[650px] mx-auto bg-white p-8 sm:p-12 shadow-xs border border-gray-50 rounded-sm font-serif text-gray-900">
                                        {isEditing ? (
                                            <textarea
                                                value={generatedLetter}
                                                onChange={(e) => setCoverLetterData({ generatedLetter: e.target.value })}
                                                className="w-full min-h-[600px] p-4 text-gray-900 bg-gray-50 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-hidden leading-relaxed text-lg font-medium"
                                            />
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                <div className="whitespace-pre-wrap leading-relaxed text-lg">
                                                    {generatedLetter}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                            <FileText className="w-10 h-10 opacity-20" />
                                        </div>
                                        <p className="text-sm italic">{t.coverLetter.placeholder}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Printable Content */}
            <div className="hidden">
                <div ref={printRef} className="p-16 text-gray-900 font-serif leading-relaxed text-lg bg-white min-h-[1100px] w-[800px]">
                    <div className="whitespace-pre-wrap">
                        {generatedLetter}
                    </div>
                </div>
            </div>
        </div >
    );
};
