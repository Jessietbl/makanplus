'use client';

import React, { useState } from 'react';

type SentimentAnalysis = {
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  emoji: string;
};

export default function FeedbackPage() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: inputText }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Request failed.');
      } else {
        // data is expected to be an object: { sentiment, summary, emoji }
        setAnalysis(data);
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold">💬 Feedback Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          rows={4}
          placeholder="Type your feedback here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition disabled:opacity-50"
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
        ) : analysis ? (
          <div className="mt-2 text-lg">
            <p className="text-gray-800">Sentiment: {analysis.sentiment}</p>
            <p className="text-gray-800 mt-1">Summary: {analysis.summary}</p>
            <p className="text-3xl mt-2">{analysis.emoji}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
