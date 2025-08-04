import { ArrowRight, BookOpen, Code, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Welcome to Aram Tutorials</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Tech Made Simple
              <span className="block text-accent-yellow">One Tutorial at a Time</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master programming, web development, and technology with clear, 
            step-by-step tutorials designed for developers of all levels.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchInput 
              placeholder="Search tutorials, topics, or technologies..."
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
              size="lg"
            />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent-yellow text-primary hover:bg-accent-yellow/90 font-semibold"
            >
              <Link href="/tutorials">
                Explore Tutorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link href="/about">
                About Aram
              </Link>
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-accent-yellow/20 p-2 rounded-lg">
                <Code className="h-5 w-5 text-accent-yellow" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Practical Code</h3>
                <p className="text-sm text-primary-foreground/80">Real-world examples</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-accent-green/20 p-2 rounded-lg">
                <Lightbulb className="h-5 w-5 text-accent-green" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Clear Explanations</h3>
                <p className="text-sm text-primary-foreground/80">Easy to understand</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-accent-blue/20 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-accent-blue" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Step-by-Step</h3>
                <p className="text-sm text-primary-foreground/80">Guided learning</p>
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