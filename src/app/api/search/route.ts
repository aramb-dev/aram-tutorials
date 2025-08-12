import { Database } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: 'Search query must be at least 2 characters long',
        },
        { status: 400 }
      );
    }

    // Search posts
    const posts = await Database.searchPosts(query.trim(), limit);

    return NextResponse.json(
      {
        success: true,
        posts,
        total: posts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Search failed. Please try again later.',
      },
      { status: 500 }
    );
  }
}
