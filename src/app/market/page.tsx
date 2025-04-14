'use client';

import Image from 'next/image';
import React from 'react';

const products = [
  {
    id: 1,
    name: '🍛 Chicken Curry',
    restaurant: 'Mama’s Kitchen',
    description: 'A flavorful chicken curry rescued from excess supplies at Mama’s Kitchen.',
    image: 'https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGN1cnJ5JTIwMjAweDIwMHxlbnwwfHwwfHx8MA%3D%3D',  // Added comma here
  },
  {
    id: 2,
    name: '🍚 Chicken Rice',
    restaurant: 'Golden Rice House',
    description: 'Delicious chicken rice saved from unsold dishes at Golden Rice House.',
    image: 'https://images.unsplash.com/photo-1719670712556-638018bd8238?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpY2tlbiUyMHJpY2UlMjAyMDB4MjAwfGVufDB8fDB8fHww',
  },
  {
    id: 3,
    name: '🥘 Beef Rendang',
    restaurant: 'Spice Corner',
    description: 'Slow-cooked beef rendang with rich spices, rescued from Spice Corner.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZWYlMjBjdXJyeSUyMDIwMHgyMDB8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: '🍜 Maggi Goreng',
    restaurant: 'Warung Delight',
    description: 'Maggi goreng cooked with wok hei, saved from Warung Delight.',
    image: 'https://images.unsplash.com/photo-1684707878393-02606f779d7f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGZyaWVkJTIwbm9vZGxlcyUyMDIwMHgyMDB8ZW58MHx8MHx8fDA%3D',
  },
];

export default function MarketPage() {
  // Simulate a claim action by showing a simple alert or toast message
  const handleClaim = (productName: string) => {
    alert(`You have claimed ${productName}!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-green-500">🍴 MAKAN+ Marketplace</h1>
      <p className="text-gray-400 mb-8">
        Rescued cooked meals available for B40 communities. These meals are collected from local restaurants to reduce food waste.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-4 transition-transform transform hover:scale-105 focus-within:scale-105"
          >
            <div className="relative w-full h-40">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
                onError={(e) => {
                  // Optional fallback if image fails
                  (e.currentTarget as HTMLImageElement).src = '/fallback.jpg';
                }}
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{item.name}</h2>
            <p className="text-sm text-gray-600">Source: {item.restaurant}</p>
            <p className="text-sm text-gray-600 mt-1 mb-2">{item.description}</p>
            <button
              onClick={() => handleClaim(item.name)}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Claim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
