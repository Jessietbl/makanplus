'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-r from-green-50 to-yellow-50">
      {/* Main Title and Introduction */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">About MAKAN+</h1>
        <p className="text-gray-800 text-lg max-w-3xl mx-auto">
          MAKAN+ is a food rescue platform dedicated to reducing food wastage and empowering B40 communities.
          By redirecting surplus cooked meals from restaurants to those in need, we not only minimize waste
          but also provide practical financial literacy and nutritional education through engaging gamification.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Our mission is to bridge the gap between surplus food and underserved communities by creating an accessible, sustainable platform that reduces food waste and promotes healthy, informed choices.
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-green-700">Our Vision</h2>
        <p className="text-gray-700">
          We envision a future where every cooked meal is valued and every individual is empowered with the knowledge to manage resources wisely, fostering a healthier, more equitable society.
        </p>
      </section>

      {/* Additional Information Section */}
      <section className="text-center">
        <p className="text-gray-600">
          Interested in learning more about MAKAN+ or joining our cause? Contact us at{' '}
          <Link href="mailto:example@makanplus.org" className="text-green-700 font-medium underline">
            example@makanplus.org
          </Link>
        </p>
      </section>
    </div>
  );
}
