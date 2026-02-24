import React from 'react';
import { useResumeStore, ResumeData } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const Projects = () => {
    const { resumeData, addProject, removeProject, updateProject } = useResumeStore();
    const { projects } = resumeData;
    const { t } = useTranslation();

    const handleAdd = () => {
        addProject({
            id: crypto.randomUUID(),
            name: '',
            description: '',
            url: '',
            technologies: [],
        });
    };

    const handleChange = (index: number, field: keyof ResumeData['projects'][0], value: any) => {
        const item = { ...projects[index], [field]: value };
        updateProject(index, item);
    };

    const handleTechChange = (index: number, value: string) => {
        // Simple comma separated parser for MVP
        const techs = value.split(',').map(t => t.trim());
        handleChange(index, 'technologies', techs);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t.projects.title}</h3>
                <Button onClick={handleAdd} variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> {t.projects.addProject}
                </Button>
            </div>

            <div className="space-y-6">
                {projects.map((proj, index) => (
                    <div key={proj.id} className="p-4 border rounded-lg bg-gray-50/50 space-y-4 relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeProject(proj.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t.projects.projectName}</Label>
                                <Input
                                    value={proj.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    placeholder={t.projects.projectNamePlaceholder}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t.projects.projectUrl}</Label>
                                <Input
                                    value={proj.url || ''}
                                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                                    placeholder={t.projects.projectUrlPlaceholder}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t.projects.technologies}</Label>
                            <Input
                                value={proj.technologies.join(', ')}
                                onChange={(e) => handleTechChange(index, e.target.value)}
                                placeholder={t.projects.technologiesPlaceholder}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{t.projects.description}</Label>
                            <Textarea
                                value={proj.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                placeholder={t.projects.descriptionPlaceholder}
                                className="min-h-[80px]"
                            />
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                        {t.projects.emptyState}
                    </div>
                )}
            </div>
        </div>
    );
};
