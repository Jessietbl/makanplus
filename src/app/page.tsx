'use client';

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGeminiContent } from '@/store/features/gemini/geminiThunk';
import { RootState, AppDispatch } from '@/store/store';
import { Gift, Users, School } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const dispatch: AppDispatch = useDispatch();

  // GeminI slice fields
  const { content, loading, error } = useSelector((state: RootState) => state.gemini);
  // Coin slice
  const coinBalance = useSelector((state: RootState) => state.game?.coins ?? 0);

  // Submitting the feedback to Gemini
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      dispatch(fetchGeminiContent(inputText));
    },
    [dispatch, inputText]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex flex-col items-center p-8 space-y-10">
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-5xl font-bold text-green-800">Welcome to MAKAN+</h1>
        <p className="mt-4 text-xl text-gray-800 max-w-3xl mx-auto">
          A food rescue platform that reduces food waste, empowers B40 communities,
          and promotes sustainable living through education and innovation.
        </p>

        {/* 🪙 Coin Wallet Summary */}
        <div className="mt-4 inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 text-sm font-medium shadow-sm">
          🪙 You have <span className="font-bold">{coinBalance}</span> coins
        </div>
      </header>

      {/* Gamification Modules Overview */}
      <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <School className="mx-auto text-green-600" size={40} />
          <h3 className="text-xl font-semibold mt-3 text-green-700">Sort & Learn</h3>
          <p className="text-gray-600 text-sm mt-2">
            Play the Food Sorting Game to learn how to reduce waste. Decide which food is edible or not and earn 🪙 coins!
          </p>
          <Link
            href="/game"
            className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            Play Now
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <Gift className="mx-auto text-yellow-600" size={40} />
          <h3 className="text-xl font-semibold mt-3 text-yellow-700">Rewards & Vouchers</h3>
          <p className="text-gray-600 text-sm mt-2">Redeem surplus groceries or meals by completing learning missions.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <Users className="mx-auto text-blue-600" size={40} />
          <h3 className="text-xl font-semibold mt-3 text-blue-700">Community Impact</h3>
          <p className="text-gray-600 text-sm mt-2">Every feedback and interaction helps reduce waste and uplift others.</p>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-green-700 text-center">Quick Feedback</h2>
        <p className="text-center text-gray-600 text-sm">We welcome all comments in any language. Your feedback helps us grow 💬</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="E.g. Makanan best gila! Thank you MAKAN+!"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            rows={4}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-green-500 text-white rounded-full transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Feedback'}
            </button>
          </div>
        </form>

        {/* Sentiment Analysis Result */}
        <div>
          <p className="font-semibold text-gray-700 text-center">Sentiment Analysis:</p>
          {loading ? (
            <p className="italic text-center text-gray-500">Analyzing your feedback...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : content && typeof content === 'object' ? (
            <>
              {/* content is presumably an object: {sentiment, summary, emoji} */}
              <p className="text-center text-gray-800">Sentiment: {content.sentiment}</p>
              <p className="text-center text-gray-800 mt-1">Summary: {content.summary}</p>
              <p className="text-center text-3xl mt-2">{content.emoji}</p>
            </>
          ) : (
            // If content is just a string fallback
            <p className="text-center text-gray-800">{content}</p>
          )}
        </div>
      </section>
    </main>
  );
}
