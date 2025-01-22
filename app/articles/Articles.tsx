'use client'
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

const categories = ['All', 'Health', 'Fitness', 'Nutrition'];

const Articles = ({ articles }: { articles: Article[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter();

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.categories[0] === selectedCategory;
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

export default Articles;