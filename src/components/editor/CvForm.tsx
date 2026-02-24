import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PersonalInfo } from './steps/PersonalInfo';
import { Experience } from './steps/Experience';
import { Education } from './steps/Education';
import { Skills } from './steps/Skills';
import { Projects } from './steps/Projects';
import { CustomSections } from './steps/CustomSections';
import { TemplateSelector } from './TemplateSelector';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { EnhancedStepper, type StepConfig } from './EnhancedStepper';
import { Button } from '@/components/ui/Button';
import { useResumeStore } from '@/stores/resumeStore';
import { TEMPLATE_MAP } from '@/templates';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Plus, Palette, ChevronRight, ChevronLeft, Download } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const CvForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { resumeData, setActiveEditorStepId, selectedTemplate } = useResumeStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const steps: StepConfig[] = [
    {
      id: 'template',
      title: t.steps.template.title,
      description: t.steps.template.description,
      icon: Palette,
      component: TemplateSelector,
      estimatedTime: '2 min',
      isRequired: true
    },
    {
      id: 'personal',
      title: t.steps.personal.title,
      description: t.steps.personal.description,
      icon: User,
      component: PersonalInfo,
      estimatedTime: '5 min',
      isRequired: true
    },
    {
      id: 'experience',
      title: t.steps.experience.title,
      description: t.steps.experience.description,
      icon: Briefcase,
      component: Experience,
      estimatedTime: '10 min',
      isRequired: true
    },
    {
      id: 'education',
      title: t.steps.education.title,
      description: t.steps.education.description,
      icon: GraduationCap,
      component: Education,
      estimatedTime: '5 min',
      isRequired: true
    },
    {
      id: 'skills',
      title: t.steps.skills.title,
      description: t.steps.skills.description,
      icon: Code,
      component: Skills,
      estimatedTime: '3 min',
      isRequired: true
    },
    {
      id: 'projects',
      title: t.steps.projects.title,
      description: t.steps.projects.description,
      icon: FolderGit2,
      component: Projects,
      estimatedTime: '8 min',
      isRequired: false
    },
    {
      id: 'custom',
      title: t.steps.custom.title,
      description: t.steps.custom.description,
      icon: Plus,
      component: CustomSections,
      estimatedTime: '5 min',
      isRequired: false
    }
  ];

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'} - CV`,
  });

  React.useEffect(() => {
    setActiveEditorStepId(steps[currentStep]?.id ?? null);
  }, [currentStep, setActiveEditorStepId]);

  const completeness = React.useMemo(() => {
    const personal = resumeData.personalInfo;
    let score = 0;
    let total = 0;

    const add = (ok: boolean, weight: number) => {
      total += weight;
      if (ok) score += weight;
    };

    add(Boolean(personal.fullName?.trim()), 10);
    add(Boolean(personal.email?.trim()), 10);
    add(Boolean(personal.phone?.trim()), 10);
    add(Boolean(personal.jobTitle?.trim()), 10);
    add(Boolean(personal.summary?.trim() && personal.summary.trim().length >= 30), 10);

    const hasExperience = resumeData.experience.some((e) => Boolean(e.company?.trim()) && Boolean(e.role?.trim()));
    add(hasExperience, 20);

    const hasEducation = resumeData.education.some((e) => Boolean(e.institution?.trim()) && Boolean(e.degree?.trim()));
    add(hasEducation, 10);

    add(resumeData.skills.length >= 3, 10);
    add(resumeData.projects.length >= 1, 10);

    const percent = total === 0 ? 0 : Math.round((score / total) * 100);
    return { percent };
  }, [resumeData]);

  const CurrentComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Enhanced Stepper Header */}
      <EnhancedStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        completeness={completeness.percent}
      />

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto text-lg">
          <CurrentComponent />
        </div>
      </div>

      {/* Hidden Template for Export */}
      <div className="hidden">
        <div ref={contentRef}>
          {React.createElement(TEMPLATE_MAP[selectedTemplate] || TEMPLATE_MAP['standard'])}
        </div>
      </div>

      {/* Footer / Navigation Actions */}
      <div className="sticky bottom-0 p-4 border-t bg-gray-50/95 backdrop-blur-sm flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> {t.common.back}
          </Button>
        </div>

        <Button
          onClick={currentStep === steps.length - 1 ? handlePrint : nextStep}
          disabled={currentStep === steps.length - 1}
          className="h-11 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-fuchsia-500/20 active:scale-[0.99] transition"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <Download className="w-4 h-4 mr-2" /> {t.common.exportPdf}
            </>
          ) : (
            <>
              {t.common.next} <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
