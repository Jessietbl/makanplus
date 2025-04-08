// src/modules/feedback-analyzer/geminiClient.ts

export async function analyzeFeedback(feedback: string): Promise<any> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a community feedback analyzer. Analyze this input and return sentiment + summary:\n${feedback}`
                }
              ]
            }
          ]
        })
      }
    );
  
    return response.json();
  }
  