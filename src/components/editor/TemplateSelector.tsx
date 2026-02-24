import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { TEMPLATE_LIST, TEMPLATE_MAP } from '@/templates';
import { Button } from '@/components/ui/Button';
import { Eye, Download, HelpCircle } from 'lucide-react';

export const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All templates' },
    { id: 'simple', label: 'Simple' },
    { id: 'ats', label: 'ATS Optimized' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' }
  ];

  const filteredTemplates = TEMPLATE_LIST.filter(template => {
    if (selectedCategory === 'all') return true;
    return template.id === selectedCategory || 
           template.name.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Progress Indicator */}
      <div className="flex justify-between items-start mb-8">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your CV Template</h2>
          <p className="text-gray-600">Select a professional template that best represents your style</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          
          return (
            <div
              key={template.id}
              className={`relative group cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Template Preview */}
              <div className={`bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}>
                {/* Preview Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                        <span className="text-sm font-medium text-gray-700">Preview</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
                      >
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Selected
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>
                  
                  {/* Template Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.id === 'ats' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">ATS Friendly</span>
                    )}
                    {template.id === 'modern' && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Modern</span>
                    )}
                    {template.id === 'standard' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Classic</span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    className="w-full py-3 font-semibold transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        Selected Template
                      </>
                    ) : (
                      'Use This Template'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Not sure which one to pick?</h3>
            <div className="space-y-2 text-gray-600 mb-4">
              <p>• <strong>Standard Professional:</strong> Perfect for traditional industries like finance, law, and healthcare</p>
              <p>• <strong>ATS Optimized:</strong> Best for corporate applications and automated screening systems</p>
              <p>• <strong>Modern Creative:</strong> Ideal for creative fields, startups, and tech companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-start items-center pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="px-6 py-3 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Button>
      </div>
    </div>
  );
};
