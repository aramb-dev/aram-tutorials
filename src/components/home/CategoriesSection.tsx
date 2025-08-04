import { ArrowRight, Folder, Laptop, Monitor, Smartphone, Code, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { generateCategoryUrl } from '@/lib/utils';

// Icon mapping for category icons
const iconMap = {
  laptop: Laptop,
  monitor: Monitor,
  smartphone: Smartphone,
  code: Code,
  package: Package,
  search: Search,
} as const;

export function CategoriesSection() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-accent-blue/10 text-accent-blue rounded-full px-4 py-2 mb-4">
          <Folder className="h-4 w-4" />
          <span className="text-sm font-medium">Browse by Topic</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Explore Categories
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find tutorials organized by technology and topic to accelerate your learning journey.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DEFAULT_CATEGORIES.map((category, index) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;

          return (
            <Link
              key={category.slug}
              href={generateCategoryUrl(category.slug)}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  {/* Category Icon */}
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <IconComponent
                      className="h-8 w-8"
                      style={{ color: category.color }}
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Category Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Tutorial Count */}
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <span>0 tutorials</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* View All Categories Button */}
      <div className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/categories">
            <Folder className="mr-2 h-4 w-4" />
            View All Categories
          </Link>
        </Button>
      </div>
    </div>
  );
}