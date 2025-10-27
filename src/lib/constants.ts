import type { NavItem } from '@/types';

// Site configuration
export const SITE_CONFIG = {
  name: 'Aram Tutorials',
  description: 'Tech Made Simple – One Tutorial at a Time',
  tagline: 'Tech Made Simple – One Tutorial at a Time',
  url: 'https://tutorials.aramb.dev',
  author: {
    name: 'Aram Tutorials Team',
    email: 'aramtutorials@gmail.com',
    bio: 'A dedicated team of tech educators and developers helping people master technology through clear, practical tutorials.',
    avatar: '/images/team-avatar.jpg',
    social: {
      youtube: 'https://youtube.com/@aramtutorials',
    },
  },
  social: {
    twitter: '@aramtutorials',
    github: 'aramtutorials',
  },
} as const;

// Navigation configuration
export const MAIN_NAV: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Tutorials',
    href: '/blog',
  },
  {
    label: 'Categories',
    href: '/categories',
    children: [
      {
        label: 'Mac',
        href: '/blog/category/mac',
      },
      {
        label: 'Windows',
        href: '/blog/category/windows',
      },
      {
        label: 'Android',
        href: '/blog/category/android',
      },
      {
        label: 'VS Code',
        href: '/blog/category/vscode',
      },
      {
        label: 'Homebrew',
        href: '/blog/category/homebrew',
      },
      {
        label: 'Google',
        href: '/blog/category/google',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

// Footer navigation
export const FOOTER_NAV = {
  main: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Tutorials',
      href: '/blog',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  legal: [
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
    {
      label: 'Terms of Service',
      href: '/terms',
    },
  ],
  categories: [
    {
      label: 'Mac Tutorials',
      href: '/blog/category/mac',
    },
    {
      label: 'Windows Tutorials',
      href: '/blog/category/windows',
    },
    {
      label: 'Android Tutorials',
      href: '/blog/category/android',
    },
    {
      label: 'VS Code Tutorials',
      href: '/blog/category/vscode',
    },
  ],
} as const;



// Pagination settings
export const PAGINATION = {
  POSTS_PER_PAGE: 12,
  POSTS_PER_PAGE_MOBILE: 6,
  RELATED_POSTS_COUNT: 3,
  POPULAR_POSTS_COUNT: 5,
  RECENT_POSTS_COUNT: 5,
} as const;

// Search configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_RESULTS: 10,
  DEBOUNCE_DELAY: 300,
} as const;

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_COMMENT_LENGTH: 1000,
  MAX_MESSAGE_LENGTH: 2000,
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  CATEGORIES: '/api/categories',
  TAGS: '/api/tags',
  COMMENTS: '/api/comments',
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  SEARCH: '/api/search',
} as const;

// Cache keys for local storage
export const CACHE_KEYS = {
  THEME: 'aram-tutorials-theme',
  SEARCH_HISTORY: 'aram-tutorials-search-history',
  NEWSLETTER_DISMISSED: 'aram-tutorials-newsletter-dismissed',
  READING_PROGRESS: 'aram-tutorials-reading-progress',
} as const;

// Social sharing
export const SOCIAL_SHARE = {
  TWITTER_INTENT: 'https://twitter.com/intent/tweet',
  FACEBOOK_SHARE: 'https://www.facebook.com/sharer/sharer.php',
  LINKEDIN_SHARE: 'https://www.linkedin.com/sharing/share-offsite/',
  REDDIT_SUBMIT: 'https://www.reddit.com/submit',
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  TITLE_TEMPLATE: '%s | Aram Tutorials',
  DEFAULT_TITLE: 'Aram Tutorials - Tech Made Simple',
  DEFAULT_DESCRIPTION:
    'Learn technology through clear, practical tutorials. From Mac and Windows to Android and VS Code - we make tech simple, one tutorial at a time.',
  DEFAULT_KEYWORDS: [
    'tutorials',
    'tech',
    'mac',
    'windows',
    'android',
    'vscode',
    'programming',
    'technology',
  ],
  DEFAULT_IMAGE: '/images/og-image.jpg',
  TWITTER_CREATOR: '@aramtutorials',
  TWITTER_SITE: '@aramtutorials',
} as const;

// Reading time configuration
export const READING_TIME = {
  WORDS_PER_MINUTE: 200,
  MIN_READING_TIME: 1,
} as const;

// Image configuration
export const IMAGES = {
  PLACEHOLDER: '/images/placeholder.jpg',
  AUTHOR_AVATAR: '/images/author-avatar.jpg',
  LOGO: '/images/logo.svg',
  LOGO_DARK: '/images/logo-dark.svg',
  OG_IMAGE: '/images/og-image.jpg',
  FAVICON: '/favicon.ico',
} as const;

// Animation durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 200,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  TOO_SHORT: 'This field is too short.',
  TOO_LONG: 'This field is too long.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  CONTACT_SENT: 'Your message has been sent successfully!',
  NEWSLETTER_SUBSCRIBED: 'Thank you for subscribing to our newsletter!',
  COMMENT_SUBMITTED: 'Your comment has been submitted for review.',
  FORM_SAVED: 'Your changes have been saved.',
} as const;

// Feature flags
export const FEATURES = {
  NEWSLETTER: true,
  SEARCH: true,
  DARK_MODE: true,
  SOCIAL_SHARING: true,
  READING_PROGRESS: true,
  TABLE_OF_CONTENTS: true,
  RELATED_POSTS: true,
} as const;

// External links
export const EXTERNAL_LINKS = {
  YOUTUBE_CHANNEL: 'https://youtube.com/@aramtutorials',
} as const;
