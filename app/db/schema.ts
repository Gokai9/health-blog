// lib/schema.ts
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').$type<'admin'>().notNull(),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;

export const articlesSchema = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  //metadataId: uuid("metadata_id").references(() => articleMetadata.id),
  title: text("title").notNull(),
  images: text("images").array().notNull(),
  content: text("content").notNull(),
  status: text("status").$type<"draft" | "published">().notNull(),
  slug: text("slug").notNull().unique(),
  author: text("author").notNull(),
  categories: text("categories").array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  
})
export const articleMetadata = pgTable('article_metadata', {
  id: uuid('id').defaultRandom().primaryKey(),
  articleId: uuid('article_id').references(() => articlesSchema.id).notNull(),
  topic: varchar('topic', { length: 255 }).notNull(),
  keywords: varchar('keywords').array().notNull(),
  tone: varchar('tone', { length: 50 }).notNull(),
  wordCount: varchar('word_count', { length: 50 }).notNull(),
  generatedAt: timestamp('generated_at')
});
// Add sessions table if you want to use database sessions instead of JWT
export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// Optional: Add accounts table if you plan to add OAuth providers later
// export const accounts = pgTable('accounts', {
//   userId: uuid('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   type: text('type').$type<'credentials' | 'oauth'>().notNull(),
//   provider: text('provider').notNull(),
//   providerAccountId: text('provider_account_id').notNull(),
//   refresh_token: text('refresh_token'),
//   access_token: text('access_token'),
//   expires_at: timestamp('expires_at', { mode: 'date' }),
//   token_type: text('token_type'),
//   scope: text('scope'),
//   id_token: text('id_token'),
//   session_state: text('session_state'),
// });