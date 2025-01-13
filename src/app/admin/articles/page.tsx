// app/admin/articles/page.tsx
import { Suspense } from 'react';
import { getCollection } from '@/lib/mongodb';
import ArticleTable from './ArticleTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Article } from '@/types';

async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles');
  return articles.find({}).sort({ updatedAt: -1 }).toArray();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button onClick={() => window.location.href = '/admin/articles/new'}>
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>
      
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleTable 
          articles={articles}
          onEdit={(article) => {
            window.location.href = `/admin/articles/${article._id}/edit`;
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

