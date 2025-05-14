
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();
const messages: { role: string; text: string; timestamp: number }[] = [];


async function generatePlaceSuggestion(userMessage: string) {
  const prompt = `The user said: "${userMessage}". Suggest a place that fits this mood. Respond in JSON with keys: name, description, location.`;

  const suggestionResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a travel assistant that suggests places matching a user's mood or request."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.8
  });

  try {
    const suggestionText = suggestionResponse.choices[0].message.content ?? "{}";
    const suggestion = JSON.parse(suggestionText);
    return suggestion;
  } catch (err) {
    console.error("Failed to parse suggestion JSON:", err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { model, messages } = await req.json();

    // Main completion response
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    // Extract latest user message
    const userMessage = messages?.slice().reverse().find((msg: any) => msg.role === "user")?.content || "";

    console.log("User message:", userMessage.content);

    // Parallel suggestion response
    const placeSuggestion = await generatePlaceSuggestion(userMessage);

    return NextResponse.json({
      completion,
      suggestion: placeSuggestion
    });
  } catch (error: any) {
    console.error("Error in /chat/completions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
