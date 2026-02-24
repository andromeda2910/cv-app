import type { Translations } from './en';

const id: Translations = {
    // Header
    header: {
        menu: 'Menu',
        createCoverLetter: 'Buat Surat Lamaran',
        help: 'Bantuan',
        switchTo: 'Ganti ke',
        english: 'Inggris',
        indonesian: 'Indonesia',
    },

    // Common
    common: {
        back: 'Kembali',
        next: 'Selanjutnya',
        exportPdf: 'Ekspor PDF',
        add: 'Tambah',
        remove: 'Hapus',
        delete: 'Hapus',
        save: 'Simpan',
        cancel: 'Batal',
        livePreview: 'Pratinjau Langsung',
        present: 'Saat Ini',
        gpa: 'IPK',
        in: 'di bidang',
        stepOf: 'Langkah {current} dari {total}',
        progress: 'Progres',
        characters: 'karakter',
        format: 'Format',
    },

    // Stepper step titles & descriptions
    steps: {
        template: {
            title: 'Pilih Template',
            description: 'Pilih template profesional untuk CV Anda',
        },
        personal: {
            title: 'Info Pribadi',
            description: 'Tambahkan informasi kontak dan ringkasan profesional Anda',
        },
        experience: {
            title: 'Pengalaman',
            description: 'Jelaskan riwayat pekerjaan dan pencapaian profesional Anda',
        },
        education: {
            title: 'Pendidikan',
            description: 'Tambahkan latar belakang akademis dan kualifikasi Anda',
        },
        skills: {
            title: 'Keahlian',
            description: 'Daftarkan keahlian teknis dan profesional Anda',
        },
        projects: {
            title: 'Proyek',
            description: 'Tampilkan proyek dan portofolio unggulan Anda',
        },
        custom: {
            title: 'Bagian Kustom',
            description: 'Tambahkan sertifikasi, bahasa, penghargaan, dan lainnya',
        },
    },

    // Personal Info Form
    personalInfo: {
        profilePhoto: 'Foto Profil (opsional)',
        clickToUpload: 'Klik untuk unggah',
        recommended: 'Disarankan:',
        squareImageMax: 'Gambar persegi, maks 2MB',
        removePhoto: '🗑️ Hapus',
        fullName: 'Nama Lengkap *',
        fullNamePlaceholder: 'Budi Santoso',
        jobTitle: 'Jabatan *',
        jobTitlePlaceholder: 'Software Engineer Senior',
        email: 'Email *',
        emailPlaceholder: 'budi.santoso@contoh.com',
        phone: 'Telepon *',
        phonePlaceholder: '+62 812 3456 7890',
        location: 'Lokasi',
        locationPlaceholder: 'Jakarta, Indonesia',
        website: 'Website',
        websitePlaceholder: 'https://budisantoso.com',
        linkedin: 'LinkedIn',
        linkedinPlaceholder: 'https://linkedin.com/in/budisantoso',
        professionalSummary: 'Ringkasan Profesional',
        summaryPlaceholder: 'Ringkasan singkat latar belakang profesional Anda...',
        aiAssistant: 'Asisten AI',
    },

    // Experience Form
    experience: {
        title: 'Pengalaman Kerja',
        addPosition: 'Tambah Posisi',
        companyName: 'Nama Perusahaan',
        companyPlaceholder: 'PT. Contoh Indonesia',
        jobRole: 'Jabatan',
        jobRolePlaceholder: 'Desainer Produk',
        startDate: 'Tanggal Mulai',
        endDate: 'Tanggal Selesai',
        current: 'Saat Ini',
        locationLabel: 'Lokasi',
        locationPlaceholder: 'Remote / Kota, Negara',
        description: 'Deskripsi',
        descriptionPlaceholder: 'Tanggung jawab utama dan pencapaian...',
        emptyState: 'Belum ada pengalaman kerja ditambahkan.',
        dateFormat: 'Format: BB-TTTT (contoh: {example})',
    },

    // Education Form
    education: {
        title: 'Pendidikan',
        addEducation: 'Tambah Pendidikan',
        institution: 'Institusi / Universitas',
        institutionPlaceholder: 'Universitas Indonesia',
        degree: 'Gelar',
        degreePlaceholder: 'Sarjana',
        fieldOfStudy: 'Bidang Studi',
        fieldOfStudyPlaceholder: 'Ilmu Komputer',
        startDate: 'Tanggal Mulai',
        endDate: 'Tanggal Selesai',
        score: 'IPK / Nilai (Opsional)',
        scorePlaceholder: '3.8/4.0',
        dateFormat: 'Format: BB-TTTT (contoh: {example})',
    },

    // Skills Form
    skills: {
        title: 'Keahlian',
        subtitle: 'Tambahkan keahlian yang relevan ke profil Anda.',
        placeholder: 'contoh: React, TypeScript, Manajemen Proyek',
        add: 'Tambah',
        emptyState: 'Belum ada keahlian ditambahkan.',
    },

    // Projects Form
    projects: {
        title: 'Proyek',
        addProject: 'Tambah Proyek',
        projectName: 'Nama Proyek',
        projectNamePlaceholder: 'Aplikasi Keren',
        projectUrl: 'URL Proyek',
        projectUrlPlaceholder: 'https://github.com/...',
        technologies: 'Teknologi (pisahkan dengan koma)',
        technologiesPlaceholder: 'React, Node.js, TypeScript',
        description: 'Deskripsi',
        descriptionPlaceholder: 'Apa yang Anda buat dan pelajari?',
        emptyState: 'Belum ada proyek ditambahkan.',
    },

    // Custom Sections
    customSections: {
        certifications: 'Sertifikasi',
        certificationLabel: 'Sertifikasi',
        certificationName: 'Nama Sertifikasi',
        certificationNamePlaceholder: 'contoh: AWS Certified Solutions Architect',
        issuingOrganization: 'Organisasi Penerbit',
        issuingOrgPlaceholder: 'contoh: Amazon Web Services',
        dateObtained: 'Tanggal Diperoleh',
        expiryDate: 'Tanggal Kadaluarsa (Opsional)',
        credentialId: 'ID Kredensial (Opsional)',
        credentialIdPlaceholder: 'contoh: AWS-SA-PRO-12345',
        credentialUrl: 'URL Kredensial (Opsional)',
        credentialUrlPlaceholder: 'https://URL verifikasi kredensial',

        languages: 'Bahasa',
        languageLabel: 'Bahasa',
        languagePlaceholder: 'contoh: Bahasa Inggris',
        proficiency: 'Kemahiran',
        basic: 'Dasar',
        intermediate: 'Menengah',
        advanced: 'Mahir',
        native: 'Asli',

        awards: 'Penghargaan',
        awardLabel: 'Penghargaan',
        awardTitle: 'Judul Penghargaan',
        awardTitlePlaceholder: 'contoh: Karyawan Terbaik Tahun Ini',
        awardIssuerPlaceholder: 'contoh: Nama Perusahaan',
        dateReceived: 'Tanggal Diterima',
        descriptionOptional: 'Deskripsi (Opsional)',
        awardDescPlaceholder: 'Deskripsi singkat penghargaan dan pencapaian',

        publications: 'Publikasi',
        publicationLabel: 'Publikasi',
        pubTitle: 'Judul',
        pubTitlePlaceholder: 'Judul publikasi',
        authors: 'Penulis',
        authorsPlaceholder: 'Nama penulis',
        publisher: 'Penerbit',
        publisherPlaceholder: 'Nama penerbit',
        publicationDate: 'Tanggal Publikasi',
        urlOptional: 'URL (Opsional)',
        urlPlaceholder: 'Tautan ke publikasi',
        pubDescPlaceholder: 'Deskripsi singkat atau abstrak',

        dateFormat: 'Format: BB-TTTT (contoh: {example})',
        errorNoData: 'Error: Data resume tidak tersedia',
    },

    // Landing Page
    landing: {
        buildCareerPath: 'Bangun jalur karier Anda',
        atsFriendly: 'Template ramah ATS',
        aiSuggestions: 'Saran AI',
        instantPdf: 'Ekspor PDF instan',
        heroTitle1: 'Tingkatkan',
        heroTitle2: 'Karier',
        heroTitle3: 'Anda dengan',
        heroTitle4: 'Mudah.',
        heroSubtitle: 'Buat CV profesional yang dioptimalkan ATS dalam hitungan menit dengan pembuat intuitif kami. Tanpa keahlian desain.',
        startBuildingNow: 'Mulai Buat Sekarang',
        cvScore: 'Skor CV',
        footerBuiltFor: 'Dibuat untuk profesional modern.',
        createCoverLetter: 'Buat Surat Lamaran',
    },

    // Mode Selection Page
    modeSelection: {
        howToStart: 'Bagaimana Anda ingin',
        start: 'memulai',
        chooseOption: 'Pilih opsi yang paling sesuai dengan kebutuhan Anda.',
        createNewCv: 'Buat CV Baru',
        createNewDesc: 'Mulai dari awal dengan pembuat formulir terpandu kami. Sempurna untuk membuat CV pertama Anda atau memulai dari awal.',
        stepByStep: 'Panduan langkah demi langkah',
        realTimePreview: 'Pratinjau langsung',
        professionalTemplates: 'Template profesional',
        startBuilding: 'Mulai Membuat',
        improveExisting: 'Perbaiki CV yang Ada',
        improveDesc: 'Unggah CV Anda saat ini untuk ulasan dan optimasi bertenaga AI. Dapatkan saran ahli secara instan.',
        aiAnalysis: 'Analisis bertenaga AI',
        atsOptimization: 'Tips optimasi ATS',
        contentEnhancement: 'Peningkatan konten',
        reviewImprove: 'Ulas & Perbaiki',
        notSure: 'Belum yakin? Mulai dengan membuat CV baru—Anda selalu bisa memperbaikinya nanti.',
    },

    // Cover Letter Generator
    coverLetter: {
        title: 'AI Cover Letter Generator',
        subtitle: 'Buat surat lamaran kerja yang personal dan profesional dalam hitungan detik berdasarkan CV Anda.',
        formTitle: 'Detail Informasi',
        targetPosition: 'Posisi Target',
        positionPlaceholder: 'cth: Senior Software Engineer',
        companyName: 'Nama Perusahaan',
        companyPlaceholder: 'cth: Google',
        jobDescription: 'Deskripsi Pekerjaan (Opsional)',
        jdPlaceholder: 'Tempel deskripsi pekerjaan di sini agar hasil lebih spesifik...',
        tone: 'Nada Bicara',
        generate: 'Buat Surat Lamaran',
        regenerate: 'Buat Ulang',
        generating: 'Sedang membuat surat Anda...',
        outputTitle: 'Surat Lamaran Personal Anda',
        edit: 'Edit',
        copy: 'Salin',
        download: 'Unduh PDF',
        placeholder: 'Surat lamaran yang dihasilkan akan muncul di sini...',
        copied: 'Berhasil disalin ke papan klip!',
        tones: {
            professional: 'Profesional',
            confident: 'Percaya Diri',
            formal: 'Formal',
            friendly: 'Ramah',
        },
        outputLanguage: 'Bahasa Output',
        languages: {
            english: 'Inggris',
            indonesian: 'Indonesia',
        }
    },
};

export default id;
