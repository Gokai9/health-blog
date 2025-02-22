// lib/db.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// dotenv.config();

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
