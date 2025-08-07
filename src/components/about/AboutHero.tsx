import { Button } from '@/components/ui/button';
import { Calendar, Coffee, Heart, MapPin } from 'lucide-react';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Heart className="h-4 w-4 text-brand-lightest" />
                <span className="text-sm font-medium">About Us</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{' '}
                <span className="text-brand-lightest">Aram Tutorials</span>
              </h1>

              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                We are dedicated to making technology accessible through clear,
                practical tutorials that empower learners at every level.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <MapPin className="h-4 w-4" />
                  <span>Global Reach</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Calendar className="h-4 w-4" />
                  <span>Proven Experience</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Coffee className="h-4 w-4" />
                  <span>Quality Content</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-lightest text-primary hover:bg-brand-lighter font-semibold"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="bg-white/15 text-white border-white/20 hover:bg-white/25 hover:text-white backdrop-blur-sm font-semibold"
                >
                  <Link href="/tutorials">View Our Tutorials</Link>
                </Button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lighter/20 to-brand-light/20 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-lightest/20 rounded-3xl transform -rotate-3"></div>

                {/* Profile Image Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-2">
                  <div className="w-80 h-80 md:w-96 md:h-96 relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-lighter/10 to-brand-light/10">
                    {/* Placeholder for team image */}
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white/20">
                      AT
                    </div>
                    {/* Uncomment when you have an actual image */}
                    {/* <Image
                      src="/images/team-photo.jpg"
                      alt="Aram Tutorials Team"
                      fill
                      className="object-cover"
                      priority
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}
