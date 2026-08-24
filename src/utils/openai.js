import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export const generateCoverLetter = async (prompt) => {
  try {
    // 1. Force whatever comes in to be a plain string
    let safePrompt = typeof prompt === 'string' ? prompt : JSON.stringify(prompt);

    // 2. Fallback to a default string if it's completely empty or undefined
    if (!safePrompt || safePrompt.trim() === "" || safePrompt === "{}" || safePrompt === "undefined") {
       safePrompt = "Write a professional cover letter for a software engineer.";
    }

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: safePrompt, // This is now 100% guaranteed to be a valid string
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
};