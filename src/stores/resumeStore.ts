import { create } from 'zustand';

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
  removeProject: (id: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      website: '',
      linkedin: '',
      location: '',
      jobTitle: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },
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
  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((p) => p.id !== id),
      },
    })),
}));
