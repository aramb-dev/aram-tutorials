export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export const CATEGORIES_CONFIG: Category[] = [
  {
    id: 'mac',
    name: 'macOS',
    slug: 'mac',
    description: 'macOS tutorials and guides',
    color: '#4A7C59',
    icon: 'laptop',
  },
  {
    id: 'windows',
    name: 'Windows',
    slug: 'windows',
    description: 'Windows tutorials and guides',
    color: '#7BA05A',
    icon: 'monitor',
  },
  {
    id: 'android',
    name: 'Android',
    slug: 'android',
    description: 'Android development and guides',
    color: '#A8C78A',
    icon: 'smartphone',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    slug: 'vscode',
    description: 'Visual Studio Code tutorials',
    color: '#2E5E15',
    icon: 'code',
  },
  {
    id: 'homebrew',
    name: 'Homebrew',
    slug: 'homebrew',
    description: 'Homebrew package manager guides',
    color: '#6B7280',
    icon: 'package',
  },
  {
    id: 'google',
    name: 'Google',
    slug: 'google',
    description: 'Google services and tools',
    color: '#4A7C59',
    icon: 'search',
  },
  {
    id: 'email',
    name: 'Email',
    slug: 'email',
    description: 'Email communication and productivity',
    color: '#3B82F6',
    icon: 'mail',
  },
];

export interface CategoryWithCount extends Category {
  count: number;
}

