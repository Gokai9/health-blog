
// app/admin/page.js
import { getCollection } from '@/app/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, TrendingUp } from 'lucide-react';

async function getStats() {
  const articles = await getCollection('articles');
  const totalArticles = await articles.countDocuments();
  const publishedArticles = await articles.countDocuments({ status: 'published' });
  const draftArticles = await articles.countDocuments({ status: 'draft' });
  
  return {
    totalArticles,
    publishedArticles,
    draftArticles
  };
}

export default async function AdminDashboard() {
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

      {/* Recent Articles Table will be added here */}
    </div>
  );
}