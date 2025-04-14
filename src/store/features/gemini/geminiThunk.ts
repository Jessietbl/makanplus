import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk to analyze feedback using Gemini API.
 * Accepts multilingual input from B40 users or businesses.
 */
export const fetchGeminiContent = createAsyncThunk(
  'gemini/fetchContent',
  async (inputText: string, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: inputText }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.error || "Gemini failed");
      return data; // return JSON { sentiment, summary, emoji }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

