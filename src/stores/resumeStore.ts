import { create } from 'zustand';
import { useEffect, useCallback } from 'react';
import { Certification, Language, Award, Publication, CustomSection } from '@/types/customSections';

// LocalStorage helpers
const saveToLocalStorage = (data: ResumeData, template: string) => {
  // Check if we're on the client side
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('cv-data', JSON.stringify(data));
    localStorage.setItem('selected-template', template);
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  // Check if we're on the client side
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return { resumeData: null, selectedTemplate: null };
  }

  try {
    const savedData = localStorage.getItem('cv-data');
    const savedTemplate = localStorage.getItem('selected-template');

    let resumeData = savedData ? JSON.parse(savedData) : null;

    // Ensure all properties exist (especially and newly added ones like coverLetterData)
    if (resumeData) {
      resumeData = {
        ...DEFAULT_RESUME_DATA,
        ...resumeData,
        // Deep merge coverLetterData specifically
        coverLetterData: {
          ...DEFAULT_RESUME_DATA.coverLetterData,
          ...(resumeData.coverLetterData || {})
        }
      };
    }

    return {
      resumeData,
      selectedTemplate: savedTemplate || null
    };
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  return { resumeData: null, selectedTemplate: null };
};

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    location: string;
    jobTitle: string;
    summary: string;
    photo?: string; // Base64 or data URL
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    score: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    technologies: string[];
  }>;
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  publications: Publication[];
  customSections: CustomSection[];
  coverLetterData: {
    position: string;
    company: string;
    jobDescription: string;
    tone: string;
    outputLanguage: string;
    generatedLetter: string;
  };
}

interface ResumeState {
  resumeData: ResumeData;
  setPersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (index: number, experience: ResumeData['experience'][0]) => void;
  removeExperience: (index: number) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (index: number, education: ResumeData['education'][0]) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  removeSkill: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  updateProject: (index: number, project: ResumeData['projects'][0]) => void;
  removeProject: (id: string) => void;
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
  clearAllData: () => void;
  lastSaved: Date | null;
  setLastSaved: (date: Date) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
  activeEditorStepId: string | null;
  setActiveEditorStepId: (stepId: string | null) => void;
  setResumeData: (data: ResumeData) => void;
  setCoverLetterData: (data: Partial<ResumeData['coverLetterData']>) => void;
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    location: '',
    jobTitle: '',
    summary: '',
    photo: undefined,
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  publications: [],
  customSections: [],
  coverLetterData: {
    position: '',
    company: '',
    jobDescription: '',
    tone: 'Professional',
    outputLanguage: 'English',
    generatedLetter: '',
  },
};



export const useResumeStore = create<ResumeState>((set) => {
  // Load saved data on initialization
  const savedData = loadFromLocalStorage();

  return {
    resumeData: savedData?.resumeData || DEFAULT_RESUME_DATA,
    selectedTemplate: savedData?.selectedTemplate || 'modern',
    lastSaved: null,
    isSaving: false,
    activeEditorStepId: null,
    setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
    setLastSaved: (date) => set({ lastSaved: date }),
    setIsSaving: (isSaving) => set({ isSaving }),
    setActiveEditorStepId: (stepId) => set({ activeEditorStepId: stepId }),
    clearAllData: () => set({
      resumeData: DEFAULT_RESUME_DATA,
      selectedTemplate: 'modern',
      lastSaved: null,
      isSaving: false,
      activeEditorStepId: null
    }),
    setResumeData: (data) => set({ resumeData: data }),
    setPersonalInfo: (data) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...data },
        },
      })),
    addExperience: (experience) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, experience],
        },
      })),
    updateExperience: (index, experience) =>
      set((state) => {
        const newExp = [...state.resumeData.experience];
        newExp[index] = experience;
        return {
          resumeData: {
            ...state.resumeData,
            experience: newExp,
          }
        };
      }),
    removeExperience: (index) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter((_, i) => i !== index),
        },
      })),
    addEducation: (education) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, education],
        },
      })),
    updateEducation: (index, education) =>
      set((state) => {
        const newEdu = [...state.resumeData.education];
        newEdu[index] = education;
        return {
          resumeData: {
            ...state.resumeData,
            education: newEdu,
          }
        };
      }),
    removeEducation: (index) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter((_, i) => i !== index),
        },
      })),
    addSkill: (skill) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: [...state.resumeData.skills, skill],
        },
      })),
    removeSkill: (id) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter((s) => s.id !== id),
        },
      })),
    addProject: (project) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          projects: [...state.resumeData.projects, project],
        },
      })),
    updateProject: (index, project) =>
      set((state) => {
        const newProj = [...state.resumeData.projects];
        newProj[index] = project;
        return {
          resumeData: {
            ...state.resumeData,
            projects: newProj,
          }
        };
      }),
    removeProject: (id) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.filter((p) => p.id !== id),
        },
      })),
    setCoverLetterData: (data) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          coverLetterData: { ...state.resumeData.coverLetterData, ...data },
        },
      })),
  };
});

// Auto-save hook with debounce
export const useAutoSave = () => {
  const { resumeData, selectedTemplate, setLastSaved, setIsSaving } = useResumeStore();

  // Memoize the save function to prevent unnecessary re-renders
  const saveData = useCallback(() => {
    saveToLocalStorage(resumeData, selectedTemplate);
    setLastSaved(new Date());
    setIsSaving(false);
  }, [resumeData, selectedTemplate, setLastSaved, setIsSaving]);

  useEffect(() => {
    setIsSaving(true);
    const timeoutId = setTimeout(() => {
      saveData();
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [saveData, setIsSaving]);
};
