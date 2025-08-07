import { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutSkills } from '@/components/about/AboutSkills';
import { AboutExperience } from '@/components/about/AboutExperience';
import { AboutContact } from '@/components/about/AboutContact';

export const metadata: Metadata = {
  title: 'About Us | Aram Tutorials',
  description: 'Learn about Aram Tutorials team. Dedicated tech educators and developers passionate about making technology accessible to everyone through clear, practical tutorials.',
  keywords: ['Aram Tutorials', 'team', 'developers', 'educators', 'tutorials', 'programming', 'tech education'],
  openGraph: {
    title: 'About Us | Aram Tutorials',
    description: 'Learn about the Aram Tutorials team - passionate developers and educators.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Custom About Page Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <AboutHero />

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AboutSkills />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AboutExperience />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AboutContact />
        </div>
      </section>
    </div>
  );
}