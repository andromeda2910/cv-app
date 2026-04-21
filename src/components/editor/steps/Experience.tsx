import React from 'react';
import { useResumeStore, ResumeData } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { MonthPicker } from '@/components/ui/MonthPicker';
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

  const handleChange = (id: string, field: keyof ResumeData['experience'][0], value: string | boolean) => {
    const item = experience.find((e) => e.id === id)!;
    updateExperience(id, { ...item, [field]: value });
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
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-lg bg-gray-50/50 space-y-4 relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.experience.companyName}</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  placeholder={t.experience.companyPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label>{t.experience.jobRole}</Label>
                <Input
                  value={exp.role}
                  onChange={(e) => handleChange(exp.id, 'role', e.target.value)}
                  placeholder={t.experience.jobRolePlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.experience.startDate}</Label>
                <MonthPicker
                  value={exp.startDate}
                  onChange={(value) => handleChange(exp.id, 'startDate', value)}
                />
                <p className="text-xs text-gray-500">{t.experience.dateFormat.replace('{example}', '01-2024')}</p>
              </div>
              <div className="space-y-2">
                <Label>{t.experience.endDate}</Label>
                <div className="flex gap-2">
                  <MonthPicker
                    value={exp.endDate}
                    onChange={(value) => handleChange(exp.id, 'endDate', value)}
                    disabled={exp.current}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm">
                      {t.experience.current}
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{t.experience.dateFormat.replace('{example}', '01-2024')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.experience.locationLabel}</Label>
              <Input
                value={exp.location}
                onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                placeholder={t.experience.locationPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.experience.description}</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
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
