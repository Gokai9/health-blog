// types/index.ts
import { ObjectId } from 'mongodb';

export interface Article {
  _id?: ObjectId;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  excerpt?: string;
  author: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}