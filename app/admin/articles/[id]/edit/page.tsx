// app/admin/articles/[id]/edit/page.tsx
import { db } from '../../../../db';
import LexicalEditor from '../../LecixalEditor';
import { notFound } from 'next/navigation';
import { Article, ArticleFormData } from '@/types';
import { articlesSchema } from '@/db/schema';

async function getArticle(id: string): Promise<Article | null> {
  try {
    const articles: Article[] = await db.select().from(articlesSchema)
    const article = articles.filter((article) => article.id === id)
    return article[0];
  } catch {
    return null;
  }
}

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  
  if (!article) {
    notFound();
  }

  const handleSave = async (data: ArticleFormData) => {
    const response = await fetch(`/api/articles/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save article');
    }

    window.location.href = '/admin/articles';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Article</h1>
      <LexicalEditor 
        article={article} 
        onSave={handleSave}
        onCancel={() => window.location.href = '/admin/articles'}
      />
    </div>
  );
}