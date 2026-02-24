import { ResumeData } from '@/stores/resumeStore';

export interface ValidationError {
  field: string;
  message: string;
  section: 'personalInfo' | 'experience' | 'education' | 'skills' | 'projects';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export function validateResumeData(data: ResumeData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Personal Info validations
  if (!data.personalInfo.fullName.trim()) {
    errors.push({
      field: 'fullName',
      message: 'Full name is required',
      section: 'personalInfo'
    });
  }

  if (!data.personalInfo.email.trim()) {
    errors.push({
      field: 'email',
      message: 'Email is required',
      section: 'personalInfo'
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
      section: 'personalInfo'
    });
  }

  if (!data.personalInfo.phone.trim()) {
    errors.push({
      field: 'phone',
      message: 'Phone number is required',
      section: 'personalInfo'
    });
  }

  if (!data.personalInfo.jobTitle.trim()) {
    warnings.push({
      field: 'jobTitle',
      message: 'Job title is recommended for better CV targeting',
      section: 'personalInfo'
    });
  }

  if (!data.personalInfo.summary || data.personalInfo.summary.length < 50) {
    warnings.push({
      field: 'summary',
      message: 'Professional summary should be at least 50 characters for better impact',
      section: 'personalInfo'
    });
  } else if (data.personalInfo.summary.length > 300) {
    warnings.push({
      field: 'summary',
      message: 'Professional summary is quite long, consider keeping it under 300 characters',
      section: 'personalInfo'
    });
  }

  // Experience validations
  if (data.experience.length === 0) {
    warnings.push({
      field: 'experience',
      message: 'Adding work experience can significantly strengthen your CV',
      section: 'experience'
    });
  } else {
    data.experience.forEach((exp, index) => {
      if (!exp.role.trim()) {
        errors.push({
          field: `experience[${index}].role`,
          message: 'Job title is required',
          section: 'experience'
        });
      }

      if (!exp.company.trim()) {
        errors.push({
          field: `experience[${index}].company`,
          message: 'Company name is required',
          section: 'experience'
        });
      }

      if (!exp.startDate.trim()) {
        errors.push({
          field: `experience[${index}].startDate`,
          message: 'Start date is required',
          section: 'experience'
        });
      }

      if (!exp.current && !exp.endDate.trim()) {
        errors.push({
          field: `experience[${index}].endDate`,
          message: 'End date is required when not currently working',
          section: 'experience'
        });
      }

      if (!exp.description || exp.description.length < 20) {
        warnings.push({
          field: `experience[${index}].description`,
          message: 'Add more details about your responsibilities and achievements',
          section: 'experience'
        });
      }
    });
  }

  // Education validations
  if (data.education.length === 0) {
    warnings.push({
      field: 'education',
      message: 'Adding education information is recommended',
      section: 'education'
    });
  } else {
    data.education.forEach((edu, index) => {
      if (!edu.degree.trim()) {
        errors.push({
          field: `education[${index}].degree`,
          message: 'Degree is required',
          section: 'education'
        });
      }

      if (!edu.institution.trim()) {
        errors.push({
          field: `education[${index}].institution`,
          message: 'Institution name is required',
          section: 'education'
        });
      }

      if (!edu.endDate.trim()) {
        warnings.push({
          field: `education[${index}].endDate`,
          message: 'Graduation year is recommended',
          section: 'education'
        });
      }
    });
  }

  // Skills validations
  if (data.skills.length === 0) {
    warnings.push({
      field: 'skills',
      message: 'Adding skills can help with ATS optimization',
      section: 'skills'
    });
  } else if (data.skills.length < 5) {
    warnings.push({
      field: 'skills',
      message: 'Consider adding more skills (5-10 recommended)',
      section: 'skills'
    });
  }

  // Check for duplicate skills
  const skillNames = data.skills.map(s => s.name.toLowerCase());
  const duplicateSkills = skillNames.filter((name, index) => skillNames.indexOf(name) !== index);
  if (duplicateSkills.length > 0) {
    warnings.push({
      field: 'skills',
      message: 'Some skills appear to be duplicated',
      section: 'skills'
    });
  }

  // Projects validations
  if (data.projects.length > 0) {
    data.projects.forEach((project, index) => {
      if (!project.name.trim()) {
        errors.push({
          field: `projects[${index}].name`,
          message: 'Project name is required',
          section: 'projects'
        });
      }

      if (!project.description || project.description.length < 20) {
        warnings.push({
          field: `projects[${index}].description`,
          message: 'Add more details about the project',
          section: 'projects'
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function getFieldError(validationResult: ValidationResult, field: string): ValidationError | undefined {
  return validationResult.errors.find(error => error.field === field);
}

export function getFieldWarning(validationResult: ValidationResult, field: string): ValidationError | undefined {
  return validationResult.warnings.find(warning => warning.field === field);
}
