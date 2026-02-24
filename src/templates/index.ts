import { StandardTemplate } from './StandardTemplate';
import { ATSTemplate } from './ATSTemplate';
import { ModernTemplate } from './ModernTemplate';

export const TEMPLATE_MAP: Record<string, React.ComponentType> = {
  standard: StandardTemplate,
  ats: ATSTemplate,
  modern: ModernTemplate,
};

export const TEMPLATE_LIST = [
  { 
    id: 'standard', 
    name: 'Standard Professional', 
    description: 'Clean and organized layout with traditional formatting.',
    preview: '/previews/standard.png'
  },
  { 
    id: 'ats', 
    name: 'ATS Optimized', 
    description: 'Designed for Applicant Tracking Systems with simple, scannable formatting.',
    preview: '/previews/ats.png'
  },
  { 
    id: 'modern', 
    name: 'Modern Creative', 
    description: 'Contemporary design with vibrant colors and sidebar layout.',
    preview: '/previews/modern.png'
  },
];
