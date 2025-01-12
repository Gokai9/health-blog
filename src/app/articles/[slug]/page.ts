'use client'
import { useParams } from 'next/navigation';
import Head from 'next/head';


const articles = [
    {
      id: 1,
      title: 'The Impact of Mediterranean Diet on Longevity',
      excerpt: 'Discover how adopting a Mediterranean diet can significantly improve your health and increase life expectancy...',
      image: '/api/placeholder/800/400',
      category: 'Nutrition',
      date: '2025-01-10',
      slug: 'mediterranean-diet-longevity',
      content: 'The Mediterranean diet is rich in fruits, vegetables, whole grains, and healthy fats. Studies have shown that this diet can reduce the risk of chronic diseases and promote longevity. By incorporating more plant-based foods and healthy fats like olive oil, you can improve your overall health and well-being.',
      author: 'Jane Doe'
    },
    {
      id: 2,
      title: '10 Best Exercises for a Healthy Heart',
      excerpt: 'Learn about the top exercises that can help you maintain a healthy heart and improve cardiovascular health...',
      image: '/api/placeholder/800/400',
      category: 'Fitness',
      date: '2025-02-15',
      slug: 'best-exercises-healthy-heart',
      content: 'Regular exercise is crucial for maintaining a healthy heart. Activities like brisk walking, jogging, swimming, and cycling can help improve cardiovascular health. Aim for at least 150 minutes of moderate-intensity exercise each week to keep your heart in top condition.',
      author: 'John Smith'
    },
    {
      id: 3,
      title: 'Understanding Mental Health: Tips and Resources',
      excerpt: 'Mental health is just as important as physical health. Here are some tips and resources to help you maintain it...',
      image: '/api/placeholder/800/400',
      category: 'Health',
      date: '2025-03-20',
      slug: 'understanding-mental-health',
      content: 'Mental health is a critical aspect of overall well-being. It is important to take steps to manage stress, seek support when needed, and practice self-care. Resources like therapy, support groups, and mindfulness practices can be beneficial in maintaining mental health.',
      author: 'Emily Johnson'
    },
    // ... more articles
];

//const categories = ['All', 'Health', 'Fitness', 'Nutrition'];
const ArticlePage = () => {
    const params = useParams();
    const { slug } = params;

    const article = articles.find((article) => article.slug === slug);

    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <>
            <Head>
                <title>{article.title} | Health Blog</title>
                <meta name="description" content={article.excerpt} />
                <meta name="keywords" content={`${article.category}, health, blog`} />
            </Head>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                    <p className="text-gray-600 mb-4">{article.date} by {article.author}</p>
                    <img src={article.image} alt={article.title} className="w-full h-auto mb-4" />
                    <div className="prose prose-lg">
                        <p>{article.content}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticlePage;