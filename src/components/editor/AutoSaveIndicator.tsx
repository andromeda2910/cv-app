import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { validateCVImport, isValidCVImport } from '@/types/schemas';
import { Save, Download, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AutoSaveIndicator = () => {
  const { lastSaved, isSaving, clearAllData, resumeData, selectedTemplate, setResumeData, setSelectedTemplate } = useResumeStore();
  const [isImporting, setIsImporting] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all CV data? This action cannot be undone.')) {
      clearAllData();
      localStorage.removeItem('cv-data');
      localStorage.removeItem('selected-template');
    }
  };

  const handleDownloadJSON = () => {
    setIsDownloading(true);
    const dataStr = JSON.stringify({ resumeData, selectedTemplate }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsDownloading(false), 250);
  };

  const handleImportJSON = () => {
    setIsImporting(true);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        setIsImporting(false);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Please select a file smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target?.result as string;
          
          // Basic JSON structure validation
          if (!fileContent || fileContent.trim().length === 0) {
            alert('File is empty or invalid.');
            return;
          }

          // Check for potential malicious content
          if (fileContent.includes('<script>') || fileContent.includes('javascript:')) {
            alert('Invalid file format. Potentially malicious content detected.');
            return;
          }

          const data = JSON.parse(fileContent);
          
          // Comprehensive validation using schema
          if (isValidCVImport(data)) {
            setResumeData(data);
            setSelectedTemplate(data.selectedTemplate || 'modern');
            
            // Show success message
            alert('CV data imported successfully!');
          } else {
            // Try to validate and get specific error messages
            try {
              validateCVImport(data);
            } catch (validationError) {
              const errorMessage = validationError instanceof Error ? validationError.message : 'Unknown validation error';
              alert(`Invalid CV backup file format: ${errorMessage}`);
            }
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            alert('Failed to parse JSON file. Please check the file format.');
          } else {
            alert(`Failed to import CV data: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
          console.error('Import error:', error);
        }
        setIsImporting(false);
      };
      
      reader.onerror = () => {
        alert('Failed to read the file. Please try again.');
        setIsImporting(false);
      };
      
      reader.readAsText(file);
    };
    
    // Clean up the input element after use
    input.click();
    setTimeout(() => {
      document.body.removeChild(input);
    }, 100);
  };

  const formatLastSaved = (date: Date | null) => {
    if (isSaving) return 'Saving...';
    if (!date) return 'Not saved';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Save className="w-4 h-4" />
        <span>{formatLastSaved(lastSaved)}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImportJSON}
          className="flex items-center gap-1"
          disabled={isImporting}
          title="Import CV backup (.json)"
        >
          <Upload className="w-4 h-4" />
          {isImporting ? 'Importing...' : 'Import'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownloadJSON}
          className="flex items-center gap-1"
          disabled={isDownloading}
          title="Download CV backup (.json)"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Preparing...' : 'Backup'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearData}
          className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Clear all CV data"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
