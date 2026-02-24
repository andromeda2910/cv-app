import React from 'react';
import { useResumeStore, ResumeData } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Trash2, Plus, X } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

export const Skills = () => {
    const { resumeData, addSkill, removeSkill } = useResumeStore();
    const { skills } = resumeData;
    const [newSkill, setNewSkill] = React.useState('');
    const { t } = useTranslation();

    const handleAdd = () => {
        if (!newSkill.trim()) return;
        addSkill({
            id: crypto.randomUUID(),
            name: newSkill,
            level: 'Intermediate', // Default
        });
        setNewSkill('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">{t.skills.title}</h3>
                <p className="text-sm text-gray-500">{t.skills.subtitle}</p>
            </div>

            <div className="flex gap-2">
                <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.skills.placeholder}
                    className="flex-1"
                />
                <Button onClick={handleAdd} disabled={!newSkill.trim()}>
                    <Plus className="w-4 h-4 mr-2" /> {t.skills.add}
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 text-sm">
                        <span>{skill.name}</span>
                        <button
                            onClick={() => removeSkill(skill.id)}
                            className="hover:text-blue-900 ml-1 focus:outline-none"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {skills.length === 0 && (
                    <div className="w-full text-center py-4 text-gray-400 text-sm italic">
                        {t.skills.emptyState}
                    </div>
                )}
            </div>
        </div>
    );
};
