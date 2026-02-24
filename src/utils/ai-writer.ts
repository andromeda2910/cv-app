import { ResumeData } from '@/stores/resumeStore';
import { GoogleGenerativeAI } from "@google/generative-ai";

type ExperienceItem = ResumeData['experience'][0];

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates a professional summary based on user's key points and outline
 * 
 * @param keyPoints User's bullet points or outline for summary (min 50 chars)
 * @param targetJobTitle The job title from Personal Info step
 * @param experience User's work experience for context
 * @param language Target language ('en' for English, 'id' for Indonesian)
 * @returns A Promise resolving to the generated professional summary
 */
export async function generateProfessionalSummary(
  keyPoints: string,
  targetJobTitle: string,
  experience: ResumeData['experience'] = [],
  language: 'en' | 'id' = 'en'
): Promise<string> {
  
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API key not found, returning mock summary");
    return getMockProfessionalSummary(keyPoints, targetJobTitle, language);
  }

  const languageConfig = {
    en: {
      systemPrompt: `You are an expert CV writer and ATS specialist.
Rewrite user's summary to be:
- Concise & powerful (aim 200-400 characters, 3-6 lines)
- First person or professional third person
- Packed with ATS keywords for "${targetJobTitle}"
- Focus on achievements, metrics, impact
- Strong action verbs: Led, Optimized, Delivered, etc.
- Confident, professional tone

Return ONLY rewritten summary text. No explanations, no markdown.`,
      
      userPrompt: `
Context: Applying for "${targetJobTitle}" position.
Current User Summary (to be rewritten and improved):
${keyPoints}

Relevant Experience Context:
${experience.slice(0, 2).map(exp => `- ${exp.role} at ${exp.company}: ${exp.description.substring(0, 80)}...`).join('\n')}

Instructions:
- REWRITE current summary to be more professional and impactful
- Transform weak phrases into powerful statements with action verbs
- Add quantifiable metrics and measurable impact where possible
- Incorporate relevant experience context from their background
- Use strong action verbs: Spearheaded, Architected, Delivered, Optimized, Transformed, etc.
- Keep it between 200-400 characters for optimal ATS scanning
- Make it sound confident and accomplished
- Include keywords relevant to ${targetJobTitle}
- Focus on RESULTS and ACHIEVEMENTS, not just responsibilities

Example transformation:
Weak: "Responsible for managing projects and working with teams"
Strong: "Led cross-functional teams to deliver 15+ projects ahead of schedule, achieving 98% client satisfaction"

Return ONLY rewritten, improved professional summary text.`
    },
    
    id: {
      systemPrompt: `Andalah penulis CV dan spesialis ATS profesional.
Tulis ulang ringkasan pengguna agar:
- Ringkas & kuat (target 200-400 karakter, 3-6 baris)
- Orang pertama atau orang ketiga profesional
- Dipenuhi kata kunci ATS untuk "${targetJobTitle}"
- Fokus pada pencapaian, metrik, dampak
- Kata kerja yang kuat: Memimpin, Mengoptimalkan, Menyampaikan, dll.
- Nada yang percaya diri dan profesional

Kembalikan HANYA teks ringkasan yang ditulis ulang. Tidak ada penjelasan, tidak ada markdown.`,
      
      userPrompt: `
Konteks: Melamar untuk posisi "${targetJobTitle}".
Ringkasan Pengguna Saat Ini (akan ditulis ulang dan ditingkatkan):
${keyPoints}

Konteks Pengalaman Relevan:
${experience.slice(0, 2).map(exp => `- ${exp.role} di ${exp.company}: ${exp.description.substring(0, 80)}...`).join('\n')}

Instruksi:
- TULIS ULANG ringkasan saat ini agar lebih profesional dan berdampak
- Ubah frasa lemah menjadi pernyataan yang kuat dengan kata kerja
- Tambahkan metrik kuantitatif dan dampak terukur jika memungkinkan
- Masukkan konteks pengalaman relevan dari latar belakang mereka
- Gunakan kata kerja yang kuat: Memimpin, Mengarsitektkan, Menyampaikan, Mengoptimalkan, Mengubah, dll.
- Pertahankan antara 200-400 karakter untuk pemindaian ATS yang optimal
- Buat terdengar percaya diri dan berprestasi
- Masukkan kata kunci relevan untuk ${targetJobTitle}
- Fokus pada HASIL dan PENCAPAIAN, bukan hanya tanggung jawab

Contoh transformasi:
Lemah: "Bertanggung jawab mengelola proyek dan bekerja dengan tim"
Kuat: "Memimpin tim lintas fungsional untuk menyampaikan 15+ proyek lebih awal dari jadwal, mencapai kepuasan klien 98%"

Kembalikan HANYA teks ringkasan profesional yang ditulis ulang.`
    }
  };

  const config = languageConfig[language];
  
  try {
    const result = await model.generateContent(`${config.systemPrompt}\n\n${config.userPrompt}`);
    return result.response.text().trim();
  } catch (error) {
    console.error("AI Summary generation failed:", error);
    return getMockProfessionalSummary(keyPoints, targetJobTitle, language);
  }
}

function getMockProfessionalSummary(keyPoints: string, targetJobTitle: string, language: 'en' | 'id' = 'en'): string {
  const summaries = {
    en: `Results-driven ${targetJobTitle} with proven expertise in delivering innovative solutions and driving business growth. Adept at collaborating with cross-functional teams to achieve strategic objectives while maintaining high standards of quality and efficiency. Passionate about leveraging emerging technologies and best practices to solve complex challenges and create meaningful impact.`,
    id: `${targetJobTitle} yang berorientasi hasil dengan keahlian terbukti dalam memberikan solusi inovatif dan mendorong pertumbuhan bisnis. Mahir dalam berkolaborasi dengan tim lintas fungsional untuk mencapai tujuan strategis sambil mempertahankan standar kualitas dan efisiensi yang tinggi. Bersemangat memanfaatkan teknologi terkini dan praktik terbaik untuk memecahkan tantangan kompleks dan menciptakan dampak yang bermakna.`
  };
  
  return summaries[language];
}

/**
 * Rewrites a single experience entry to be more concise, impact-driven, and ATS-friendly.
 * 
 * @param experience The original experience entry.
 * @param targetJobTitle The job title user is applying for (context).
 * @param language Target language ('en' for English, 'id' for Indonesian)
 * @returns A Promise resolving to the rewritten ExperienceItem.
 */
export async function rewriteExperience(
  experience: ExperienceItem,
  targetJobTitle: string,
  language: 'en' | 'id' = 'en'
): Promise<ExperienceItem> {
  
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API key not found, returning mock improvement");
    return getMockImprovedExperience(experience, targetJobTitle, language);
  }

  const languageConfig = {
    en: {
      systemPrompt: `You are an expert CV writer and ATS optimization specialist. 
Your goal is to rewrite job experience descriptions to be:
1. Concise and punchy (active verbs).
2. Impact-driven (focus on results/metrics).
3. ATS-friendly (standard keywords related to "${targetJobTitle}").
4. Strictly adhering to the JSON schema provided.

Return ONLY the JSON object for the single experience entry. Do not include markdown formatting or explanations.`,
      
      userPrompt: `
Context: Applying for "${targetJobTitle}".
Original Data:
${JSON.stringify(experience, null, 2)}

Instructions:
- Keep 'company', 'role', 'startDate', 'endDate', 'current', 'location', 'id' unchanged.
- REWRITE 'description' to be a better version of itself. Use bullet points (•) with proper spacing.
- If the original description is empty, generate a generic but professional placeholder for this role.
- Ensure the tone is professional and impactful.
- Include quantifiable metrics when possible (%, $, numbers).
- Use action verbs: Led, Developed, Managed, Created, Optimized, etc.

Return the complete JSON object with all fields.`
    },
    
    id: {
      systemPrompt: `Andalah penulis CV dan spesialis optimisasi ATS profesional.
Tujuan Anda adalah menulis ulang deskripsi pengalaman kerja agar:
1. Ringkas dan padat (kata kerja aktif).
2. Berorientasi dampak (fokus pada hasil/metriks).
3. ATS-friendly (kata kunci standar terkait "${targetJobTitle}").
4. Mematuhi skema JSON yang disediakan dengan ketat.

Kembalikan HANYA objek JSON untuk entri pengalaman tunggal. Jangan sertakan formatting markdown atau penjelasan.`,
      
      userPrompt: `
Konteks: Melamar untuk "${targetJobTitle}".
Data Asli:
${JSON.stringify(experience, null, 2)}

Instruksi:
- Pertahankan 'company', 'role', 'startDate', 'endDate', 'current', 'location', 'id' tidak berubah.
- TULIS ULANG 'description' menjadi versi yang lebih baik. Gunakan poin (•) dengan spasi yang tepat.
- Jika deskripsi asli kosong, buat placeholder generik namun profesional untuk peran ini.
- Pastikan nada profesional dan berdampak.
- Sertakan metrik kuantitatif jika memungkinkan (%, $, angka).
- Gunakan kata kerja: Memimpin, Mengembangkan, Mengelola, Membuat, Mengoptimalkan, dll.

Kembalikan objek JSON lengkap dengan semua bidang.`
    }
  };

  const config = languageConfig[language];

  try {
    const result = await model.generateContent(`${config.systemPrompt}\n\n${config.userPrompt}`);
    const responseText = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("Failed to parse AI response, using mock");
      return getMockImprovedExperience(experience, targetJobTitle, language);
    }

    const rewritten = JSON.parse(jsonMatch[0]) as ExperienceItem;
    return rewritten;
  } catch (error) {
    console.error("AI Rewrite failed:", error);
    return getMockImprovedExperience(experience, targetJobTitle, language);
  }
}

function getMockImprovedExperience(experience: ExperienceItem, targetJobTitle: string, language: 'en' | 'id' = 'en'): ExperienceItem {
  const descriptions = {
    en: `• Spearheaded key initiatives for ${experience.role || targetJobTitle}, resulting in 20% efficiency improvement\n• Collaborated cross-functionally to deliver high-quality solutions aligned with business objectives\n• Optimized workflows and processes, reducing operational costs by 15% through strategic improvements\n• Managed project timelines and deliverables ensuring on-time completion within budget constraints`,
    id: `• Memimpin inisiatif kunci untuk ${experience.role || targetJobTitle}, menghasilkan peningkatan efisiensi 20%\n• Berkolaborasi lintas fungsional untuk menyampaikan solusi berkualitas tinggi yang selaras dengan tujuan bisnis\n• Mengoptimalkan alur kerja dan proses, mengurangi biaya operasional 15% melalui peningkatan strategis\n• Mengelola jadwal dan deliverable proyek memastikan penyelesaian tepat waktu dalam batas anggaran`
  };
  
  return {
    ...experience,
    description: descriptions[language]
  };
}
