import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export const ModernTemplate = () => {
    const { resumeData } = useResumeStore();
    const { t } = useTranslation();
    const { personalInfo, experience, education, skills, projects } = resumeData;

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
                                            <h3 className="font-bold text-base text-gray-900">{exp.role || 'Role'}</h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {exp.startDate} - {exp.current ? t.common.present : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-semibold mb-2" style={{ color: primary }}>
                                            {exp.company || 'Company'} {exp.location && `• ${exp.location}`}
                                        </div>
                                        {exp.description && (
                                            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </div>
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
                                            <span className="text-xs text-gray-500">{edu.endDate || 'Year'}</span>
                                        </div>
                                        <div className="text-sm font-semibold" style={{ color: primary }}>
                                            {edu.institution || 'School'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
