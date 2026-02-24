const en = {
    // Header
    header: {
        menu: 'Menu',
        createCoverLetter: 'Create Cover Letter',
        help: 'Help',
        switchTo: 'Switch to',
        english: 'English',
        indonesian: 'Indonesian',
    },

    // Common
    common: {
        back: 'Back',
        next: 'Next',
        exportPdf: 'Export PDF',
        add: 'Add',
        remove: 'Remove',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        livePreview: 'Live Preview',
        present: 'Present',
        gpa: 'GPA',
        in: 'in',
        stepOf: 'Step {current} of {total}',
        progress: 'Progress',
        characters: 'characters',
        format: 'Format',
    },

    // Stepper step titles & descriptions
    steps: {
        template: {
            title: 'Choose Template',
            description: 'Select a professional template for your CV',
        },
        personal: {
            title: 'Personal Info',
            description: 'Add your basic contact information and professional summary',
        },
        experience: {
            title: 'Experience',
            description: 'Detail your work history and professional achievements',
        },
        education: {
            title: 'Education',
            description: 'Add your academic background and qualifications',
        },
        skills: {
            title: 'Skills',
            description: 'List your technical and professional skills',
        },
        projects: {
            title: 'Projects',
            description: 'Showcase your notable projects and portfolio',
        },
        custom: {
            title: 'Custom Sections',
            description: 'Add certifications, languages, awards, and more',
        },
    },

    // Personal Info Form
    personalInfo: {
        profilePhoto: 'Profile Photo (optional)',
        clickToUpload: 'Click to upload',
        recommended: 'Recommended:',
        squareImageMax: 'Square image, max 2MB',
        removePhoto: '🗑️ Remove',
        fullName: 'Full Name *',
        fullNamePlaceholder: 'John Doe',
        jobTitle: 'Job Title *',
        jobTitlePlaceholder: 'Senior Software Engineer',
        email: 'Email *',
        emailPlaceholder: 'john.doe@example.com',
        phone: 'Phone *',
        phonePlaceholder: '+1 (555) 123-4567',
        location: 'Location',
        locationPlaceholder: 'San Francisco, CA',
        website: 'Website',
        websitePlaceholder: 'https://johndoe.com',
        linkedin: 'LinkedIn',
        linkedinPlaceholder: 'https://linkedin.com/in/johndoe',
        professionalSummary: 'Professional Summary',
        summaryPlaceholder: 'Brief summary of your professional background...',
        aiAssistant: 'AI Assistant',
    },

    // Experience Form
    experience: {
        title: 'Work Experience',
        addPosition: 'Add Position',
        companyName: 'Company Name',
        companyPlaceholder: 'Company Inc.',
        jobRole: 'Job Role',
        jobRolePlaceholder: 'Product Designer',
        startDate: 'Start Date',
        endDate: 'End Date',
        current: 'Current',
        locationLabel: 'Location',
        locationPlaceholder: 'Remote / City, Country',
        description: 'Description',
        descriptionPlaceholder: 'Key responsibilities and achievements...',
        emptyState: 'No work experience added yet.',
        dateFormat: 'Format: MM-YYYY (e.g., {example})',
    },

    // Education Form
    education: {
        title: 'Education',
        addEducation: 'Add Education',
        institution: 'Institution / University',
        institutionPlaceholder: 'University of Technology',
        degree: 'Degree',
        degreePlaceholder: "Bachelor's",
        fieldOfStudy: 'Field of Study',
        fieldOfStudyPlaceholder: 'Computer Science',
        startDate: 'Start Date',
        endDate: 'End Date',
        score: 'Score / GPA (Optional)',
        scorePlaceholder: '3.8/4.0',
        dateFormat: 'Format: MM-YYYY (e.g., {example})',
    },

    // Skills Form
    skills: {
        title: 'Skills',
        subtitle: 'Add relevant skills to your profile.',
        placeholder: 'e.g. React, TypeScript, Project Management',
        add: 'Add',
        emptyState: 'No skills added yet.',
    },

    // Projects Form
    projects: {
        title: 'Projects',
        addProject: 'Add Project',
        projectName: 'Project Name',
        projectNamePlaceholder: 'Awesome App',
        projectUrl: 'Project URL',
        projectUrlPlaceholder: 'https://github.com/...',
        technologies: 'Technologies (comma separated)',
        technologiesPlaceholder: 'React, Node.js, TypeScript',
        description: 'Description',
        descriptionPlaceholder: 'What did you build and learn?',
        emptyState: 'No projects added yet.',
    },

    // Custom Sections
    customSections: {
        certifications: 'Certifications',
        certificationLabel: 'Certification',
        certificationName: 'Certification Name',
        certificationNamePlaceholder: 'e.g., AWS Certified Solutions Architect',
        issuingOrganization: 'Issuing Organization',
        issuingOrgPlaceholder: 'e.g., Amazon Web Services',
        dateObtained: 'Date Obtained',
        expiryDate: 'Expiry Date (Optional)',
        credentialId: 'Credential ID (Optional)',
        credentialIdPlaceholder: 'e.g., AWS-SA-PRO-12345',
        credentialUrl: 'Credential URL (Optional)',
        credentialUrlPlaceholder: 'https://credential verification URL',

        languages: 'Languages',
        languageLabel: 'Language',
        languagePlaceholder: 'e.g., Spanish',
        proficiency: 'Proficiency',
        basic: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        native: 'Native',

        awards: 'Awards',
        awardLabel: 'Award',
        awardTitle: 'Award Title',
        awardTitlePlaceholder: 'e.g., Employee of the Year',
        awardIssuerPlaceholder: 'e.g., Company Name',
        dateReceived: 'Date Received',
        descriptionOptional: 'Description (Optional)',
        awardDescPlaceholder: 'Brief description of the award and achievements',

        publications: 'Publications',
        publicationLabel: 'Publication',
        pubTitle: 'Title',
        pubTitlePlaceholder: 'Publication title',
        authors: 'Authors',
        authorsPlaceholder: 'Author names',
        publisher: 'Publisher',
        publisherPlaceholder: 'Publisher name',
        publicationDate: 'Publication Date',
        urlOptional: 'URL (Optional)',
        urlPlaceholder: 'Link to publication',
        pubDescPlaceholder: 'Brief description or abstract',

        dateFormat: 'Format: MM-YYYY (e.g., {example})',
        errorNoData: 'Error: Resume data not available',
    },

    // Landing Page
    landing: {
        buildCareerPath: 'Build your career path',
        atsFriendly: 'ATS-friendly templates',
        aiSuggestions: 'AI suggestions',
        instantPdf: 'Instant PDF export',
        heroTitle1: 'Elevate Your',
        heroTitle2: 'Career',
        heroTitle3: 'with',
        heroTitle4: 'Ease.',
        heroSubtitle: 'Create a professional, ATS-optimized CV in minutes with our intuitive builder. No design skills required.',
        startBuildingNow: 'Start Building Now',
        cvScore: 'CV Score',
        footerBuiltFor: 'Built for modern professionals.',
        createCoverLetter: 'Create Cover Letter',
    },

    // Mode Selection Page
    modeSelection: {
        howToStart: 'How would you like to',
        start: 'start',
        chooseOption: 'Choose the option that best fits your needs.',
        createNewCv: 'Create New CV',
        createNewDesc: 'Start from scratch with our guided form builder. Perfect for creating your first CV or starting fresh.',
        stepByStep: 'Step-by-step form wizard',
        realTimePreview: 'Real-time preview',
        professionalTemplates: 'Professional templates',
        startBuilding: 'Start Building',
        improveExisting: 'Improve Existing CV',
        improveDesc: 'Upload your current CV for AI-powered review and optimization. Get expert suggestions instantly.',
        aiAnalysis: 'AI-powered analysis',
        atsOptimization: 'ATS optimization tips',
        contentEnhancement: 'Content enhancement',
        reviewImprove: 'Review & Improve',
        notSure: 'Not sure? Start with creating a new CV—you can always improve it later.',
    },

    // Cover Letter Generator
    coverLetter: {
        title: 'AI Cover Letter Generator',
        subtitle: 'Generate a tailored, professional cover letter in seconds based on your CV.',
        formTitle: 'Information Details',
        targetPosition: 'Target Position',
        positionPlaceholder: 'e.g. Senior Software Engineer',
        companyName: 'Company Name',
        companyPlaceholder: 'e.g. Google',
        jobDescription: 'Job Description (Optional)',
        jdPlaceholder: 'Paste the job description here for better tailoring...',
        tone: 'Tone of Voice',
        generate: 'Generate Cover Letter',
        regenerate: 'Regenerate',
        generating: 'Generating your letter...',
        outputTitle: 'Your Tailored Cover Letter',
        edit: 'Edit',
        copy: 'Copy',
        download: 'Download PDF',
        placeholder: 'Generated letter will appear here...',
        copied: 'Copied to clipboard!',
        tones: {
            professional: 'Professional',
            confident: 'Confident',
            formal: 'Formal',
            friendly: 'Friendly',
        },
        outputLanguage: 'Output Language',
        languages: {
            english: 'English',
            indonesian: 'Indonesian',
        }
    },
};

export type Translations = typeof en;
export default en;
