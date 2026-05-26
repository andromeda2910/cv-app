import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/lib/useTranslation';
import { ChevronDown } from 'lucide-react';

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
  
  // Generate year options from 1970 to current year + 10 in descending order
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  const endYear = currentYear + 10;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);

  const handleYearChange = (newYear: string) => {
    const newMonth = String(month + 1).padStart(2, '0');
    onChange(`${newYear}-${newMonth}`);
  };

  const handleMonthChange = (newMonth: string) => {
    const monthNum = String(parseInt(newMonth) + 1).padStart(2, '0');
    onChange(`${year}-${monthNum}`);
  };

  // Custom dropdown state
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate dropdown position when opened
  useEffect(() => {
    if (yearDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setDropdownPosition({
        top: rect.bottom + scrollTop,
        left: rect.left + scrollLeft
      });
    }
  }, [yearDropdownOpen]);

  // Close dropdown on outside click (but not when clicking scrollbar or inside dropdown)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      
      // Don't close if clicking inside the dropdown
      if (yearDropdownRef.current && yearDropdownRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking the button
      if (buttonRef.current && buttonRef.current.contains(target)) {
        return;
      }
      
      // Close if clicking outside both
      setYearDropdownOpen(false);
    };
    
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleYearSelect = (selectedYear: number) => {
    const newMonth = String(month + 1).padStart(2, '0');
    onChange(`${selectedYear}-${newMonth}`);
    setYearDropdownOpen(false);
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
      
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setYearDropdownOpen(!yearDropdownOpen)}
          disabled={disabled}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24 bg-white text-gray-900 flex items-center justify-between"
        >
          <span>{year || placeholder}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        
        {yearDropdownOpen && !disabled && createPortal(
          <div 
            ref={yearDropdownRef}
            className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto min-w-[250px] scroll-smooth"
            style={{ 
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            <div className="grid grid-cols-3 gap-2 p-2 pb-4">
              {years.map((yearOption) => (
                <button
                  key={yearOption}
                  type="button"
                  onClick={() => handleYearSelect(yearOption)}
                  className="px-2 py-1 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors text-center"
                >
                  {yearOption}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};
