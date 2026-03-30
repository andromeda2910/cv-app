# CVCraft 🛠️

**CVCraft** adalah builder CV modern berfokus pada privasi yang ditenagai oleh AI. Dibuat untuk membantu siapa pun membuat Resume standar ATS atau CV kreatif dalam hitungan menit, tanpa perlu akun dan tanpa data yang meninggalkan browser Anda (kecuali untuk pemrosesan AI).

---

## 💡 Mengapa CVCraft?

Berbeda dengan platform CV builder lain yang mengharuskan Anda mendaftar dan menyimpan data di server mereka, CVCraft menggunakan pendekatan **Privacy-First**:
*   **No Database**: Data Anda disimpan sepenuhnya di `localStorage` browser Anda.
*   **Offline-Ready**: Editor tetap berfungsi meski tanpa koneksi internet (fitur non-AI).
*   **Instant Export**: Print langsung ke PDF dengan format A4 yang sudah terstandardisasi.

## ✨ Fitur Utama

### 🤖 AI-Powered Intelligence
*   **AI CV Reviewer**: Mendapatkan feedback instan, skor dampak, serta saran perbaikan konten berdasarkan standar HR global.
*   **AI Cover Letter**: Generate surat lamaran kerja yang personal berdasarkan data CV Anda dan deskripsi pekerjaan yang dituju.
*   **Tone Control**: Sesuaikan gaya bahasa AI (Formal, Professional, Friendly, dll) dalam dua bahasa (ID/EN).

### 🎨 Design & Customization
*   **Real-time Preview**: Lihat perubahan format dan teks secara langsung.
*   **Template Customizer**: Ubah font (Google Fonts), palet warna, dan spacing secara mendalam tanpa menyentuh CSS.
*   **Bilingual Support**: Antarmuka dan konten mendukung penuh Bahasa Indonesia dan English.

### 🗂️ CV Profiles Support
*   Simpan beberapa versi CV sekaligus (misal: satu untuk *Software Engineer*, satu untuk *Product Manager*) dan ganti profil dengan satu klik.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Intelligence**: [Google Gemini Pro API](https://ai.google.dev/)
*   **Styling**: Vanilla CSS & Tailwind CSS
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persistence)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Validation**: [Zod](https://zod.dev/)

## 🚀 Persiapan Lokal

1.  **Clone & Install**
    ```bash
    git clone [url-repo-anda]
    cd cv-app
    npm install
    ```

2.  **API Key Setup**
    Dapatkan Gemini API Key gratis di [Google AI Studio](https://aistudio.google.com/). Buat file `.env.local` di root folder:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=key_anda_disini
    ```

3.  **Run Development**
    ```bash
    npm run dev
    ```

## 🔐 Keamanan & Privasi

Aplikasi ini tidak memiliki backend. Semua data pribadi Anda (PII) disimpan di browser lokal menggunakan enkripsi standar web. Pemanggilan API Gemini dilakukan langsung dari sisi *client* menggunakan kunci API yang Anda sediakan (atau yang dikonfigurasi saat deployment).

## 🚀 Deployment (Vercel)

Aplikasi ini siap di-deploy ke Vercel dengan satu klik. Pastikan Anda menambahkan Environment Variable `NEXT_PUBLIC_GEMINI_API_KEY` di dashboard Vercel setelah proses import repository.

---
*Built with ❤️ for better careers.*
