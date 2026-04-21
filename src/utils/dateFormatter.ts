export const formatDate = (dateString: string, formatType: 'monthYear' | 'year' = 'monthYear', language: 'en' | 'id' = 'en'): string => {
  if (!dateString) return '';
  
  // Handle formats like "2024-06", "2024-06-15", "Jun 2024", etc.
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original if can't parse
  }
  
  const year = date.getFullYear();
  
  if (formatType === 'year') {
    return year.toString();
  }
  
  const months = {
    en: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    id: [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ]
  };
  
  const month = months[language][date.getMonth()];
  
  return `${month} ${year}`;
};

export const formatDateRange = (startDate: string, endDate?: string, isCurrent?: boolean, language: 'en' | 'id' = 'en'): string => {
  const formattedStart = formatDate(startDate, 'monthYear', language);
  const presentText = language === 'id' ? 'Saat Ini' : 'Present';
  const formattedEnd = isCurrent ? presentText : formatDate(endDate || '', 'monthYear', language);
  
  return `${formattedStart} - ${formattedEnd}`;
};

export const formatEducationPeriod = (startDate: string, endDate: string, language: 'en' | 'id' = 'en'): string => {
  const startYear = formatDate(startDate, 'year', language);
  const endYear = formatDate(endDate, 'year', language);
  
  return `${startYear}-${endYear}`;
};
