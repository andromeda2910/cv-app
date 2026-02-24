import { ResumeData } from '@/stores/resumeStore';
import { TEMPLATE_LIST } from '@/templates';
import { TemplateTheme, defaultThemes } from '@/types/templateThemes';

/**
 * Validates imported CV data structure
 */
export const validateCVImport = (data: any): data is ResumeData => {
  if (!data || typeof data !== 'object') return false;
  
  // Check required top-level properties
  const required = ['personalInfo', 'experience', 'education', 'skills', 'projects'];
  for (const prop of required) {
    if (!(prop in data)) return false;
  }
  
  // Validate personalInfo
  if (!data.personalInfo || typeof data.personalInfo !== 'object') return false;
  const personalRequired = ['fullName', 'email', 'phone'];
  for (const prop of personalRequired) {
    if (!(prop in data.personalInfo)) return false;
  }
  
  // Validate arrays
  if (!Array.isArray(data.experience)) return false;
  if (!Array.isArray(data.education)) return false;
  if (!Array.isArray(data.skills)) return false;
  if (!Array.isArray(data.projects)) return false;
  
  return true;
};

/**
 * Checks if CV data is valid and complete enough
 */
export const isValidCVImport = (data: any): boolean => {
  if (!validateCVImport(data)) return false;
  
  // Check if has minimal required data
  const hasBasicInfo = Boolean(
    data.personalInfo?.fullName?.trim() &&
    data.personalInfo?.email?.trim()
  );
  
  const hasSomeExperience = data.experience.length > 0 && 
    data.experience.some((exp: any) => exp.company?.trim() && exp.role?.trim());
  
  const hasSomeEducation = data.education.length > 0 && 
    data.education.some((edu: any) => edu.institution?.trim() && edu.degree?.trim());
  
  return hasBasicInfo && (hasSomeExperience || hasSomeEducation);
};

/**
 * Validates theme selection
 */
export const validateTheme = (theme: any): TemplateTheme => {
  if (theme && typeof theme === 'object' && theme.id && theme.colors && theme.fonts) {
    return theme as TemplateTheme;
  }
  return defaultThemes[0]; // fallback to default theme
};

/**
 * Checks if theme is valid
 */
export const isValidTheme = (theme: any): boolean => {
  return theme && typeof theme === 'object' && 
         theme.id && theme.colors && theme.fonts;
};
