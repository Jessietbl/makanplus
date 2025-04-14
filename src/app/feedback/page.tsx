'use client';

import React, { useState } from 'react';

export default function FeedbackPage() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<{ summary: string; emoji: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: inputText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Unknown error');
      } else {
        setResponse({
          summary: data.summary,
          emoji: data.emoji,
        });
      }
    } catch (err: any) {
      setError(err.message || 'API error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold">💬 Feedback Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Type your feedback here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Feedback'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="font-semibold text-gray-700">Sentiment Analysis:</p>
        {loading ? (
          <p className="italic text-gray-500">Analyzing...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : response && (
          <div className="mt-2 text-lg">
            <p className="text-gray-800">{response.summary}</p>
            <p className="text-3xl mt-1">{response.emoji}</p>
          </div>
        )}
      </div>
    </div>
  );
}
