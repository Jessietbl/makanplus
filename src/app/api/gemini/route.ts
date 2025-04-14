import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputText, feedback } = body;

    // 1. Validate input
    if (!feedback && !inputText) {
      return NextResponse.json(
        { error: "Request must include either inputText or feedback." },
        { status: 400 }
      );
    }

    // 2. Build the prompt with a code block for JSON
    const prompt = `
You are a helpful assistant that analyzes customer feedback.

Return ONLY a valid JSON object using the following format:
\`\`\`json
{
  "sentiment": "positive" | "neutral" | "negative",
  "summary": "short summary of the feedback in the user's language",
  "emoji": "appropriate emoji (😊, 😐, 😞)"
}
\`\`\`

Here is the feedback:
"${feedback || inputText}"

Respond ONLY with the JSON object wrapped inside a code block. No extra text.
`;

    const contentsPayload = [
      {
        parts: [{ text: prompt }],
      },
    ];

    // 3. Check for the API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    // 4. Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey });

    // 5. Request generation from Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contentsPayload,
    });

    const textOutput = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return NextResponse.json(
        { error: "Empty response from Gemini." },
        { status: 500 }
      );
    }

    // 6. Extract JSON block inside triple backticks
    const match = textOutput.match(/```json\s*({[\s\S]*?})\s*```/);
    const jsonString = match ? match[1] : textOutput;

    let parsed;
    try {
      parsed = JSON.parse(jsonString.trim());
    } catch (err) {
      console.error("❌ Failed to parse Gemini response:", jsonString);
      return NextResponse.json(
        { error: "Failed to parse Gemini response as JSON." },
        { status: 500 }
      );
    }

    // 7. Fallback: If emoji is missing or empty, assign based on sentiment.
    if (!parsed.emoji || parsed.emoji.trim() === "") {
      if (parsed.sentiment === "positive") {
        parsed.emoji = "😊";
      } else if (parsed.sentiment === "neutral") {
        parsed.emoji = "😐";
      } else if (parsed.sentiment === "negative") {
        parsed.emoji = "😞";
      } else {
        parsed.emoji = "🤔"; // fallback default emoji
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
