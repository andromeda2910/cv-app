'use client';

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import { CvForm } from "@/components/editor/CvForm";
import { useResumeStore } from "@/stores/resumeStore";
import { useAutoSave } from "@/stores/resumeStore";
import { useLanguageStore } from "@/stores/languageStore";
import { TEMPLATE_MAP, TEMPLATE_LIST } from "@/templates";
import { LandingPage } from "@/components/home/LandingPage";
import { ModeSelectionPage } from "@/components/home/ModeSelectionPage";
import { UploadCVPage } from "@/components/home/UploadCVPage";
import { CVReviewPage } from '@/components/home/CVReviewPage';
import { CoverLetterPage } from '@/components/home/CoverLetterPage';
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/useTranslation";

type AppView = 'landing' | 'modeSelection' | 'builder' | 'improveExisting' | 'cvReview' | 'coverLetter';

export default function Home() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = React.useState<AppView>('landing');
  const [uploadedCVText, setUploadedCVText] = React.useState<string>('');
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const previewBgStyle: React.CSSProperties = {
    background:
      'radial-gradient(220px 220px at 12% 12%, rgba(59, 130, 246, 0.20), transparent 60%), radial-gradient(200px 200px at 92% 18%, rgba(168, 85, 247, 0.18), transparent 60%), radial-gradient(240px 240px at 20% 85%, rgba(34, 211, 238, 0.16), transparent 60%), radial-gradient(220px 220px at 88% 78%, rgba(16, 185, 129, 0.14), transparent 60%), radial-gradient(40px 40px at 20% 20%, rgba(59, 130, 246, 0.35) 0 2px, transparent 3px), radial-gradient(40px 40px at 80% 30%, rgba(99, 102, 241, 0.30) 0 2px, transparent 3px), radial-gradient(40px 40px at 60% 80%, rgba(236, 72, 153, 0.25) 0 2px, transparent 3px), linear-gradient(to bottom, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.12))',
    backgroundSize: 'auto, auto, auto, auto, 48px 48px, 48px 48px, 48px 48px, auto',
    backgroundRepeat: 'no-repeat',
  };

  // Enable auto-save functionality
  useAutoSave();

  React.useEffect(() => {
    // Hydrate language from localStorage after mount to avoid hydration mismatch
    useLanguageStore.getState().initialize();
  }, []);

  const CurrentTemplate = TEMPLATE_MAP[selectedTemplate] || TEMPLATE_MAP['standard'];

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'} - CV`,
  });

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  // Landing Page View
  if (currentView === 'landing') {
    return <LandingPage onStart={() => setCurrentView('modeSelection')} onCreateCoverLetter={() => setCurrentView('coverLetter')} />;
  }

  // Mode Selection View
  if (currentView === 'modeSelection') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onHomeClick={handleBackToHome} onCreateCoverLetter={() => setCurrentView('coverLetter')} />
        <ModeSelectionPage
          onCreateNew={() => setCurrentView('builder')}
          onImproveExisting={() => setCurrentView('improveExisting')}
        />
      </div>
    );
  }

  // Improve Existing CV View
  if (currentView === 'improveExisting') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onHomeClick={handleBackToHome} onCreateCoverLetter={() => setCurrentView('coverLetter')} />
        <UploadCVPage
          onUploadComplete={(text) => {
            setUploadedCVText(text);
            setCurrentView('cvReview');
          }}
          onBack={() => setCurrentView('modeSelection')}
        />
      </div>
    );
  }

  // CV Review View
  if (currentView === 'cvReview') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onHomeClick={handleBackToHome} onCreateCoverLetter={() => setCurrentView('coverLetter')} />
        <CVReviewPage
          uploadedCVText={uploadedCVText}
          onBack={() => setCurrentView('improveExisting')}
        />
      </div>
    );
  }

  if (currentView === 'coverLetter') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header
          onHomeClick={handleBackToHome}
          onCreateCoverLetter={() => setCurrentView('coverLetter')}
        />
        <CoverLetterPage
          onBack={() => setCurrentView('landing')}
        />
      </div>
    );
  }

  // Builder View
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onHomeClick={handleBackToHome}
        onCreateCoverLetter={() => setCurrentView('coverLetter')}
      />
      <main className="flex-1 bg-gray-100 flex flex-col md:flex-row h-screen overflow-hidden animate-in fade-in duration-700">
        {/* Left: Form Editor */}
        <div className="w-full md:w-1/2 border-r bg-white h-full overflow-hidden flex flex-col">
          <CvForm />
        </div>

        {/* Right: Live Preview */}
        <div className="w-full md:w-1/2 bg-gray-200 h-full overflow-y-auto flex flex-col">
          {/* Simple Header */}
          <div className="bg-white border-b p-4 shadow-sm z-10 sticky top-0">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">{t.common.livePreview}</p>
            </div>
          </div>

          {/* Dynamic Render */}
          <div className="flex-1 p-8 flex justify-center overflow-x-hidden relative cv-preview-bg" style={previewBgStyle}>
            <div className="transform origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-100 transition-transform duration-200 relative z-10">
              <div ref={contentRef}>
                <CurrentTemplate />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
