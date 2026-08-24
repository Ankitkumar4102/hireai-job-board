export const generateCoverLetter = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key is missing. Please check your .env or Vercel variables.");
  }

  // Ensure prompt is a string
  let safePrompt = typeof prompt === "string" ? prompt : JSON.stringify(prompt);
  if (!safePrompt || safePrompt.trim() === "" || safePrompt === "{}") {
    safePrompt = "Write a professional cover letter for a software engineer.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: safePrompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API rejected request with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
};