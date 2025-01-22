import { eq } from 'drizzle-orm';
import Head from 'next/head';
import { articlesSchema } from '@/db/schema';
import { db } from '@/db';
import { Article } from '@/types';


//const categories = ['All', 'Health', 'Fitness', 'Nutrition'];
const ArticlePage = async({ params }: { params: { slug: string } }) => {
    const articles: Article[] = await db.select().from(articlesSchema).where(eq(articlesSchema.slug, params.slug)).execute();
    const article: Article = articles[0];
    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <>
            <Head>
            <title>{article.title} | Health Blog</title>
            <meta name="description" content={article.content} />
            <meta name="keywords" content={`${article.categories}, health, blog`} />
        </Head>
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-600 mb-4">{article.createdAt?.toLocaleDateString()} by {article.author}</p>
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