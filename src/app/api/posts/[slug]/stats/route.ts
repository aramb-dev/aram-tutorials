import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const postSlug = params.slug;

  try {
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      select: {
        views: true,
        likes: {
          select: {
            userId: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const likes = post.likes.length;
    const bookmarks = post.bookmarks.length;
    const userHasLiked = userId
      ? post.likes.some((like: { userId: string }) => like.userId === userId)
      : false;
    const userHasBookmarked = userId
      ? post.bookmarks.some(
          (bookmark: { userId: string }) => bookmark.userId === userId
        )
      : false;

    return NextResponse.json({
      views: post.views,
      likes,
      bookmarks,
      userHasLiked,
      userHasBookmarked,
    });
  } catch (error) {
    console.error('Error fetching post stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
