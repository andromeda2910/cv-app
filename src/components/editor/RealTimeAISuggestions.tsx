import React from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AISuggestion {
  text: string;
  type: 'improvement' | 'completion' | 'example';
  confidence: number;
}

interface RealTimeAISuggestionsProps {
  fieldType: 'summary' | 'experience' | 'skills' | 'description';
  currentValue: string;
  onSuggestionSelect: (suggestion: string) => void;
  targetRole?: string;
  inline?: boolean;
  alwaysShow?: boolean;
}

export const RealTimeAISuggestions: React.FC<RealTimeAISuggestionsProps> = ({
  fieldType,
  currentValue,
  onSuggestionSelect,
  targetRole = 'Software Engineer',
  inline = false,
  alwaysShow = false
}) => {
  const [suggestions, setSuggestions] = React.useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  const generateSuggestions = React.useCallback(async (text: string) => {
    if (!text || text.length < 10) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      let prompt = '';
      
      switch (fieldType) {
        case 'summary':
          prompt = `You are an expert CV writer. The user is writing a professional summary for a ${targetRole} position.
          
Current text: "${text}"

Provide 3 concise suggestions to improve this summary. Each suggestion should:
1. Be specific and actionable
2. Include quantifiable metrics when possible
3. Use strong action verbs
4. Be ATS-friendly

Respond in JSON format:
{
  "suggestions": [
    {
      "text": "Suggestion 1",
      "type": "improvement",
      "confidence": 0.9
    }
  ]
}`;
          break;

        case 'experience':
          prompt = `You are an expert CV writer. The user is describing work experience for a ${targetRole} role.
          
Current text: "${text}"

Provide 3 suggestions to enhance this experience description. Focus on:
1. Adding quantifiable achievements
2. Using action verbs
3. Highlighting impact
4. Technical skills demonstration

Respond in JSON format:
{
  "suggestions": [
    {
      "text": "Suggestion 1",
      "type": "improvement", 
      "confidence": 0.9
    }
  ]
}`;
          break;

        case 'skills':
          prompt = `You are an expert CV writer. The user is listing skills for a ${targetRole} position.
          
Current skills: "${text}"

Provide 3 suggestions for additional relevant skills that would strengthen this CV. Focus on:
1. In-demand technical skills
2. Soft skills relevant to the role
3. Industry-specific tools
4. Emerging technologies

Respond in JSON format:
{
  "suggestions": [
    {
      "text": "Skill name",
      "type": "completion",
      "confidence": 0.9
    }
  ]
}`;
          break;

        case 'description':
          prompt = `You are an expert CV writer. The user is writing a project or experience description for a ${targetRole} role.
          
Current text: "${text}"

Provide 3 suggestions to make this description more impactful. Focus on:
1. Adding specific metrics
2. Technical details
3. Business impact
4. Collaboration aspects

Respond in JSON format:
{
  "suggestions": [
    {
      "text": "Suggestion 1",
      "type": "improvement",
      "confidence": 0.9
    }
  ]
}`;
          break;
      }

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.warn('AI suggestions failed:', error);
      // Fallback suggestions
      const fallbackSuggestions = getFallbackSuggestions(fieldType, currentValue);
      setSuggestions(fallbackSuggestions);
    } finally {
      setIsLoading(false);
    }
  }, [fieldType, targetRole]);

  const getFallbackSuggestions = (type: string, text: string): AISuggestion[] => {
    switch (type) {
      case 'summary':
        return [
          { text: "Add specific metrics like 'increased efficiency by 35%'", type: 'improvement', confidence: 0.7 },
          { text: "Include key technical skills relevant to the target role", type: 'improvement', confidence: 0.7 },
          { text: "Mention years of experience and career progression", type: 'improvement', confidence: 0.7 }
        ];
      case 'experience':
        return [
          { text: "Quantify your impact with numbers and percentages", type: 'improvement', confidence: 0.7 },
          { text: "Use action verbs like 'Led', 'Developed', 'Optimized'", type: 'improvement', confidence: 0.7 },
          { text: "Highlight collaboration with cross-functional teams", type: 'improvement', confidence: 0.7 }
        ];
      case 'skills':
        return [
          { text: "Add cloud platforms (AWS, Azure, GCP)", type: 'completion', confidence: 0.7 },
          { text: "Include version control (Git, SVN)", type: 'completion', confidence: 0.7 },
          { text: "Add testing frameworks (Jest, Cypress)", type: 'completion', confidence: 0.7 }
        ];
      case 'description':
        return [
          { text: "Add specific technologies used", type: 'improvement', confidence: 0.7 },
          { text: "Include measurable outcomes", type: 'improvement', confidence: 0.7 },
          { text: "Mention team size and your role", type: 'improvement', confidence: 0.7 }
        ];
      default:
        return [];
    }
  };

  React.useEffect(() => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer only if there's text to process
    if (currentValue && currentValue.length >= 10) {
      debounceTimer.current = setTimeout(() => {
        generateSuggestions(currentValue);
        debounceTimer.current = null; // Clear reference after execution
      }, 1000); // 1 second debounce
    } else {
      // Clear suggestions immediately for short text
      setSuggestions([]);
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, [currentValue, generateSuggestions]);

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    onSuggestionSelect(suggestion.text);
    setShowSuggestions(false);
  };

  if (!alwaysShow && suggestions.length === 0 && !isLoading) {
    return null;
  }

  const isOpen = inline ? true : showSuggestions;

  return (
    <div className="relative">
      {!inline && (
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-2"
        >
          <span>💡 AI Suggestions</span>
          {isLoading && <span className="animate-pulse">...</span>}
          <span className="text-xs">({suggestions.length})</span>
        </button>
      )}

      {isOpen && (
        <div className={inline ? "w-full bg-white border border-gray-200 rounded-lg shadow-sm p-3 mt-2" : "absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 mt-1 max-h-60 overflow-y-auto"}>
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Generating suggestions...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-sm text-gray-500 py-1">
              Type at least 10 characters to get suggestions.
            </div>
          ) : (
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 mt-0.5">
                      {suggestion.type === 'improvement' ? '✏️' :
                       suggestion.type === 'completion' ? '➕' : '💡'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 group-hover:text-gray-900">
                        {suggestion.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${suggestion.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {Math.round(suggestion.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
