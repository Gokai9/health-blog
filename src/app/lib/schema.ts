// lib/schema.ts
// import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// export const users = pgTable('users', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull(),
//   name: text('name').notNull(),
//   role: text('role').$type<'admin'>().notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// lib/schema.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').$type<'admin'>().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;

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