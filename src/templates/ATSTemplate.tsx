import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { useTranslation } from '@/lib/useTranslation';

export const ATSTemplate = () => {
    const { resumeData } = useResumeStore();
    const { t } = useTranslation();
    const { personalInfo, experience, education, skills, projects } = resumeData;

    return (
        <div className="bg-white text-gray-900 p-10 min-h-[1056px] w-[816px] mx-auto shadow-lg print:shadow-none print:w-full print:min-h-0 font-sans">
            {/* Header - Simple and ATS-friendly */}
            <header className="border-b-2 border-gray-900 pb-4 mb-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                    </div>
                    {personalInfo.photo && (
                        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
                <div className="text-sm space-y-1 text-gray-700">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.website && <div>{personalInfo.website}</div>}
                    {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
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
                                    <h3 className="font-bold text-base">{exp.role || 'Role'}</h3>
                                    <span className="text-sm text-gray-600">
                                        {exp.current ? `${exp.startDate} - ${t.common.present}` : `${exp.startDate} - ${exp.endDate}`}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">{exp.company || 'Company'}</span>
                                    {exp.location && <span className="ml-2">• {exp.location}</span>}
                                </div>
                                {exp.description && (
                                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
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
                                    <span className="text-sm text-gray-600">{edu.endDate || 'Year'}</span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    {edu.institution || 'School'}
                                </div>
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
                        {skills.map(s => s.name).join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
};
