// app/api/articles/route.ts
import { db } from '@/db';
import { articlesSchema, type NewArticle } from '@/db/schema';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';


export async function GET() {
  try {
    const allArticles = await db.select().from(articlesSchema);
    return NextResponse.json(allArticles);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const newArticle: NewArticle = {
      ...data,
      authorId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.insert(articlesSchema).values(newArticle).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}