// Seed script for initial categories and tags
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert initial categories
  await prisma.category.createMany({
    data: [
      {
        name: 'Mac',
        slug: 'mac',
        description: 'Tutorials for macOS users',
        icon: '🍎',
        color: '#007AFF',
      },
      {
        name: 'Windows',
        slug: 'windows',
        description: 'Windows tips and guides',
        icon: '🪟',
        color: '#0078D4',
      },
      {
        name: 'Android',
        slug: 'android',
        description: 'Android app configurations',
        icon: '🤖',
        color: '#3DDC84',
      },
      {
        name: 'VS Code',
        slug: 'vs-code',
        description: 'Visual Studio Code tutorials',
        icon: '💻',
        color: '#007ACC',
      },
      {
        name: 'Homebrew',
        slug: 'homebrew',
        description: 'Package management for macOS',
        icon: '🍺',
        color: '#FBB040',
      },
      {
        name: 'Google Tools',
        slug: 'google-tools',
        description: 'Google productivity tools',
        icon: '🔍',
        color: '#4285F4',
      },
    ],
    skipDuplicates: true,
  });

  // Insert initial tags
  await prisma.tag.createMany({
    data: [
      { name: 'beginner', slug: 'beginner' },
      { name: 'installation', slug: 'installation' },
      { name: 'configuration', slug: 'configuration' },
      { name: 'productivity', slug: 'productivity' },
      { name: 'troubleshooting', slug: 'troubleshooting' },
      { name: 'tips', slug: 'tips' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
