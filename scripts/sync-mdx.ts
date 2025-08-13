/**
 * MDX to Database Sync Script
 * Reads MDX files and syncs them with the database
 */

import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface MDXMetadata {
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime?: number;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/tutorials');

export async function syncMDXToDB() {
  console.log('🔄 Syncing MDX files to database...');

  try {
    // Check if content directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      console.log('📁 No MDX content directory found, skipping sync...');
      return;
    }

    // Get all MDX files
    const files = fs
      .readdirSync(CONTENT_DIR)
      .filter(file => file.endsWith('.mdx'));

    if (files.length === 0) {
      console.log('📄 No MDX files found, skipping sync...');
      return;
    }

    console.log(`📚 Found ${files.length} MDX file(s) to process`);

    for (const file of files) {
      try {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: metadata, content } = matter(fileContent);

        const mdx = metadata as MDXMetadata;
        const slug = path.basename(file, '.mdx');

        console.log(`📝 Processing: ${mdx.title || slug}`);

        // Validate required fields
        if (!mdx.title || !mdx.description) {
          console.warn(
            `⚠️  Skipping ${file}: Missing required title or description`
          );
          continue;
        }

        // Find or create category
        const category = await prisma.category.upsert({
          where: { slug: slugify(mdx.category || 'uncategorized') },
          update: {},
          create: {
            name: mdx.category || 'Uncategorized',
            slug: slugify(mdx.category || 'uncategorized'),
            description: `${mdx.category || 'Uncategorized'} tutorials and guides`,
            color: getRandomColor(),
          },
        });

        // Create/update blog post
        const post = await prisma.blogPost.upsert({
          where: { slug },
          update: {
            title: mdx.title,
            excerpt: mdx.description,
            content: content,
            categoryId: category.id,
            published: true,
            readingTime: mdx.readingTime || 5,
            updatedAt: new Date(),
          },
          create: {
            title: mdx.title,
            slug,
            excerpt: mdx.description,
            content: content,
            categoryId: category.id,
            published: true,
            readingTime: mdx.readingTime || 5,
          },
        });

        // Handle tags
        if (mdx.tags && mdx.tags.length > 0) {
          // Clear existing tags
          await prisma.postTag.deleteMany({
            where: { postId: post.id },
          });

          // Add new tags
          for (const tagName of mdx.tags) {
            try {
              const tag = await prisma.tag.upsert({
                where: { slug: slugify(tagName) },
                update: {},
                create: {
                  name: tagName,
                  slug: slugify(tagName),
                },
              });

              await prisma.postTag.create({
                data: {
                  postId: post.id,
                  tagId: tag.id,
                },
              });
            } catch (tagError) {
              console.warn(`⚠️  Failed to create tag "${tagName}":`, tagError);
            }
          }
        }

        console.log(`✅ Synced: ${mdx.title}`);
      } catch (fileError) {
        console.error(`❌ Error processing ${file}:`, fileError);
        // Continue with other files instead of failing the entire sync
      }
    }

    console.log('🎉 MDX sync completed!');
  } catch (error) {
    console.error('❌ Error syncing MDX files:', error);

    // In production, we might want to continue the build even if sync fails
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  Continuing build despite sync errors...');
      return;
    }

    throw error;
  } finally {
    // Ensure database connection is closed
    await prisma.$disconnect();
  }
}

function getRandomColor(): string {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#06B6D4', // Cyan
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Run if called directly
if (require.main === module) {
  syncMDXToDB()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
