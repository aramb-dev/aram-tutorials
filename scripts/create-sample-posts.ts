import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createSamplePosts() {
  // Get categories first
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  const macCategory = categories.find(c => c.slug === 'mac');
  const vsCodeCategory = categories.find(c => c.slug === 'vs-code');
  const androidCategory = categories.find(c => c.slug === 'android');
  const windowsCategory = categories.find(c => c.slug === 'windows');
  const googleCategory = categories.find(c => c.slug === 'google-tools');

  const beginnerTag = tags.find(t => t.slug === 'beginner');
  const installationTag = tags.find(t => t.slug === 'installation');
  const configurationTag = tags.find(t => t.slug === 'configuration');
  const tipsTag = tags.find(t => t.slug === 'tips');
  const productivityTag = tags.find(t => t.slug === 'productivity');

  const samplePosts = [
    {
      title: 'How to Install Homebrew on macOS',
      slug: 'how-to-install-homebrew-macos',
      excerpt:
        'Learn how to install Homebrew, the essential package manager for macOS, with this step-by-step guide.',
      content: `# How to Install Homebrew on macOS

Homebrew is an essential package manager for macOS that makes installing and managing software incredibly easy. In this tutorial, we'll walk through the installation process step by step.

## What is Homebrew?

Homebrew is a free and open-source package management system that simplifies the installation of software on macOS. It's often called "the missing package manager for macOS."

## Prerequisites

- macOS 10.14 or newer
- Command Line Tools for Xcode
- Admin privileges on your Mac

## Step 1: Install Command Line Tools

First, open Terminal and run:

\`\`\`bash
xcode-select --install
\`\`\`

## Step 2: Install Homebrew

Run the official installation script:

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

## Step 3: Add Homebrew to PATH

For Apple Silicon Macs, add this to your shell profile:

\`\`\`bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
\`\`\`

## Step 4: Verify Installation

\`\`\`bash
brew doctor
\`\`\`

That's it! You now have Homebrew installed and ready to use.`,
      featuredImage:
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
      youtubeUrl: null,
      readingTime: 3,
      published: true,
      categoryId: macCategory?.id || null,
      tags: [beginnerTag, installationTag].filter(Boolean),
    },
    {
      title: 'Setting up VS Code for Web Development',
      slug: 'vscode-web-development-setup',
      excerpt:
        'Configure Visual Studio Code with the best extensions and settings for modern web development.',
      content: `# Setting up VS Code for Web Development

Visual Studio Code is one of the most popular code editors for web development. Let's set it up with the best extensions and configurations.

## Essential Extensions

### 1. Prettier - Code formatter
Automatically formats your code for consistency.

### 2. ESLint
Helps catch errors and enforce coding standards.

### 3. Auto Rename Tag
Automatically renames paired HTML/XML tags.

### 4. Bracket Pair Colorizer
Makes matching brackets easier to see.

## Recommended Settings

Add these to your VS Code settings.json:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
\`\`\`

## Useful Shortcuts

- \`Ctrl+Shift+P\` - Command Palette
- \`Ctrl+\\\` - Toggle Sidebar
- \`Ctrl+\`\` - Toggle Terminal

Your VS Code is now optimized for web development!`,
      featuredImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      youtubeUrl: 'https://youtube.com/watch?v=example',
      readingTime: 5,
      published: true,
      categoryId: vsCodeCategory?.id || null,
      tags: [configurationTag, productivityTag].filter(Boolean),
    },
    {
      title: 'Android Developer Options Guide',
      slug: 'android-developer-options-guide',
      excerpt:
        'Unlock hidden features and debugging tools on your Android device with developer options.',
      content: `# Android Developer Options Guide

Developer options on Android provide access to system-level features and debugging tools. Here's how to enable and use them.

## How to Enable Developer Options

1. Go to **Settings > About phone**
2. Tap **Build number** 7 times
3. Enter your device password/PIN
4. Developer options will appear in Settings

## Useful Developer Options

### USB Debugging
Essential for connecting your device to development tools.

### Animation Scales
- Window animation scale
- Transition animation scale
- Animator duration scale

Set all to 0.5x for faster animations or turn off completely.

### Show Layout Bounds
Shows the boundaries of all UI elements - great for design work.

### Don't Keep Activities
Helps test app behavior when activities are destroyed.

## Warning
⚠️ Only enable options you understand. Some settings can affect device performance or stability.

Developer options give you powerful control over your Android device!`,
      featuredImage:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      youtubeUrl: null,
      readingTime: 4,
      published: true,
      categoryId: androidCategory?.id || null,
      tags: [configurationTag, tipsTag].filter(Boolean),
    },
  ];

  // Create blog posts
  for (const postData of samplePosts) {
    const { tags: postTags, ...postWithoutTags } = postData;

    const post = await prisma.blogPost.create({
      data: postWithoutTags,
    });

    // Create tag associations
    for (const tag of postTags) {
      if (tag) {
        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id,
          },
        });
      }
    }

    console.log(`Created post: ${post.title}`);
  }

  console.log('Sample posts created successfully!');
}

createSamplePosts()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
