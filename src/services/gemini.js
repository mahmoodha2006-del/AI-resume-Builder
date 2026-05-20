import axios from "axios";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

export const enhanceResumeText = async (
  text
) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Rewrite this resume experience professionally and make it ATS-friendly:

${text}`,
              },
            ],
          },
        ],
      }
    );

    const result =
      response.data.candidates[0].content
        .parts[0].text;

    return result;
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    return "AI enhancement failed.";
  }
};