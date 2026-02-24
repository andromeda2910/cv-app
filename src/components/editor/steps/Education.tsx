import React from 'react';
import { useResumeStore, ResumeData } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Trash2, Plus } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const Education = () => {
    const { resumeData, addEducation, removeEducation, updateEducation } = useResumeStore();
    const { education } = resumeData;
    const { t } = useTranslation();

    const handleAdd = () => {
        addEducation({
            id: crypto.randomUUID(),
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            score: '',
        });
    };

    const handleChange = (index: number, field: keyof ResumeData['education'][0], value: any) => {
        const item = { ...education[index], [field]: value };
        updateEducation(index, item);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t.education.title}</h3>
                <Button onClick={handleAdd} variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> {t.education.addEducation}
                </Button>
            </div>

            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-lg bg-gray-50/50 space-y-4 relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeEducation(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t.education.institution}</Label>
                                <Input
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                                    placeholder={t.education.institutionPlaceholder}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t.education.degree}</Label>
                                <Input
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                    placeholder={t.education.degreePlaceholder}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t.education.fieldOfStudy}</Label>
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                                placeholder={t.education.fieldOfStudyPlaceholder}
                            />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t.education.startDate}</Label>
                                <Input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                    placeholder="MM-YYYY"
                                />
                                <p className="text-xs text-gray-500">{t.education.dateFormat.replace('{example}', '09-2020')}</p>
                            </div>
                            <div className="space-y-2">
                                <Label>{t.education.endDate}</Label>
                                <Input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                    placeholder="MM-YYYY"
                                />
                                <p className="text-xs text-gray-500">{t.education.dateFormat.replace('{example}', '06-2024')}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t.education.score}</Label>
                            <Input
                                value={edu.score}
                                onChange={(e) => handleChange(index, 'score', e.target.value)}
                                placeholder={t.education.scorePlaceholder}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
