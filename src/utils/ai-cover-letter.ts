import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from '@/stores/resumeStore';

const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export interface CoverLetterOptions {
    position: string;
    company: string;
    jobDescription: string;
    tone: string;
    outputLanguage: string;
}

export async function generateCoverLetter(
    cvData: ResumeData,
    options: CoverLetterOptions
): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Gemini API key not found");
    }

    const cvText = formatCVForCoverLetter(cvData);
    const { position, company, jobDescription, tone, outputLanguage } = options;

    const systemInstruction = `You are a professional career coach and expert cover letter writer.
Rules:
- Max 350 words
- Tone: ${tone}
- Output Language: ${outputLanguage}. You MUST write the entire cover letter in ${outputLanguage}.
- No hallucination: Do not invent experiences that are not in the CV.
- Use measurable achievements when available from the CV.
- Align CV with job description.
- Avoid generic phrases.
- Proper structure: Greeting, Body (Introduction, Why You, Why Us/Alignment), Closing.`;

    const userPrompt = `
Candidate CV:
${cvText}

Target Position:
${position}

Company:
${company}

${jobDescription ? `Job Description:\n${jobDescription}` : "No specific job description provided. Focus on aligning the candidate's experience with the target role."}

Tone:
${tone}

Instructions:
- Match strongest CV points to job requirements.
- Emphasize relevant achievements.
- Do not repeat CV verbatim.
- Keep concise and impactful.
`;

    try {
        const prompt = `${systemInstruction}\n\n${userPrompt}`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return responseText.trim();
    } catch (error: any) {
        console.error("Error generating cover letter:", error);
        const errorMessage = error?.message || "Unknown error";
        throw new Error(`Failed to generate cover letter: ${errorMessage}`);
    }
}

function formatCVForCoverLetter(data: ResumeData): string {
    const sections: string[] = [];

    if (data.personalInfo) {
        sections.push(`PERSONAL INFO: ${data.personalInfo.fullName}, current role: ${data.personalInfo.jobTitle}`);
        if (data.personalInfo.summary) sections.push(`SUMMARY: ${data.personalInfo.summary}`);
    }

    if (data.experience && data.experience.length > 0) {
        sections.push(`EXPERIENCE:`);
        data.experience.forEach((exp) => {
            sections.push(`- ${exp.role} at ${exp.company}: ${exp.description}`);
        });
    }

    if (data.skills && data.skills.length > 0) {
        sections.push(`SKILLS: ${data.skills.map(s => s.name).join(", ")}`);
    }

    if (data.projects && data.projects.length > 0) {
        sections.push(`PROJECTS:`);
        data.projects.forEach(p => sections.push(`- ${p.name}: ${p.description}`));
    }

    return sections.join("\n");
}
