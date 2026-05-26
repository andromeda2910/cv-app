import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';
import { MapPin, Mail, Phone, Link as LinkIcon, Linkedin, ExternalLink, Award, Globe, Trophy, FileText } from 'lucide-react';
import { formatDate, formatDateRange, formatEducationPeriod } from '@/utils/dateFormatter';

export const StandardTemplate = () => {
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
        <div className="bg-white text-gray-800 p-8 min-h-[1056px] w-[816px] mx-auto shadow-2xl print:shadow-none print:w-full print:min-h-0">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-6">
                <div className="flex justify-between items-start mb-4 gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        {personalInfo.jobTitle && (
                            <p className="text-xl text-gray-600 font-medium mb-4">
                                {personalInfo.jobTitle}
                            </p>
                        )}
                    </div>
                    {personalInfo.photo && (
                        <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden border-2 border-gray-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <LinkIcon className="w-4 h-4" />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-4 h-4" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Content */}
            <div className="space-y-6">

                {/* Summary */}
                {personalInfo.summary && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-wide">{t.personalInfo.professionalSummary}</h2>
                        <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.experience.title}</h2>
                        <div className="space-y-5">
                            {experience.map((exp) => (
                                <div key={exp.id} className="transition-transform duration-300 hover:scale-105">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                                        <span className="text-sm text-gray-500 italic whitespace-nowrap">
                                            {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="font-semibold text-gray-700">{exp.company}</span>
                                        <span className="text-gray-500 text-xs">{exp.location}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-base text-gray-700 leading-relaxed">
                                        {parseDescription(exp.description).map((point, pointIdx) => (
                                            <li key={pointIdx} className="pl-2">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.projects.title}</h2>
                        <div className="space-y-4">
                            {projects.map((proj) => (
                                <div key={proj.id} className="transition-transform duration-300 hover:scale-105">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-2xl flex items-center gap-2">
                                            {proj.name}
                                            {proj.url && (
                                                <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </h3>
                                    </div>
                                    {proj.technologies.length > 0 && (
                                        <p className="text-xs text-gray-500 mb-1">
                                            Stack: {proj.technologies.join(', ')}
                                        </p>
                                    )}
                                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">{t.education.title}</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="transition-transform duration-300 hover:scale-105 leading-tight">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-gray-900 text-base">{edu.institution}</h3>
                                        <span className="text-sm text-gray-500 italic whitespace-nowrap">
                                            {formatEducationPeriod(edu.startDate, edu.endDate, language)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <div>
                                            <span className="font-normal text-gray-700">{edu.degree}</span> {t.common.in} <span className="text-gray-700">{edu.fieldOfStudy}</span>
                                        </div>
                                        {edu.score && <span className="text-gray-500">{t.common.gpa}: {edu.score}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-wide">{t.skills.title}</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && certifications.some(cert => cert.name || cert.issuer) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">
                            {t.customSections?.certifications || 'Certifications'}
                        </h2>
                        <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                                cert.name && (
                                    <div key={idx} className="transition-transform duration-300 hover:scale-105">
                                        <div className="text-gray-900 text-base font-semibold">{cert.name}</div>
                                        {cert.issuer && <div className="text-gray-700 text-sm">{cert.issuer}</div>}
                                        {cert.date && <div className="text-gray-500 text-xs">{cert.date}</div>}
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages.length > 0 && languages.some(lang => lang.name) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">
                            {t.customSections?.languages || 'Languages'}
                        </h2>
                        <div className="text-gray-700 text-base">
                            {languages
                                .filter(lang => lang.name)
                                .map(lang => `${lang.name} - ${lang.proficiency}`)
                                .join(' · ')}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {awards.length > 0 && awards.some(award => award.title || award.issuer) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">
                            {t.customSections?.awards || 'Awards'}
                        </h2>
                        <div className="space-y-3">
                            {awards.map((award, idx) => (
                                (award.title || award.issuer) && (
                                    <div key={idx} className="transition-transform duration-300 hover:scale-105">
                                        <div className="text-gray-900 text-base font-semibold">{award.title || 'Award Title'}</div>
                                        {award.issuer && <div className="text-gray-700 text-sm">{award.issuer}</div>}
                                        {award.date && <div className="text-gray-500 text-xs">{award.date}</div>}
                                        {award.description && (
                                            <p className="text-gray-700 text-base leading-relaxed mt-2">{award.description}</p>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {publications.length > 0 && publications.some(pub => pub.title || pub.authors) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">
                            {t.customSections?.publications || 'Publications'}
                        </h2>
                        <div className="space-y-3">
                            {publications.map((pub, idx) => (
                                (pub.title || pub.authors) && (
                                    <div key={idx} className="transition-transform duration-300 hover:scale-105">
                                        <div className="text-gray-900 text-base font-semibold">{pub.title || 'Publication Title'}</div>
                                        {pub.authors && <div className="text-gray-700 text-sm">{pub.authors}</div>}
                                        {(pub.publisher || pub.date) && (
                                            <div className="text-gray-500 text-xs">
                                                {pub.publisher && `${pub.publisher}`}
                                                {pub.publisher && pub.date && ' | '}
                                                {pub.date}
                                            </div>
                                        )}
                                        {pub.description && (
                                            <p className="text-gray-700 text-base leading-relaxed mt-2">{pub.description}</p>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};
