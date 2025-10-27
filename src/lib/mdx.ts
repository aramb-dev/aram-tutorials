import { Frontmatter, Post } from '@/types';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'src/content/tutorials');

// Cache for posts data to avoid re-reading files on every request
let postsCache: Post[] | null = null;
let postsCacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

function getAllPostsUncached(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as Frontmatter),
    };
  });

  return allPostsData.sort((a, b) => {
    // Use publishedAt as primary, fallback to date, then to empty string for consistent sorting
    const dateA = a.publishedAt || a.date || '';
    const dateB = b.publishedAt || b.date || '';
    return dateA < dateB ? 1 : -1;
  });
}

export function getAllPosts(): Post[] {
  const now = Date.now();
  
  // Return cached data if available and fresh
  if (postsCache && (now - postsCacheTime < CACHE_DURATION)) {
    return postsCache;
  }

  // Fetch fresh data and update cache
  postsCache = getAllPostsUncached();
  postsCacheTime = now;
  
  return postsCache;
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as Frontmatter),
  };
}
