'use client'
import { Suspense } from "react";
import ArticleTable from "./ArticleTable";
import { Article } from "@/types";

interface ArticlesProps {
  articles: Article[];
}

const Articles = ({ articles }: ArticlesProps) => {
    return (
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
    )
}

export default Articles;