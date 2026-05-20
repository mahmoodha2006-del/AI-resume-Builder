const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";

export async function generateResumeText(task, resumeData, userText) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key missing. Add VITE_GEMINI_API_KEY in .env");
  }

  const prompt = `
You are an expert resume writer.

Task:
${task}

User text:
${userText || "No text provided"}

Resume details:
Name: ${resumeData.name || ""}
Email: ${resumeData.email || ""}
Phone: ${resumeData.phone || ""}
Location: ${resumeData.location || ""}
LinkedIn: ${resumeData.linkedin || ""}
GitHub/Portfolio: ${resumeData.github || ""}
Skills: ${(resumeData.skills || []).join(", ")}
Education: ${(resumeData.education || [])
    .map((item) => `${item.degree}, ${item.college}, ${item.educationYear}`)
    .join(" | ")}
Experience: ${(resumeData.experiences || [])
    .map(
      (item) => `${item.jobTitle} at ${item.company}: ${item.jobDescription}`
    )
    .join(" | ")}
Projects: ${(resumeData.projects || [])
    .map(
      (item) =>
        `${item.projectName} (${item.projectTech}): ${item.projectDescription}`
    )
    .join(" | ")}
Certifications: ${(resumeData.certifications || [])
    .map(
      (item) =>
        `${item.certificateName}, ${item.certificateIssuer}, ${item.certificateYear}`
    )
    .join(" | ")}

Rules:
- Return only the improved resume text.
- Keep it professional and ATS-friendly.
- Use the user's actual details.
- Do not make up fake companies, years, degrees, certifications, or metrics.
- Keep it concise.
- Avoid markdown formatting unless the task clearly asks for bullets.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini request failed");
  }

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Unable to generate text.";

  return text.trim();
}