// app/admin/page.tsx
import { db } from '../db';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, TrendingUp } from 'lucide-react';
import { Article, DashboardStats } from '../types';
import { JSX } from 'react';
import { articlesSchema } from '../db/schema';

async function getStats(): Promise<DashboardStats> {
  const article: Article[] = await db.select().from(articlesSchema);
  const totalArticles = article.length;
  const publishedArticles = article.filter((article: Article) => article.status === 'published').length;
  const draftArticles = article.filter((article: Article) => article.status === 'draft').length;
  // const [totalArticles, publishedArticles, draftArticles] = await Promise.all([
  //   db.select().from(articlesSchema).execute(),
  //   db.select().from(articlesSchema).where(eq(articlesSchema.status, 'published')).execute(),
  //   db.select().from(articlesSchema).where(eq(articlesSchema.status, 'draft')).execute(),
  // ]);
  return {
    totalArticles,
    publishedArticles,
    draftArticles
  };
}

export default async function AdminDashboard(): Promise<JSX.Element> {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftArticles}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}