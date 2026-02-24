import React, { useState } from 'react';
import { PersonalInfo } from './steps/PersonalInfo';
import { Experience } from './steps/Experience';
import { Education } from './steps/Education';
import { Skills } from './steps/Skills';
import { Projects } from './steps/Projects';
import { CustomSections } from './steps/CustomSections';
import { TemplateCustomizer } from './TemplateCustomizer';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { Button } from '@/components/ui/Button';
import { useResumeStore } from '@/stores/resumeStore';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Plus, Palette, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { 
    id: 'personal', 
    title: 'Personal Info', 
    description: 'Add your basic contact information and professional summary',
    icon: User, 
    component: PersonalInfo,
    estimatedTime: '5 min',
    isRequired: true
  },
  { 
    id: 'experience', 
    title: 'Experience', 
    description: 'Detail your work history and professional achievements',
    icon: Briefcase, 
    component: Experience,
    estimatedTime: '10 min',
    isRequired: true
  },
  { 
    id: 'education', 
    title: 'Education', 
    description: 'Add your academic background and qualifications',
    icon: GraduationCap, 
    component: Education,
    estimatedTime: '5 min',
    isRequired: true
  },
  { 
    id: 'skills', 
    title: 'Skills', 
    description: 'List your technical and professional skills',
    icon: Code, 
    component: Skills,
    estimatedTime: '3 min',
    isRequired: true
  },
  { 
    id: 'projects', 
    title: 'Projects', 
    description: 'Showcase your notable projects and portfolio',
    icon: FolderGit2, 
    component: Projects,
    estimatedTime: '8 min',
    isRequired: false
  },
  { 
    id: 'custom', 
    title: 'Custom Sections', 
    description: 'Add certifications, languages, awards, and more',
    icon: Plus, 
    component: CustomSections,
    estimatedTime: '5 min',
    isRequired: false
  },
  { 
    id: 'customize', 
    title: 'Customize', 
    description: 'Choose template and customize appearance',
    icon: Palette, 
    component: TemplateCustomizer,
    estimatedTime: '2 min',
    isRequired: false
  },
];

export const CvForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { resumeData, setActiveEditorStepId } = useResumeStore();

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
      {/* Simple Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{steps[currentStep].title}</h2>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>
          <div className="text-sm text-gray-500">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        <div className="mt-3">
          <AutoSaveIndicator />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                 <p className="text-gray-600">{steps[currentStep].description}</p>
                 <div className="mt-2">
                     <AutoSaveIndicator />
                 </div>
            </div>
            
            <CurrentComponent />
            
        </div>
      </div>

      {/* Footer / Navigation Actions */}
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
            </div>
            
            <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="h-11 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-fuchsia-500/20 active:scale-[0.99] transition"
            >
                {currentStep === steps.length - 1 ? 'Finish' : (
                    <>
                        Next <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                )}
            </Button>
      </div>
    </div>
  );
};
