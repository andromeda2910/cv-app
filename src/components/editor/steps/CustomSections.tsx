import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { Certification, Language, Award, Publication } from '@/types/customSections';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Award as AwardIcon, BookOpen, Globe, FileText, Plus, Trash2, Edit2 } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const CustomSections = () => {
  const { resumeData, setResumeData } = useResumeStore();
  const { t } = useTranslation();

  // Add null safety check for resumeData
  if (!resumeData) {
    return (
      <div className="p-6">
        <div className="text-red-600">{t.customSections.errorNoData}</div>
      </div>
    );
  }

  const {
    certifications = [],
    languages = [],
    awards = [],
    publications = []
  } = resumeData;

  const updateCertifications = (certifications: Certification[]) => {
    setResumeData({ ...resumeData, certifications });
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData({ ...resumeData, languages });
  };

  const updateAwards = (awards: Award[]) => {
    setResumeData({ ...resumeData, awards });
  };

  const updatePublications = (publications: Publication[]) => {
    setResumeData({ ...resumeData, publications });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    };
    updateCertifications([...certifications, newCert]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateCertifications(updated);
  };

  const removeCertification = (index: number) => {
    updateCertifications(certifications.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Basic'
    };
    updateLanguages([...languages, newLang]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    updateLanguages(updated);
  };

  const removeLanguage = (index: number) => {
    updateLanguages(languages.filter((_, i) => i !== index));
  };

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    updateAwards([...awards, newAward]);
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], [field]: value };
    updateAwards(updated);
  };

  const removeAward = (index: number) => {
    updateAwards(awards.filter((_, i) => i !== index));
  };

  const addPublication = () => {
    const newPub: Publication = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      publisher: '',
      date: '',
      url: '',
      description: ''
    };
    updatePublications([...publications, newPub]);
  };

  const updatePublication = (index: number, field: keyof Publication, value: string) => {
    const updated = [...publications];
    updated[index] = { ...updated[index], [field]: value };
    updatePublications(updated);
  };

  const removePublication = (index: number) => {
    updatePublications(publications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AwardIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{t.customSections.certifications}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={addCertification}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{t.customSections.certificationLabel} {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t.customSections.certificationName}</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    placeholder={t.customSections.certificationNamePlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.issuingOrganization}</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    placeholder={t.customSections.issuingOrgPlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.dateObtained}</Label>
                  <Input
                    value={cert.date}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    placeholder="MM-YYYY"
                  />
                  <p className="text-xs text-gray-500">{t.customSections.dateFormat.replace('{example}', '03-2023')}</p>
                </div>
                <div>
                  <Label>{t.customSections.expiryDate}</Label>
                  <Input
                    value={cert.expiryDate}
                    onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                    placeholder="MM-YYYY"
                  />
                  <p className="text-xs text-gray-500">{t.customSections.dateFormat.replace('{example}', '03-2026')}</p>
                </div>
                <div>
                  <Label>{t.customSections.credentialId}</Label>
                  <Input
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    placeholder={t.customSections.credentialIdPlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.credentialUrl}</Label>
                  <Input
                    value={cert.credentialUrl}
                    onChange={(e) => updateCertification(index, 'credentialUrl', e.target.value)}
                    placeholder={t.customSections.credentialUrlPlaceholder}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">{t.customSections.languages}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={addLanguage}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {languages.map((lang, index) => (
            <div key={lang.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{t.customSections.languageLabel} {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t.customSections.languageLabel}</Label>
                  <Input
                    value={lang.name}
                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                    placeholder={t.customSections.languagePlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.proficiency}</Label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                    className="w-full h-14 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Basic">{t.customSections.basic}</option>
                    <option value="Intermediate">{t.customSections.intermediate}</option>
                    <option value="Advanced">{t.customSections.advanced}</option>
                    <option value="Native">{t.customSections.native}</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AwardIcon className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">{t.customSections.awards}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={addAward}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {awards.map((award, index) => (
            <div key={award.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{t.customSections.awardLabel} {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeAward(index)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t.customSections.awardTitle}</Label>
                  <Input
                    value={award.title}
                    onChange={(e) => updateAward(index, 'title', e.target.value)}
                    placeholder={t.customSections.awardTitlePlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.issuingOrganization}</Label>
                  <Input
                    value={award.issuer}
                    onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                    placeholder={t.customSections.awardIssuerPlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.dateReceived}</Label>
                  <Input
                    value={award.date}
                    onChange={(e) => updateAward(index, 'date', e.target.value)}
                    placeholder="MM-YYYY"
                  />
                  <p className="text-xs text-gray-500">{t.customSections.dateFormat.replace('{example}', '12-2022')}</p>
                </div>
              </div>

              <div>
                <Label>{t.customSections.descriptionOptional}</Label>
                <Textarea
                  value={award.description}
                  onChange={(e) => updateAward(index, 'description', e.target.value)}
                  placeholder={t.customSections.awardDescPlaceholder}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publications Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">{t.customSections.publications}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={addPublication}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {publications.map((pub, index) => (
            <div key={pub.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{t.customSections.publicationLabel} {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removePublication(index)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>{t.customSections.pubTitle}</Label>
                  <Input
                    value={pub.title}
                    onChange={(e) => updatePublication(index, 'title', e.target.value)}
                    placeholder={t.customSections.pubTitlePlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.authors}</Label>
                  <Input
                    value={pub.authors}
                    onChange={(e) => updatePublication(index, 'authors', e.target.value)}
                    placeholder={t.customSections.authorsPlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.publisher}</Label>
                  <Input
                    value={pub.publisher}
                    onChange={(e) => updatePublication(index, 'publisher', e.target.value)}
                    placeholder={t.customSections.publisherPlaceholder}
                  />
                </div>
                <div>
                  <Label>{t.customSections.publicationDate}</Label>
                  <Input
                    value={pub.date}
                    onChange={(e) => updatePublication(index, 'date', e.target.value)}
                    placeholder="MM-YYYY"
                  />
                  <p className="text-xs text-gray-500">{t.customSections.dateFormat.replace('{example}', '01-2023')}</p>
                </div>
                <div>
                  <Label>{t.customSections.urlOptional}</Label>
                  <Input
                    value={pub.url}
                    onChange={(e) => updatePublication(index, 'url', e.target.value)}
                    placeholder={t.customSections.urlPlaceholder}
                  />
                </div>
              </div>

              <div>
                <Label>{t.customSections.descriptionOptional}</Label>
                <Textarea
                  value={pub.description}
                  onChange={(e) => updatePublication(index, 'description', e.target.value)}
                  placeholder={t.customSections.pubDescPlaceholder}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
