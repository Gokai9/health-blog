import React from 'react';
import { ArrowRight } from 'lucide-react';
// Sample article data
const articles = [
  {
    id: 1,
    title: 'The Impact of Mediterranean Diet on Longevity',
    excerpt: 'Discover how adopting a Mediterranean diet can significantly improve your health and increase life expectancy...',
    image: '/api/placeholder/800/400',
    category: 'Nutrition',
    date: '2025-01-10',
  },
  // ... more articles
];

const HeroSection = () => {
  const featuredArticle = articles[0];

  return (
    <div className="relative h-96 rounded-xl overflow-hidden mb-12">
      <img
        src={featuredArticle.image}
        alt={featuredArticle.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-sm font-medium mb-3">
          {featuredArticle.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{featuredArticle.title}</h1>
        <p className="text-lg mb-4 text-gray-200">{featuredArticle.excerpt}</p>
        <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;