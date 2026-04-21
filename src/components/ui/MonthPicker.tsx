import React from 'react';
import { useTranslation } from '@/lib/useTranslation';

interface MonthPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({ 
  value, 
  onChange, 
  disabled = false,
  placeholder = "MM-YYYY"
}) => {
  const { language } = useTranslation();
  
  // Month names in English and Indonesian
  const months = {
    en: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    id: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
  };

  const currentMonthNames = months[language as keyof typeof months] || months.en;
  
  // Parse current value or default to current date
  const parseValue = (val: string) => {
    if (!val) return { year: new Date().getFullYear(), month: new Date().getMonth() };
    
    // Handle both YYYY-MM and MM-YYYY formats
    if (val.includes('-')) {
      const parts = val.split('-');
      if (parts[0].length === 4) {
        // YYYY-MM format
        return { year: parseInt(parts[0]), month: parseInt(parts[1]) - 1 };
      } else {
        // MM-YYYY format
        return { year: parseInt(parts[1]), month: parseInt(parts[0]) - 1 };
      }
    }
    return { year: new Date().getFullYear(), month: new Date().getMonth() };
  };

  const { year, month } = parseValue(value);
  
  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handleYearChange = (newYear: string) => {
    const newMonth = String(month + 1).padStart(2, '0');
    onChange(`${newYear}-${newMonth}`);
  };

  const handleMonthChange = (newMonth: string) => {
    const monthNum = String(parseInt(newMonth) + 1).padStart(2, '0');
    onChange(`${year}-${monthNum}`);
  };

  return (
    <div className="flex gap-2">
      <select
        value={month}
        onChange={(e) => handleMonthChange(e.target.value)}
        disabled={disabled}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
      >
        <option value="" className="text-gray-500">{placeholder}</option>
        {currentMonthNames.map((monthName, index) => (
          <option key={index} value={index} className="text-gray-900">
            {monthName}
          </option>
        ))}
      </select>
      
      <select
        value={year}
        onChange={(e) => handleYearChange(e.target.value)}
        disabled={disabled}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24 bg-white text-gray-900"
      >
        <option value="" className="text-gray-500">{placeholder}</option>
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption} className="text-gray-900">
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};
