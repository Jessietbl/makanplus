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

    // 2. Prompt (using triple-backtick JSON block)
    const prompt = `
You are a helpful assistant that analyzes customer feedback.

Return ONLY a valid JSON object using this format:
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

    // 3. Check Gemini key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    // 4. Init Gemini
    const ai = new GoogleGenAI({ apiKey });

    // 5. Generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contentsPayload,
    });

    const textOutput = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      return NextResponse.json({ error: "Empty response from Gemini." }, { status: 500 });
    }

    // 6. Extract JSON block from triple backticks
    const match = textOutput.match(/```json\s*({[\s\S]*?})\s*```/);
    const jsonString = match ? match[1] : textOutput;

    try {
      // Parse the JSON
      const parsed = JSON.parse(jsonString.trim());
      // Return the structured JSON to the client
      return NextResponse.json(parsed);
    } catch (err) {
      console.error("❌ Failed to parse Gemini response:", jsonString);
      return NextResponse.json(
        { error: "Failed to parse Gemini response as JSON." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
