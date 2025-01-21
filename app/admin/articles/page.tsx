// app/admin/articles/page.tsx
import { Suspense } from 'react';
import { db } from '../../db';
import ArticleTable from './ArticleTable';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { Article } from '@/types';
import { articlesSchema } from '../../db/schema';

/**
 * Fetches a list of articles from the database, sorts them by their updated date in descending order,
 * and returns the sorted list.
 *
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles sorted by their updated date.
 */
async function getArticles(): Promise<Article[]> {
  const articles: Article[] = await db.select().from(articlesSchema);
  return articles.sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button onClick={() => window.location.href = '/admin/generate'}>
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>
      
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleTable 
          articles={articles}
          onEdit={(article) => {
            window.location.href = `/admin/articles/${article.id}/edit`;
          }}
          onDelete={async (id) => {
            if (confirm('Are you sure you want to delete this article?')) {
              await fetch(`/api/articles/${id}`, { method: 'DELETE' });
              window.location.reload();
            }
          }}
        />
      </Suspense>
    </div>
  );
}

