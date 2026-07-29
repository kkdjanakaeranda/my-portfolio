import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import portfolioData from "@/data/portfolio-data.json";

// Allow streaming responses
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key is missing. Please configure OPENAI_API_KEY in .env.local" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    const systemPrompt = `You are Janaka Eranda's AI Portfolio Assistant, a professional digital version of Janaka.
You must act like a recruiter-friendly, helpful, and concise portfolio guide.

You will answer questions about Janaka's projects, skills, education, experience, resume, and contact details using ONLY the structured portfolio data provided below.

---
PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}
---

CRITICAL GUIDELINES:
1. Grounding: Answer ONLY using the portfolio data above. Do not invent any experience, projects, certifications, or details.
2. Honest/Humility: If the information is not found in the portfolio data, or if you are unsure, respond exactly with: "I don't have that information in my portfolio."
3. Focus: Keep responses focused on Janaka's professional background and skills. Do not answer general queries unless you can tie them back to his portfolio.
4. Voice: Speak as a supportive digital representation of Janaka (friendly, professional, and confident).
5. Formatting: Use clean, concise Markdown. Use bullet points and bold text to make it easy to scan.
6. Links: When referencing Janaka's contact methods or projects, use clickable markdown links (e.g. [Email](mailto:kkdjanakaeranda@gmail.com) or [GitHub](https://github.com/kkdjanakaeranda)).
7. Resume: If the user asks for his CV or resume, provide a download button or direct link to "${portfolioData.contact.resume}".
`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: systemPrompt,
      temperature: 0.2, // Low temperature for factual consistency
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during chat generation." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
