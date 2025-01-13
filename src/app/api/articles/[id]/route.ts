// app/api/articles/[id]/route.ts
import { ObjectId } from 'mongodb';
import { getCollection } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { Article } from '../../../types';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articles = await getCollection<Article>('articles');
    const data: Partial<Article> = await request.json();
    
    const result = await articles.updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: {
          ...data,
          updatedAt: new Date(),
        }
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articles = await getCollection<Article>('articles');
    const result = await articles.deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}