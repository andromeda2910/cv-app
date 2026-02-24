import React from 'react';
import { cn } from '@/utils/cn';
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Plus,
  Palette,
  Check,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export interface StepConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  estimatedTime: string;
  isRequired: boolean;
  component: React.ComponentType;
}

interface EnhancedStepperProps {
  steps: StepConfig[];
  currentStep: number;
  onStepClick: (index: number) => void;
  completeness: number;
  stepValidation?: Record<string, boolean>;
}

export const EnhancedStepper: React.FC<EnhancedStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  completeness,
  stepValidation = {}
}) => {
  const { t } = useTranslation();

  const getStepState = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  const getStepValidation = (stepId: string) => {
    return stepValidation[stepId] ?? true;
  };

  const stepOfText = t.common.stepOf
    .replace('{current}', String(currentStep + 1))
    .replace('{total}', String(steps.length));

  return (
    <div className="bg-white border-b">
      {/* Progress Summary Bar */}
      <div className="px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            {stepOfText}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">{t.common.progress}</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <div className="text-sm font-bold text-gray-900">
              {completeness}%
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="px-8 py-8">
        {/* Horizontal Step Indicator */}
        <div className="relative">
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full z-0" />
          <div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full z-0 transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          />

          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => {
              const state = getStepState(index);
              const isValid = getStepValidation(step.id);
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex flex-col items-center relative group">
                  {/* Step Circle */}
                  <button
                    onClick={() => onStepClick(index)}
                    className={cn(
                      "relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 font-semibold text-sm bg-white shadow-sm",
                      state === 'completed' && "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-lg transform hover:scale-110",
                      state === 'active' && "border-blue-600 bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 transform scale-110 font-bold",
                      state === 'upcoming' && "border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50",
                      !isValid && state === 'completed' && "border-orange-400 bg-orange-50 text-orange-600"
                    )}
                  >
                    {state === 'completed' ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="mt-4 text-center">
                    <div className={cn(
                      "text-sm font-semibold transition-colors",
                      state === 'completed' && "text-blue-600",
                      state === 'active' && "text-gray-900",
                      state === 'upcoming' && "text-gray-500"
                    )}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
