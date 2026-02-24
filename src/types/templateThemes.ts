export interface TemplateTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
    size: {
      heading: {
        h1: string;
        h2: string;
        h3: string;
      };
      body: {
        large: string;
        normal: string;
        small: string;
      };
    };
  };
  spacing: {
    section: string;
    item: string;
    compact: string;
  };
  layout: {
    maxWidth: string;
    padding: string;
    borderRadius: string;
  };
}

export const defaultThemes: TemplateTheme[] = [
  {
    id: 'professional',
    name: 'Professional',
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      size: {
        heading: {
          h1: '2.5rem',
          h2: '1.875rem',
          h3: '1.25rem'
        },
        body: {
          large: '1.125rem',
          normal: '1rem',
          small: '0.875rem'
        }
      }
    },
    spacing: {
      section: '2rem',
      item: '1rem',
      compact: '0.5rem'
    },
    layout: {
      maxWidth: '816px',
      padding: '2.5rem',
      borderRadius: '0.5rem'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#8b5cf6',
      background: '#fafafa',
      text: '#18181b',
      textSecondary: '#71717a',
      border: '#e4e4e7'
    },
    fonts: {
      heading: 'Space Grotesk, sans-serif',
      body: 'Inter, sans-serif',
      size: {
        heading: {
          h1: '3rem',
          h2: '2rem',
          h3: '1.5rem'
        },
        body: {
          large: '1.125rem',
          normal: '1rem',
          small: '0.875rem'
        }
      }
    },
    spacing: {
      section: '3rem',
      item: '1.5rem',
      compact: '0.75rem'
    },
    layout: {
      maxWidth: '900px',
      padding: '3rem',
      borderRadius: '1rem'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#666666',
      background: '#ffffff',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0'
    },
    fonts: {
      heading: 'Helvetica, Arial, sans-serif',
      body: 'Helvetica, Arial, sans-serif',
      size: {
        heading: {
          h1: '2.25rem',
          h2: '1.75rem',
          h3: '1.25rem'
        },
        body: {
          large: '1rem',
          normal: '0.9375rem',
          small: '0.8125rem'
        }
      }
    },
    spacing: {
      section: '1.5rem',
      item: '0.75rem',
      compact: '0.375rem'
    },
    layout: {
      maxWidth: '792px',
      padding: '2rem',
      borderRadius: '0'
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    colors: {
      primary: '#dc2626',
      secondary: '#f97316',
      accent: '#fbbf24',
      background: '#fefce8',
      text: '#78350f',
      textSecondary: '#92400e',
      border: '#fed7aa'
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Source Sans Pro, sans-serif',
      size: {
        heading: {
          h1: '3.5rem',
          h2: '2.5rem',
          h3: '1.75rem'
        },
        body: {
          large: '1.25rem',
          normal: '1.125rem',
          small: '1rem'
        }
      }
    },
    spacing: {
      section: '2.5rem',
      item: '1.25rem',
      compact: '0.625rem'
    },
    layout: {
      maxWidth: '840px',
      padding: '2.75rem',
      borderRadius: '0.75rem'
    }
  }
];
