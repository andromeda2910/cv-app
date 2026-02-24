export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'certifications' | 'languages' | 'awards' | 'publications' | 'custom';
  items: any[];
  enabled: boolean;
  order: number;
}
