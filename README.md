<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are structured like [symbolic-name]: link-address
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/andromeda2910/cv-app">
    <img src="public/favicon-brand.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CVCraft</h3>

  <p align="center">
    A privacy-first, AI-powered CV & Resume Builder for the modern professional.
    <br />
    <a href="https://github.com/andromeda2910/cv-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/andromeda2910/cv-app">View Demo</a>
    ·
    <a href="https://github.com/andromeda2910/cv-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/andromeda2910/cv-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

**CVCraft** is designed to solve the trade-off between AI convenience and data privacy. Most online CV builders require you to upload your entire life history to their servers. CVCraft keeps everything in your browser's local storage.

Why CVCraft?
* **Privacy-First**: No backend, no accounts. Your data never leaves your browser.
* **AI Intelligence**: Built-in CV review and cover letter generation powered by Google Gemini.
* **Modern Aesthetics**: Premium, responsive designs that look great on any device.
* **Multi-Profile**: Manage different versions of your CV for different job types effortlessly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]
* [![GoogleGemini][Gemini-Badge]][Gemini-url]
* [![Zustand][Zustand-Badge]][Zustand-url]
* [![Lucide][Lucide-Badge]][Lucide-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://aistudio.google.com/](https://aistudio.google.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/andromeda2910/cv-app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create `.env.local` in the root folder and add your API key:
   ```js
   NEXT_PUBLIC_GEMINI_API_KEY = 'ENTER YOUR API';
   ```
5. Start development
   ```sh
   npm run dev
   ```

## 🔐 Keamanan & Privasi

Aplikasi ini tidak memiliki backend. Semua data pribadi Anda (PII) disimpan di browser lokal menggunakan enkripsi standar web. Pemanggilan API Gemini dilakukan langsung dari sisi *client* menggunakan kunci API yang Anda sediakan (atau yang dikonfigurasi saat deployment).

## 🚀 Deployment (Vercel)

Aplikasi ini siap di-deploy ke Vercel dengan satu klik. Pastikan Anda menambahkan Environment Variable `NEXT_PUBLIC_GEMINI_API_KEY` di dashboard Vercel setelah proses import repository.

---
*Built with ❤️ for better careers.*
