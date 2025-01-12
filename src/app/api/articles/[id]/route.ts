// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/db'
import Article from '../../../models/Article'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
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
      
      const article = await Article.findByIdAndUpdate(
        params.id,
        { ...body, lastModified: new Date() },
        { new: true }
      )
  
      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        )
      }
  
      return NextResponse.json(article)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      )
    }
  }
  
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
  
      await connectDB()
      const article = await Article.findByIdAndDelete(params.id)
  
      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        )
      }
  
      return NextResponse.json({ message: 'Article deleted successfully' })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
      )
    }
  }