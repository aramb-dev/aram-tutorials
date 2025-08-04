import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedPosts } from '@/components/home/FeaturedPosts';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { RecentPosts } from '@/components/home/RecentPosts';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedPosts />
          </Suspense>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CategoriesSection />
        </div>
      </section>
      
      {/* Recent Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingSpinner />}>
            <RecentPosts />
          </Suspense>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
