// types/index.ts
// export interface Article {
//     _id?: string;
//     title: string;
//     content: string;
//     status: 'draft' | 'published';
//     metadata: ArticleMetadata;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }
  
  export interface ArticleMetadata {
    id: string;
    articleId: string;
    topic: string;
    keywords: string[];
    tone: ArticleTone;
    wordCount: string;
    generatedAt?: string;
  }
  
  export type ArticleTone = 'professional' | 'conversational' | 'educational' | 'motivational';
  
  export interface GenerateArticleRequest {
    topic: string;
    keywords: string[];
    tone: ArticleTone;
    wordCount: string;
    additionalContext: string;
  }
  
  export interface GenerateArticleResponse {
    title: string;
    content: string;
    metadata: ArticleMetadata;
  }

// types/index.ts
import { SerializedEditorState } from 'lexical';

export interface Article {
  id?: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  author: string;
  categories: string[];
  createdAt?: Date;
  updatedAt?: Date;
  // metadataId?: string
}

export interface ArticleFormData {
  title: string;
  content: SerializedEditorState;
  status: Article['status'];
}

export interface GenerationFormData {
  topic: string;
  keywords: string;
  tone: 'professional' | 'conversational' | 'educational' | 'motivational';
  wordCount: '500' | '800' | '1200' | '1500';
  additionalContext: string;
}

export interface ToolbarItem {
  icon: React.FC<{ className?: string }>;
  command: () => void;
  label: string;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
} 