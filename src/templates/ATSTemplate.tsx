import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';
import { formatDate, formatDateRange, formatEducationPeriod } from '@/utils/dateFormatter';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Trophy, FileText } from 'lucide-react';

export const ATSTemplate = () => {
    const { resumeData } = useResumeStore();
    const { t, language } = useTranslation();
    const { personalInfo, education, skills, projects, certifications = [], languages = [], awards = [], publications = [] } = resumeData;
    
    // Helper function to safely parse dates
    const parseDate = (dateStr: string) => {
      if (!dateStr) return 0;
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    // Helper function to parse description into bullet points
    const parseDescription = (description: string) => {
      if (!description) return [];
      
      return description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.replace(/^[-*•]\s*/, '')); // Remove manual bullets
    };

    // Sort experiences by startDate (newest first) - simple and reliable
    const experience = resumeData.experience
      .filter(exp => exp.role && exp.role.trim() !== '' && exp.startDate)
      .map(exp => ({
        ...exp,
        sortDate: parseDate(exp.startDate)
      }))
      .sort((a, b) => b.sortDate - a.sortDate)
      .map(({ sortDate, ...exp }) => exp); // Remove temporary sortDate field

    return (
        <div className="bg-white text-gray-900 p-10 w-[816px] mx-auto shadow-lg print:shadow-none print:w-full print:min-h-0 font-sans">
            {/* Header - Simple and ATS-friendly */}
            <header className="border-b-2 border-gray-900 pb-4 mb-6">
                <div className="flex items-center gap-6 mb-4">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-700">
                            {personalInfo.email && (
                                <div className="flex items-center">
                                    <Mail className="w-3 h-3 text-slate-500 mr-2" />
                                    {personalInfo.email}
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center">
                                    <Phone className="w-3 h-3 text-slate-500 mr-2" />
                                    {personalInfo.phone}
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center">
                                    <MapPin className="w-3 h-3 text-slate-500 mr-2" />
                                    {personalInfo.location}
                                </div>
                            )}
                            {personalInfo.website && (
                                <div className="flex items-center">
                                    <Globe className="w-3 h-3 text-slate-500 mr-2" />
                                    {personalInfo.website}
                                </div>
                            )}
                            {personalInfo.linkedin && (
                                <div className="flex items-center">
                                    <Linkedin className="w-3 h-3 text-slate-500 mr-2" />
                                    {personalInfo.linkedin}
                                </div>
                            )}
                        </div>
                    </div>
                    {personalInfo.photo && (
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200" style={{ borderColor: '#E5E7EB' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {personalInfo.summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">{t.personalInfo.professionalSummary}</h2>
                    <p className="text-sm leading-relaxed text-gray-800">{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">{t.experience.title}</h2>
                    <div className="space-y-4">
                        {experience.map((exp, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm">{exp.role || 'Role'}</h3>
                                    <span className="text-sm text-gray-600">
                                        {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">{exp.company || 'Company'}</span>
                                    {exp.location && <span className="ml-2">• {exp.location}</span>}
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-800 leading-relaxed">
                                        {parseDescription(exp.description).map((point, pointIdx) => (
                                            <li key={pointIdx} className="pl-2">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">{t.projects.title}</h2>
                    <div className="space-y-3">
                        {projects.map((project, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-base">{project.name || 'Project Name'}</h3>
                                {project.description && (
                                    <p className="text-sm text-gray-800 leading-relaxed mt-1">{project.description}</p>
                                )}
                                {project.technologies && (
                                    <p className="text-xs text-gray-600 mt-1">
                                        <span className="font-semibold">{t.projects.technologies}:</span> {project.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">{t.education.title}</h2>
                    <div className="space-y-3">
                        {education.map((edu, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-base">{edu.degree || 'Degree'}</h3>
                                    <span className="text-sm text-gray-600">{formatEducationPeriod(edu.startDate, edu.endDate, language)}</span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {edu.institution || 'School'}
                                </div>
                                {edu.score && (
                                    <div className="text-sm text-gray-600 mt-1">
                                        {t.common.gpa}: {edu.score}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">{t.skills.title}</h2>
                    <div className="text-sm text-gray-800">
                        {skills.map(s => s.name).join(' · ')}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && certifications.some(cert => cert.name || cert.issuer) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                        {t.customSections?.certifications || 'Certifications'}
                    </h2>
                    <div className="space-y-2">
                        {certifications.map((cert, idx) => (
                            cert.name && (
                                <div key={idx} className="text-sm text-gray-800">
                                    <span className="font-semibold">{cert.name}</span>
                                    {cert.issuer && <span className="ml-2">- {cert.issuer}</span>}
                                    {cert.date && <span className="ml-2 text-gray-600">({cert.date})</span>}
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages.length > 0 && languages.some(lang => lang.name) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                        {t.customSections?.languages || 'Languages'}
                    </h2>
                    <div className="text-sm text-gray-800">
                        {languages
                            .filter(lang => lang.name)
                            .map(lang => `${lang.name} - ${lang.proficiency}`)
                            .join(' · ')}
                    </div>
                </section>
            )}

            {/* Awards */}
            {awards.length > 0 && awards.some(award => award.title || award.issuer) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                        {t.customSections?.awards || 'Awards'}
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, idx) => (
                            (award.title || award.issuer) && (
                                <div key={idx}>
                                    <div className="text-sm text-gray-800">
                                        <span className="font-semibold">{award.title || 'Award Title'}</span>
                                        {award.issuer && <span className="ml-2">- {award.issuer}</span>}
                                        {award.date && <span className="ml-2 text-gray-600">({award.date})</span>}
                                    </div>
                                    {award.description && (
                                        <p className="text-sm text-gray-700 mt-1 ml-5">{award.description}</p>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Publications */}
            {publications.length > 0 && publications.some(pub => pub.title || pub.authors) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
                        {t.customSections?.publications || 'Publications'}
                    </h2>
                    <div className="space-y-2">
                        {publications.map((pub, idx) => (
                            (pub.title || pub.authors) && (
                                <div key={idx}>
                                    <div className="text-sm text-gray-800">
                                        <span className="font-semibold">{pub.title || 'Publication Title'}</span>
                                        {pub.authors && <span className="ml-2">- {pub.authors}</span>}
                                        {pub.publisher && <span className="ml-2 text-gray-600">({pub.publisher})</span>}
                                        {pub.date && <span className="ml-2 text-gray-600">{pub.date}</span>}
                                    </div>
                                    {pub.description && (
                                        <p className="text-sm text-gray-700 mt-1 ml-5">{pub.description}</p>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
