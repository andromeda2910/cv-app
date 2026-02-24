# CV Craft 🚀

**CV Craft** is a modern, AI-powered career tool designed to help you build professional CVs and tailor-made cover letters in seconds. Built with speed, precision, and aesthetics in mind.

![CV Craft Logo](/public/favicon-brand.ico)

## ✨ Features

### 📄 Smart CV Builder
- **Multiple Templates**: Choose from professional templates like ATS-optimized and modern designs.
- **Real-time Preview**: See your changes instantly as you type.
- **Multilingual UI**: Fully supports **English** and **Bahasa Indonesia**.
- **Data Persistence**: Automatically saves your progress to your browser's local storage.

### 🤖 AI CV Reviewer
- Powered by **Google Gemini AI**.
- Analyzes your CV content and provides an impact score.
- Highlights strengths and identifies actionable areas for improvement.

### ✉️ AI Cover Letter Generator
- Generates professional cover letters based on your CV and a job description.
- **Tone Control**: Choose from Professional, Confident, Formal, or Friendly.
- **Dual Language Output**: Option to generate the letter in either **English** or **Indonesian**.
- **PDF Download**: Export your cover letter as a high-quality PDF.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **AI Engine**: [Google Gemini AI SDK](https://ai.google.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [React-To-Print](https://github.com/gregnb/react-to-print)

## 🚀 Getting Started

### Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (v18+ recommended).
2.  **API Key**: You'll need a Google Gemini API Key. Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-url]
    cd cv-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to start building!

## 📂 Project Structure

- `src/app`: Next.js pages and layouts.
- `src/components`: Reusable UI components (landing, header, features).
- `src/stores`: Zustand state management (CV data, language).
- `src/templates`: CV design templates.
- `src/utils`: AI logic and helper functions.
- `src/locales`: Translation files (EN/ID).

## 📝 License

This project is created for professional CV building and career acceleration. Feel free to customize and expand!

---
*Built with ❤️ by Rosse*
