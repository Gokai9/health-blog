// app/api/articles/[id]/route.ts
import { db } from '@/db';
import { articlesSchema,  } from '@/db/schema';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    const session = await auth()
  
    if (!session || session.user.role !== "admin") {
      return new Response("Unauthorized", { status: 401 })
  }

    const data = await request.json();
    const result = await db
      .update(articlesSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articlesSchema.id, params.id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
  
    if (!session || session.user.role !== "admin") {
      return new Response("Unauthorized", { status: 401 })
  }

    await db.delete(articlesSchema).where(eq(articlesSchema.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}