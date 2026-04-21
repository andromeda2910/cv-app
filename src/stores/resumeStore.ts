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

import { ResumeDataSchema } from '@/types/schemas';

const loadFromLocalStorage = () => {
  // Check if we're on the client side
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return { resumeData: null, selectedTemplate: null };
  }

  try {
    const savedData = localStorage.getItem('cv-data');
    const savedTemplate = localStorage.getItem('selected-template');

    let resumeData = null;
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const result = ResumeDataSchema.safeParse(parsed);
        if (result.success) {
          resumeData = result.data as ResumeData;
        } else {
          console.warn('Invalid resume data in localStorage:', result.error);
        }
      } catch (e) {
        console.warn('Failed to parse resume data:', e);
      }
    }

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
      
      // Sort experiences by date (newest first)
      if (resumeData.experience && resumeData.experience.length > 0) {
        resumeData.experience = sortExperiences(resumeData.experience);
      }
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

// Helper function to sort experiences by date (newest first)
const sortExperiences = (experiences: ResumeData['experience']): ResumeData['experience'] => {
  if (!experiences || experiences.length === 0) return [];
  
  return [...experiences].sort((a, b) => {
    // Current jobs should always come first
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    
    // If both are current or both are not current, sort by date
    const getDateForSorting = (exp: ResumeData['experience'][0]) => {
      if (exp.current) {
        // For current jobs, use start date
        return exp.startDate;
      }
      // For past jobs, use end date if available, otherwise start date
      return exp.endDate || exp.startDate;
    };
    
    const dateA = getDateForSorting(a);
    const dateB = getDateForSorting(b);
    
    // Parse dates — supports both YYYY-MM (ISO, from <input type="month">) and legacy MM-YYYY
    const parseDate = (dateStr: string) => {
      // Empty date → treat as very old so incomplete entries sink to the bottom
      if (!dateStr) return new Date(-8640000000000000);
      const parts = dateStr.split('-');
      if (parts.length < 2) return new Date(-8640000000000000);
      // If first part is 4 digits → YYYY-MM format (from <input type="month">)
      if (parts[0].length === 4) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
      }
      // Otherwise assume legacy MM-YYYY format
      return new Date(parseInt(parts[1]), parseInt(parts[0]) - 1);
    };
    
    const parsedDateA = parseDate(dateA);
    const parsedDateB = parseDate(dateB);
    
    // Sort by date descending (newest first)
    return parsedDateB.getTime() - parsedDateA.getTime();
  });
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
  getSortedExperience: () => ResumeData['experience'];
  setPersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: ResumeData['experience'][0]) => void;
  updateExperience: (id: string, experience: ResumeData['experience'][0]) => void;
  removeExperience: (id: string) => void;
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



export const useResumeStore = create<ResumeState>((set, get) => {
  // Load saved data on initialization
  const savedData = loadFromLocalStorage();
  
  // Ensure experiences are sorted on initial load
  const initialResumeData = savedData?.resumeData || DEFAULT_RESUME_DATA;
  if (initialResumeData.experience && initialResumeData.experience.length > 0) {
    initialResumeData.experience = sortExperiences(initialResumeData.experience);
  }

  return {
    resumeData: initialResumeData,
    getSortedExperience: () => sortExperiences(get().resumeData.experience),
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
      set((state) => {
        const updatedExperiences = [...state.resumeData.experience, experience];
        const sortedExperiences = sortExperiences(updatedExperiences);
        return {
          resumeData: {
            ...state.resumeData,
            experience: sortedExperiences,
          },
        };
      }),
    updateExperience: (id, experience) =>
      set((state) => {
        // Use id-based lookup to avoid stale-index bugs after re-sort
        const newExp = state.resumeData.experience.map((exp) =>
          exp.id === id ? experience : exp
        );
        const sortedExperiences = sortExperiences(newExp);
        return {
          resumeData: {
            ...state.resumeData,
            experience: sortedExperiences,
          }
        };
      }),
    removeExperience: (id) =>
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter((exp) => exp.id !== id),
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
