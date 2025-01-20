// app/admin/articles/ArticleTable.tsx
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye } from "lucide-react";
import { formatDistance } from 'date-fns';
import { Article } from '@/types';

interface ArticleTableProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

const ArticleTable: FC<ArticleTableProps> = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article._id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>
                <Badge
                  variant={article.status === 'published' ? 'default' : 'secondary'}
                >
                  {article.status}
                </Badge>
              </TableCell>
              <TableCell>
                {formatDistance(new Date(article.updatedAt), new Date(), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(article)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(article._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  {article.status === 'published' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleTable;