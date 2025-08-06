import { Search, BookOpen, Filter } from 'lucide-react';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TutorialsHeader() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Content */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-brand-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Tutorials
            </h1>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Explore our comprehensive collection of programming tutorials, web development guides,
            and tech tips. Learn at your own pace with step-by-step instructions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                50+ Tutorials
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                10+ Categories
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                Free Access
              </Badge>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchInput
                placeholder="Search tutorials, topics, or technologies..."
                className="w-full h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-300 focus:bg-white/20 focus:border-brand-primary"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Button size="sm" className="h-8 bg-brand-primary hover:bg-brand-light">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-3">
              Try searching for &quot;React&quot;, &quot;Next.js&quot;, &quot;JavaScript&quot;, or &quot;Node.js&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="relative">
        <svg
          className="w-full h-12 text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}