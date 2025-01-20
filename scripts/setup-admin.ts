// scripts/setup-admin.ts
// import { db } from '../app/lib/db';
// import { users, articles } from '../app/lib/schema';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Article } from '../app/types';
import { sql } from '../app/db';

dotenv.config();

const articl: Article[] = [
  {
    title: 'The Impact of Mediterranean Diet on Longevity',
    content: 'Discover how adopting a Mediterranean diet can significantly improve your health and increase life expectancy...',
    status: 'published',
    slug: 'mediterranean-diet-longevity',
    author: 'Admin User',
    categories: ['Nutrition']
  },
  {
    title: '10 Best Exercises for a Healthy Heart',
    content: 'Learn about the top exercises that can help you maintain a healthy heart and improve cardiovascular health...',
    status: 'published',
    slug: 'best-exercises-healthy-heart',
    author: 'Admin User',
    categories: ['Fitness']
  },
  {
    title: 'Understanding Mental Health: Tips and Resources',
    content: 'Mental health is just as important as physical health. Here are some tips and resources to help you maintain it...',
    status: 'published',
    slug: 'understanding-mental-health',
    author: 'Admin User',
    categories: ['Health']
  },
  // ... more articles
];
// async function addArticle() {
//   for (const article of articl) {
//     await db.insert(articles).values(article);
//   }
// }
// scripts/setup.ts

async function setup() {
  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Check if admin exists
    const existingAdmin = await sql`
      SELECT * FROM users WHERE email = ${process.env.ADMIN_EMAIL!}
    `;

    if (existingAdmin.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
    
    await sql`
      INSERT INTO users (email, password, name, role)
      VALUES (
        ${process.env.ADMIN_EMAIL!},
        ${hashedPassword},
        'Admin User',
        'admin'
      )
    `;

    console.log('Setup completed successfully');
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setup();
// scripts/setup.ts


async function add() {
  try {
    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT  NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL,
        slug TEXT NOT NULL,
        author TEXT NOT NULL,
        categories TEXT[] NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    for (const article of articl) {
    await sql`
      INSERT INTO articles (title, content, status, slug, author, categories)
      VALUES (
        ${article.title},
        ${article.content},
        ${article.status},
        ${article.slug},
        ${article.author},
        ${article.categories}
      )
    `;
    }
    console.log('Setup completed successfully');
  } catch (error) {
    console.error('Setup error:', error);
  }
}
export const admin = setup
export const addA = add
// async function setupAdmin() {
//   try {
//     // Check if admin already exists
//     const existingAdmin = await db.query.users.findFirst({
//       where: (users, { eq }) => eq(users.email, process.env.ADMIN_EMAIL!),
//     });

//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       return;
//     }

//     // Create new admin
//     const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);

//     await db.insert(users).values({
//       email: process.env.ADMIN_EMAIL!,
//       password: hashedPassword,
//       name: 'Admin User',
//       role: 'admin',
//     });

//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.error('Error setting up admin:', error);
//   }
// }

// export const add = addArticle;
// export const setup = setupAdmin;