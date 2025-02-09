/**
 * The above TypeScript code defines functions for getting health advice, analyzing symptoms urgency,
 * providing wellness tips, and analyzing medicine images using Google's Generative AI, with error
 * handling and language support.
 * @param {string} prompt - The `prompt` parameter in the provided code refers to a string that
 * contains a specific question or instruction related to health advice, symptoms analysis, wellness
 * tips, or medicine image analysis. This prompt is used as input for generating responses or analyses
 * using the Google Generative AI model.
 * @param {string} [language=en] - The `language` parameter in the provided code refers to the language
 * in which the responses should be generated or analyzed. It is used to determine the
 * language-specific content and translations for the user interface. The default language is set to
 * English ('en'), but the functions allow for specifying a different language if needed
 * @returns The functions `getHealthAdvice`, `analyzeSymptomsUrgency`, `getWellnessTip`, and
 * `analyzeMedicineImage` are being exported from the code snippet. These functions are designed to
 * interact with a Google Generative AI model to provide health advice, analyze symptoms urgency, give
 * wellness tips, and analyze medicine images respectively.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LANGUAGES, UI_TRANSLATIONS } from '../config/languages';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('API key is not defined. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);
const HEALTH_PROMPT_TEMPLATE = `
You are a knowledgeable healthcare assistant. Provide accurate, helpful, and concise advice about the following health question.
Include relevant medical information while keeping the response easy to understand.

IMPORTANT GUIDELINES:
1. Always encourage consulting healthcare professionals for specific medical advice
2. Focus on general health education and wellness information
3. Provide evidence-based information from reliable sources
4. Include preventive measures and healthy lifestyle recommendations when relevant
5. Avoid making specific medical diagnoses
6. Highlight when immediate medical attention might be needed
7. Include relevant lifestyle modifications if applicable

CRITICAL INSTRUCTIONS:
1. You MUST respond in the same language as the input question
2. If the input is in {LANGUAGE}, respond in {LANGUAGE}
3. Keep the response natural and culturally appropriate for {LANGUAGE} speakers
4. Use proper grammar and script for {LANGUAGE}

Question: {QUESTION}
`;
const MEDICINE_ANALYSIS_PROMPT = `
Analyze this medicine image and provide a detailed but concise report in the following format:

1. Medicine Name:
   - Generic name
   - Brand names (if visible)

2. Classification:
   - Type of medication
   - Drug class

3. Primary Uses:
   - Main conditions treated
   - Key indications

4. Important Information:
   - Common dosage forms
   - Key warnings
   - Major side effects
   - Important interactions

5. Precautions:
   - Who should not take this
   - Special populations (pregnancy, elderly, etc.)

IMPORTANT: If you cannot clearly identify the medicine or are uncertain, emphasize that this is a preliminary analysis and recommend consulting a healthcare professional or pharmacist for verification.

Respond in {LANGUAGE}.
`;

// Custom error types
class SomeSpecificError extends Error {}
class NetworkError extends Error {}

export async function getHealthAdvice(prompt: string, language: string = 'en') {
  try {
    const languageDetectionResult = await model.generateContent(`
      Analyze the following text and return ONLY the ISO language code (e.g., 'en', 'hi', 'mr', etc.) of the language it's written in:
      "${prompt}"
      Return ONLY the language code, nothing else.
    `);

    const detectedLanguage = (await languageDetectionResult.response.text()).trim().toLowerCase();
    const responseLanguage = SUPPORTED_LANGUAGES.includes(detectedLanguage) ? detectedLanguage : language;

    const formattedPrompt = HEALTH_PROMPT_TEMPLATE
      .replace(/{LANGUAGE}/g, LANGUAGES[responseLanguage].name)
      .replace('{QUESTION}', prompt);

    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    console.error('Error getting health advice:', (error as Error).message || error);
    if (error instanceof SomeSpecificError) {
        return 'Specific error occurred. Please check your input.';
    } else if (error instanceof NetworkError) {
        return 'Network error. Please try again later.';
    } else {
        return UI_TRANSLATIONS[language]?.error || UI_TRANSLATIONS.en.error;
    }
  }
}

export async function analyzeSymptomsUrgency(symptoms: string, language: string = 'en') {
  try {
    const prompt = `
      Analyze these health symptoms and determine if they might require immediate medical attention.
      Only respond with one of these levels: "emergency", "urgent", "routine", or "self-care".
      Base this strictly on medical guidelines. Symptoms: ${symptoms}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().toLowerCase().trim();
  } catch (error: unknown) {
    console.error('Error analyzing symptoms:', (error as Error).message || error);
    if (error instanceof SomeSpecificError) {
        return 'Specific error occurred. Please check your input.';
    } else if (error instanceof NetworkError) {
        return 'Network error. Please try again later.';
    } else {
        return 'error';
    }
  }
}

export async function getWellnessTip(language: string = 'en') {
  try {
    const prompt = `
      Provide a short, practical daily wellness tip that's easy to implement.
      Focus on: nutrition, exercise, mental health, or sleep.
      Make it specific and actionable.
      Respond in ${LANGUAGES[language].name}.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    console.error('Error getting wellness tip:', (error as Error).message || error);
    if (error instanceof SomeSpecificError) {
        return 'Specific error occurred. Please check your input.';
    } else if (error instanceof NetworkError) {
        return 'Network error. Please try again later.';
    } else {
        return UI_TRANSLATIONS[language]?.error || UI_TRANSLATIONS.en.error;
    }
  }
}

export async function analyzeMedicineImage(imageData: string, language: string = 'en') {
  try {
    const base64Data = imageData.includes('base64,') 
      ? imageData.split('base64,')[1] 
      : imageData;

    const prompt = MEDICINE_ANALYSIS_PROMPT.replace('{LANGUAGE}', LANGUAGES[language].name);

    const result = await visionModel.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    console.error('Error analyzing medicine image:', (error as Error).message || error);
    if (error instanceof SomeSpecificError) {
        return 'Specific error occurred. Please check your input.';
    } else if (error instanceof NetworkError) {
        return 'Network error. Please try again later.';
    } else {
        return UI_TRANSLATIONS[language]?.medicineAnalysisError || 'Error analyzing medicine image. Please try again.';
    }
  }
}