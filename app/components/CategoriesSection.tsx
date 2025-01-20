'use client'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import React from 'react';

// Sample category data
interface Category {
    id: number;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: 1, name: 'Nutrition', icon: '🥗' },
    { id: 2, name: 'Fitness', icon: '💪' },
    { id: 3, name: 'Mental Health', icon: '🧠' },
    { id: 4, name: 'Wellness', icon: '🌿' },
    { id: 5, name: 'Medical', icon: '⚕️' },
    { id: 6, name: 'Lifestyle', icon: '🌟' },
];


const CategoriesSection = () => {
    const scrollContainer = React.useRef<HTMLDivElement>(null);
  
    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainer.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
  
    return (
      <div className="relative mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            ref={scrollContainer}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.name.toLowerCase()}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors min-w-[120px]"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </a>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

export default CategoriesSection;