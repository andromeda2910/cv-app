import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { validateResumeData, getFieldError, getFieldWarning } from '@/utils/validation';
import { RealTimeAISuggestions } from '../RealTimeAISuggestions';
import { Lightbulb } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const PersonalInfo = () => {
  const { resumeData, setPersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const [validation, setValidation] = React.useState(validateResumeData(resumeData));
  const [showSummaryAI, setShowSummaryAI] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    setValidation(validateResumeData(resumeData));
  }, [resumeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPersonalInfo({ photo: result });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPersonalInfo({ photo: '' });
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <Label htmlFor="photo" className="text-lg font-semibold">{t.personalInfo.profilePhoto}</Label>
        <div className="flex items-center gap-6">
          <div
            className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors group"
            onClick={() => document.getElementById('photo')?.click()}
          >
            {personalInfo.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center group-hover:text-blue-500 transition-colors">
                <div className="text-3xl mb-1">📷</div>
                <div className="text-sm font-medium">{t.personalInfo.clickToUpload}</div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="text-sm text-gray-600 mb-2">
              <strong>{t.personalInfo.recommended}</strong> {t.personalInfo.squareImageMax}
            </div>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            {personalInfo.photo && (
              <Button
                variant="outline"
                onClick={removePhoto}
                className="px-6 py-2 border-red-600 text-red-600 hover:bg-red-50 font-medium"
              >
                {t.personalInfo.removePhoto}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="fullName" className="text-lg font-semibold">{t.personalInfo.fullName}</Label>
          <Input
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder={t.personalInfo.fullNamePlaceholder}
            className="h-14 text-lg"
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="jobTitle" className="text-lg font-semibold">{t.personalInfo.jobTitle}</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder={t.personalInfo.jobTitlePlaceholder}
            className="h-14 text-lg"
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="email" className="text-lg font-semibold">{t.personalInfo.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder={t.personalInfo.emailPlaceholder}
            className="h-14 text-lg"
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="phone" className="text-lg font-semibold">{t.personalInfo.phone}</Label>
          <Input
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder={t.personalInfo.phonePlaceholder}
            className="h-14 text-lg"
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="location" className="text-lg font-semibold">{t.personalInfo.location}</Label>
          <Input
            id="location"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder={t.personalInfo.locationPlaceholder}
            className="h-14 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="website" className="text-lg font-semibold">{t.personalInfo.website}</Label>
          <Input
            id="website"
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder={t.personalInfo.websitePlaceholder}
            className="h-14 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="linkedin" className="text-lg font-semibold">{t.personalInfo.linkedin}</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder={t.personalInfo.linkedinPlaceholder}
            className="h-14 text-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="summary" className="text-lg font-semibold">{t.personalInfo.professionalSummary}</Label>
          <button
            type="button"
            onClick={() => setShowSummaryAI((v) => !v)}
            disabled={!personalInfo.jobTitle?.trim() || personalInfo.summary.length < 50}
            className={
              "inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border transition-all duration-200 " +
              (personalInfo.jobTitle?.trim() && personalInfo.summary.length >= 50
                ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm hover:scale-105 animate-pulse shadow-lg shadow-blue-500/50"
                : "border-gray-200 text-gray-700 hover:bg-gray-50")
            }
          >
            <Lightbulb className={`w-4 h-4 ${personalInfo.jobTitle?.trim() && personalInfo.summary.length >= 50 ? 'text-blue-600 drop-shadow-sm' : 'text-gray-500'}`} />
            {t.personalInfo.aiAssistant}
          </button>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder={t.personalInfo.summaryPlaceholder}
          className="min-h-[140px] text-lg"
        />

        {showSummaryAI && personalInfo.jobTitle?.trim() && (
          <RealTimeAISuggestions
            fieldType="summary"
            currentValue={personalInfo.summary}
            targetRole={personalInfo.jobTitle}
            inline
            alwaysShow
            onSuggestionSelect={(suggestion) => setPersonalInfo({ summary: suggestion })}
          />
        )}

        <div className="flex justify-between items-center text-base">
          <span className="text-gray-500">
            {personalInfo.summary.length}/300 {t.common.characters}
          </span>
          {getFieldWarning(validation, 'summary') && (
            <span className="text-yellow-600">{getFieldWarning(validation, 'summary')?.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
