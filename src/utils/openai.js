import OpenAI from "openai";

// 1. ADD THE BASE URL TO REDIRECT TO GROQ
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1", // <-- THIS IS THE NEW LINE
  dangerouslyAllowBrowser: true 
});

export const generateCoverLetter = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      // 2. CHANGE THE MODEL TO A FREE GROQ MODEL
      model: "llama-3.1-8b-instant", // <-- REPLACE "gpt-3.5-turbo" OR "gpt-4" WITH THIS
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error; 
  }
};