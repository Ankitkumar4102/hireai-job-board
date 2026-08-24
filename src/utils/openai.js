import OpenAI from "openai";

export const generateCoverLetter = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API Key. Please set REACT_APP_OPENAI_API_KEY in your .env or Vercel settings.");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
  });

  try {
    let safePrompt = typeof prompt === "string" ? prompt : JSON.stringify(prompt);

    if (!safePrompt || safePrompt.trim() === "" || safePrompt === "{}" || safePrompt === "undefined") {
      safePrompt = "Write a professional cover letter for a software engineer.";
    }

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: safePrompt,
        },
      ],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
};