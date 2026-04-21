import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';
import { Mail, Phone, MapPin, Globe, Linkedin, Award, Trophy, FileText } from 'lucide-react';
import { formatDate, formatDateRange, formatEducationPeriod } from '@/utils/dateFormatter';

export const ModernTemplate = () => {
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


    const primary = 'var(--color-primary, #2563eb)';
    const secondary = 'var(--color-secondary, #4f46e5)';
    const accent = 'var(--color-accent, #3b82f6)';

    return (
        <div className="bg-white text-gray-900 min-h-[1056px] w-[816px] mx-auto shadow-2xl print:shadow-none print:w-full print:min-h-0 overflow-hidden relative">

            {/* Left Sidebar */}
            <div className="flex h-full relative z-10">
                <div
                    className="w-1/3 text-white p-8 flex flex-col"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${primary}, ${secondary})` }}
                >
                    {/* Profile */}
                    <div className="mb-8">
                        <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold mb-4 bg-white/10 overflow-hidden border-2 border-white/30">
                            {personalInfo.photo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span>{personalInfo.fullName?.charAt(0) || 'Y'}</span>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{personalInfo.jobTitle || 'Professional Title'}</p>
                    </div>

                    {/* Contact */}
                    <div className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.header.menu}</h2>
                        <div className="space-y-3 text-sm">
                            {personalInfo.email && (
                                <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className="break-all">{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo.website && (
                                <div className="flex items-start gap-2">
                                    <Globe className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className="break-all">{personalInfo.website}</span>
                                </div>
                            )}
                            {personalInfo.linkedin && (
                                <div className="flex items-start gap-2">
                                    <Linkedin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span className="break-all">{personalInfo.linkedin}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.skills.title}</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="w-2/3 p-8">
                    {/* Professional Summary */}
                    {personalInfo.summary && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>{t.personalInfo.professionalSummary}</h2>
                            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>{t.experience.title}</h2>
                            <div className="space-y-5">
                                {experience.map((exp, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-sm text-gray-900">{exp.role || 'Role'}</h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}
                                            </span>
                                        </div>
                                        <div className="text-sm font-semibold mb-2" style={{ color: primary }}>
                                            {exp.company || 'Company'} {exp.location && `• ${exp.location}`}
                                        </div>
                                        {exp.description && (
                                            <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-700 leading-relaxed">
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
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>{t.projects.title}</h2>
                            <div className="space-y-4">
                                {projects.map((project, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-base text-gray-900">{project.name || 'Project Name'}</h3>
                                        {project.description && (
                                            <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
                                        )}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {project.technologies.map((tech: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 py-0.5 rounded"
                                                        style={{
                                                            backgroundColor: accent,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>{t.education.title}</h2>
                            <div className="space-y-3">
                                {education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-base text-gray-900">{edu.degree || 'Degree'}</h3>
                                            <span className="text-xs text-gray-500">{formatEducationPeriod(edu.startDate, edu.endDate, language)}</span>
                                        </div>
                                        <div className="text-sm font-semibold" style={{ color: primary }}>
                                            {edu.institution || 'School'}
                                        </div>
                                        {edu.score && (
                                            <div className="text-xs text-gray-600 mt-1">
                                                {t.common.gpa}: {edu.score}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && certifications.some(cert => cert.name || cert.issuer) && (
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>
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
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>
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
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>
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
                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ color: primary, borderColor: primary }}>
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
            </div>
        </div>
    );
};
