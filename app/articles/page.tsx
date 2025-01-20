'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleCard from '../components/ArticleCard';

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

const categories = ['All', 'Health', 'Fitness', 'Nutrition'];

const ArticlesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter();

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleArticleClick = (slug: string) => {
        router.push(`/articles/${slug}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded mb-2 md:mb-0 md:mr-2"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                    <div
                        key={article.slug}
                        className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => handleArticleClick(article.slug)}
                    >
                        <ArticleCard article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;