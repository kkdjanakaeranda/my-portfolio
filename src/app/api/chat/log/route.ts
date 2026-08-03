import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages, sessionId } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty messages array." },
        { status: 400 }
      );
    }

    // Filter out user messages to ensure the user actually typed something
    const userMessages = messages.filter((msg: Message) => msg.role === "user" && msg.content.trim() !== "");

    if (userMessages.length === 0) {
      // No actual user input, no need to send an email log
      return NextResponse.json({ success: true, message: "No user messages to log." });
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Compile list of user queries for a quick summary at the top
    const querySummaryHtml = userMessages
      .map((msg: Message) => `<li style="margin-bottom: 6px;">${escapeHtml(msg.content)}</li>`)
      .join("");

    // Generate conversation thread HTML
    const threadHtml = messages
      .filter((msg: Message) => msg.content.trim() !== "")
      .map((msg: Message) => {
        const isUser = msg.role === "user";
        const bgColor = isUser ? "#eef2ff" : "#f4f4f5";
        const borderColor = isUser ? "#6366f1" : "#71717a";
        const labelColor = isUser ? "#4338ca" : "#52525b";
        const textColor = isUser ? "#1e1b4b" : "#18181b";
        const label = isUser ? "User" : "Assistant (AI)";

        return `
          <div style="margin-bottom: 16px; padding: 12px 16px; background-color: ${bgColor}; border-left: 4px solid ${borderColor}; border-radius: 4px 8px 8px 4px;">
            <strong style="color: ${labelColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${label}</strong>
            <div style="font-size: 13px; line-height: 1.5; color: ${textColor}; white-space: pre-wrap;">${escapeHtml(msg.content)}</div>
          </div>
        `;
      })
      .join("");

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff; color: #18181b;">
        <div style="border-bottom: 1px solid #f4f4f5; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #4f46e5; margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">Portfolio Chatbot Log</h2>
          <p style="font-size: 12px; color: #71717a; margin: 0;">
            <strong>Session ID:</strong> <code>${sessionId || "N/A"}</code> &bull; 
            <strong>Time:</strong> ${timestamp} UTC
          </p>
        </div>

        <div style="margin-bottom: 24px; padding: 16px; background-color: #fafafa; border-radius: 8px; border: 1px dashed #e4e4e7;">
          <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #52525b;">Questions Asked</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #18181b; line-height: 1.5;">
            ${querySummaryHtml}
          </ul>
        </div>

        <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #52525b; border-bottom: 1px solid #f4f4f5; padding-bottom: 6px;">Conversation Transcript</h3>
        <div>
          ${threadHtml}
        </div>

        <div style="margin-top: 24px; border-top: 1px solid #f4f4f5; padding-top: 16px; text-align: center; font-size: 11px; color: #a1a1aa;">
          Sent automatically by your Portfolio Chatbot.
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Chatbot <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Chatbot Session Log (${userMessages.length} msg${userMessages.length > 1 ? "s" : ""})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Chat logging route error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}

// Simple HTML escaping helper to prevent script injection in the email body
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
