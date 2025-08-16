import { stackServerApp } from '@/stack';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;
  const postSlug = params.slug;

  try {
    await prisma.bookmark.create({
      data: {
        postSlug,
        userId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error bookmarking post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;
  const postSlug = params.slug;

  try {
    await prisma.bookmark.delete({
      where: {
        postSlug_userId: {
          postSlug,
          userId,
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unbookmarking post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
