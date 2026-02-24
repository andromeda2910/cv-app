import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { TEMPLATE_LIST } from '@/templates';
import { cn } from '@/utils/cn';
import { Layout } from 'lucide-react';

export const TemplatePicker = () => {
    const { selectedTemplate, setSelectedTemplate, activeEditorStepId } = useResumeStore();
    const highlight = activeEditorStepId === 'customize';

    return (
        <div className={cn(
            "flex flex-col gap-2 w-full rounded-2xl p-3 transition",
            highlight ? "bg-gradient-to-r from-blue-50 via-indigo-50 to-fuchsia-50 ring-2 ring-fuchsia-200 shadow-sm" : "bg-transparent"
        )}>
             <div className="flex items-center gap-2 text-gray-700">
                <Layout className="w-4 h-4" />
                <h3 className="text-sm font-medium">Select Template</h3>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent snap-x">
                {TEMPLATE_LIST.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                            "group relative flex flex-col items-start p-2 rounded-lg border-2 text-left transition-all hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 flex-shrink-0 snap-start",
                            selectedTemplate === template.id
                                ? "border-blue-600 bg-blue-50/50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                        )}
                    >
                        {/* Template Preview Image */}
                        <div className={cn(
                            "w-full aspect-[21/29.7] mb-2 rounded border overflow-hidden",
                            selectedTemplate === template.id ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200"
                        )}>
                           {template.preview ? (
                               <img 
                                   src={template.preview} 
                                   alt={`${template.name} template preview`}
                                   className="w-full h-full object-cover"
                               />
                           ) : (
                               <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                   <div className="transform scale-[0.20] origin-center opacity-50 select-none pointer-events-none">
                                        {/* Fallback abstract representation */}
                                        <div className="w-[210px] h-[297px] bg-gray-200 shadow-sm p-4 space-y-2">
                                             <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
                                             <div className="h-2 w-1/3 bg-gray-300 rounded mb-4"></div>
                                             <div className="space-y-1">
                                                 <div className="h-1 w-full bg-gray-300 rounded"></div>
                                                 <div className="h-1 w-full bg-gray-300 rounded"></div>
                                                 <div className="h-1 w-3/4 bg-gray-300 rounded"></div>
                                             </div>
                                        </div>
                                   </div>
                               </div>
                           )}
                        </div>

                        <div className="w-full">
                            <span className={cn(
                                "block text-xs font-semibold mb-1 truncate",
                                selectedTemplate === template.id ? "text-blue-700" : "text-gray-900"
                            )}>
                                {template.name}
                            </span>
                        </div>

                        {selectedTemplate === template.id && (
                             <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
