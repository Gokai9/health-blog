// lib/db.ts
//import { drizzle } from 'drizzle-orm/node-postgres';
//import { Pool } from 'pg';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// import postgres from "postgres"
// import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from './schema';
// import ws from 'ws';
// import { neonConfig } from '@neondatabase/serverless';
// neonConfig.webSocketConstructor = ws;
// import dotenv from 'dotenv'

// dotenv.config();

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
// const pool = postgres({ connectionString: process.env.DATABASE_URL! })
// export const db = drizzle(pool, schema);
//export const pool = new Pool({ connectionString: process.env.DATABASE_URL })