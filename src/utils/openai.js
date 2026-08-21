import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export const generateCoverLetter = async (promptData) => {
  try {
    // 1. Ensure prompt is always a valid string
    let formattedPrompt = "";
    if (typeof promptData === "string") {
      formattedPrompt = promptData;
    } else if (typeof promptData === "object" && promptData !== null) {
      formattedPrompt = JSON.stringify(promptData, null, 2);
    }

    if (!formattedPrompt || formattedPrompt.trim() === "") {
      throw new Error("Prompt content cannot be empty.");
    }

    // 2. Send the request
    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: formattedPrompt,
        },
      ],
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
};