/**
 * Cleans AI-generated text by removing formatting markers, options, and metadata
 */
export function cleanAIText(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Remove "Here are a few options" type headers
  cleaned = cleaned.replace(/^Here are (?:a few|some|multiple) options?[,:].*?:/gi, "");
  cleaned = cleaned.replace(/^Choose the one that best fits.*?:/gi, "");

  // Remove option markers like **Option 1**, **Option 2**, etc.
  cleaned = cleaned.replace(/\*\*Option \d+[^:]*:\*\*/gi, "");
  cleaned = cleaned.replace(/Option \d+[^:]*:/gi, "");

  // Remove section markers like **Professional & Engaging:**
  cleaned = cleaned.replace(/\*\*[^*]+:\*\*/g, "");

  // Remove improvement notes like "**Key improvements made:**"
  cleaned = cleaned.replace(/---\s*\*\*Key improvements.*$/s, "");
  cleaned = cleaned.replace(/\*\*Key improvements.*$/s, "");

  // Remove metadata markers
  cleaned = cleaned.replace(/\*\*Professionalism:\*\*/gi, "");
  cleaned = cleaned.replace(/\*\*Engagement:\*\*/gi, "");
  cleaned = cleaned.replace(/\*\*Conciseness:\*\*/gi, "");
  cleaned = cleaned.replace(/\*\*Value Proposition:\*\*/gi, "");
  cleaned = cleaned.replace(/\*\*Call to Action.*?:\*\*/gi, "");

  // Remove bullet points and asterisks
  cleaned = cleaned.replace(/^\s*[\*\-•]\s*/gm, "");
  cleaned = cleaned.replace(/\*\*/g, "");
  cleaned = cleaned.replace(/\*/g, "");

  // Remove ">" arrows
  cleaned = cleaned.replace(/>\s*/g, "");

  // Remove extra dashes
  cleaned = cleaned.replace(/---+/g, "");

  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ");

  // Clean up multiple line breaks
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, "\n\n");

  // Trim and return first meaningful paragraph if multiple options exist
  const paragraphs = cleaned.split(/\n\n+/).filter(p => p.trim().length > 50);
  
  if (paragraphs.length > 0) {
    // Return the first substantial paragraph
    return paragraphs[0].trim();
  }

  return cleaned.trim();
}

/**
 * Truncates text to complete sentences within a character limit
 */
export function truncateToSentence(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;

  // Find the last sentence ending before maxLength
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(". ");
  const lastExclamation = truncated.lastIndexOf("! ");
  const lastQuestion = truncated.lastIndexOf("? ");
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > 0) {
    // Return up to and including the punctuation
    return text.substring(0, lastSentenceEnd + 1).trim();
  }
  
  // If no sentence ending found, try to break at last space
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.7) {
    return text.substring(0, lastSpace).trim() + "...";
  }
  
  // Fallback: just truncate with ellipsis
  return truncated.trim() + "...";
}

/**
 * Extracts the best option from AI response with multiple options
 */
export function extractBestOption(text: string): string {
  if (!text) return "";

  // Try to find the first option after "Option 1" or similar
  const optionMatch = text.match(/(?:Option 1|Professional)[^>]*>\s*([^*]+?)(?=\*\*Option|$)/s);
  
  if (optionMatch && optionMatch[1]) {
    return cleanAIText(optionMatch[1]);
  }

  // If no clear option found, clean the whole text
  return cleanAIText(text);
}

/**
 * Cleans HTML from markdown code blocks and extra formatting
 */
export function cleanHTMLFromMarkdown(html: string): string {
  if (!html) return "";

  let cleaned = html;

  // Remove markdown code block markers
  cleaned = cleaned.replace(/```html\s*/gi, "");
  cleaned = cleaned.replace(/```\s*$/gi, "");
  cleaned = cleaned.replace(/^```\s*/gm, "");

  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}
