import { z } from 'zod';
import { TemplateTheme, defaultThemes } from '@/types/templateThemes';

// Schema for Personal Info
export const PersonalInfoSchema = z.object({
  fullName: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
  website: z.string().default(''),
  linkedin: z.string().default(''),
  location: z.string().default(''),
  jobTitle: z.string().default(''),
  summary: z.string().default(''),
  photo: z.string().optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().default(''),
  role: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  current: z.boolean().default(false),
  location: z.string().default(''),
  description: z.string().default(''),
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().default(''),
  degree: z.string().default(''),
  fieldOfStudy: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  score: z.string().default(''),
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  description: z.string().default(''),
  url: z.string().default(''),
  technologies: z.array(z.string()).default([]),
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
  proficiency: z.enum(['Basic', 'Intermediate', 'Advanced', 'Native']),
});

export const AwardSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  description: z.string().optional(),
});

export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.string(),
  publisher: z.string(),
  date: z.string(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['certifications', 'languages', 'awards', 'publications', 'custom']),
  items: z.array(z.any()),
  enabled: z.boolean(),
  order: z.number(),
});

// Schema for Resume Data
export const ResumeDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  awards: z.array(AwardSchema).default([]),
  publications: z.array(PublicationSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
  coverLetterData: z.object({
    position: z.string().default(''),
    company: z.string().default(''),
    jobDescription: z.string().default(''),
    tone: z.string().default('Professional'),
    outputLanguage: z.string().default('English'),
    generatedLetter: z.string().default(''),
  }).optional(),
});

// Schema for CV Profile (used in CVProfileSwitcher)
export const CVProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(''),
  resumeData: ResumeDataSchema,
  selectedTemplate: z.string().default('modern'),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const CVProfilesArraySchema = z.array(CVProfileSchema);

/**
 * Validates imported CV data structure using Zod
 */
export const validateCVImport = (data: unknown): boolean => {
  const result = ResumeDataSchema.safeParse(data);
  return result.success;
};

/**
 * Checks if CV data is valid and has minimal required data
 */
export const isValidCVImport = (data: unknown): boolean => {
  const parsed = ResumeDataSchema.safeParse(data);
  if (!parsed.success) return false;

  const resumeData = parsed.data;

  // Check if has minimal required data
  const hasBasicInfo = Boolean(
    resumeData.personalInfo?.fullName?.trim() &&
    resumeData.personalInfo?.email?.trim()
  );

  const hasSomeExperience = resumeData.experience.length > 0;
  const hasSomeEducation = resumeData.education.length > 0;

  return hasBasicInfo && (hasSomeExperience || hasSomeEducation);
};

export const validateTheme = (theme: unknown): TemplateTheme => {
  const t = theme as Record<string, unknown>;
  if (t && typeof t === 'object' && t.id && t.colors && t.fonts) {
    return theme as TemplateTheme;
  }
  return defaultThemes[0]; // fallback to default theme
};

/**
 * Checks if theme is valid
 */
export const isValidTheme = (theme: unknown): boolean => {
  const t = theme as Record<string, unknown>;
  return typeof theme === 'object' && theme !== null &&
    'id' in t && 'colors' in t && 'fonts' in t;
};
