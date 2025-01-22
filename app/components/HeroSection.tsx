import { ArrowRight } from 'lucide-react';
import { db } from '@/db';
import { articlesSchema } from '@/db/schema';
import { Article } from '@/types';

// src={featuredArticle.image}
//         alt={featuredArticle.title}
//         layout="fill"
//         objectFit="cover"
//         className="absolute inset-0"

const HeroSection = async () => {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
  // const articles: Article[] = await response.json();
  // const featuredArticle = articles[0];
  const articles: Article[] = await db.select().from(articlesSchema).limit(1).execute();
  const featuredArticle: Article = articles[0];
  console.log(featuredArticle)
  console.log('hello')
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
          {featuredArticle.categories[0]}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{featuredArticle.title}</h1>
        <p className="text-lg mb-4 text-gray-200">{featuredArticle.content}</p>
        <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;