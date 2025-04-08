import { useState } from 'react';
import { analyzeFeedback } from '@/modules/feedback-analyzer/geminiClient';

export default function FeedbackTest() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async () => {
    const result = await analyzeFeedback(input);
    setResponse(result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 Generative AI Feedback Summarizer</h2>
      <textarea
        rows={5}
        cols={60}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter user feedback in mixed languages..."
      />
      <br />
      <button onClick={handleSubmit}>Analyze</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
