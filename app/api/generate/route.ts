// app/api/generate/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { GenerateArticleRequest, GenerateArticleResponse } from '../../types';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      topic, 
      keywords, 
      tone, 
      wordCount, 
      additionalContext 
    }: GenerateArticleRequest = await request.json();

    // Construct the prompt
    const prompt = `Write a health blog article about ${topic}.
    Keywords to include: ${keywords.join(', ')}
    Tone: ${tone}
    Target word count: ${wordCount}
    Additional context: ${additionalContext}
    
    Format the article with:
    1. An engaging title
    2. A brief introduction
    3. Well-structured main content with subheadings
    4. A conclusion
    5. Use markdown formatting
    
    Make it informative, engaging, and backed by current health guidelines.`;

    // Generate content
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the generated content
    const [title, ...content] = text.split('\n').filter(Boolean);
    
    const responseData: GenerateArticleResponse = {
      title: title.replace('#', '').trim(),
      content: content.join('\n'),
      metadata: {
        topic,
        keywords,
        tone,
        wordCount,
        generatedAt: new Date().toISOString()
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}