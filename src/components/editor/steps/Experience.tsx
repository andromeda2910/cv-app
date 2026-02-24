import React from 'react';
import { useResumeStore, ResumeData } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Trash2, Plus } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const Experience = () => {
  const { resumeData, addExperience, removeExperience, updateExperience } = useResumeStore();
  const { experience } = resumeData;
  const { t } = useTranslation();

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
    });
  };

  const handleChange = (index: number, field: keyof ResumeData['experience'][0], value: any) => {
    const item = { ...experience[index], [field]: value };
    updateExperience(index, item);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t.experience.title}</h3>
        <Button onClick={handleAdd} variant="outline" size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> {t.experience.addPosition}
        </Button>
      </div>

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg bg-gray-50/50 space-y-4 relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.experience.companyName}</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  placeholder={t.experience.companyPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label>{t.experience.jobRole}</Label>
                <Input
                  value={exp.role}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  placeholder={t.experience.jobRolePlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.experience.startDate}</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  placeholder="MM-YYYY"
                />
                <p className="text-xs text-gray-500">{t.experience.dateFormat.replace('{example}', '01-2024')}</p>
              </div>
              <div className="space-y-2">
                <Label>{t.experience.endDate}</Label>
                <div className="flex gap-2">
                  <Input
                    type="month"
                    disabled={exp.current}
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder="MM-YYYY"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleChange(index, 'current', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor={`current-${exp.id}`} className="font-normal text-xs whitespace-nowrap">{t.experience.current}</Label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{t.experience.dateFormat.replace('{example}', '12-2023')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.experience.locationLabel}</Label>
              <Input
                value={exp.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder={t.experience.locationPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.experience.description}</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder={t.experience.descriptionPlaceholder}
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
            {t.experience.emptyState}
          </div>
        )}
      </div>
    </div>
  );
};
