'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Trigger background change after scrolling 100px
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        // Base positioning and layout
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-in-out',
        // Dynamic background based on scroll state
        isScrolled
          ? 'bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Floating Logo */}
          <Link
            href="/"
            className="group relative"
            aria-label="Return to Aram Tutorials homepage"
          >
            <div
              className={cn(
                'flex items-center gap-3 transition-all duration-300',
                'hover:scale-105 active:scale-95'
              )}
            >
              {/* Aram Tutorials Logo */}
              <Image
                src="/aram-tutorials-logo.png"
                alt="Aram Tutorials Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />

              {/* Brand Text - Only visible when scrolled */}
              <div
                className={cn(
                  'transition-all duration-300',
                  isScrolled
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2 pointer-events-none'
                )}
              >
                <span className="text-white font-semibold text-lg tracking-tight">
                  Aram Tutorials
                </span>
                <div className="text-white/60 text-xs font-medium">
                  Tech Made Simple
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Menu - Minimal and Elegant */}
          <nav
            className={cn(
              'hidden md:flex items-center gap-1',
              'transition-all duration-300',
              isScrolled ? 'opacity-100' : 'opacity-80'
            )}
          >
            <Link
              href="/tutorials"
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium',
                'text-white/80 hover:text-white',
                'hover:bg-white/10 transition-all duration-200',
                'backdrop-blur-sm'
              )}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium',
                'text-white/80 hover:text-white',
                'hover:bg-white/10 transition-all duration-200',
                'backdrop-blur-sm'
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium',
                'text-white/80 hover:text-white',
                'hover:bg-white/10 transition-all duration-200',
                'backdrop-blur-sm'
              )}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
