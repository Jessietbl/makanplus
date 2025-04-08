const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function fetchGeminiResponse(userInput: string) {
  const response = await fetch(`${API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: userInput }]
        }
      ]
    })
  });

  const result = await response.json();
  return result;
}
