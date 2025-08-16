import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { stackServerApp } from '@/stack';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postSlug: slug,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const { slug } = params;
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json(
      { message: 'Comment content is required.' },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postSlug: slug,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
