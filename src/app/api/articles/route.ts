// app/api/articles/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '../../lib/db'
import Article from '../../models/Article'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    const articles = await Article.find({}).sort({ createdAt: -1 })
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    const body = await req.json()
    
    const article = new Article({
      ...body,
      author: session.user?.name || 'Admin',
      slug: body.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    })

    await article.save()
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

