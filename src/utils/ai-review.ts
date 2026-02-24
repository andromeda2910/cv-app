import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from '@/stores/resumeStore';

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "content" | "formatting" | "ats" | "impact";
  actionable: boolean;
}

export interface AIReviewResult {
  suggestions: AISuggestion[];
  overallInsight: string;
  strengthsHighlight: string[];
  improvementAreas: string[];
  estimatedImpactScore: number;
}

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateAIReviewFromText(rawText: string): Promise<AIReviewResult> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API key not found, returning default suggestions");
    return getDefaultSuggestionsFromText(rawText);
  }

  try {
    const prompt = `You are an expert CV reviewer and recruiter. Analyze the following CV content and provide detailed, actionable suggestions for improvement.

CV Content:
${rawText}

Please analyze this CV and respond in JSON format with the following structure:
{
  "suggestions": [
    {
      "id": "suggestion_1",
      "title": "Clear, specific suggestion title",
      "description": "Detailed explanation with actionable steps",
      "priority": "high/medium/low",
      "category": "content/formatting/ats/impact",
      "actionable": true
    }
  ],
  "overallInsight": "A brief paragraph about the overall quality and readiness of this CV",
  "strengthsHighlight": ["strength 1", "strength 2", "strength 3"],
  "improvementAreas": ["area 1", "area 2", "area 3"],
  "estimatedImpactScore": 85
}

Provide 4-6 suggestions, prioritize the most impactful ones first. Focus on:
1. Content quality and specificity (quantifiable achievements, action verbs)
2. ATS optimization (keyword density, formatting, readability)
3. Impact and relevance to job market
4. Missing critical information

Ensure suggestions are practical and can be implemented immediately.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("Failed to parse AI response, using defaults");
      return getDefaultSuggestionsFromText(rawText);
    }

    const review = JSON.parse(jsonMatch[0]) as AIReviewResult;
    return review;
  } catch (error) {
    console.error("Error generating AI review from text:", error);
    return getDefaultSuggestionsFromText(rawText);
  }
}

function getDefaultSuggestionsFromText(rawText: string): AIReviewResult {
  const suggestions: AISuggestion[] = [];
  const text = rawText.toLowerCase();

  if (!text.includes('@')) {
    suggestions.push({
      id: "contact_1",
      title: "Add Contact Email",
      description: "An email address is essential on your CV for recruiters to contact you.",
      priority: "high",
      category: "content",
      actionable: true,
    });
  }

  const hasExperience = /experience|work|employment|job/i.test(rawText);
  if (!hasExperience) {
    suggestions.push({
      id: "exp_1",
      title: "Add Work Experience Section",
      description: "Include past roles with company names, dates, and key achievements using action verbs.",
      priority: "high",
      category: "content",
      actionable: true,
    });
  }

  const hasSkills = /skill|technology|tools|language/i.test(rawText);
  if (!hasSkills) {
    suggestions.push({
      id: "skills_1",
      title: "Add a Skills Section",
      description: "List 5-10 relevant technical and soft skills to improve ATS matching.",
      priority: "medium",
      category: "ats",
      actionable: true,
    });
  }

  const hasMetrics = /\d+%|increased|decreased|improved|reduced|managed|led/i.test(rawText);
  if (!hasMetrics) {
    suggestions.push({
      id: "metrics_1",
      title: "Add Quantifiable Achievements",
      description: "Strengthen your experience with numbers (e.g. 'Increased sales by 30%').",
      priority: "high",
      category: "impact",
      actionable: true,
    });
  }

  suggestions.push({
    id: "ats_1",
    title: "Optimize for ATS",
    description: "Use standard section headings and include relevant keywords from job descriptions.",
    priority: "medium",
    category: "ats",
    actionable: true,
  });

  return {
    suggestions: suggestions.slice(0, 6),
    overallInsight: "Your CV has been scanned. Focus on adding specific metrics, a skills section, and clear contact details to strengthen it.",
    strengthsHighlight: ["Document submitted for review", "Content is available for analysis"],
    improvementAreas: ["Add quantifiable metrics", "Ensure all key sections are present", "Use ATS-friendly formatting"],
    estimatedImpactScore: 60,
  };
}

export async function generateAIReview(cvData: ResumeData): Promise<AIReviewResult> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API key not found, returning default suggestions");
    return getDefaultSuggestions(cvData);
  }

  try {
    const cvText = formatCVForAnalysis(cvData);

    const prompt = `You are an expert CV reviewer and recruiter. Analyze the following CV and provide detailed, actionable suggestions for improvement.

CV Content:
${cvText}

Please analyze this CV and respond in JSON format with the following structure:
{
  "suggestions": [
    {
      "id": "suggestion_1",
      "title": "Clear, specific suggestion title",
      "description": "Detailed explanation with actionable steps",
      "priority": "high/medium/low",
      "category": "content/formatting/ats/impact",
      "actionable": true
    }
  ],
  "overallInsight": "A brief paragraph about the overall quality and readiness of this CV",
  "strengthsHighlight": ["strength 1", "strength 2", "strength 3"],
  "improvementAreas": ["area 1", "area 2", "area 3"],
  "estimatedImpactScore": 85
}

Provide 4-6 suggestions, prioritize the most impactful ones first. Focus on:
1. Content quality and specificity (quantifiable achievements, action verbs)
2. ATS optimization (keyword density, formatting, readability)
3. Impact and relevance to job market
4. Missing critical information

Ensure suggestions are practical and can be implemented immediately.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("Failed to parse AI response, using defaults");
      return getDefaultSuggestions(cvData);
    }

    const review = JSON.parse(jsonMatch[0]) as AIReviewResult;
    return review;
  } catch (error) {
    console.error("Error generating AI review:", error);
    return getDefaultSuggestions(cvData);
  }
}

function formatCVForAnalysis(data: ResumeData): string {
  const sections: string[] = [];

  if (data.personalInfo) {
    sections.push(`PERSONAL INFORMATION:`);
    sections.push(`Name: ${data.personalInfo.fullName || "Not provided"}`);
    sections.push(`Email: ${data.personalInfo.email || "Not provided"}`);
    sections.push(`Phone: ${data.personalInfo.phone || "Not provided"}`);
    sections.push(`Job Title: ${data.personalInfo.jobTitle || "Not provided"}`);
    if (data.personalInfo.summary) {
      sections.push(`Professional Summary: ${data.personalInfo.summary}`);
    }
    sections.push("");
  }

  if (data.experience && data.experience.length > 0) {
    sections.push(`WORK EXPERIENCE:`);
    data.experience.forEach((exp, idx: number) => {
      sections.push(
        `${idx + 1}. ${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})`
      );
      if (exp.description) sections.push(`   ${exp.description}`);
    });
    sections.push("");
  }

  if (data.education && data.education.length > 0) {
    sections.push(`EDUCATION:`);
    data.education.forEach((edu, idx: number) => {
      sections.push(
        `${idx + 1}. ${edu.degree} from ${edu.institution}`
      );
      if (edu.endDate) sections.push(`   Graduation: ${edu.endDate}`);
    });
    sections.push("");
  }

  if (data.skills && data.skills.length > 0) {
    sections.push(`SKILLS:`);
    sections.push(data.skills.map(s => s.name).join(", "));
    sections.push("");
  }

  if (data.projects && data.projects.length > 0) {
    sections.push(`PROJECTS:`);
    data.projects.forEach((proj, idx: number) => {
      sections.push(`${idx + 1}. ${proj.name}`);
      if (proj.description) sections.push(`   ${proj.description}`);
    });
  }

  return sections.join("\n");
}

function getDefaultSuggestions(cvData: ResumeData): AIReviewResult {
  const suggestions: AISuggestion[] = [];

  // Check completeness
  if (!cvData.personalInfo.summary || cvData.personalInfo.summary.length < 50) {
    suggestions.push({
      id: "summary_1",
      title: "Enhance Professional Summary",
      description:
        "Your professional summary is missing or too brief. Add 2-3 sentences highlighting your key achievements and career goals. Include specific metrics and results when possible.",
      priority: "high",
      category: "content",
      actionable: true,
    });
  }

  if (!cvData.experience || cvData.experience.length === 0) {
    suggestions.push({
      id: "exp_1",
      title: "Add Work Experience",
      description:
        "Include at least one work experience entry. Use action verbs (led, developed, managed) and quantify achievements with numbers and percentages.",
      priority: "high",
      category: "content",
      actionable: true,
    });
  } else {
    // Check experience for impact
    const hasMetrics = cvData.experience.some((exp) =>
      /\d+%|\$\d+|increased|decreased|improved/.test(exp.description || "")
    );
    if (!hasMetrics) {
      suggestions.push({
        id: "exp_2",
        title: "Add Quantifiable Results",
        description:
          "Make your experience more impactful by adding numbers: percentages, dollar amounts, or measurable outcomes (e.g., 'Increased sales by 35%').",
        priority: "high",
        category: "impact",
        actionable: true,
      });
    }
  }

  if (!cvData.skills || cvData.skills.length < 5) {
    suggestions.push({
      id: "skills_1",
      title: "Expand Technical Skills",
      description:
        "Add 5-10 relevant technical and soft skills. Include tools, languages, and frameworks relevant to your target role.",
      priority: "medium",
      category: "content",
      actionable: true,
    });
  }

  if (!cvData.education || cvData.education.length === 0) {
    suggestions.push({
      id: "edu_1",
      title: "Add Education Section",
      description:
        "Include your degree, field of study, and graduation year. Add relevant certifications or coursework if applicable.",
      priority: "medium",
      category: "content",
      actionable: true,
    });
  }

  suggestions.push({
    id: "formatting_1",
    title: "Optimize for ATS",
    description:
      "Use standard fonts (Arial, Calibri), avoid tables and graphics. Use clear section headings and include relevant keywords from job descriptions.",
    priority: "high",
    category: "ats",
    actionable: true,
  });

  return {
    suggestions: suggestions.slice(0, 6),
    overallInsight:
      "Your CV has potential but needs stronger content and quantifiable achievements. Focus on adding specific metrics and results to showcase your impact.",
    strengthsHighlight: [
      "Professional structure and organization",
      "Clear contact information",
    ],
    improvementAreas: [
      "Add quantifiable metrics to experience",
      "Enhance professional summary",
      "Expand skills section",
    ],
    estimatedImpactScore: 65,
  };
}
