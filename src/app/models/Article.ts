// models/Article.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  content: string
  slug: string
  excerpt: string
  author: string
  publishedAt: Date
  status: 'draft' | 'published'
  categories: string[]
  metadata: {
    views: number
    readTime: number
  }
  aiGenerated: boolean
  lastModified: Date
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  categories: [{ type: String }],
  metadata: {
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 0 }
  },
  aiGenerated: { type: Boolean, default: false },
  lastModified: { type: Date, default: Date.now }
}, {
  timestamps: true
})

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)