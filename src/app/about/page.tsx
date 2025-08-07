import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutSkills } from '@/components/about/AboutSkills';
import { AboutExperience } from '@/components/about/AboutExperience';
import { AboutContact } from '@/components/about/AboutContact';

export const metadata: Metadata = {
  title: 'About Us | Aram Tutorials',
  description:
    'Learn about Aram Tutorials team. Dedicated tech educators and developers passionate about making technology accessible to everyone through clear, practical tutorials.',
  keywords: [
    'Aram Tutorials',
    'team',
    'developers',
    'educators',
    'tutorials',
    'programming',
    'tech education',
  ],
  openGraph: {
    title: 'About Us | Aram Tutorials',
    description:
      'Learn about the Aram Tutorials team - passionate developers and educators.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
