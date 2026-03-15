const KEY = process.env.REACT_APP_OPENAI_API_KEY;
const hasKey = () => KEY && KEY !== 'your_openai_api_key_here';

export const generateCoverLetter = async ({ jobTitle, company, jobDescription, userSkills, userName }) => {
  if (!hasKey()) return mockLetter({ jobTitle, company, userName, userSkills });

  const prompt = `Write a confident, ATS-optimised cover letter (under 320 words) for:

Job Title: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription?.slice(0, 700)}
Applicant: ${userName}
Skills: ${userSkills}

Rules:
- Start strong — never use "I am writing to express my interest"
- Reference 2 specific skills from the JD
- Include one quantifiable achievement
- End with a clear call to action
- Professional but warm tone`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 550, temperature: 0.72,
    }),
  });
  if (!res.ok) throw new Error('OpenAI failed');
  const d = await res.json();
  return d.choices[0].message.content;
};

const mockLetter = ({ jobTitle, company, userName, userSkills }) => `Dear Hiring Team at ${company},

The ${jobTitle} role jumped out at me immediately — not because it checks boxes, but because it maps directly to the kind of work I have been building towards.

Over the past year I have shipped full-stack features across internships at Orbaco Health and Gravitech Dreams, working with ${userSkills || 'React, Node.js, and MySQL'}. At Orbaco, I built a PHP and React-powered web application that automated content workflows end-to-end. I also deployed a machine learning diabetes prediction tool as a live web app, managing everything from data preprocessing to the production deployment — an experience that taught me to own outcomes, not just tasks.

What draws me to ${company} specifically is the scale at which you operate and the quality bar you set for your engineering. I want to work somewhere that takes craft seriously, and from everything I have read, that describes your team.

I am ready to contribute from day one. I would love to show you what I can build in a technical interview at your earliest convenience.

Warm regards,
${userName || 'Ankit Kumar'}`;
