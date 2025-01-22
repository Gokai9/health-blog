// app/api/articles/route.ts
import { db } from '@/db';
import { articlesSchema } from '@/db/schema';
import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { Article } from '@/types';



export async function GET() {
  try {
    const allArticles = await db.select().from(articlesSchema);
    console.log('Debug Data',allArticles)
    return NextResponse.json(allArticles);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
  
    if (!session || session.user.role !== "admin") {
      return new Response("Unauthorized", { status: 401 })
  }
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const data = await request.json();
    const newArticle: Article = {
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      author: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.insert(articlesSchema).values(newArticle).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}