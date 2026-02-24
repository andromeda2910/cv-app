import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { TemplateTheme, defaultThemes } from '@/types/templateThemes';
import { validateTheme, isValidTheme } from '@/types/schemas';
import { Button } from '@/components/ui/Button';
import { Palette, Type, Layout, RotateCcw } from 'lucide-react';

export const TemplateCustomizer = () => {
  const { resumeData, selectedTemplate, setResumeData } = useResumeStore();
  const [selectedTheme, setSelectedTheme] = React.useState<TemplateTheme>(defaultThemes[0]);
  const [customTheme, setCustomTheme] = React.useState<TemplateTheme>(defaultThemes[0]);

  React.useEffect(() => {
    // Load saved theme from localStorage with validation (client-side only)
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme) {
      try {
        const themeData = JSON.parse(savedTheme);
        if (isValidTheme(themeData)) {
          const validatedTheme = validateTheme(themeData);
          setSelectedTheme(validatedTheme);
          setCustomTheme(validatedTheme);
          applyTheme(validatedTheme);
        } else {
          console.warn('Invalid theme format in localStorage, using default');
          localStorage.removeItem('cv-theme');
          applyTheme(defaultThemes[0]);
        }
      } catch (error) {
        console.warn('Failed to parse saved theme:', error);
        localStorage.removeItem('cv-theme');
        applyTheme(defaultThemes[0]);
      }
    } else {
      applyTheme(defaultThemes[0]);
    }
  }, []);

  // Store previous theme for cleanup
  const previousThemeRef = React.useRef<TemplateTheme | null>(null);

  const applyTheme = (theme: TemplateTheme) => {
    // Cleanup previous theme CSS variables
    if (previousThemeRef.current && typeof window !== 'undefined' && typeof document !== 'undefined') {
      const prevTheme = previousThemeRef.current;
      const root = document.documentElement;
      
      // Remove previous color variables
      Object.keys(prevTheme.colors).forEach(key => {
        root.style.removeProperty(`--color-${key}`);
      });
      
      // Remove previous font size variables
      Object.keys(prevTheme.fonts.size.heading).forEach(key => {
        root.style.removeProperty(`--font-size-heading-${key}`);
      });
      
      Object.keys(prevTheme.fonts.size.body).forEach(key => {
        root.style.removeProperty(`--font-size-body-${key}`);
      });
    }

    setSelectedTheme(theme);
    setCustomTheme(theme);
    
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('cv-theme', JSON.stringify(theme));
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    // Apply theme to document
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      Object.entries(theme.fonts.size.heading).forEach(([key, value]) => {
        root.style.setProperty(`--font-size-heading-${key}`, value);
      });
      
      Object.entries(theme.fonts.size.body).forEach(([key, value]) => {
        root.style.setProperty(`--font-size-body-${key}`, value);
      });
    }

    // Update previous theme reference
    previousThemeRef.current = theme;
  };

  const resetToDefault = () => {
    applyTheme(defaultThemes[0]);
  };

  const updateCustomTheme = (path: string, value: string) => {
    const newTheme = { ...customTheme };
    const keys = path.split('.');
    let current: any = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    
    // Validate the updated theme before applying
    try {
      const validatedTheme = validateTheme(newTheme);
      setCustomTheme(validatedTheme);
      applyTheme(validatedTheme);
    } catch (error) {
      console.warn('Invalid theme update, reverting to previous theme:', error);
      // Don't apply invalid theme changes
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Template Customization</h3>
        <Button variant="ghost" size="sm" onClick={resetToDefault}>
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Theme Presets */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-600" />
          <h4 className="font-medium text-gray-900">Theme Presets</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {defaultThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTheme.id === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-900">{theme.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Customization */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-600" />
          <h4 className="font-medium text-gray-900">Colors</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(customTheme.colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 capitalize min-w-[80px]">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="color"
                value={value}
                onChange={(e) => updateCustomTheme(`colors.${key}`, e.target.value)}
                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateCustomTheme(`colors.${key}`, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Font Customization */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-green-600" />
          <h4 className="font-medium text-gray-900">Typography</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Heading Font</label>
            <select
              value={customTheme.fonts.heading}
              onChange={(e) => updateCustomTheme('fonts.heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Space Grotesk, sans-serif">Space Grotesk</option>
              <option value="Playfair Display, serif">Playfair Display</option>
              <option value="Helvetica, Arial, sans-serif">Helvetica</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Body Font</label>
            <select
              value={customTheme.fonts.body}
              onChange={(e) => updateCustomTheme('fonts.body', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Space Grotesk, sans-serif">Space Grotesk</option>
              <option value="Playfair Display, serif">Playfair Display</option>
              <option value="Helvetica, Arial, sans-serif">Helvetica</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">H1 Size</label>
            <select
              value={customTheme.fonts.size.heading.h1}
              onChange={(e) => updateCustomTheme('fonts.size.heading.h1', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="2rem">Small</option>
              <option value="2.25rem">Medium</option>
              <option value="2.5rem">Large</option>
              <option value="3rem">Extra Large</option>
              <option value="3.5rem">Huge</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">H2 Size</label>
            <select
              value={customTheme.fonts.size.heading.h2}
              onChange={(e) => updateCustomTheme('fonts.size.heading.h2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="1.5rem">Small</option>
              <option value="1.75rem">Medium</option>
              <option value="1.875rem">Large</option>
              <option value="2rem">Extra Large</option>
              <option value="2.5rem">Huge</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Body Size</label>
            <select
              value={customTheme.fonts.size.body.normal}
              onChange={(e) => updateCustomTheme('fonts.size.body.normal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="0.8125rem">Small</option>
              <option value="0.875rem">Medium</option>
              <option value="0.9375rem">Large</option>
              <option value="1rem">Extra Large</option>
              <option value="1.125rem">Huge</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout Customization */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-orange-600" />
          <h4 className="font-medium text-gray-900">Layout</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Max Width</label>
            <select
              value={customTheme.layout.maxWidth}
              onChange={(e) => updateCustomTheme('layout.maxWidth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="720px">Compact</option>
              <option value="792px">Standard</option>
              <option value="816px">A4</option>
              <option value="840px">Wide</option>
              <option value="900px">Extra Wide</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Padding</label>
            <select
              value={customTheme.layout.padding}
              onChange={(e) => updateCustomTheme('layout.padding', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="1.5rem">Compact</option>
              <option value="2rem">Standard</option>
              <option value="2.5rem">Comfortable</option>
              <option value="3rem">Spacious</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Border Radius</label>
            <select
              value={customTheme.layout.borderRadius}
              onChange={(e) => updateCustomTheme('layout.borderRadius', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="0">None</option>
              <option value="0.375rem">Small</option>
              <option value="0.5rem">Medium</option>
              <option value="0.75rem">Large</option>
              <option value="1rem">Extra Large</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Section Spacing</label>
            <select
              value={customTheme.spacing.section}
              onChange={(e) => updateCustomTheme('spacing.section', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="1rem">Compact</option>
              <option value="1.5rem">Standard</option>
              <option value="2rem">Comfortable</option>
              <option value="2.5rem">Spacious</option>
              <option value="3rem">Extra Spacious</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
        <div
          className="bg-white border border-gray-200 p-4 rounded-lg"
          style={{
            fontFamily: customTheme.fonts.body,
            maxWidth: customTheme.layout.maxWidth,
            padding: customTheme.layout.padding,
            borderRadius: customTheme.layout.borderRadius,
            backgroundColor: customTheme.colors.background,
            color: customTheme.colors.text,
            borderColor: customTheme.colors.border
          }}
        >
          <h1
            style={{
              fontFamily: customTheme.fonts.heading,
              fontSize: customTheme.fonts.size.heading.h1,
              color: customTheme.colors.primary,
              marginBottom: customTheme.spacing.section
            }}
          >
            John Doe
          </h1>
          <h2
            style={{
              fontFamily: customTheme.fonts.heading,
              fontSize: customTheme.fonts.size.heading.h2,
              color: customTheme.colors.secondary,
              marginBottom: customTheme.spacing.section
            }}
          >
            Senior Software Engineer
          </h2>
          <p
            style={{
              fontSize: customTheme.fonts.size.body.normal,
              color: customTheme.colors.textSecondary,
              marginBottom: customTheme.spacing.section
            }}
          >
            Experienced developer with expertise in modern web technologies.
          </p>
          <div
            style={{
              fontSize: customTheme.fonts.size.body.small,
              color: customTheme.colors.accent
            }}
          >
            Skills: React, TypeScript, Node.js
          </div>
        </div>
      </div>
    </div>
  );
};
