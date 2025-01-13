// app/api/articles/route.ts
import { getCollection } from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { Article } from '../../types';

export async function GET() {
  try {
    const articles = await getCollection<Article>('articles');
    const data = await articles.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articles = await getCollection<Article>('articles');
    const data: Omit<Article, 'createdAt' | 'updatedAt'> = await request.json();
    
    const result = await articles.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Article);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

