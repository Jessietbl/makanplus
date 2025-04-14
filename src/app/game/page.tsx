import React from 'react';
import FoodGame from '@/components/FoodGame';

export default function GamePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
      <FoodGame />
    </main>
  );
}
