import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { Button } from '@/components/ui/Button';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Plus, Edit2, Trash2 } from 'lucide-react';

interface CVProfile {
  id: string;
  name: string;
  description: string;
  resumeData: any;
  selectedTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CVProfileSwitcher = () => {
  const { resumeData, selectedTemplate, setResumeData, setSelectedTemplate } = useResumeStore();
  const [profiles, setProfiles] = React.useState<CVProfile[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newProfileName, setNewProfileName] = React.useState('');
  const [newProfileDescription, setNewProfileDescription] = React.useState('');

  React.useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = localStorage.getItem('cv-profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  const saveProfiles = (updatedProfiles: CVProfile[]) => {
    setProfiles(updatedProfiles);
    localStorage.setItem('cv-profiles', JSON.stringify(updatedProfiles));
  };

  const createProfile = () => {
    if (!newProfileName.trim()) return;

    const newProfile: CVProfile = {
      id: Date.now().toString(),
      name: newProfileName,
      description: newProfileDescription,
      resumeData: JSON.parse(JSON.stringify(resumeData)),
      selectedTemplate,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    saveProfiles([...profiles, newProfile]);
    setNewProfileName('');
    setNewProfileDescription('');
    setIsCreating(false);
  };

  const loadProfile = (profile: CVProfile) => {
    setResumeData(profile.resumeData);
    setSelectedTemplate(profile.selectedTemplate);
  };

  const deleteProfile = (profileId: string) => {
    if (window.confirm('Are you sure you want to delete this CV profile?')) {
      saveProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  const updateProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      resumeData: JSON.parse(JSON.stringify(resumeData)),
      selectedTemplate,
      updatedAt: new Date()
    };

    saveProfiles(profiles.map(p => p.id === profileId ? updatedProfile : p));
  };

  const getProfileIcon = (template: string) => {
    switch (template) {
      case 'standard': return User;
      case 'modern': return Briefcase;
      case 'ats': return GraduationCap;
      default: return User;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">CV Profiles</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          New Profile
        </Button>
      </div>

      {/* Create New Profile Form */}
      {isCreating && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Profile name (e.g., 'Software Engineer CV')"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newProfileDescription}
            onChange={(e) => setNewProfileDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
          />
          <div className="flex gap-2">
            <Button onClick={createProfile} size="sm">
              Create Profile
            </Button>
            <Button variant="ghost" onClick={() => setIsCreating(false)} size="sm">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Profiles List */}
      <div className="space-y-2">
        {profiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">No CV profiles yet</div>
            <div className="text-sm">Create your first profile to save different CV versions</div>
          </div>
        ) : (
          profiles.map((profile) => {
            const Icon = getProfileIcon(profile.selectedTemplate);
            return (
              <div
                key={profile.id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{profile.name}</h4>
                      {profile.description && (
                        <p className="text-sm text-gray-500 mt-1">{profile.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>Template: {profile.selectedTemplate}</span>
                        <span>Updated: {new Date(profile.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadProfile(profile)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateProfile(profile.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProfile(profile.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Current Profile Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Currently editing: Active CV</span>
        </div>
        <div className="text-xs text-blue-600 mt-1">
          Changes are auto-saved. Click "Update" on a profile to save current changes.
        </div>
      </div>
    </div>
  );
};
