import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: 'The Impact of Mediterranean Diet on Longevity',
    excerpt: 'Discover how adopting a Mediterranean diet can significantly improve your health and increase life expectancy...',
    image: '/api/placeholder/800/400',
    category: 'Nutrition',
    date: '2025-01-10',
    slug: 'mediterranean-diet-longevity'
  },
  {
    id: 2,
    title: '10 Best Exercises for a Healthy Heart',
    excerpt: 'Learn about the top exercises that can help you maintain a healthy heart and improve cardiovascular health...',
    image: '/api/placeholder/800/400',
    category: 'Fitness',
    date: '2025-02-15',
    slug: 'best-exercises-healthy-heart'
  },
  {
    id: 3,
    title: 'Understanding Mental Health: Tips and Resources',
    excerpt: 'Mental health is just as important as physical health. Here are some tips and resources to help you maintain it...',
    image: '/api/placeholder/800/400',
    category: 'Health',
    date: '2025-03-20',
    slug: 'understanding-mental-health'
  },
  // ... more articles
];


const ArticleGrid = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <Link href="/articles" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );

export default ArticleGrid;